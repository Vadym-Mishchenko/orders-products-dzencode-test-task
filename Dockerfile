FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Генерируем Prisma client
RUN npx prisma generate

# Собираем фронтенд
RUN npm run build

# Запускаем сервер и фронт в проде
CMD ["sh", "-c", "npm run start-server & npm run preview"]

EXPOSE 5173
EXPOSE 5000
