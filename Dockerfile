# Build Stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json .npmrc ./

RUN npm install --legacy-peer-deps

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

COPY --from=build /app/build .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
