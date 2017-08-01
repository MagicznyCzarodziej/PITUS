const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({width: 950, height: 600, resizable: false});
  mainWindow.loadURL(url.format({
   pathname: path.join(__dirname, 'index.html'),
   protocol: 'file:',
   slashes: true
  }));
}

app.on('ready', createWindow);
