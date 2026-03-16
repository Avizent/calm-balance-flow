import type { Language } from "@/contexts/LanguageContext";

const TIMEZONE_LANGUAGE_MAP: Record<string, Language> = {
  // Dutch-speaking
  "Europe/Amsterdam": "nl",
  "Europe/Brussels": "nl",

  // French-speaking
  "Europe/Paris": "fr",
  "Europe/Luxembourg": "fr",
  "Africa/Kinshasa": "fr",
  "Africa/Dakar": "fr",

  // Portuguese-speaking (Brazil)
  "America/Sao_Paulo": "pt",
  "America/Fortaleza": "pt",
  "America/Recife": "pt",
  "America/Bahia": "pt",
  "America/Belem": "pt",
  "America/Manaus": "pt",
  "America/Cuiaba": "pt",
  "America/Porto_Velho": "pt",
  "America/Campo_Grande": "pt",
  "America/Rio_Branco": "pt",
  "America/Maceio": "pt",
  "America/Araguaina": "pt",
  "America/Noronha": "pt",
  // Portugal
  "Europe/Lisbon": "pt",
  "Atlantic/Madeira": "pt",
  "Atlantic/Azores": "pt",
};

export function getLanguageFromTimezone(supportedLanguages: Language[]): Language | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const lang = TIMEZONE_LANGUAGE_MAP[tz];
    if (lang && supportedLanguages.includes(lang)) return lang;
  } catch {}
  return null;
}
