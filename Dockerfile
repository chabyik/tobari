FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8000 8001
CMD ["node", "app.js"]