// Prerender React SPA routes to static HTML for SEO/GEO.
// Runs after `vite build`. Spins up a tiny static server against `dist/`,
// uses Puppeteer to visit each route, waits for React + react-helmet-async
// to render, then writes the rendered HTML back to `dist/<route>/index.html`.
//
// A `window.__PRERENDERED__ = true` flag is injected so the client bundle
// can switch to `hydrateRoot` instead of `createRoot`.

import { createServer } from "node:http";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sirv from "sirv";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "..", "dist");

const ROUTES = [
  "/",
  "/over",
  "/lessen",
  "/prive",
  "/tarieven",
  "/boeken",
  "/contact",
  "/medical-professionals",
  "/legal",
];

const CONCURRENCY = 1;
const NAV_TIMEOUT_MS = 45_000;
const HELMET_TIMEOUT_MS = 20_000;

function startStaticServer(rootDir) {
  return new Promise((resolve, reject) => {
    const handler = sirv(rootDir, {
      single: true, // SPA fallback so /lessen serves index.html
      dev: false,
      etag: false,
    });
    const server = createServer((req, res) => handler(req, res));
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      resolve({ server, port });
    });
  });
}

async function prerenderRoute(browser, baseUrl, route) {
  const context = await browser.createBrowserContext(); // isolated storage per route
  const page = await context.newPage();
  page.setDefaultNavigationTimeout(NAV_TIMEOUT_MS);

  page.on("pageerror", (err) =>
    console.error(`[prerender][${route}] pageerror:`, err.message)
  );
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.error(`[prerender][${route}] console.error:`, msg.text());
    }
  });

  // Block analytics / 3rd-party that could hold networkidle open
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const url = req.url();
    if (
      url.includes("google-analytics") ||
      url.includes("googletagmanager") ||
      url.includes("hotjar") ||
      url.includes("facebook.net")
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });

  const url = `${baseUrl}${route}`;
  await page.goto(url, { waitUntil: "networkidle0", timeout: NAV_TIMEOUT_MS });

  // Wait for React + react-helmet-async to populate the <title> and root content
  await page.waitForFunction(
    () => {
      const root = document.getElementById("root");
      const hasContent = !!root && root.children.length > 0;
      const hasTitle = !!document.title && document.title.trim().length > 0;
      return hasContent && hasTitle;
    },
    { timeout: HELMET_TIMEOUT_MS }
  );

  // Small grace tick so any final Helmet flush completes
  await new Promise((r) => setTimeout(r, 250));

  let html = await page.content();
  await page.close();
  await context.close();

  // Sanity check
  if (!/<title>[^<]+<\/title>/.test(html)) {
    throw new Error(`Prerender failed for ${route}: empty <title>`);
  }
  if (/react-error-boundary|Something went wrong/i.test(html)) {
    throw new Error(`Prerender failed for ${route}: error boundary triggered`);
  }

  // Inject prerender flag so client uses hydrateRoot
  const flag = `<script>window.__PRERENDERED__=true;</script>`;
  if (html.includes("</head>")) {
    html = html.replace("</head>", `${flag}</head>`);
  }

  // Determine output path
  const outDir =
    route === "/" ? DIST : path.join(DIST, ...route.split("/").filter(Boolean));
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, "index.html"), html, "utf8");

  return route;
}

async function runWithConcurrency(items, limit, worker) {
  const results = [];
  let i = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await worker(items[idx]);
    }
  });
  await Promise.all(runners);
  return results;
}

async function main() {
  // Verify build output exists
  try {
    await fs.access(path.join(DIST, "index.html"));
  } catch {
    throw new Error(`dist/index.html not found. Run \`vite build\` first.`);
  }

  // Snapshot the original Vite-built shell so SPA fallback always serves the
  // clean (non-prerendered) HTML to Puppeteer. Otherwise, after we overwrite
  // dist/index.html with the prerendered "/" output, subsequent route requests
  // (which fall back to /index.html) would receive prerendered HTML for the
  // wrong route, causing React hydration error #299.
  const STAGING = path.join(DIST, "..", ".prerender-staging");
  await fs.rm(STAGING, { recursive: true, force: true });
  await fs.cp(DIST, STAGING, { recursive: true });

  const { server, port } = await startStaticServer(STAGING);
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`[prerender] static server on ${baseUrl} (staging)`);

  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });

  const t0 = Date.now();
  try {
    await runWithConcurrency(ROUTES, CONCURRENCY, async (route) => {
      const start = Date.now();
      try {
        await prerenderRoute(browser, baseUrl, route);
        console.log(`[prerender] ✓ ${route}  (${Date.now() - start}ms)`);
      } catch (err) {
        console.error(`[prerender] ✗ ${route}: ${err.message}`);
        throw err;
      }
    });
    console.log(
      `[prerender] done — ${ROUTES.length} routes in ${Date.now() - t0}ms`
    );
  } finally {
    await browser.close();
    server.close();
    await fs.rm(STAGING, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error("[prerender] fatal:", err);
  process.exit(1);
});
