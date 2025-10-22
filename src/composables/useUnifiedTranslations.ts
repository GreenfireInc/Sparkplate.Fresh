/**
 * Unified Translation Composable
 * Combines the existing i18n system with menu and About modal translations
 */

import { ref, computed, onMounted } from 'vue'
import { useI18n } from './useI18n'
import { getTranslation, getLanguageTranslations, availableLanguages, type SupportedLanguage } from '@/locales/menuTranslations'
import { getAboutTranslation, getAboutLanguageTranslations, aboutAvailableLanguages, type AboutSupportedLanguage, type AboutTranslations } from '@/locales/aboutTranslations'

export function useUnifiedTranslations() {
  const { 
    locale, 
    setLocale, 
    t, 
    languages, 
    getMenuTranslation, 
    menuTranslations, 
    loadSavedLanguage 
  } = useI18n()

  // Menu translation function with type safety
  const tMenu = (key: string) => getMenuTranslation(key)

  // About modal translation function with type safety
  const tAbout = (key: keyof AboutTranslations) => getAboutTranslation(key, locale.value as AboutSupportedLanguage)

  // Get all available menu translation keys
  const menuKeys = computed(() => {
    const currentTranslations = menuTranslations.value
    return Object.keys(currentTranslations) as Array<keyof typeof currentTranslations>
  })

  // Get all available About modal translation keys
  const aboutKeys = computed(() => {
    const currentAboutTranslations = getAboutLanguageTranslations(locale.value as AboutSupportedLanguage)
    return Object.keys(currentAboutTranslations) as Array<keyof AboutTranslations>
  })

  // Check if a key exists in menu translations
  const hasMenuTranslation = (key: string) => {
    return menuKeys.value.includes(key as any)
  }

  // Check if a key exists in About modal translations
  const hasAboutTranslation = (key: string) => {
    return aboutKeys.value.includes(key as keyof AboutTranslations)
  }

  // Universal translation function that tries About, then menu, then i18n
  const tUniversal = (key: string) => {
    if (hasAboutTranslation(key)) {
      return tAbout(key as keyof AboutTranslations)
    }
    if (hasMenuTranslation(key)) {
      return tMenu(key)
    }
    return t(key)
  }

  // Language change handler that updates both systems
  const changeLanguage = (newLocale: typeof locale.value) => {
    setLocale(newLocale)
  }

  // Get current language info
  const currentLanguageInfo = computed(() => {
    return languages.find(lang => lang.code === locale.value)
  })

  // Load saved language on mount
  onMounted(() => {
    loadSavedLanguage()
  })

  return {
    // Language state
    locale,
    currentLanguageInfo,
    languages,
    
    // Translation functions
    t,                    // Original i18n translations
    tMenu,               // Menu translations only
    tAbout,              // About modal translations only
    tUniversal,          // Universal translation (About, then menu, then i18n)
    
    // Language management
    setLocale,
    changeLanguage,
    loadSavedLanguage,
    
    // Menu translation utilities
    menuTranslations,
    menuKeys,
    hasMenuTranslation,
    getMenuTranslation,
    
    // About modal translation utilities
    aboutKeys,
    hasAboutTranslation,
  }
}

// Export types for convenience
export type { SupportedLanguage } from '@/locales/menuTranslations'
export type { AboutSupportedLanguage, AboutTranslations } from '@/locales/aboutTranslations'
export type { LocaleCode } from './useI18n'
