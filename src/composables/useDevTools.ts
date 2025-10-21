import { ref, onMounted } from 'vue'

// Type definitions for the dev tools API
interface DevToolsAPI {
  toggle: () => Promise<{ opened: boolean }>
  open: () => Promise<{ opened: boolean }>
  close: () => Promise<{ opened: boolean }>
  isOpened: () => Promise<boolean>
}

declare global {
  interface Window {
    devTools: DevToolsAPI
  }
}

export function useDevTools() {
  const isDevToolsOpened = ref(false)

  // Check if dev tools are available
  const isAvailable = typeof window !== 'undefined' && window.devTools

  // Toggle dev tools
  const toggleDevTools = async () => {
    if (!isAvailable) return
    try {
      const result = await window.devTools.toggle()
      isDevToolsOpened.value = result.opened
      return result
    } catch (error) {
      console.error('Failed to toggle dev tools:', error)
    }
  }

  // Open dev tools
  const openDevTools = async () => {
    if (!isAvailable) return
    try {
      const result = await window.devTools.open()
      isDevToolsOpened.value = result.opened
      return result
    } catch (error) {
      console.error('Failed to open dev tools:', error)
    }
  }

  // Close dev tools
  const closeDevTools = async () => {
    if (!isAvailable) return
    try {
      const result = await window.devTools.close()
      isDevToolsOpened.value = result.opened
      return result
    } catch (error) {
      console.error('Failed to close dev tools:', error)
    }
  }

  // Check dev tools status
  const checkDevToolsStatus = async () => {
    if (!isAvailable) return
    try {
      isDevToolsOpened.value = await window.devTools.isOpened()
    } catch (error) {
      console.error('Failed to check dev tools status:', error)
    }
  }

  // Initialize dev tools status on mount
  onMounted(() => {
    checkDevToolsStatus()
  })

  return {
    isDevToolsOpened,
    isAvailable,
    toggleDevTools,
    openDevTools,
    closeDevTools,
    checkDevToolsStatus
  }
}
