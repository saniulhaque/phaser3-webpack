// const path = require('path');
const { app, BrowserWindow } = require('electron');
const config = require('./../../src/config');

let mainWin;

function createmainWindow() {
  mainWin = new BrowserWindow({ width: config.width, height: config.height });

  mainWin.loadURL('http://localhost:4000');
  // mainWin.loadFile('dist/index.html');
  // mainWin.webContents.openDevTools();

  mainWin.on('closed', () => {
    mainWin = null;
  });
}

app.on('ready', createmainWindow);

app.on('mainWindow-all-closed', () => {
  if (process.platform !== 'darmainWin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWin === null) {
    createmainWindow();
  }
});
