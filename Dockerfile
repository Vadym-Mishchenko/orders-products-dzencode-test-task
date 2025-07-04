FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

CMD ["sh", "-c", "npm run start-server & npm run preview"]

EXPOSE 5000
EXPOSE 5173
