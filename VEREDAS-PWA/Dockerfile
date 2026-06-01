FROM node:20-alpine AS builder
ARG APP_NAME
WORKDIR /app

COPY package*.json ./
COPY angular.json ./
COPY tsconfig.json ./
COPY projects ./projects

RUN npm ci
RUN npx ng build ${APP_NAME} --configuration production

FROM nginx:1.27-alpine
ARG APP_NAME
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/${APP_NAME}/browser /usr/share/nginx/html
EXPOSE 80