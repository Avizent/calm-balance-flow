## Audit and unify "pricing" → "fees" terminology

### Audit results

**No FAQ section exists** on the site (verified — no `/faq`, no FAQ component, no "Frequently asked" or "veelgestelde vragen" copy in any page or translation block).

**No booking-page cost copy exists** — `Boeken.tsx` only contains a reservation form with no fee/price references.

**No class-detail cost copy exists** — `Lessen.tsx` describes audiences, equipment, and a CTA only; no fee mentions.

So the audit reduces to remaining "pricing-flavored" labels in the navigation, CTAs, and the fees footnote. Other copy (page titles, hero subs, POA card, contact sub) was already aligned in earlier turns.

### Remaining occurrences to change (4 languages each)

| Location | Current copy | New copy |
|---|---|---|
| `nav.tarieven` (NL) | "Tarieven" | "Fees" |
| `nav.tarieven` (EN) | "Pricing" | "Fees" |
| `nav.tarieven` (FR) | "Tarifs" | "Fees" |
| `nav.tarieven` (PT) | "Preços" | "Fees" |
| `over.ctaSecondary` (NL) | "Bekijk tarieven" | "View fees" |
| `over.ctaSecondary` (EN) | "View pricing" | "View fees" |
| `over.ctaSecondary` (FR) | "Voir les tarifs" | "View fees" |
| `over.ctaSecondary` (PT) | "Ver os preços" | "View fees" |
| `prive.viewPricing` (all 4) | "Bekijk tarieven" / "View pricing" / "Voir les tarifs" / "Ver os preços" | "View fees" |
| `tarieven.pricingNote` (NL) | "(*) Prijzen exclusief BTW…" | "(*) Fees excluding VAT, not valid for private sales." |
| `tarieven.pricingNote` (EN) | "(*) Prices excluding VAT…" | "(*) Fees excluding VAT, not valid for private sales." |
| `tarieven.pricingNote` (FR) | "(*) Prix hors TVA…" | "(*) Fees excluding VAT, not valid for private sales." |
| `tarieven.pricingNote` (PT) | "(*) Preços sem IVA…" | "(*) Fees excluding VAT, not valid for private sales." |

Per your earlier choices ("Fees 2026", "Sessions and Fees", "Fees available upon request"), the unified term is the English word **Fees** in all four languages — keeping it consistent with the rest of the page.

### Files to change

**1. `src/contexts/LanguageContext.tsx`** — replace the 16 hardcoded translation values listed above (lines 240, 318, 406, 430-431, 601, 679, 767, 791, 964, 1042, 1130, 1154-1155, 1330, 1408, 1496, 1520).

**2. Database migration** — apply the same changes to the `public.translations` table so the live DB-merged copy matches:

```sql
UPDATE public.translations
SET content = jsonb_set(
                jsonb_set(
                  jsonb_set(
                    jsonb_set(content,
                      '{nav,tarieven}', '"Fees"'::jsonb),
                    '{over,ctaSecondary}', '"View fees"'::jsonb),
                  '{prive,viewPricing}', '"View fees"'::jsonb),
                '{tarieven,pricingNote}', '"(*) Fees excluding VAT, not valid for private sales."'::jsonb),
    updated_at = now();
```

### What stays untouched (intentional)

- The route `/tarieven` and the `id="tarieven"` anchor — these are URL/DOM identifiers, not user-facing copy. Renaming them would break inbound links, the sitemap, and cross-page anchor scrolling.
- Internal code identifiers (`pricingData`, `SHOW_PRICING`, `tarieven` translation namespace key, `viewPricing` key, `pricingNote` key, comments). They are developer-facing and the feature flag is documented for restoring prices later.
- Code comments referencing "pricing" in `features.ts` and `Index.tsx` — also developer-facing.
- `public/llms.txt` already says "Pricing on application…" — will update to "Fees on application — every programme is personal. Contact the studio for a tailored quote." for AI-crawler consistency.

### Verification after change

After applying, re-run `rg -ni "pricing|prijzen|tarieven|tarifs|preços" src/` and confirm only:
- Code identifiers (route paths, namespace keys, variable names, comments)
- The intentionally-preserved feature-flag docs

remain. All user-visible English/NL/FR/PT cost language reads "Fees" / "View fees".
