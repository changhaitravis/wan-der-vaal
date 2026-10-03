'use strict';

const path = require('path');
const { app, BrowserWindow, shell } = require('electron');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#f3f5f9',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
      // No nodeIntegration: the renderer is a plain web app and talks
      // to the OS only through the preload bridge.
    }
  });

  const devUrl = process.env.ELECTRON_START_URL;
  if (devUrl) {
    mainWindow.loadURL(devUrl);
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }

  // Open external links in the system browser instead of a new window.
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('window-all-closed', () => {
  // On macOS apps stay active until Cmd+Q; everywhere else, quit.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('open-file', (event, url) => {
  event.preventDefault();
  shell.openPath(url);
});

app.on('open-url', (event, url) => {
  event.preventDefault();
  shell.openExternal(url);
});

app.whenReady().then(createWindow);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
