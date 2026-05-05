## Update: Re-label POA pricing copy to "Session Fees"

Replace the visible labels on the pricing/POA sections across the site with the exact terminology you provided. Since the site supports four languages and you supplied English strings, the new copy will be applied uniformly to all language blocks so the UI reads consistently regardless of the selected locale.

### Files to change

**1. `src/contexts/LanguageContext.tsx`**
Update the `tarieven` translation object for **all four languages** (nl, en, fr, pt):
- `tag` → `"SESSION FEES 2026"`
- `heroTitle` → `"Session Fees"`
- `poaTitle` → `"Fees available upon request"`

All other keys (`heroSub`, `poaBody`, `poaContactBtn`, `poaWhatsappBtn`, policies, tiers, etc.) remain untouched.

**2. `src/pages/Tarieven.tsx`**
Update the POA-mode `seoMeta` record (the `SHOW_PRICING === false` branch) so the page `<title>` and `description` reflect the new wording:
- Titles: e.g. `"Session Fees — Spessirits Pilates Schilde"` (per language)
- Descriptions: keep the existing POA explanation but aligned to the "Session Fees" framing.

The SHOW_PRICING === true branch (disabled) stays as-is so pricing can be reinstated cleanly.

### No other changes
- No routing, components, styling, or backend changes.
- The feature flag `SHOW_PRICING` stays `false`.
- Navigation labels ("Tarieven"/"Pricing"/"Tarifs"/"Preços") are intentionally kept as-is because they are nav/menu items, not page headings.
