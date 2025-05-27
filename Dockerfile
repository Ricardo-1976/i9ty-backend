FROM node:20-slim

RUN apt update && apt install -y openssl procps

WORKDIR /home/node/app

COPY package*.json ./
RUN npm install -g @nestjs/cli@10.3.2
RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

CMD ["npm", "run", "start:prod"]