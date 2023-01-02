FROM node:alpine
WORKDIR /verify-bot-stanalone
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3003
CMD ["npm", "start"]
