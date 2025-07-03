FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Применим prisma generate и запустим фронт + бэк параллельно
CMD ["sh", "-c", "npx prisma generate && npm run start-server & npm run dev"]

EXPOSE 5173
EXPOSE 5000
