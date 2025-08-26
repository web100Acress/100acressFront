# Build Stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json .npmrc ./

# Fix esbuild/glibc compatibility on Alpine during npm install
RUN apk add --no-cache libc6-compat \
  && npm ci --legacy-peer-deps

COPY . .

RUN npm run build

# Production Stage
FROM nginx:1.23-alpine

# Clean default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/

WORKDIR /usr/share/nginx/html

RUN rm -rf *

# Vite outputs to dist by default
COPY --from=build /app/dist .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
