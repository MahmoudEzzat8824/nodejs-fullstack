FROM node:18-alpine

WORKDIR /usr/src/app

# install production deps only
COPY package*.json ./
RUN npm ci --only=production

# copy source
COPY . .

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "src/server.js"]