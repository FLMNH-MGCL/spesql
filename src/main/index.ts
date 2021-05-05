require('dotenv').config();

import path from 'path';
import url from 'url';
import { app, BrowserWindow, Menu, Event } from 'electron';
import is from 'electron-is';
import { autoUpdater } from 'electron-updater';
import getContextMenu from './util/menu';

import './server/server';

app.commandLine.appendSwitch('ignore-certificate-errors');

export let win: BrowserWindow | null = null;

app.on('ready', () => {
  if (is.dev()) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
    } = require('electron-devtools-installer');
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name: any) => console.log(`Added Extension:  ${name}`))
      .catch((err: any) =>
        console.log('Failed to install React Developer Tools: ', err)
      );
  }

  Menu.setApplicationMenu(getContextMenu(app, autoUpdater));

  win = new BrowserWindow({
    width: 1600,
    height: 980,
    webPreferences: {
      nodeIntegration: true,
    },
    title: 'spesql',
  });

  win.webContents.on('new-window', function (e: Event, _url) {
    e.preventDefault();
    require('electron').shell.openExternal(_url);
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

autoUpdater.on('update-available', (_info: any) => {
  sendStatusToWindow({
    type: 'logging',
    message: 'Update available, starting download...',
  });
});

autoUpdater.on('error', (error: any) => {
  sendStatusToWindow({
    type: 'error',
    message:
      'Could not automatically update. Please manually download the updated client.',
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

  // wait a second before quitting
  setTimeout(() => autoUpdater.quitAndInstall(), 1000);
});
