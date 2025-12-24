import en from './en.json';
import es from './es.json';
import fr from './fr.json';
import de from './de.json';
import pt from './pt.json';

export type LocaleCode = 'en' | 'es' | 'fr' | 'de' | 'pt';

export type Translations = typeof en;

export const translations: Record<LocaleCode, Translations> = {
  en,
  es,
  fr,
  de,
  pt,
};

export const getTranslation = (locale: LocaleCode, key: keyof Translations): string => {
  return translations[locale]?.[key] || translations.en[key] || key;
};

export const getTranslations = (locale: LocaleCode): Translations => {
  return translations[locale] || translations.en;
};

// Export default translation keys for reference
export { en as defaultTranslations };
