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

ipcMain.handle('getNetworkAdapters', async () => {
  try {
    const si = await import('systeminformation')
    const ifaces = await si.networkInterfaces()
    return ifaces
      .filter((iface) => !iface.internal)
      .map((iface) => {
        const ipAddresses: string[] = []
        if (iface.ip4) ipAddresses.push(iface.ip4)
        if (iface.ip6 && !iface.ip6.startsWith('fe80:')) ipAddresses.push(iface.ip6)
        const deviceName = iface.ifaceName || iface.iface
        const manufacturer = extractManufacturer(deviceName, iface.iface)
        return {
          device: iface.iface || deviceName,
          manufacturer: manufacturer || '—',
          mac: iface.mac || '—',
          ipAddresses,
        }
      })
  } catch (err) {
    console.error('getNetworkAdapters error:', err)
    return []
  }
})

function extractManufacturer(ifaceName: string, iface: string): string {
  const knownVendors = [
    'Realtek', 'Intel', 'Broadcom', 'Qualcomm', 'Atheros', 'Marvell',
    'MediaTek', 'Ralink', 'TP-Link', 'ASUS', 'Netgear', 'Cisco',
    'Dell', 'HP', 'Lenovo', 'Microsoft', 'VMware', 'VirtualBox',
  ]
  const search = (ifaceName || iface || '').toLowerCase()
  for (const vendor of knownVendors) {
    if (search.includes(vendor.toLowerCase())) return vendor
  }
  return ''
}

ipcMain.handle('getUsbDrives', async () => {
  try {
    const drivelist = await import('drivelist')
    const si = await import('systeminformation')
    const drives = await drivelist.list()
    const usbDrives = drives.filter(
      (d) => (d.isUSB === true || d.isRemovable === true) && !d.isSystem
    )
    let fsData: Array<{ mount: string; type: string; size: number; used: number; available: number }> = []
    try {
      const fsSizes = await si.fsSize()
      fsData = fsSizes.map((f) => ({
        mount: f.mount,
        type: f.type || 'unknown',
        size: f.size,
        used: f.used,
        available: f.available,
      }))
    } catch {
      // fsSize failed, continue without it
    }
    return usbDrives.map((d) => {
      const mountpaths = (d.mountpoints ?? []).map((m) => (typeof m === 'string' ? m : m.path))
      const mountDetails = mountpaths.map((mp) => {
        const fs = fsData.find((f) => f.mount === mp)
        return {
          path: mp,
          filesystem: fs?.type ?? '—',
          size: fs?.size ?? d.size,
          used: fs?.used ?? null,
          freespace: fs?.available ?? null,
        }
      })
      return {
        description: d.description || d.device || 'Unknown',
        size: d.size,
        mountpoints: mountpaths,
        mountDetails,
        isRemovable: d.isRemovable,
      }
    })
  } catch (err) {
    console.error('getUsbDrives error:', err)
    return []
  }
})

// Handle language changes from renderer process
ipcMain.handle('change-language', (event, language) => {
  if (win) {
    updateLanguage(language, win)
    return { success: true, language }
  }
  return { success: false, error: 'No window available' }
})
