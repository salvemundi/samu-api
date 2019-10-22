FROM node:12

WORKDIR /backend

COPY package.json .
COPY package-lock.json .
COPY .env .

RUN npm i --production

ADD ./dist ./dist

CMD node dist/src/main.js
EXPOSE 1337/tcp
