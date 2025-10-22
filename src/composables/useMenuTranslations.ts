/**
 * Vue Composable for Menu Translations
 * Provides reactive translations for Vue components
 */

import { ref, computed, type Ref } from 'vue'
import { getTranslation, getLanguageTranslations, availableLanguages, type SupportedLanguage, type MenuTranslations } from './menuTranslations'

// Global language state
const currentLanguage = ref<SupportedLanguage>('en')

/**
 * Composable for menu translations
 * @param language - Optional language override
 * @returns Translation utilities
 */
export function useMenuTranslations(language?: Ref<SupportedLanguage>) {
  const lang = language || currentLanguage
  
  // Get all translations for current language
  const translations = computed(() => getLanguageTranslations(lang.value))
  
  // Translation function
  const t = (key: keyof MenuTranslations) => getTranslation(key, lang.value)
  
  // Change language
  const setLanguage = (newLanguage: SupportedLanguage) => {
    currentLanguage.value = newLanguage
  }
  
  // Get available languages
  const languages = computed(() => availableLanguages)
  
  return {
    // Current language
    language: lang,
    
    // All translations for current language
    translations,
    
    // Translation function
    t,
    
    // Language utilities
    setLanguage,
    languages,
    
    // Individual translations (for template use)
    file: computed(() => t('file')),
    edit: computed(() => t('edit')),
    view: computed(() => t('view')),
    window: computed(() => t('window')),
    help: computed(() => t('help')),
    
    // File menu
    close: computed(() => t('close')),
    quit: computed(() => t('quit')),
    
    // Edit menu
    undo: computed(() => t('undo')),
    redo: computed(() => t('redo')),
    cut: computed(() => t('cut')),
    copy: computed(() => t('copy')),
    paste: computed(() => t('paste')),
    delete: computed(() => t('delete')),
    selectAll: computed(() => t('selectAll')),
    
    // View menu
    toggleDevTools: computed(() => t('toggleDevTools')),
    forceReload: computed(() => t('forceReload')),
    resetZoom: computed(() => t('resetZoom')),
    zoomIn: computed(() => t('zoomIn')),
    zoomOut: computed(() => t('zoomOut')),
    toggleFullscreen: computed(() => t('toggleFullscreen')),
    
    // Window menu
    minimize: computed(() => t('minimize')),
    zoom: computed(() => t('zoom')),
    front: computed(() => t('front')),
    window: computed(() => t('window')),
    
    // Help menu
    keyboardShortcuts: computed(() => t('keyboardShortcuts')),
    about: computed(() => t('about')),
    restoreBackup: computed(() => t('restoreBackup')),
    
    // Navigation items
    home: computed(() => t('home')),
    keyFiles: computed(() => t('keyFiles')),
    cryptocurrency: computed(() => t('cryptocurrency')),
    cryptography: computed(() => t('cryptography')),
    networking: computed(() => t('networking')),
    techStack: computed(() => t('techStack')),
    repurposing: computed(() => t('repurposing')),
    build: computed(() => t('build')),
    package: computed(() => t('package')),
    publish: computed(() => t('publish')),
    games: computed(() => t('games')),
    sandbox: computed(() => t('sandbox')),
    settings: computed(() => t('settings'))
  }
}

/**
 * Language selector composable
 * @returns Language selection utilities
 */
export function useLanguageSelector() {
  const { language, setLanguage, languages } = useMenuTranslations()
  
  const changeLanguage = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage)
    
    // Emit event to main process to update Electron menu
    if (window.ipcRenderer) {
      window.ipcRenderer.send('change-language', newLanguage)
    }
    
    // Save language preference
    localStorage.setItem('sparkplate-language', newLanguage)
  }
  
  // Load saved language preference
  const loadSavedLanguage = () => {
    const saved = localStorage.getItem('sparkplate-language') as SupportedLanguage
    if (saved && availableLanguages.some(lang => lang.code === saved)) {
      setLanguage(saved)
    }
  }
  
  return {
    currentLanguage: language,
    availableLanguages: languages,
    changeLanguage,
    loadSavedLanguage
  }
}

// Example usage in Vue components:
/*
<script setup lang="ts">
import { useMenuTranslations, useLanguageSelector } from '@/locales/menuTranslations'

// Use translations
const { t, file, edit, about } = useMenuTranslations()

// Use language selector
const { currentLanguage, availableLanguages, changeLanguage, loadSavedLanguage } = useLanguageSelector()

// Load saved language on component mount
onMounted(() => {
  loadSavedLanguage()
})
</script>

<template>
  <div>
    <!-- Use individual translations -->
    <h1>{{ file }}</h1>
    <button>{{ edit }}</button>
    
    <!-- Use translation function -->
    <p>{{ t('about') }}</p>
    
    <!-- Language selector -->
    <select v-model="currentLanguage" @change="changeLanguage(currentLanguage)">
      <option 
        v-for="lang in availableLanguages" 
        :key="lang.code" 
        :value="lang.code"
      >
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>
*/
