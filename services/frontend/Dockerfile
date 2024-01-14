# FROM node:latest as build

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build


FROM nginx:latest as prod

COPY /dist/dashboard-scss /usr/share/nginx/html

#COPY --from=build /app/dist/dashboard-scss /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
