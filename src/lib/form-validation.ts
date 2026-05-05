// Lightweight, dependency-free input bounds + trim validation used by all
// three mailto forms (Contact, Boeken, MedicalProfessionals). Sprint 1 will
// replace this with a zod-backed shared form hook.

export const FIELD_LIMITS = {
  name: 100,
  email: 255,
  phone: 30,
  practice: 150,
  role: 80,
  subject: 150,
  message: 2000,
  notes: 2000,
} as const;

export type Lang = "nl" | "en" | "fr" | "pt";

const TOO_LONG: Record<Lang, (field: string, max: number) => string> = {
  nl: (f, n) => `${f} mag maximaal ${n} tekens bevatten.`,
  en: (f, n) => `${f} must be at most ${n} characters.`,
  fr: (f, n) => `${f} ne peut pas dépasser ${n} caractères.`,
  pt: (f, n) => `${f} deve ter no máximo ${n} caracteres.`,
};

/**
 * Validate a string field. Returns an error message (in the active language)
 * or `undefined` when valid.
 *
 * - Trims whitespace before the empty check (whitespace-only ≠ valid).
 * - Enforces an upper-bound character count.
 *
 * Pass `required=false` for optional fields — those skip the empty check
 * but still enforce the length cap if a value is provided.
 */
export function validateField(opts: {
  value: string;
  max: number;
  lang: Lang;
  fieldLabel: string;
  required?: boolean;
  emptyError?: string;
}): string | undefined {
  const { value, max, lang, fieldLabel, required = true, emptyError } = opts;
  const trimmed = value.trim();
  if (!trimmed) {
    if (required) return emptyError ?? `${fieldLabel} required.`;
    return undefined;
  }
  if (trimmed.length > max) {
    return TOO_LONG[lang](fieldLabel, max);
  }
  return undefined;
}
