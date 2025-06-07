ARG NODE_ENV=development
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS dev
USER node
WORKDIR /home/node/app
ENV NODE_ENV=${NODE_ENV}
COPY --from=builder --chown=node:node /app /home/node/app
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

# Production stage
#FROM node:18-alpine AS prod
#WORKDIR /app
#ENV NODE_ENV=production
#COPY --from=builder /app/dist ./dist
#COPY --from=builder /app/node_modules ./node_modules
#COPY --from=builder /app/package*.json ./
#EXPOSE 3000
#CMD ["npm", "run", "start:prod"]