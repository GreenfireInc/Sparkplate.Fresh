import { app, Tray, Menu } from 'electron'
import path from 'node:path'

class AppTray {
  constructor() {
    this.closeToTrayEnabled = false
  }

  create({ tray, createWindow, win }) {
    const icon = getAppTrayIcon()
    // System tray icon not working on snap when using electron-builder > v22.13.1
    tray = new Tray(icon)
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Show App',
        click: function () {
          if (win === null) {
            createWindow()
          } else if (win.isVisible()) {
            win.focus()
          } else {
            win.show()
          }
        }
      },
      {
        label: 'Quit',
        click: function () {
          win.destroy()
          app.quit()
          process.exit(0)
        }
      }
    ])
    tray.setToolTip('Greenery')
    tray.setContextMenu(contextMenu)

    return tray
  }

  setCloseToTrayStatus(status) {
    this.closeToTrayEnabled = status
  }

  handleCloseEvent(win, event) {
    if (this.closeToTrayEnabled) {
      event.preventDefault()
      win.hide()
      // this sends a text message to App.vue so the user can be logged out securely
      win.webContents.send('close-to-app-tray-secure', 'logout-user')
    }
  }
}

function getAppTrayIcon() {
  if (process.platform === 'win32') {
    // use ico if on windows
    return path.join(process.env.PUBLIC, 'assets', 'appbar', 'appbar.ico')
  } else {
    // use template image for mac/linux
    return path.join(
      process.env.PUBLIC,
      'assets',
      'appbar',
      'appbarTemplate.png'
    )
  }
}

export default new AppTray()
