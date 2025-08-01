import { app, Tray, Menu, globalShortcut } from 'electron'
import path from 'node:path'

class AppTray {
  constructor() {
    this.appTrayEnabled = false
    this.tray = null
  }

  setAppTray({ status, createWindow, win }) {
    this.appTrayEnabled = status

    if (this.appTrayEnabled) {
      if (this.tray === null) {
        const icon = this.getAppTrayIcon()
        this.tray = new Tray(icon)
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
              if (win) {
                win.destroy()
              }
              app.quit()
            }
          }
        ])
        this.tray.setToolTip('Sparkplate.vue')
        this.tray.setContextMenu(contextMenu)
      }

      // Register global shortcut to prevent app from quitting
      globalShortcut.register('CommandOrControl+Q', () => {
        if (win) {
          win.hide()
        }
      })
    } else if (this.tray !== null) {
      // Destroy tray if it is set to reset process
      this.tray.destroy()
      this.tray = null
      
      // Unregister the global shortcut when tray is disabled
      globalShortcut.unregister('CommandOrControl+Q')
    }

    return this.tray
  }

  handleCloseEvent(win, event) {
    if (this.appTrayEnabled) {
      event.preventDefault()
      win.hide()
    }
  }

  getAppTrayIcon() {
    if (process.platform === 'win32') {
      // Use ico for Windows
      return path.join(process.env.PUBLIC, 'assets', 'appbar', 'appbar.ico')
    } else {
      // Use template image for macOS and Linux
      // Note: SVG not supported - must use PNG/ICO
      return path.join(
        process.env.PUBLIC,
        'assets',
        'appbar',
        'appbarTemplate.png'
      )
    }
  }

  isEnabled() {
    return this.appTrayEnabled
  }

  destroy() {
    if (this.tray) {
      this.tray.destroy()
      this.tray = null
    }
    globalShortcut.unregister('CommandOrControl+Q')
    this.appTrayEnabled = false
  }
}

export default new AppTray()