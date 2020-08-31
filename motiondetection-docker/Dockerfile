FROM jjanzic/docker-python3-opencv as base

ENV VIDEO_URL http://192.168.1.122:8021/
ENV MOTION_ENDPOINT http://192.168.1.7:8080/motion/hand

#Author and Maintainer
MAINTAINER dag-karlsson@hotmail.com

RUN python -m pip install tensorflow==1.15
RUN pip install requests

RUN apt-get update && apt-get install nano

COPY handtracking handtracking

EXPOSE 6000

#ENTRYPOINT /bin/bash

ENTRYPOINT  cd handtracking && python detect_test.py --source "${VIDEO_URL}" --update-endpoint "${MOTION_ENDPOINT}"