// Admin gateway: handles password verification AND all privileged writes
// to site_settings + translations. Public RLS policies on those tables only
// allow SELECT — every UPDATE/INSERT must come through this function with
// the correct admin password. We then perform the write using the service
// role key, which bypasses RLS legitimately.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.97.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200, extraHeaders: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json", ...extraHeaders },
  });

// Constant-time string comparison to prevent timing-oracle attacks against
// the admin password. crypto.subtle.timingSafeEqual operates on equal-length
// buffers, so we hash both sides first.
async function timingSafeEqual(a: string, b: string): Promise<boolean> {
  const enc = new TextEncoder();
  const [ha, hb] = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(a)),
    crypto.subtle.digest("SHA-256", enc.encode(b)),
  ]);
  const va = new Uint8Array(ha);
  const vb = new Uint8Array(hb);
  if (va.length !== vb.length) return false;
  let diff = 0;
  for (let i = 0; i < va.length; i++) diff |= va[i] ^ vb[i];
  return diff === 0;
}

// ---------------------------------------------------------------------------
// Per-IP rate limiting + exponential backoff
// ---------------------------------------------------------------------------
// In-memory only; effective per edge instance. This is intentionally ad-hoc
// per platform guidance — no shared store. Goal is to slow down scripted
// brute-force, not provide cluster-wide guarantees.

interface AttemptRecord {
  failures: number;       // consecutive failed attempts
  windowStart: number;    // ms epoch — start of the current sliding window
  lockedUntil: number;    // ms epoch — 0 if not locked
}

const attempts = new Map<string, AttemptRecord>();

const WINDOW_MS = 60_000;          // 1 minute sliding window
const MAX_FAILURES_PER_WINDOW = 5; // after this many failures within window → lock
const MAP_MAX_SIZE = 10_000;       // hard cap to bound memory

// Exponential backoff schedule (in ms) keyed by failure count beyond threshold.
// 1st lock = 5s, then 15s, 1m, 5m, 15m, capped at 1h.
const BACKOFF_STEPS_MS = [5_000, 15_000, 60_000, 300_000, 900_000, 3_600_000];

function backoffFor(failures: number): number {
  const over = Math.max(0, failures - MAX_FAILURES_PER_WINDOW);
  const idx = Math.min(over, BACKOFF_STEPS_MS.length - 1);
  return BACKOFF_STEPS_MS[idx];
}

function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const rec = attempts.get(ip);

  if (!rec) return { allowed: true, retryAfterSec: 0 };

  if (rec.lockedUntil > now) {
    return { allowed: false, retryAfterSec: Math.ceil((rec.lockedUntil - now) / 1000) };
  }

  // Window expired → reset failure counter
  if (now - rec.windowStart > WINDOW_MS) {
    rec.failures = 0;
    rec.windowStart = now;
    rec.lockedUntil = 0;
  }

  return { allowed: true, retryAfterSec: 0 };
}

function recordFailure(ip: string): number {
  const now = Date.now();

  // Bound memory: drop oldest entry if at cap
  if (attempts.size >= MAP_MAX_SIZE && !attempts.has(ip)) {
    const firstKey = attempts.keys().next().value;
    if (firstKey) attempts.delete(firstKey);
  }

  let rec = attempts.get(ip);
  if (!rec || now - rec.windowStart > WINDOW_MS) {
    rec = { failures: 0, windowStart: now, lockedUntil: 0 };
    attempts.set(ip, rec);
  }
  rec.failures += 1;

  if (rec.failures >= MAX_FAILURES_PER_WINDOW) {
    const wait = backoffFor(rec.failures);
    rec.lockedUntil = now + wait;
    return Math.ceil(wait / 1000);
  }
  return 0;
}

function recordSuccess(ip: string): void {
  attempts.delete(ip);
}

// Slight uniform delay before responding to failures to slow scripted attacks
// regardless of lockout state.
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------------

const SUPPORTED_LANGUAGES = ["nl", "en", "fr", "pt"] as const;
type Language = (typeof SUPPORTED_LANGUAGES)[number];

interface RequestBody {
  password?: string;
  action?: "verify" | "update_settings" | "update_translations";
  payload?: {
    default_language?: Language;
    language?: Language;
    content?: Record<string, unknown>;
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const ip = getClientIp(req);

  // Enforce rate limit BEFORE doing any password work.
  const gate = checkRateLimit(ip);
  if (!gate.allowed) {
    return json(
      { valid: false, error: "Too many attempts. Try again later.", retry_after: gate.retryAfterSec },
      429,
      { "Retry-After": String(gate.retryAfterSec) },
    );
  }

  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const adminPassword = Deno.env.get("ADMIN_PASSWORD");
  if (!adminPassword) {
    return json({ error: "Admin password not configured" }, 500);
  }

  const provided = typeof body.password === "string" ? body.password : "";
  const valid = await timingSafeEqual(provided, adminPassword);

  if (!valid) {
    const lockSec = recordFailure(ip);
    // Small uniform delay (~300ms) on every failure to throttle scripted attacks.
    await sleep(300);
    if (lockSec > 0) {
      return json(
        { valid: false, error: "Too many attempts. Try again later.", retry_after: lockSec },
        429,
        { "Retry-After": String(lockSec) },
      );
    }
    return json({ valid: false, error: "Unauthorized" }, 401);
  }

  // Successful auth → clear any prior failures for this IP.
  recordSuccess(ip);

  const action = body.action ?? "verify";

  if (action === "verify") {
    return json({ valid: true });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    return json({ error: "Server misconfigured" }, 500);
  }
  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  if (action === "update_settings") {
    const lang = body.payload?.default_language;
    if (!lang || !SUPPORTED_LANGUAGES.includes(lang)) {
      return json({ error: "Invalid default_language" }, 400);
    }
    const { error } = await admin
      .from("site_settings")
      .update({ default_language: lang, updated_at: new Date().toISOString() })
      .eq("id", "default");
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true });
  }

  if (action === "update_translations") {
    const lang = body.payload?.language;
    const content = body.payload?.content;
    if (!lang || !SUPPORTED_LANGUAGES.includes(lang)) {
      return json({ error: "Invalid language" }, 400);
    }
    if (!content || typeof content !== "object" || Array.isArray(content)) {
      return json({ error: "Invalid content payload" }, 400);
    }
    const { error } = await admin
      .from("translations")
      .upsert(
        {
          language: lang,
          content,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "language" },
      );
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true });
  }

  return json({ error: "Unknown action" }, 400);
});
