import path from "path";
import url from "url";
import { app, BrowserWindow, nativeImage, Menu, MenuItem } from "electron";
import is from "electron-is";
import { autoUpdater } from "electron-updater";
import "./server/server";

app.commandLine.appendSwitch("ignore-certificate-errors");

const EXPRESS_PORT = process.env.PORT || 5000;

// TODO: icons are broken in electron right now
// const iconUrl = url.format({
//   pathname: path.join(__dirname, "icon/icon.icns"),
//   protocol: "file",
//   slashes: true,
// });

// const iconUrl = nativeImage.createFromPath(
//   path.join(__dirname, "icon/icon.icns")
// );

let win = null;

app.on("ready", () => {
  const customMenu = Menu.getApplicationMenu().items.map((item) => {
    if (item.role === "filemenu") {
      const newItem = {
        ...item,
        submenu: [
          {
            label: "Restart",
            click() {
              app.relaunch();
              app.exit();
            },
          },
          {
            label: "Exit",
            click() {
              app.exit();
            },
          },
          { type: "separator" },
          {
            label: "Check for updates",
            click() {
              autoUpdater.checkForUpdates();
            },
          },
        ],
      };

      return newItem;
    }

    return item;
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate(customMenu));

  win = new BrowserWindow({
    width: 1600,
    height: 980,
    webPreferences: {
      nodeIntegration: true,
    },
    showOnAllWorkspaces: false,
    title: "spesql",
  });

  win.webContents.on("new-window", function (e, url) {
    e.preventDefault();
    require("electron").shell.openExternal(url);
  });

  if (is.dev()) {
    win.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
    // win.webContents.openDevTools();
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
    // win.loadURL(`http://localhost:${EXPRESS_PORT}`);
  }
});

app.on("window-all-closed", (event) => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// UPDATING
function sendStatusToWindow(information) {
  if (win) {
    win.webContents.send("message", information);
  }
}

autoUpdater.checkForUpdatesAndNotify();

autoUpdater.on("checking-for-update", () => {
  sendStatusToWindow({ type: "logging", message: "Checking for update..." });
});

autoUpdater.on("update-not-available", () => {
  sendStatusToWindow({
    type: "logging",
    message: "No updates available, you are up to date!",
  });
});

// autoUpdater.on("update-available", (info) => {
//   sendStatusToWindow({ type: "logging", message: "update available" });
// });

autoUpdater.on("error", (error) => {
  sendStatusToWindow({
    type: "error",
    message: `An update error occurred: ${error.toString()}`,
  });
});

autoUpdater.on("download-progress", (progress) => {
  if (Math.ceil(progress.percent) % 25 === 0) {
    sendStatusToWindow({
      type: "logging",
      message: `Downloaded ${progress.percent}% - (${progress.transferred} + '/' + ${progress.total} + )`,
    });
  }
});

autoUpdater.on("update-downloaded", () => {
  sendStatusToWindow({
    type: "logging",
    message: "Update finished downloading and will install now",
  });
});

autoUpdater.on("update-downloaded", (info) => {
  autoUpdater.quitAndInstall();
});
