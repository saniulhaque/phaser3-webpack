// const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');
const config = require('../src/config');
const menuTemplate = require('./menu');

let mainWin;
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

function createmainWindow() {
  mainWin = new BrowserWindow({ width: config.width, height: config.height });

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  mainWin.loadURL('http://localhost:4000');

  // mainWin.webContents.openDevTools(); // open devTools on startup

  mainWin.on('close', function(e) {
    var choice = require('electron').dialog.showMessageBox(this, {
      type: 'question',
      buttons: ['Yes', 'No'],
      title: 'Confirm',
      message: 'Are you sure you want to quit?'
    });
    if (choice == 1) {
      e.preventDefault();
    }
  });

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
