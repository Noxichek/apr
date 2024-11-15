FROM node:lts-alpine AS build

WORKDIR /usr/src/app

COPY package*.json  ./

RUN npm install --force

COPY . .

RUN npx nx build dashboard --prod

FROM nginx:stable-alpine

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/dist/apps/dashboard/* /usr/share/nginx/html
COPY --from=build /usr/src/app/dist/apps/login /usr/share/nginx/html/login

ENTRYPOINT ["nginx", "-g", "daemon off;"]
