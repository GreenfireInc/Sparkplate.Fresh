/**
 * Electron Menu Integration Utility
 * Shows how to integrate translations into the existing appMenu.js
 */

import { app, Menu } from 'electron'
import { getTranslation, type SupportedLanguage } from './menuTranslations'

const isMac = process.platform === 'darwin'
const isDevelopment = import.meta.env.DEV

/**
 * Create localized menu template
 * @param language - The language code for translations
 * @param browserWindow - The browser window instance
 * @returns Menu template with translations
 */
export function createLocalizedMenuTemplate(language: SupportedLanguage = 'en', browserWindow: any) {
  const t = (key: string) => getTranslation(key as any, language)
  
  return [
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'quit', label: t('quit') }
      ]
    }] : []),
    {
      label: t('file'),
      submenu: [
        isMac ? { role: 'close', label: t('close') } : { role: 'quit', label: t('quit') }
      ]
    },
    {
      label: t('edit'),
      submenu: [
        { role: 'undo', label: t('undo') },
        { role: 'redo', label: t('redo') },
        { type: 'separator' },
        { role: 'cut', label: t('cut') },
        { role: 'copy', label: t('copy') },
        { role: 'paste', label: t('paste') },
        { role: 'delete', label: t('delete') },
        { type: 'separator' },
        { role: 'selectAll', label: t('selectAll') }
      ]
    },
    {
      label: t('view'),
      submenu: [
        ...(isDevelopment
          ? [
            { role: 'toggleDevTools', label: t('toggleDevTools') },
            { role: 'forceReload', label: t('forceReload') },
            { type: 'separator' }
          ] : []
        ),
        { role: 'resetZoom', label: t('resetZoom') },
        { role: 'zoomIn', label: t('zoomIn') },
        { role: 'zoomOut', label: t('zoomOut') },
        { type: 'separator' },
        { role: 'togglefullscreen', label: t('toggleFullscreen') }
      ]
    },
    {
      label: t('window'),
      submenu: [
        { role: 'minimize', label: t('minimize') },
        { role: 'zoom', label: t('zoom') },
        ...(isMac ? [
          { type: 'separator' },
          { role: 'front', label: t('front') },
          { type: 'separator' },
          { role: 'window', label: t('window') }
        ] : [])
      ]
    },
    {
      label: t('help'),
      submenu: [
        {
          label: t('keyboardShortcuts'),
          click: () => {
            browserWindow?.webContents.send('keyboard-shortcuts-modal-open')
          }
        },
        {
          label: t('about'),
          click: () => {
            browserWindow?.webContents.send('about-modal-open')
          }
        }
        // Uncomment when restore backup is implemented
        // {
        //   label: t('restoreBackup'),
        //   click: () => {
        //     browserWindow?.webContents.send('init-restore-backup')
        //   }
        // }
      ]
    }
  ]
}

/**
 * Set application menu with translations
 * @param browserWindow - The browser window instance
 * @param language - The language code for translations
 */
export function setLocalizedAppMenu(browserWindow: any, language: SupportedLanguage = 'en') {
  const template = createLocalizedMenuTemplate(language, browserWindow)
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

/**
 * Update menu language dynamically
 * @param browserWindow - The browser window instance
 * @param language - The new language code
 */
export function updateMenuLanguage(browserWindow: any, language: SupportedLanguage) {
  setLocalizedAppMenu(browserWindow, language)
}

// Example usage in your main process:
/*
import { setLocalizedAppMenu, updateMenuLanguage } from './menuTranslations'

// In your createWindow function:
export async function createWindow() {
  win = new BrowserWindow({
    // ... your window options
  })
  
  // Set initial menu with English translations
  setLocalizedAppMenu(win, 'en')
  
  // ... rest of your window setup
}

// To change language dynamically (e.g., from renderer process):
ipcMain.handle('change-language', (event, language) => {
  updateMenuLanguage(win, language)
})
*/
