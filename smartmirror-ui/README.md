# SmartmirrorUi
Angular project for creating a front-end desktop application app for the mirror.

Uses electron to deliver desktop application

Packaged with electron-packager

## Raspberry Pi 4 notes

To install electron, you might have to specify the arch of the operating system

npm install --arch=armv7l electron
sudo npm install -g --arch=armv7l electron@6.1.7 --unsafe-perm=true --allow-root

## Install and run electron-packager
npm install electron-packager -g

electron-packager ./ smartmirror-ui-app --platform=linux --arch=armv7l
electron-packager ./ smartmirror-ui-app --platform=win32 --arch=x64


