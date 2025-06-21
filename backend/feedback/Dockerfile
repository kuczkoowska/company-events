FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS dev
USER node
WORKDIR /home/node/app
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV
COPY --from=builder --chown=node:node /app /home/node/app
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
