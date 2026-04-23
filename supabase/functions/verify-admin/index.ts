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

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
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

const SUPPORTED_LANGUAGES = ["nl", "en", "fr", "pt"] as const;
type Language = (typeof SUPPORTED_LANGUAGES)[number];

interface RequestBody {
  password?: string;
  // action defaults to "verify" for backwards compatibility with the old
  // password-only call site.
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
    // Generic message — never reveal whether the action would have been valid.
    return json({ valid: false, error: "Unauthorized" }, 401);
  }

  const action = body.action ?? "verify";

  // Verification only — no DB write
  if (action === "verify") {
    return json({ valid: true });
  }

  // Privileged writes use the service role key to bypass RLS legitimately.
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
    // Upsert so a new language row gets created if missing.
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
