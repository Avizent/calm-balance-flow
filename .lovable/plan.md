

## Fix: Language toggle pill rendering issue in Edge

### What's happening
In your Edge screenshot the language pill reads `Contact /AND /FR /PT`. Two things are going wrong at once:

1. **"NL" looks like "AND"** — At hero mode the inactive language buttons use `text-white/50` and the active one uses `text-white`. Against the light/blurred hero background in Edge, the bold "NL" with the adjacent `/` separator visually reads as "AND". This is a contrast + letter-spacing problem, made worse because Edge renders the `/` separators tighter than Chrome/Safari.
2. **"Contact" appears glued to the pill** — The desktop nav uses `gap-4` (16px) between items, and the language pill sits in a sibling flex container with only `gap-2`. At ~750–900px viewports the last nav link ("Contact") ends up directly touching the pill's left border, so it looks like it's *inside* the pill.

### Changes

**`src/components/Navigation.tsx`**

1. **Increase separation between nav and the right-side cluster.** Add left margin / larger gap so "Contact" can never visually merge into the language pill at any viewport between `md` and `lg`.

2. **Rebuild the language pill markup for cleaner rendering:**
   - Replace the `<span>{i > 0 && '/'}<button>NL</button></span>` pattern with a flat list using a real `<span aria-hidden>` divider that has explicit horizontal padding (`px-1.5`) so letters can't kiss the slash.
   - Bump the inactive-language contrast in hero mode from `text-white/50` to `text-white/70` so "NL" reads clearly as N-L, not as "AND".
   - Add `tracking-wide` to the language buttons to prevent the N+L glyph fusion that Edge's text rasterizer produces at small sizes.
   - Add `select-none` and `whitespace-nowrap` on the pill container so the row never wraps inside the rounded border.

3. **Add `aria-label` already present — keep it, plus add `lang={l}` attribute** on each button for correct screen-reader pronunciation.

4. **Mobile drawer language row** gets the same divider/padding cleanup for consistency.

### Why this fixes Edge specifically
Edge's Chromium build uses slightly different sub-pixel text rendering than Chrome on macOS. Tight letter pairs ("NL") plus a low-opacity `/` separator with no padding collapse into ligature-like glyphs. Explicit padding around the divider + higher contrast + `tracking-wide` removes the ambiguity in every browser.

### Files touched
- `src/components/Navigation.tsx` (only)

No backend, routing, or styling-token changes. No risk to prerender/hydration.

