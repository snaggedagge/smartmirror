var global = global || window;
var Buffer = Buffer || [];
var process = process || {
  env: { DEBUG: undefined },
  version: []
};

if(typeof require === "function") {
  const log = require('electron-log');
  log.info("Starting application");


  console.log = function(message, ...optionalParams) {
    if (optionalParams == null || optionalParams.length === 0) {
      log.info(message);
    }
    else {
      log.info(message, optionalParams);
    }
  };
  console.warn = function(message, ...optionalParams) {
    if (optionalParams == null || optionalParams.length === 0) {
      log.warn(message);
    }
    else {
      log.warn(message, optionalParams);
    }
  };
  console.error = function(message, ...optionalParams) {
    if (optionalParams == null || optionalParams.length === 0) {
      log.error(message);
    }
    else {
      log.error(message, optionalParams);
    }
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
}
