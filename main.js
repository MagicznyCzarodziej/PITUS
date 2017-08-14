const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({width: 950, height: 600, resizable: false, icon: __dirname + '/img/icon.png'});

  mainWindow.loadURL(url.format({
   pathname: path.join(__dirname, 'index.html'),
   protocol: 'file:',
   slashes: true
  }));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});
