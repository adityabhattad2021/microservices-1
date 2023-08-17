FROM node:14-alpine


WORKDIR /app

ENV CI=true
ENV WDS_SOCKET_PORT=0


COPY package.json ./

RUN npm install

COPY ./ ./


CMD ["npm","start"]