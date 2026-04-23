

## Plan: Prerendering (SSG) + GEO Schema — Optimised for Lovable Hosting

This combines my original prerender plan with your additions, but corrects two important things based on how this project actually deploys:

### Important correction first: Netlify is not used

Your project is hosted on **Lovable hosting**, not Netlify. The `public/netlify.toml` file in the repo has no effect — Lovable handles SPA fallback, headers, and caching at the infrastructure level. So:

- No `netlify.toml` changes needed
- No Netlify Build Plugin needed
- The build runs in Lovable's build environment, where Puppeteer + Chromium work fine as long as we install them correctly
- We will, however, set `PUPPETEER_SKIP_DOWNLOAD=false` explicitly and pass the right `--no-sandbox` args so Chromium launches in the build container

### What gets built

**Phase 1 — Prerendering infrastructure**

1. **Add dev dependencies**
   - `puppeteer` (bundles its own Chromium)
   - `sirv` (tiny static file server for serving `dist/` to Puppeteer during prerender)

2. **Create `scripts/prerender.mjs`**
   - Routes prerendered: `/`, `/over`, `/lessen`, `/prive`, `/tarieven`, `/boeken`, `/contact`, `/medical-professionals`, `/legal`
   - Excluded: `/admin` (auth-gated), `*` (404)
   - Flow per route:
     1. Boot `sirv` against `dist/` on a random port
     2. Launch Puppeteer headless with `--no-sandbox --disable-setuid-sandbox` (required in container builds)
     3. Navigate to the route, wait for `networkidle0`
     4. Wait for a Helmet-ready signal: poll until `document.title` is non-empty AND a known route-specific element has rendered
     5. Capture `document.documentElement.outerHTML`
     6. Inject `<script>window.__PRERENDERED__=true</script>` before `</head>`
     7. Write to `dist/<route>/index.html` (or `dist/index.html` for `/`)
   - Runs all routes in parallel (with a concurrency cap of 3) to keep build time low
   - Fails the build loudly if any route returns empty `<title>` or contains a React error boundary

3. **Update `package.json`**
   - `"build": "vite build && node scripts/prerender.mjs"`
   - `"build:spa": "vite build"` as escape hatch if prerender ever breaks the build

4. **Tiny client-side guard in `src/main.tsx`**
   - If `window.__PRERENDERED__` is true, use `ReactDOM.hydrateRoot` instead of `createRoot` so React reuses the prerendered DOM instead of throwing it away. Without this, hydration mismatch warnings flood the console and you lose the SEO benefit on first paint.

**Phase 2 — GEO (Local SEO) schema upgrade**

Currently the site uses generic `Organization` / `WebSite` JSON-LD. For local discoverability (Google Maps, "physiotherapist near me", AI assistant local recommendations), upgrade to richer schema:

5. **Add `LocalBusiness` / `MedicalBusiness` schema on `/` and `/contact`**
   - Type: `MedicalBusiness` (more specific than `LocalBusiness`, better for a physio-led pilates studio)
   - Fields: `name`, `image`, `address` (full PostalAddress), `geo` (latitude/longitude), `telephone`, `email`, `url`, `openingHoursSpecification`, `areaServed`, `priceRange`, `medicalSpecialty: "Physiotherapy"`, `sameAs` (social links)
   - Embedded via `react-helmet-async` so it ends up in the prerendered HTML

6. **Add `Service` schema to `/lessen` and `/prive`**
   - Each session type (group class, private session, medical professional consult) as a `Service` with `provider`, `areaServed`, `offers` (price from Tarieven page)

7. **Need from you (one-time)**
   - Confirm: full street address, postal code, city
   - Confirm: lat/lng (or I derive from the address)
   - Confirm: opening hours
   - Confirm: service area (e.g. "Brussels region" / specific municipalities)

### What this delivers

| | Before | After |
|---|---|---|
| Crawler sees real HTML on every route | No (empty shell) | Yes |
| Per-route `<title>` / meta / OG without JS | No | Yes |
| JSON-LD visible to Google/AI bots | Partial | Full, including local business signals |
| Google Maps / local pack eligibility | Weak | Strong |
| User experience | Same | Same (slightly faster first paint due to no render-wait) |
| Build time | ~15s | ~45s |
| Framework migration required | — | None |

### Technical notes (for the record)

- React 18 `hydrateRoot` is used post-prerender; component tree must match exactly between prerender and client run, which it will because we use the same bundle
- `LanguageContext` defaults to Dutch on first render, so prerendered HTML will be Dutch. Client-side language switch still works for users. This is fine for SEO because there are no per-language URLs (changing that is a separate, larger project)
- `BrowserRouter` works correctly with prerendering when each route has its own `index.html` at the matching path — Lovable's SPA fallback won't be triggered because the file exists
- The `<script>window.__PRERENDERED__=true</script>` flag lets us add per-page logic later (e.g. skip a Supabase fetch if data was baked in)

