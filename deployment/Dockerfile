FROM node:10-alpine
LABEL maintainer="Saiwarun Yenjitpissamai"

COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /var/source && cp -a /tmp/node_modules /var/source

RUN cp -a /tmp/node_modules /var/source

COPY . /var/source
WORKDIR /var/source
EXPOSE 80 443
ENTRYPOINT ["npm", "start"]
