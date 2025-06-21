FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS dev
WORKDIR /app
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
COPY --from=builder /app /app
EXPOSE 4200
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]
