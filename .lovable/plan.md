

## Plan: Add Sections 5–8 to Medical Professionals Page

### Overview
Add four new sections below the existing conditions grid in `src/pages/MedicalProfessionals.tsx`: Referral Process (numbered steps), Pull Quote (dark teal band), Contact Form (two-column with conditional success messages), and Footer Note.

### Changes

**File: `src/pages/MedicalProfessionals.tsx`** — Major update

**New imports needed:** `useState` from React, `Phone, Mail, MapPin, MessageCircle, Send` from lucide-react, `ConsentCheckbox` component.

**Section 5 — Referral Process** (white bg, `bg-card`)
- Small-caps label "SIMPLE TO REFER", serif headline, intro text
- Three numbered steps using the same visual pattern as the Equipment grid on the Classes page: numbered circle (`w-8 h-8 rounded-full bg-sage-light`) + bold heading + body paragraph
- Vertical stack layout, max-w-3xl centered

**Section 6 — Pull Quote** (dark teal `bg-foreground`)
- Large italic serif quote centered, pale text (`text-primary-foreground/90`)
- Attribution below in smaller letter-spaced text

**Section 7 — Contact Form** (cream bg, `bg-muted`)
- Move `id="medical-contact"` to this section
- Small-caps label + headline + intro text centered above
- Two-column grid (`lg:grid-cols-2`) mirroring Contact.tsx layout:
  - **Left column**: Contact details (phone, WhatsApp, email, studio address) using same icon+label pattern as Contact page
  - **Right column**: Form with 6 fields:
    - Name (text, required)
    - Role (select dropdown, required) — 5 options
    - Practice/clinic name (text, optional)
    - Email (email, required)
    - Phone (tel, optional)
    - Message (textarea, required)
    - ConsentCheckbox component
    - Submit button (terracotta, full width)
- **Form submission**: Uses `mailto:` to `info@spessirits.com` (matching existing pattern), includes all fields in email body
- **Conditional success toast/message**: After submit, show inline success message based on selected role:
  - Medical professionals → "Thank you. Our professional information pack is on its way..."
  - Patient/client → "Thank you for getting in touch. Cintia will be in contact..."
- State: `useState` for form fields, errors, consent, and `submitted` + `submittedRole`

**Section 8 — Footer Note** (white bg, `bg-card`)
- Small centered text with discretion notice and Cintia's credentials
- Same muted text styling as pricing asterisk notes

### Regarding "Remove Lovable badge"
This is controlled in Lovable project settings, not in code. I'll note this to the user but cannot action it from code.

### Files Changed

| File | Action |
|------|--------|
| `src/pages/MedicalProfessionals.tsx` | **Edit** — add sections 5–8, new state/form logic |

