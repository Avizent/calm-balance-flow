

## Plan: Database-Driven Translation Management via Admin Panel

### Overview

Move all site translations (currently ~1700 lines of hardcoded content across 4 languages and 8+ page sections) into the database, and build an admin editor so content can be updated without touching code.

### Database Design

**New table: `translations`**

| Column | Type | Notes |
|--------|------|-------|
| `language` | `text` (PK) | `nl`, `en`, `fr`, `pt` |
| `content` | `jsonb` | Full translations object for that language |
| `updated_at` | `timestamptz` | Auto-updated |

- Seed with 4 rows containing the current hardcoded translation objects as JSON
- RLS: SELECT open to `anon`/`authenticated`, UPDATE restricted (same pattern as `site_settings`)

### LanguageContext Changes

- On app load, fetch all 4 rows from `translations` table
- Merge DB content over hardcoded defaults (hardcoded values serve as fallback if DB is empty or a key is missing)
- Cache in React state; no realtime needed (admin saves → user refreshes)

### Admin Panel Changes (`/admin`)

After password authentication, add a **Translation Editor** section:

- **Language selector** (tabs: NL / EN / FR / PT)
- **Section selector** (dropdown: nav, footer, home, over, lessen, prive, tarieven, contact, medicalProfessionals)
- For each section, render **editable fields** for every key:
  - Simple strings → text input or textarea (auto-detect based on length)
  - Arrays of objects → repeatable field groups
- **Save** button persists the full language JSON back to the `translations` table
- Show diff indicator (unsaved changes)

### Files Changed

| File | Action |
|------|--------|
| Migration | Create `translations` table + seed data + RLS policies |
| `src/contexts/LanguageContext.tsx` | Fetch translations from DB, merge over hardcoded defaults |
| `src/pages/Admin.tsx` | Add full translation editor UI with section/language navigation |

### Key Details

- **Fallback safety**: Hardcoded translations remain in the codebase as defaults. DB values override them via deep merge. If the DB is empty or unreachable, the site still works.
- **No schema coupling**: Translations stored as freeform JSONB, so adding new keys requires no migration — just update the hardcoded defaults and optionally add values via admin.
- **Array handling**: Arrays (like `benefits`, `audiences`, `conditions`) will be editable as ordered lists with add/remove controls.
- **Performance**: Translations fetched once on app mount (~4 small JSON rows), cached in context state.

