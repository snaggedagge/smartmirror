

## Build 

docker build -t hand_motion_tracking .

## Run from container 

python handtracking/detect_test.py --source "http://192.168.1.3:8021/"

## Run 

docker run -e "VIDEO_URL=http://192.168.1.3:8021/" -e "MOTION_ENDPOINT=http://192.168.1.3:8080/motion/hand" -it hand_motion_tracking