# Build dependencies stage
ARG NODE_ENV=development
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Development stage
FROM node:18-alpine AS dev
WORKDIR /app
ENV NODE_ENV=$NODE_ENV
COPY --from=builder /app /app
EXPOSE 4200
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]
#Production
#FROM nginx:alpine AS prod
#WORKDIR /usr/share/nginx/html
#COPY --from=builder /app/dist/ ./
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
