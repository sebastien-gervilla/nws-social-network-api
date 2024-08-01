# Building the app
FROM node:20 as builder

WORKDIR /usr/src/bot

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "start"]