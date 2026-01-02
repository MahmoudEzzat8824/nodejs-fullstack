FROM node:18-alpine

WORKDIR /app

# install production deps only
COPY package*.json ./
RUN npm install --omit=dev

# copy source
COPY . .

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "src/server.js"]