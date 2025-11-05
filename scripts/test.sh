#!/bin/bash


#scp /mnt/e/Programmering/Github/smartmirror/smartmirror-backend-web/build/libs/smartmirror-backend-web-1.0.jar pi@raspberrypi:/var/smartmirror/smartmirror-backend-web-1.0.jar
#scp -r /mnt/e/Programmering/Github/smartmirror/smartmirror-ui/smartmirror-ui-app-linux-armv7l pi@raspberrypi:/var/smartmirror/smartmirror-ui

read -s -p "Enter SSH password for pi@raspberrypi: " SSHPASS
echo
export SSHPASS

sshpass -e rsync -avz --progress /mnt/e/Programmering/Github/smartmirror/scripts/install.sh pi@raspberrypi:/var/smartmirror/install.sh
sshpass -e rsync -avz  --progress /mnt/e/Programmering/Github/smartmirror/smartmirror-backend-web/build/libs/smartmirror-backend-web-1.0.jar pi@raspberrypi:/var/smartmirror/smartmirror-backend-web-1.0.jar
sshpass -e rsync -avz --delete --progress /mnt/e/Programmering/Github/smartmirror/smartmirror-ui/smartmirror-ui-app-linux-armv7l/ pi@raspberrypi:/var/smartmirror/smartmirror-ui


sshpass -e ssh pi@raspberrypi "/var/smartmirror/install.sh"
