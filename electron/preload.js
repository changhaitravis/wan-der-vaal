'use strict';

// Preload bridge: exposes a minimal, safe API to the renderer.
// The renderer has no nodeIntegration; OS-level actions go through here.
const { contextBridge, shell } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openExternal: (url) => shell.openExternal(url)
});
