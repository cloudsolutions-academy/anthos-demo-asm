FROM node:12.18.1-slim

COPY package.json /opt/svc/
COPY service.js /opt/svc/
WORKDIR /opt/svc
RUN npm install

#hadolint ignore=DL3008
RUN apt-get update \
    && apt-get install curl --no-install-recommends -y \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 9000
CMD ["node", "/opt/svc/service.js", "9000"]
