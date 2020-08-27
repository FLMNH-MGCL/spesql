import path from "path";
import url from "url";
import { app, BrowserWindow, nativeImage, Menu, MenuItem } from "electron";
import is from "electron-is";
import { autoUpdater } from "electron-updater";
import "./server/server";

autoUpdater.checkForUpdatesAndNotify();

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
            label: "Exit",
            click() {
              app.exit();
            },
          },
          {
            label: "Restart",
            click() {
              app.relaunch();
              app.exit();
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
