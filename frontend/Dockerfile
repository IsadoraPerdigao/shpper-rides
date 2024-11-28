FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY ../.env .env
COPY . .

RUN npm run build

EXPOSE 80

# Comando para iniciar o aplicativo Next.js na pasta de produção
CMD ["npm", "run", "start"]