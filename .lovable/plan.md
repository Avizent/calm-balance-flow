
## Adding Brazilian Portuguese (PT-BR) as a Toggleable Language

### Current Architecture Summary

The language system is elegantly structured around a single file — `src/contexts/LanguageContext.tsx` — with three key building blocks:

1. **A feature flag** at line 5: `export const ENABLE_FRENCH = true`
2. **A `SUPPORTED_LANGUAGES` array** derived from that flag (line 10–12), consumed by `Navigation.tsx` for the toggle cycle
3. **A `translations` record** that conditionally includes the `fr` object (line 909–911)

The Navigation toggle (desktop and mobile) already reads `SUPPORTED_LANGUAGES` dynamically — so adding PT-BR requires zero changes to `Navigation.tsx`. The toggle will automatically cycle NL → EN → FR → PT → NL once `pt` is in the array.

The `Boeken.tsx` page has its own inline `copy` object using `isNl` / `isFr` guards. It needs a `isPt` branch added.

---

### Step 1–3: [Full translation plan preserved — see git history]

---

## SEO Implementation (Completed 2026-02-22)

### Architecture

All SEO is handled client-side via `react-helmet-async` (SPA limitation — no SSR). This provides the best possible SEO for a Vite + React SPA deployed on Netlify/Lovable.

### What was implemented

#### 1. `src/components/SEO.tsx` — Reusable SEO component
- **Per-page metadata**: Unique `<title>` (50–60 chars, keyword-first), `<meta description>` (140–155 chars)
- **Open Graph tags**: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`, `og:locale` (+ alternates for all 4 languages)
- **Twitter Card tags**: `summary_large_image` with full metadata
- **Canonical URLs**: Self-referencing canonical on every page
- **JSON-LD structured data**:
  - `WebSite` schema (homepage)
  - `Organization` schema (homepage)
  - `LocalBusiness` + `HealthAndBeautyBusiness` (homepage + contact) — includes address, phone, geo, hours, price range
  - `BreadcrumbList` (all interior pages)
- **noindex support**: 404 page excluded from indexing

#### 2. `index.html` — Foundation
- `lang="nl"` on `<html>` element
- Proper default title, description, OG and Twitter tags (fallback for crawlers that don't execute JS)
- Removed all Lovable/placeholder branding

#### 3. `src/index.css` — Performance
- Added `font-display=swap` to Google Fonts import for faster text rendering

#### 4. `public/sitemap.xml` — Static sitemap
- All 7 public pages with `lastmod`, `changefreq`, `priority`
- Must be manually updated when pages are added/removed

#### 5. `public/robots.txt` — Crawler config
- All crawlers allowed, `Sitemap:` directive pointing to published URL

#### 6. `public/netlify.toml` — Hosting config
- SPA catch-all redirect (`/* → /index.html` with 200 status)
- Security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- Cache headers for static assets (1 year immutable)

#### 7. `src/App.tsx` — HelmetProvider wrapper
- `<HelmetProvider>` wraps entire app for `react-helmet-async` to function

### Page-by-page SEO metadata

| Page | Title (≤60 chars) | Description |
|------|-------------------|-------------|
| `/` | Spessirits Pilates — Physio-led Pilates in Schilde | Verantwoord Pilates in Schilde, België... |
| `/over` | Over Cintia — Kinesitherapiste & Pilatesdocent | Leer Cintia kennen: kinesitherapiste... |
| `/lessen` | Pilates Lessen — Individueel Afgestemd | Ontdek het aanbod van Spessirits... |
| `/prive` | Privé Sessies — Individueel en Duo Pilates | Boek een privé Pilates sessie... |
| `/tarieven` | Tarieven — Pilates Prijzen Schilde 2026 | Transparante prijzen voor individuele... |
| `/boeken` | Boek een Sessie — Spessirits Pilates | Plan je Pilates sessie bij Spessirits... |
| `/contact` | Contact — Spessirits Pilates Schilde | Neem contact op met Spessirits... |
| `404` | Pagina niet gevonden (noindex) | Deze pagina bestaat niet... |

### Semantic HTML status
- ✅ Single `<h1>` per page
- ✅ Proper heading hierarchy (H1 → H2 → H3, no skipped levels)
- ✅ Semantic elements (`<main>`, `<section>`, `<nav>`, `<footer>`, `<header>`)
- ✅ `rel="noopener noreferrer"` on all external links
- ✅ Descriptive `alt` attributes on images
- ✅ Proper `<label>` elements on all form inputs
- ✅ Keyboard-navigable interactive elements

### Limitations (SPA constraints)
- No SSR/SSG — Googlebot must render JS (modern Googlebot does, but with delays)
- Sitemap is static — must be updated manually
- PageSpeed mobile score will be lower than SSR equivalent (expected 70–85 vs 90+)
- Canonical tags are client-rendered (less reliable than server-set)

### Future improvements (if needed)
- Add `hreflang` tags when custom domain is set up (one per language variant)
- Add `FAQPage` schema if FAQ content is added
- Add Google Search Console verification meta tag
- Add GA4/GTM when analytics are needed
- Consider Astro migration if SEO ranking becomes business-critical
