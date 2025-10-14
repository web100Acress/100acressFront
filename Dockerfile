# Build Stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json .npmrc ./

RUN apk add --no-cache libc6-compat \
  && npm ci --legacy-peer-deps

COPY . .

RUN npm run build

# Production Stage
FROM nginx:1.23-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/

WORKDIR /usr/share/nginx/html

RUN rm -rf *

# Vite outDir is configured to 'build' in vite.config.js
COPY --from=build /app/build .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
