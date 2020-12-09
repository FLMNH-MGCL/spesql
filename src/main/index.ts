require('dotenv').config();

import path from 'path';
import url from 'url';
import { app, BrowserWindow, Menu, Event } from 'electron';
import is from 'electron-is';
import { autoUpdater } from 'electron-updater';
import './server/server';

console.log(process.env.ELECTRON_WEBPACK_APP_SECRET_KEY);

app.commandLine.appendSwitch('ignore-certificate-errors');

console.log(path.resolve(__dirname, 'flmnhLogo.png'));

export let win: BrowserWindow | null = null;

app.on('ready', () => {
  const customMenu: any = Menu.getApplicationMenu()?.items.map((item: any) => {
    if (item.role === 'filemenu') {
      const newItem = {
        ...item,
        submenu: [
          {
            label: 'Restart',
            click() {
              app.relaunch();
              app.exit();
            },
          },
          {
            label: 'Exit',
            click() {
              app.exit();
            },
          },
          { type: 'separator' },
          {
            label: 'Check for updates',
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

  Menu.setApplicationMenu(Menu.buildFromTemplate(customMenu as any));

  win = new BrowserWindow({
    width: 1600,
    height: 980,
    webPreferences: {
      nodeIntegration: true,
    },
    title: 'spesql',
  });

  win.webContents.on('new-window', function (e: Event, url) {
    e.preventDefault();
    require('electron').shell.openExternal(url);
  });

  win.loadURL(
    is.dev()
      ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
      : url.format({
          pathname: path.join(__dirname, 'index.html'),
          protocol: 'file:',
          slashes: true,
        })
  );

  is.dev() && win.webContents.openDevTools();
});

app.on('window-all-closed', (_event: Event) => {
  win?.webContents.session.clearCache();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

export type LoggingInformation = {
  type: 'logging' | 'error';
  message: string;
};

// UPDATING
export function sendStatusToWindow(information: LoggingInformation) {
  if (win) {
    win.webContents.send('message', information);
  }
}

autoUpdater.checkForUpdatesAndNotify();

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow({ type: 'logging', message: 'Checking for update...' });
});

autoUpdater.on('update-not-available', () => {
  sendStatusToWindow({
    type: 'logging',
    message: 'No updates available, you are up to date!',
  });
});

autoUpdater.on('update-available', (_info: any) => {
  sendStatusToWindow({
    type: 'logging',
    message: 'Update available, starting download...',
  });
});

autoUpdater.on('error', (error: any) => {
  sendStatusToWindow({
    type: 'error',
    message: `An update error occurred: ${error.toString()}`,
  });
});

autoUpdater.on('download-progress', (progress: any) => {
  if (Math.round(progress.percent) % 10 === 0) {
    sendStatusToWindow({
      type: 'logging',
      message: `Downloaded ${progress.percent}% - (${progress.transferred} + '/' + ${progress.total} + )`,
    });
  }
});

autoUpdater.on('update-downloaded', () => {
  sendStatusToWindow({
    type: 'logging',
    message: 'Update finished downloading and will install now',
  });
});

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall();
});
