import { app, Menu } from 'electron'
import { getTranslation } from '../../../../src/locales/menuTranslations'

const isMac = process.platform === 'darwin'
const isDevelopment = import.meta.env.DEV

// Get current language from user settings or default to English
// This should be loaded from user preferences in a real implementation
let currentLanguage = 'en'

// Function to get translation
const t = (key) => getTranslation(key, currentLanguage)

function setAppMenu(browserWindow) {
  const template = [
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

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

// Function to update language and refresh menu
function updateLanguage(language) {
  currentLanguage = language
  // Note: You'll need to call setAppMenu again after updating the language
  // This should be called from the main process when language changes
}

// Function to get current language
function getCurrentLanguage() {
  return currentLanguage
}

export default setAppMenu
export { updateLanguage, getCurrentLanguage }
