

## Plan: Admin Settings — Default Language with Geo Override

### What this does
- Adds a password-protected `/admin` settings page where you can select the default language for first-time visitors
- First-time visitors without a stored language preference get their language set by geo-detection (browser timezone → country → language), falling back to the admin-configured default (initially English)
- Returning visitors keep their manually chosen language (already persisted in localStorage)

### Architecture

```text
First visit flow:
  1. Check localStorage → nothing stored
  2. Check geo (browser timezone API) → map to language
  3. If geo doesn't match a supported language → use admin default from DB
  4. Set result as active language

Return visit flow:
  1. Check localStorage → found → use it (no change)
```

### Database

**New table: `site_settings`** (single-row config pattern)

| Column | Type | Default |
|--------|------|---------|
| id | text (PK) | `'default'` |
| default_language | text | `'en'` |
| updated_at | timestamptz | `now()` |

RLS: Public read (anyone can fetch default language), no write policy (updates via service role or a simple admin password check in an edge function).

### Geo Detection (client-side, no API needed)

Use `Intl.DateTimeFormat().resolvedOptions().timeZone` to infer region:
- `Europe/Amsterdam`, `Europe/Brussels` → `nl`
- `Europe/Paris`, `Europe/Brussels` (FR community) → `fr`  
- `America/Sao_Paulo`, `America/Fortaleza`, etc. → `pt`
- Everything else → admin default from DB

This is free, instant, no external API, and works in all modern browsers.

### Files

| File | Change |
|------|--------|
| **Migration** | Create `site_settings` table with seed row (`default_language: 'en'`) |
| `src/pages/Admin.tsx` | New page — password gate (env-stored password), language dropdown, save button |
| `src/App.tsx` | Add `/admin` route (no nav link — hidden page) |
| `src/contexts/LanguageContext.tsx` | Update `getInitialLanguage` to be async: check localStorage → geo → fetch DB default. Add state for "loading" |
| `src/lib/geo-language.ts` | New utility: timezone-to-language mapping |

### Admin Page Design
- Simple centered card with password input
- Once authenticated (password checked client-side against a constant — this is a settings page, not a security boundary): shows current default language, dropdown to change it, save button
- Admin password stored as a simple constant (e.g. `ADMIN_PASSWORD` in the component) — this controls a cosmetic setting, not sensitive data

### Security Note
Since this only controls a display default (no user data, no auth), a simple client-side password gate is sufficient. No need for full authentication infrastructure.

