FROM jjanzic/docker-python3-opencv as base

#Author and Maintainer
MAINTAINER dag-karlsson@hotmail.com

RUN pip install tensorflow

COPY handtracking handtracking

EXPOSE 6000
ENTRYPOINT /bin/bash