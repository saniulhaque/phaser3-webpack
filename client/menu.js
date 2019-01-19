const config = require('../src/config');

let alwaysontop = false;
let resizable = true;

module.exports = [
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload();
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: 'CmdOrCtrl+Shift+I',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools();
        }
      },
      {
        type: 'checkbox',
        label: 'Always On Top',
        accelerator: 'CmdOrCtrl+T',
        checked: alwaysontop,
        click(item, focusedWindow) {
          alwaysontop = !alwaysontop;
          if (focusedWindow) focusedWindow.setAlwaysOnTop(alwaysontop);
        }
      },
      {
        type: 'checkbox',
        label: 'Resizable',
        accelerator: 'CmdOrCtrl+Shift+R',
        checked: resizable,
        click(item, focusedWindow) {
          resizable = !resizable;
          if (focusedWindow) focusedWindow.setResizable(resizable);
        }
      },
      {
        type: 'separator'
      },
      {
        type: 'radio',
        label: '150%',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.setSize(config.width * 1.5, config.height * 1.5);
        }
      },
      {
        type: 'radio',
        label: '120%',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.setSize(config.width * 1.2, config.height * 1.2);
        }
      },
      {
        type: 'radio',
        label: '100%',
        checked: true,
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.setSize(config.width, config.height);
        }
      },
      {
        type: 'radio',
        label: '80%',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.setSize(config.width * 0.8, config.height * 0.8);
        }
      },
      {
        type: 'radio',
        label: '50%',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.setSize(config.width * 0.5, config.height * 0.5);
        }
      },
      {
        type: 'separator'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  },
  {
    role: 'window',
    submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Phaser Docs',
        click() {
          require('electron').shell.openExternal('https://photonstorm.github.io/phaser3-docs/');
        }
      },
      {
        label: 'Phaser examples',
        click() {
          require('electron').shell.openExternal('https://labs.phaser.io/');
        }
      },
      {
        label: 'Phaser World',
        click() {
          require('electron').shell.openExternal('https://phaser.io/community/newsletter');
        }
      },
      {
        label: 'Phaser Forum',
        click() {
          require('electron').shell.openExternal('https://phaser.discourse.group/');
        }
      }
    ]
  }
];
