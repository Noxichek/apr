FROM node:lts-alpine AS build

WORKDIR /usr/src/app

COPY package*.json  ./

RUN npm install --force

COPY . .

RUN npx nx build dashboard --prod

FROM nginx:stable-alpine

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/dist/apps /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
