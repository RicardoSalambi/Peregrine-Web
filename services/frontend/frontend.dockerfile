# Refer to following page for guidance:
# https://maximorlov.com/a-beginners-guide-to-building-a-docker-image-of-your-nodejs-application/ 

FROM node:lts-alpine as base
# FROM node:12.18.1 as base

# RUN mkdir /project
# WORKDIR /project
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

ENV PATH=$PATH:/home/node/.npm-global/bin


RUN npm install -g @angular/cli

WORKDIR /home/node/app

COPY --chown=node ./app .

# COPY ./app/package*.json ./

# RUN npm install --force
# RUN npm install @angular-devkit/build-angular
RUN yarn set version stable
RUN yarn install

USER node

# COPY . .

CMD ["ng", "serve", "--host", "0.0.0.0"]