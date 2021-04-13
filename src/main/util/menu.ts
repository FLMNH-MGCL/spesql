import { App, Menu, dialog, BrowserWindow } from 'electron';
import { AppUpdater } from 'electron-updater';

const VERSION = require('../../../package.json').version;
const isMac = process.platform === 'darwin';

const aboutMessage = `Developed by: Aaron Leopold
Installed Version: ${VERSION}

Electron: ${process.versions.electron}
Chrome: ${process.versions.chrome}
Node.js: ${process.versions.node}
V8: ${process.versions.v8}
OS: ${process.platform}`;

export default function getContextMenu(app: App, updater: AppUpdater) {
  const aboutItem = {
    label: `About ${app.name}`,
    click() {
      dialog.showMessageBox(BrowserWindow.getFocusedWindow() as any, {
        title: app.name,
        type: 'info',
        message: app.name,
        detail: aboutMessage,
      });
    },
  };

  const template = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              aboutItem,
              {
                label: 'Check for updates',
                click() {
                  updater.checkForUpdates();
                },
              },
              { type: 'separator' },
              {
                label: 'Restart',
                click() {
                  app.relaunch();
                  app.exit();
                },
              },
              { role: 'quit' },
            ],
          },
        ]
      : []),

    ...(!isMac
      ? [
          {
            label: 'File',
            submenu: [
              aboutItem,
              {
                label: 'Check for updates',
                click() {
                  updater.checkForUpdates();
                },
              },
              { type: 'separator' },
              {
                label: 'Restart',
                click() {
                  app.relaunch();
                  app.exit();
                },
              },
              { role: 'quit' },
            ],
          },
        ]
      : []),
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac
          ? [
              { role: 'pasteAndMatchStyle' },
              { role: 'delete' },
              { role: 'selectAll' },
              { type: 'separator' },
              {
                label: 'Speech',
                submenu: [{ role: 'startSpeaking' }, { role: 'stopSpeaking' }],
              },
            ]
          : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }]),
      ],
    },

    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },

    {
      role: 'help',
      submenu: [
        {
          label: 'Getting Started',
          click: async () => {
            const { shell } = require('electron');
            await shell.openExternal(
              'https://flmnh-mgcl.github.io/spesql/docs'
            );
          },
        },
        {
          label: 'Documentation',
          click: async () => {
            const { shell } = require('electron');
            await shell.openExternal('https://flmnh-mgcl.github.io/spesql/');
          },
        },
        { type: 'separator' },
        {
          label: 'Report Issues',
          click: async () => {
            const { shell } = require('electron');
            await shell.openExternal(
              'https://github.com/FLMNH-MGCL/spesql/issues/new/choose'
            );
          },
        },
      ],
    },
  ];

  return Menu.buildFromTemplate(template as any);
}
