import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import os from 'node:os'
import setAppMenu, { updateLanguage } from '../functions/utils/electron/appMenu.js'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬ dist
// │ ├─┬ background
// │ │ └── index.js    > Electron-Main
// │ ├─┬ preload
// │ │ └── index.mjs   > Preload-Scripts
// │ └── index.html    > Electron-Renderer (and other renderer assets)
//
process.env.APP_ROOT = path.join(__dirname, '../..')

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

// Add GPU troubleshooting flags for rendering issues
app.commandLine.appendSwitch('--disable-gpu-sandbox')
app.commandLine.appendSwitch('--disable-software-rasterizer')
app.commandLine.appendSwitch('--disable-gpu-compositing')

// Force dark theme for consistent titlebar appearance
nativeTheme.themeSource = 'dark'

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null
const preload = path.join(process.env.APP_ROOT, 'dist/preload/index.mjs')
const indexHtml = path.join(RENDERER_DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Sparkplate',
    autoHideMenuBar: true,
    width: 1024,
    height: 768,
    useContentSize: true,
    minWidth: 1024,
    minHeight: 768,
    frame: true,
    icon: path.join(process.env.VITE_PUBLIC, '/assets/icons/greenfire/sparkplate.png'),
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // nodeIntegration: true,

      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false,
      
      // Additional flags to help with rendering issues
      offscreen: false,
      backgroundThrottling: false,
    },
  })

  // Create the application menu
  setAppMenu(win)

  if (VITE_DEV_SERVER_URL) { // #298
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(indexHtml)
  }

  // Always open dev tools when window is ready
  win.webContents.openDevTools()

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
  // win.webContents.on('will-navigate', (event, url) => { }) #344
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})

ipcMain.handle('preloadAppData', () => {
  return {
    hostname: os.hostname(),
    osVersion: os.release(),
    systemMemory: os.totalmem(),
    processor: os.cpus()[0].model,
    electronVersion: process.versions.electron,
    nodeVersion: process.versions.node,
  }
})

ipcMain.handle('appGetGPUInfo', () => {
  return app.getGPUInfo('complete')
})

// Handle language changes from renderer process
ipcMain.handle('change-language', (event, language) => {
  if (win) {
    updateLanguage(language, win)
    return { success: true, language }
  }
  return { success: false, error: 'No window available' }
})
