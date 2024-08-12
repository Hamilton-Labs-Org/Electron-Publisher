"use strict";
const main = require("electron/main");
const path = require("path");
main.app.disableHardwareAcceleration();
main.app.commandLine.appendSwitch("ignore-gpu-blacklist");
main.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") main.app.quit();
});
const appIcon = main.nativeImage.createFromPath("./src/renderer/images/icon.png");
const description = "The Hamilton Labs App";
let winDimensions;
main.app.whenReady().then(() => {
  const trayIcon = main.nativeImage.createFromPath("./images/icon.png");
  main.ipcMain.handle("ping", () => "pong");
  new main.Tray(trayIcon);
  createWindow();
  main.app.on("activate", () => {
    if (main.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
main.ipcMain.handle("dark-mode:toggle", () => {
  if (main.nativeTheme.shouldUseDarkColors) {
    main.nativeTheme.themeSource = "light";
  } else {
    main.nativeTheme.themeSource = "dark";
  }
  return main.nativeTheme.shouldUseDarkColors;
});
main.ipcMain.handle("dark-mode:system", () => {
  main.nativeTheme.themeSource = "system";
});
const createWindow = () => {
  const win = new main.BrowserWindow({
    width: 800,
    height: 600,
    icon: appIcon,
    images: true,
    frame: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: false,
      preload: path.join(main.app.getAppPath(), "./src/preload/preload.mjs")
    }
  });
  winDimensions = new main.BrowserWindow({
    width: 1920,
    height: 1080,
    icon: appIcon,
    images: true,
    frame: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: false,
      protocol: "file",
      preload: path.join(main.app.getAppPath(), "./src/preload/preload.mjs")
    }
  });
  win.setOverlayIcon(main.nativeImage.createFromPath("./images/Green-Alert-PNG.png"), description);
  win.loadFile(path.join(main.app.getAppPath(), "./src/renderer/index.html"));
  winDimensions.setOverlayIcon(main.nativeImage.createFromPath("./images/Green-Alert-PNG.png"), description);
  winDimensions.loadFile(path.join(main.app.getAppPath(), "./src/renderer/index.html"));
  win.once("ready-to-show", () => {
    win.show();
  });
  winDimensions.once("ready-to-show", () => {
    winDimensions.show();
  });
};
console.log("Loading The Hamilton Labs Apps");
