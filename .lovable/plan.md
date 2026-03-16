

## Plan: Direct Language Selection on Click

Currently the language toggle cycles through languages sequentially on click. Change it so each language label (`NL`, `EN`, `FR`, `PT`) is individually clickable and directly sets that language.

### Changes

**File: `src/components/Navigation.tsx`**

1. **Desktop language toggle** (~lines 186-200): Replace the single `<button onClick={cycle}>` wrapping all languages with individual `<button>` or `<span onClick={() => setLang(l)}>` for each language code. Keep the visual styling (slash separators, active/inactive states).

2. **Mobile language toggle** (~lines 261-275): Same change — make each language code directly clickable instead of cycling.

No other files need changes.

