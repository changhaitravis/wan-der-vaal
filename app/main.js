'use strict';

const electron = require('electron');
// const remote = electron.remote;
// const electronFs = remote.require('fs');
const shell = electron.shell;
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

  app.on('open-file', function(event, url){
      event.preventDefault();
      console.log('we\'re in');
      console.log(url);
      shell.openItem(url);
  });
  
   app.on('open-url', function(event, url){
      event.preventDefault();
      console.log('we\'re in');
      console.log(url);
      shell.openItem(url);
  });
  


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  //mainWindow.loadURL('http://localhost:9000');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.webContents.on('new-window', function(event, url){
    event.preventDefault();
    console.log(url);
    shell.openItem(url);
    return false;
  });


  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  
});
