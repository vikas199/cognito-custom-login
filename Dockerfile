FROM node:10

COPY . /coglogin

WORKDIR /coglogin

RUN cd /coglogin \
  && yarn install 

# install chrome binary
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/sources.list

RUN apt-get update && apt-get install --no-install-recommends -y google-chrome-stable

RUN export CHROME_BIN=/usr/bin/google-chrome

CMD sleep 120