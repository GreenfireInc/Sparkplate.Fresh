import { contextBridge, ipcRenderer } from 'electron'

// Expose APIs to renderer process through contextBridge
// Each API is isolated and follows the principle of least privilege

// Authenticator API for OTP functionality
contextBridge.exposeInMainWorld('authenticator', {
  check: (token, secret) => ipcRenderer.invoke('otpCheck', { token, secret }),
  generateSecret: () => ipcRenderer.invoke('otpGenerateSecret'),
  keyuri: (email, service, secret) =>
    ipcRenderer.invoke('otpKeyURI', { email, service, secret })
})

// Axios API for making HTTP requests securely through the main process
contextBridge.exposeInMainWorld('axios', {
  get: (url, options) => ipcRenderer.invoke('axiosGet', url, options),
  post: (url, data, options) =>
    ipcRenderer.invoke('axiosPost', url, data, options)
})

// IPC Renderer API for communication with main process
contextBridge.exposeInMainWorld('ipcRenderer', {
  invoke: (channel, data) => ipcRenderer.invoke(channel, data),
  send: (channel, data) => ipcRenderer.send(channel, data),
  once: (channel, func) => {
    ipcRenderer.once(channel, (_, ...args) => func(args))
  },
  on: (channel, func) => {
    ipcRenderer.on(channel, (_, ...args) => func(...args))
  }
})

// App API for Electron app functionality
contextBridge.exposeInMainWorld('app', {
  electronVersion: process.versions.electron,
  getFunctional: () => ipcRenderer.invoke('appGetFunctional'),
  getGPUInfo: () => ipcRenderer.invoke('appGetGPUInfo'),
  getPath: (type) => ipcRenderer.invoke('appGetPath', type),
  getPreloadData: () => ipcRenderer.invoke('preloadAppData'),
  getReleaseInfo: () => ipcRenderer.invoke('appGetReleaseInfo'),
  nodeVersion: process.version,
  openExternal: (url) => ipcRenderer.send('appOpenExternal', url),
  platform: process.platform
})

// Dialog API for native dialogs
contextBridge.exposeInMainWorld('dialog', {
  showMessageBox: (options) =>
    ipcRenderer.invoke('dialogShowMessageBox', options),
  showOpenDialog: (options) =>
    ipcRenderer.invoke('dialogShowOpenDialog', options),
  showErrorBox: (title, message) =>
    ipcRenderer.send('dialogShowErrorBox', { title, message }),
  showSaveDialog: (options) =>
    ipcRenderer.invoke('dialogShowSaveDialog', options)
})

// Filesystem API for secure file operations
contextBridge.exposeInMainWorld('fs', {
  readFile: async (path, callback) => {
    const { err, data } = await ipcRenderer.invoke('fsReadFile', path)
    callback(err, data)
  },
  readFileSync: async (path, encoding) =>
    await ipcRenderer.invoke('fsReadFileSync', path, encoding),
  write: async (fd, buffer, callback) => {
    try {
      const data = await ipcRenderer.invoke('fsWrite', fd, buffer)
      callback(null, data)
    } catch (err) {
      callback(err)
    }
  },
  writeFile: async (file, data, options, callback) => {
    // Handle optional options parameter
    if (!callback) {
      callback = options
      options = null
    }
    const err = await ipcRenderer.invoke('fsWriteFile', file, data, options)
    callback(err)
  },
  writeFileSync: (file, data, options) =>
    ipcRenderer.invoke('fsWriteFileSync', file, data, options),
  createWriteStream: (path) => ipcRenderer.invoke('fsCreateWriteStream', path),
  checkFileExists: async (path) =>
    await ipcRenderer.invoke('fsCheckFileExists', path)
})

// BrowserWindow API for PDF creation
contextBridge.exposeInMainWorld('browserWindow', {
  createWindowForPDF: async (html, fileName, options, callback) => {
    try {
      const result = await ipcRenderer.invoke(
        'createWindowForPDF',
        html,
        fileName,
        options
      )
      if (callback) callback(null, result)
    } catch (err) {
      callback(err)
    }
  }
})

// Notification API
contextBridge.exposeInMainWorld('notification', {
  newNotification: (options) => ipcRenderer.send('createNotification', options)
})

// Archiver API for file compression
contextBridge.exposeInMainWorld('archiver', {
  create: (format, options) =>
    ipcRenderer.invoke('createArchive', format, options)
})

// Geoip API for IP geolocation
contextBridge.exposeInMainWorld('geoip', {
  lookup: (ip) => ipcRenderer.invoke('geoipLookup', ip)
})

// Cryptos API for cryptocurrency operations
contextBridge.exposeInMainWorld('cryptos', {
  generateMnemonic: (phrase) => ipcRenderer.invoke('generateMnemonic', phrase),
  generateWallet: ({ seed, coinTicker, network, derivationIndex }) =>
    ipcRenderer.invoke('cryptosGenerateWallet', {
      seed,
      coinTicker,
      network,
      derivationIndex
    }),
  generateBasicWallet: async ({ coinTicker, network }) => {
    const wallet = await ipcRenderer.invoke('cryptosGenerateBasicWallet', {
      coinTicker,
      network
    })
    return { balance: 0, ...wallet }
  },
  importWallet: async ({ coinTicker, wif, privateKey, network }) => {
    const wallet = await ipcRenderer.invoke('cryptosImportWallet', {
      coinTicker,
      wif,
      privateKey,
      network
    })
    return { balance: 0, ...wallet }
  },
  getBalance: ({ wallet, network }) =>
    ipcRenderer.invoke('cryptosGetBalance', { wallet, network }),
  getBalances: ({ addresses, crypto, network }) =>
    ipcRenderer.invoke('cryptosGetBalances', {
      addresses,
      crypto,
      network
    }),
  sendToAddress: ({ wallet, toAddress, amount, gasPrice, fee, network }) =>
    ipcRenderer.invoke('cryptosSendToAddress', {
      wallet,
      toAddress,
      amount,
      gasPrice,
      fee,
      network
    })
})

// Minizip API for encrypted zip files
contextBridge.exposeInMainWorld('minizip', {
  create: (contents, password) =>
    ipcRenderer.invoke('minizipCreate', contents, password)
})
