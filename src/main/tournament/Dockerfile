#FROM node:12.18.2 AS build-stage

#RUN mkdir /usr/app

#COPY . /usr/app

#WORKDIR /usr/app

#ENV PATH /usr/src/app/node_modules/.bin:$PATH

#CMD ["npm", "i", "npm", "start"]

#FROM nginx:alpine

#WORKDIR /usr/share/nginx/html

#RUN rm -rf ./*

#COPY --from=build-stage /usr/app .

#ENTRYPOINT ["nginx", "-g", "daemon off;"]

FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]
