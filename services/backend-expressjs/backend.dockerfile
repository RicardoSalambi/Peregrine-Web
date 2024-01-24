FROM node:lts-alpine as base

RUN mkdir /expressAPI
WORKDIR /expressAPI

COPY ./app/package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]