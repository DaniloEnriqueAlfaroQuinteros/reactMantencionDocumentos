FROM node:16-alpine3.13 as builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
# COPY web/sco-web-app/package.json ./web/sco-web-app/package.json
RUN yarn install

COPY . .
# WORKDIR /usr/src/app 
RUN yarn build

FROM nginx:1.21.0-alpine as app
COPY --from=builder /usr/src/app/build/sodimac /usr/share/nginx/html
