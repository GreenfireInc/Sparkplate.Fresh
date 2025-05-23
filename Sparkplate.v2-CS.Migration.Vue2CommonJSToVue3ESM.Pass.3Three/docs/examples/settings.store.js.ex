import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import SecureLS from 'secure-ls'

const ls = new SecureLS({ isCompression: false })

/**
 * This is a Pinia store that replaces the Vuex settingsModule.js
 * It demonstrates the migration from Vuex to Pinia
 */
export const useSettingsStore = defineStore('settings', () => {
  // State (replaces Vuex state)
  const visibilityToggles = ref({})
  const theme = ref('light')
  const menuType = ref('micro')
  const userPreferences = ref({
    language: 'en',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    notifications: true
  })
  
  // Getters (replaces Vuex getters)
  const currentTheme = computed(() => theme.value)
  const currentMenuType = computed(() => menuType.value)
  const currentLanguage = computed(() => userPreferences.value.language)
  const currentCurrency = computed(() => userPreferences.value.currency)
  const currentDateFormat = computed(() => userPreferences.value.dateFormat)
  const notificationsEnabled = computed(() => userPreferences.value.notifications)
  
  // Actions (replaces Vuex mutations and actions)
  function toggleVisibility(coinTicker) {
    visibilityToggles.value = {
      ...visibilityToggles.value,
      [coinTicker]: !visibilityToggles.value[coinTicker]
    }
    // Persist to local storage
    saveToLocalStorage()
  }
  
  function setTheme(newTheme) {
    theme.value = newTheme
    saveToLocalStorage()
  }
  
  function setMenuType(newMenuType) {
    menuType.value = newMenuType
    saveToLocalStorage()
  }
  
  function updateUserPreferences(preferences) {
    userPreferences.value = {
      ...userPreferences.value,
      ...preferences
    }
    saveToLocalStorage()
  }
  
  function toggleNotifications() {
    userPreferences.value.notifications = !userPreferences.value.notifications
    saveToLocalStorage()
  }
  
  function saveToLocalStorage() {
    // Example of persisting state (replaces vuex-persistedstate)
    const stateToSave = {
      visibilityToggles: visibilityToggles.value,
      theme: theme.value,
      menuType: menuType.value,
      userPreferences: userPreferences.value
    }
    ls.set('settings', stateToSave)
  }
  
  function loadFromLocalStorage() {
    try {
      const savedState = ls.get('settings')
      if (savedState) {
        visibilityToggles.value = savedState.visibilityToggles || {}
        theme.value = savedState.theme || 'light'
        menuType.value = savedState.menuType || 'micro'
        userPreferences.value = savedState.userPreferences || {
          language: 'en',
          currency: 'USD',
          dateFormat: 'MM/DD/YYYY',
          notifications: true
        }
      }
    } catch (error) {
      console.error('Failed to load settings from localStorage:', error)
    }
  }
  
  // Initialize store
  loadFromLocalStorage()
  
  return {
    // State
    visibilityToggles,
    theme,
    menuType,
    userPreferences,
    
    // Getters
    currentTheme,
    currentMenuType,
    currentLanguage,
    currentCurrency,
    currentDateFormat,
    notificationsEnabled,
    
    // Actions
    toggleVisibility,
    setTheme,
    setMenuType,
    updateUserPreferences,
    toggleNotifications
  }
}) 