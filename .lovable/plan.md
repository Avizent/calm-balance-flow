

## Plan: Translate Medical Professionals Page into NL, FR, PT

### Problem
The entire `/medical-professionals` page is currently hardcoded in English. All headings, body copy, form labels, placeholders, error messages, dropdown options, success messages, SEO metadata, and footer note need translation into NL, FR, and PT.

### Approach

**1. Add `medicalProfessionals` to the Translations interface** (`src/contexts/LanguageContext.tsx`)

Add a new `medicalProfessionals` section to the `Translations` interface containing all translatable strings (~70 keys), organized by section:

- **SEO**: `seoTitle`, `seoDesc`, `seoBreadcrumb`
- **Section 1 (Hero)**: `heroTag`, `heroTitle`, `heroTitleEm`, `heroP1`, `heroP2`, `ctaInfo`, `ctaContact`
- **Section 2 (Who This Is For)**: `whoTag`, `whoTitle`, `whoTitleEm`, `whoP1`, `whoP2`
- **Section 3 (Clinical Difference)**: `clinicalTag`, `clinicalTitle`, `clinicalTitleEm`, `clinicalIntro`, `leftTitle`, `rightTitle`, `leftChecks[]`, `rightChecks[]`
- **Section 4 (Conditions)**: `conditionsTag`, `conditionsTitle`, `conditionsTitleEm`, `conditionsIntro`, `conditionsList[]`, `conditionsNote`
- **Section 5 (Referral)**: `referralTag`, `referralTitle`, `referralTitleEm`, `referralIntro`, `steps[]` (heading + body)
- **Section 6 (Quote)**: `quote`, `quoteAttribution`
- **Section 7 (Contact Form)**: `contactTag`, `contactTitle`, `contactTitleEm`, `contactIntro`, `contactDetailsTitle`, `contactLabels` (PHONE/WHATSAPP/EMAIL/STUDIO), form field labels, placeholders, error messages, dropdown options, submit button text, two success messages
- **Section 8 (Footer Note)**: `footerNote1`, `footerNote2`, `footerCredits`

**2. Add translations for all 4 languages** in `LanguageContext.tsx`

- **NL**: Dutch translations (using "kinesitherapeute" for physiotherapist per Belgian convention)
- **EN**: Current English content moved into the translations object
- **FR**: French translations (using "vous" form per project convention)
- **PT**: Brazilian Portuguese translations (using "você" register per project convention)

**3. Update `MedicalProfessionals.tsx`**

- Import `useLanguage` hook
- Replace all hardcoded English strings with `t.medicalProfessionals.xxx` references
- Move arrays (`conditions`, `leftChecks`, `rightChecks`, `steps`, `roleOptions`, `contactDetails`) to be derived from translations
- Keep `medicalRoles` logic working by checking against a role index rather than string matching (since role labels will vary by language)
- Update form validation error messages to use translated strings

### Files Changed

| File | Action |
|------|--------|
| `src/contexts/LanguageContext.tsx` | Add `medicalProfessionals` to interface + all 4 language objects |
| `src/pages/MedicalProfessionals.tsx` | Use `useLanguage()`, replace all hardcoded strings with `t.medicalProfessionals.*` |

### Key Details

- The **conditional form success logic** will use role index (0–3 = medical, 4 = patient) instead of string matching, since role labels will differ by language
- The **nav link** "Medical Professionals" in Footer.tsx already uses a hardcoded label — this will also be updated to use the translations
- SEO `lang` attribute will be dynamic based on selected language instead of hardcoded `"en"`

