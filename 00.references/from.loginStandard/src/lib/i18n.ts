import { translations, getTranslations, getTranslation, type LocaleCode } from "@/locales";

// Re-export for easy access throughout the app
export { getTranslations, getTranslation, translations, type LocaleCode };

export const languages = [
  { code: "en" as LocaleCode, name: "English", flag: "🇬🇧" },
  { code: "es" as LocaleCode, name: "Español", flag: "🇪🇸" },
  { code: "fr" as LocaleCode, name: "Français", flag: "🇫🇷" },
  { code: "de" as LocaleCode, name: "Deutsch", flag: "🇩🇪" },
  { code: "pt" as LocaleCode, name: "Português", flag: "🇵🇹" },
];
