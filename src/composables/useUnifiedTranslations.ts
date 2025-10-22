/**
 * Unified Translation Composable
 * Combines the existing i18n system with the centralized menu translations
 */

import { ref, computed, onMounted } from 'vue'
import { useI18n } from './useI18n'
import { getTranslation, getLanguageTranslations, availableLanguages, type SupportedLanguage } from '@/locales/menuTranslations'

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

  // Get all available menu translation keys
  const menuKeys = computed(() => {
    const currentTranslations = menuTranslations.value
    return Object.keys(currentTranslations) as Array<keyof typeof currentTranslations>
  })

  // Check if a key exists in menu translations
  const hasMenuTranslation = (key: string) => {
    return menuKeys.value.includes(key as any)
  }

  // Universal translation function that tries menu translations first, then i18n
  const tUniversal = (key: string) => {
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
    tUniversal,          // Universal translation (menu first, then i18n)
    
    // Language management
    setLocale,
    changeLanguage,
    loadSavedLanguage,
    
    // Menu translation utilities
    menuTranslations,
    menuKeys,
    hasMenuTranslation,
    getMenuTranslation,
  }
}

// Export types for convenience
export type { SupportedLanguage } from '@/locales/menuTranslations'
export type { LocaleCode } from './useI18n'
