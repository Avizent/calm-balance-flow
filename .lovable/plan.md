
## Adding French (FR) as a Toggleable Language

### What the user wants
French added as a third language, but structured so it can be easily switched off or removed later — without breaking anything.

### Architecture: How to make it "removable"

The key to making French removable is to isolate it in a single constant. The approach:

- Add a single `ENABLE_FRENCH` boolean flag at the top of `LanguageContext.tsx`
- When `false`, French is completely excluded — the type stays `"nl" | "en"`, the toggle only shows NL/EN, and no French strings are loaded
- When `true`, French is fully active — types expand, toggle cycles NL → EN → FR, all strings are served

This means removing French in the future = changing one line: `const ENABLE_FRENCH = false`.

---

### Files to change

**1. `src/contexts/LanguageContext.tsx`**

- Add `const ENABLE_FRENCH = true` at the top (single point of control)
- Add the full `fr: Translations` object with all strings (all sections: nav, footer, home, over, lessen, prive, tarieven, contact)
- Change `Language` type conditionally — in practice this means expanding it to `"nl" | "en" | "fr"` when enabled
- Add `fr` to the `translations` record only when flag is true
- Export a `SUPPORTED_LANGUAGES` constant derived from the flag, used by the toggle

**2. `src/components/Navigation.tsx`**

The language toggle button currently does: `lang === "nl" ? "en" : "nl"` (binary flip).

Change it to cycle through `SUPPORTED_LANGUAGES`:
```
nl → en → fr → nl  (when French enabled)
nl → en → nl       (when French disabled)
```

The toggle display will also expand to show `NL / EN / FR` (three labels) or stay as `NL / EN` (two labels) based on the flag.

The same change applies to the mobile drawer language toggle.

**3. `src/pages/Boeken.tsx`**

This page uses its own `isNl = lang === "nl"` pattern. Extend it with a third branch:
```typescript
const isNl = lang === "nl";
const isFr = lang === "fr";
```
All `copy` strings get a three-way: `isFr ? "..." : isNl ? "..." : "..."`.

---

### Full French translations (professionally adapted, `vous` form)

All translations follow the brief: professional but warm, culturally adapted for Belgian/Dutch professional and sports audience, `vous` consistently throughout.

Key requested UI strings:
- `'Neem contact met ons op'` → `'Contactez-nous'`
- `'Vul het onderstaande formulier in'` → `'Veuillez remplir le formulaire ci-dessous'`
- `'Verstuur bericht'` → `'Envoyer le message'`

---

### How to remove French later

One line change in `LanguageContext.tsx`:
```typescript
const ENABLE_FRENCH = false;  // ← change true to false
```

That's it. The navigation toggle collapses back to NL/EN, the type system excludes `"fr"`, and no French strings are ever accessed.

---

### No database changes required.
