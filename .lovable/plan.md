

## Plan: Update Home Hero Text (All Languages)

Replace the home hero title and subtitle across all 4 languages in `src/contexts/LanguageContext.tsx`.

### Changes

**File: `src/contexts/LanguageContext.tsx`** — 4 edits (one per language)

The hero renders as: `{heroTitle}<br/><em>{heroTitleEm}</em>` + `{heroSub}` below.

| Language | heroTitle | heroTitleEm | heroSub |
|----------|-----------|-------------|---------|
| **NL** (line 181-184) | `"Pilates begeleid door een"` | `"kinesitherapeute."` | `"Preventief, persoonlijk en gefundeerd in klinische expertise."` |
| **EN** (line 431-434) | `"Pilates guided by a"` | `"physiotherapist."` | `"Preventive, personal, and grounded in clinical expertise."` |
| **FR** (line 683-686) | `"Pilates guidé par une"` | `"kinésithérapeute."` | `"Préventif, personnel et ancré dans l'expertise clinique."` |
| **PT** (line 938-941) | `"Pilates orientado por uma"` | `"fisioterapeuta."` | `"Preventivo, pessoal e baseado em expertise clínica."` |

