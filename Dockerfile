FROM node:10

COPY . /coglogin

WORKDIR /coglogin

RUN cd /coglogin \
  && yarn install 

CMD sleep 120