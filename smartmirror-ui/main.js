
/*
 var express = require('express'),
  server = express(),
  port = process.env.PORT || 3002,
  bodyParser = require('body-parser');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

var routes = require('./test'); //importing route
routes(server);

server.listen(port);

console.log('todo list RESTful API server started on: ' + port);


 */

const { app, BrowserWindow } = require('electron')

let win;

function createWindow () {
  // Create the browser window.



  win = new BrowserWindow({
    width: 1280,
    height: 1024,
    frame: false,
    icon: `file://${__dirname}/dist/assets/logo.png`,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.setMenu(null);
  win.loadURL(`file://${__dirname}/dist/index.html`);

  // Open the DevTools.
  win.webContents.openDevTools();


  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  });

  win.setFullScreen(true);
}

// Create window on electron intialization
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
});
