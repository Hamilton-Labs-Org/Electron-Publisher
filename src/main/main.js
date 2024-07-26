const { app, BrowserWindow, nativeImage, Tray, ipcMain, nativeTheme } = require('electron/main')
const path = require('node:path')

app.disableHardwareAcceleration()
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

const appIcon = nativeImage.createFromPath('./images/icon.png')

app.whenReady().then(() => {
    const trayIcon = nativeImage.createFromPath('./images/icon.png')
    ipcMain.handle('ping', () => 'pong')
    const tray = new Tray(trayIcon)
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
})


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: appIcon,
    images: true,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
    }
  })


  win.loadFile('index.html')
  win.setOverlayIcon(overlay, description)
}

console.log('Hello from Electron 👋🏾')