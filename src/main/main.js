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
    icon: appIcon,
    images: true,
    overlay: appIcon,
    webPreferences: {
        preload: path.join(__dirname, 'src\preload\preload.js')
    }
  })

  win.loadFile('index.html')
  win.setOverlayIcon(overlay, description)

  // Load the local URL for development or the local
  // html file for production
  if (!app.isPackaged && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    win.loadFile(path.join(__dirname, 'src/renderer/index.html'))
  }
}

console.log('Hello from Electron 👋🏾')