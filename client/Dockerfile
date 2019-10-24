FROM node:latest-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

RUN npm install --silent
RUN npm install react-scripts -g --silent

COPY . /app

RUN npm run build

FROM nginx:latest-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off"]
