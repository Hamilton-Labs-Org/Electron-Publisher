import require$$0 from "electron/main";
import require$$1 from "node:path";
import __cjs_mod__ from "node:module";
const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const require2 = __cjs_mod__.createRequire(import.meta.url);
var main = {};
const { app, BrowserWindow, nativeImage, Tray, ipcMain, nativeTheme } = require$$0;
const path = require$$1;
app.disableHardwareAcceleration();
app.commandLine.appendSwitch("ignore-gpu-blacklist");
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
const appIcon = nativeImage.createFromPath("./images/icon.png");
const description = "The Hamilton Labs App";
app.whenReady().then(() => {
  const trayIcon = nativeImage.createFromPath("./images/icon.png");
  ipcMain.handle("ping", () => "pong");
  new Tray(trayIcon);
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
ipcMain.handle("dark-mode:toggle", () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = "light";
  } else {
    nativeTheme.themeSource = "dark";
  }
  return nativeTheme.shouldUseDarkColors;
});
ipcMain.handle("dark-mode:system", () => {
  nativeTheme.themeSource = "system";
});
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: appIcon,
    images: true,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, "./src/preload/preload.cjs")
    }
  });
  win.setOverlayIcon(nativeImage.createFromPath("./images/Green-Alert-PNG.png"), description);
  if (!app.isPackaged && process.env["ELECTRON_RENDERER_URL"]) {
    win.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    win.loadFile(path.join(__dirname, "./index.html"));
  }
};
console.log("Loading The Hamilton Labs Apps");
export {
  main as default
};
