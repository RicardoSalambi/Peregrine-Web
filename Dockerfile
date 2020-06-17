FROM node:12 AS compile-image

WORKDIR /usr/src/app

COPY package*.json ./

ENV PATH="./node_modules/.bin:$PATH" 


RUN npm install

COPY . .

#RUN ng build --prod

EXPOSE 4200

CMD ["npm", "start"]


#FROM nginx

#COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

#COPY --from=compile-image /usr/src/app/dist/dashboard-scss /usr/share/nginx/html

