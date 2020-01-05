var global = global || window;
var Buffer = Buffer || [];
var process = process || {
  env: { DEBUG: undefined },
  version: []
};
const log = require('electron-log');
log.info("Starting application");
console._log_old = console.log;
console.log = function(msg) {
  log.info(msg);
};




const { remote, BrowserWindow } = require('electron');
const currentWindow = remote.getCurrentWindow();

var Mousetrap = require('mousetrap');
Mousetrap.bind('f12', function() {
  currentWindow.webContents.toggleDevTools();
});

Mousetrap.bind('esc', function() {
  currentWindow.close();
});

