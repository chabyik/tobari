FROM node:22

WORKDIR /tobari

COPY . .
RUN npm install

EXPOSE 8000 8001
CMD ["node", "src/app.js"]