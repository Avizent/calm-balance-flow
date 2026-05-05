## Goal

Replace all visible pricing (€ amounts, "1/5/10 session" packages, VAT notes) with a "Pricing on Application" (POA) message — but keep every line of pricing code intact behind a single boolean flag so it can be turned back on in one edit.

## Approach: one feature flag

Create `src/config/features.ts`:

```ts
// Flip to true to restore the public pricing tables.
export const SHOW_PRICING = false;
```

All existing pricing arrays, translation keys (`tr.tiers`, `tr.pricingNote`, etc.), and JSX stay in the codebase untouched. We only wrap the rendered blocks in `{SHOW_PRICING ? <ExistingTable/> : <POABlock/>}`.

## Files to change

### 1. `src/config/features.ts` (new)
Single export, documented as the on/off switch.

### 2. `src/pages/Tarieven.tsx`
- Import `SHOW_PRICING`.
- Keep `pricingData`, SEO meta, policies, gift voucher section as-is.
- Wrap the entire **Pricing Table `<section className="bg-card">`** (lines ~47–81) in `SHOW_PRICING ? (...existing...) : <POASection />`.
- POA section reuses studio styling: same `bg-card section-padding` container, single centered card with:
  - Heading from `tr.heroTitle` reused or new key `tr.poaTitle`
  - Body copy explaining sessions are quoted on request
  - Two CTAs: "Contact" → `/contact`, "WhatsApp" → existing wa.me link from Footer/Contact
- Policies + Gift voucher sections remain visible (they don't show prices).

### 3. `src/pages/Index.tsx`
- Import `SHOW_PRICING`.
- Wrap the homepage `<section id="tarieven">` block (lines ~280–340) the same way. When off, render a compact POA card in the same section so the anchor `#tarieven` still works and the nav link still scrolls somewhere meaningful.

### 4. `src/contexts/LanguageContext.tsx`
Add four new translation keys per language (nl/en/fr/pt) inside the existing `tarieven` object — additive, no removals:
- `poaTitle` — e.g. NL "Tarieven op aanvraag", EN "Pricing on application", FR "Tarifs sur demande", PT "Preços sob consulta"
- `poaBody` — short paragraph: sessions are personalised; contact for a quote
- `poaContactBtn` — "Contact" / "Contact" / "Contact" / "Contato"
- `poaWhatsappBtn` — "WhatsApp" (all langs)

Type definition in the `tarieven` interface gets the four optional keys (or required — both work since we add to all four locales).

### 5. `public/llms.txt`
Change the Pricing line from "Visit …/tarieven for current pricing." to "Pricing on application — contact studio for a personalised quote." Keep the URL reference removed or rephrased so AI crawlers don't promise prices.

### 6. SEO copy (`src/pages/Tarieven.tsx` `seoMeta`)
Update titles/descriptions to neutral "Pricing on application" wording so search snippets don't claim transparent prices that aren't shown. Old strings kept as comments above for easy revert.

## What stays untouched

- `pricingData` arrays in both Index.tsx and Tarieven.tsx
- `tr.tiers`, `tr.exclLabel`, `tr.pricingNote`, `tr.popular`, `tr.bookNow` translation keys
- Routing, navigation labels ("Tarieven"/"Pricing"/"Tarifs"/"Preços"), nav anchors
- Policies and Gift voucher sections on `/tarieven`
- All "Bekijk tarieven / View pricing" CTAs across the site — they still link to `/tarieven`, which now shows the POA card

## Reinstating later

One edit: set `SHOW_PRICING = true` in `src/config/features.ts`. Optionally revert the `seoMeta` and `llms.txt` strings (comments will mark the old values).

## Notes / risk

- Zero backend changes, zero routing changes — prerender stays stable.
- No translation key is removed, so the Admin CMS translation editor keeps working.
- Nav link "Tarieven" still leads to a useful page (POA + policies + gift voucher).