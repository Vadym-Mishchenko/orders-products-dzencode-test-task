# Orders & Products SPA

SPA-приложение для управления заказами (Orders) и продуктами (Products), реализованное с использованием React, Redux, TypeScript и других современных технологий.  
Проект построен с использованием архитектурного подхода FSD (Feature-Sliced Design), поддерживает WebSocket для подсчёта активных сессий, анимации, валидацию форм и несколько языков.

---

## 🚀 Деплой

Проект задеплоен и доступен по адресу:
https://orders-products-dzencode-test-task.onrender.com/orders

---

## 🚀 Технологический стек

- React 19 — основа SPA
- TypeScript — статическая типизация для надежности кода
- Redux Toolkit — управление глобальным состоянием
- React Router Dom — маршрутизация между страницами
- React Hook Form — управление формами и их валидация
- Framer Motion — анимации переходов и эффектов
- Bootstrap + React Bootstrap — UI и стилизация по БЭМ
- Socket.IO — WebSocket для realtime-счётчика активных сессий
- Prisma ORM + SQLite — база данных и удобная работа с ней
- ESLint + Prettier — стандартизация кода и автоформатирование
- Vitest + Testing Library — юнит-тестирование компонентов и утилит
- Vite — быстрый билдер и дев-сервер
- Web Storage — используется для сохранения пользовательских настроек, таких как выбранный язык интерфейса
- i18n — международная локализация приложения для поддержки нескольких языков
- React-i18next — интеграция i18n с React, удобное управление переводами и языковыми переключателями
- Docker — контейнеризация приложения: единая среда для запуска фронтенда и бэкенда, удобство развёртывания и масштабирования
- Render — облачный хостинг, на котором развернуто приложение и доступно по публичному URL

---

## 🏗 Архитектура проекта

Применён подход Feature-Sliced Design (FSD) с разбивкой кода по слоям:

- app/ — корневые конфигурации и точки входа
- entities/ — модели данных и связанная логика
- features/ — конкретные функции и бизнес-логика
- pages/ — страницы
- processes/ — крупные процессы и сценарии работы приложения
- shared/ — переиспользуемые утилиты, компоненты и хелперы
- widgets/ — объединённые UI-компоненты

Применён подход barrel-pattern

## ⚙️ Функционал

- Навигация по страницам Orders и Products с помощью React Router
- Отображение заказов и продуктов с фильтрацией по типу продуктов
- Подробная информация по заказу и его продуктам с возможностью разворачивания/сворачивания
- Подсчёт активных сессий пользователей в реальном времени с помощью WebSocket
- Формы добавления и редактирования с валидацией на React Hook Form
- Анимации при переключении страниц и компонентов с помощью Framer Motion
- Ленивая загрузка компонентов и изображений для оптимизации производительности
- Поддержка TypeScript на всём протяжении проекта
- Покрытие тестами функций (Vitest)
- Использование Prisma ORM для работы с базой данных SQLite
- Локализация (i18n)

---

## 🛠 Запуск проекта

1. Клонировать репозиторий:

   ```bash
   git clone https://github.com/Vadym-Mishchenko/orders-products-dzencode-test-task.git
   cd orders-products-dzencode-test-task
   ```

2. Установить зависимости:

   ```bash
   npm install
   ```

3. Создайте файл `.env` в корне проекта с такими переменными:

   ```bash
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_WS_URL=http://localhost:5000
   ```

4. Запустить клиент:

   ```bash
   npm run dev
   ```

5. Запустить сервер:

   ```bash
   npm run build-server
   npm run start-server
   ```

6. Запуск тестов:

   ```bash
   npm test
   ```

7. Запуск спомощью Docker-compose

   ```bash
    docker-compose up
   ```

   Открыть в браузере

   - Фронтенд:

   ```bash
   http://localhost:5173/orders
   ```

   - Бэкенд:

   ```bash
   http://localhost:5000/api/orders
   http://localhost:5000/api/products
   ```

---

## 🗄 Схема базы данных

Используется Prisma ORM с базой данных SQLite

Модели: Order и Product, связанные отношением один-ко-многим

Файл схемы БД (`schema.prisma`) находится в корне проекта

[`migration.sql`](./prisma/migrations/20250702182320_init/migration.sql)

Можно открыть схему и структуру БД в MySQL Workbench или аналогичных инструментах с поддержкой SQLite или через [dbdiagram.io](https://dbdiagram.io)

[`orders-products-db.sql`](./orders-products-db.sql)

![Схема базы данных](db-schema.PNG)

---

## ✍️ Автор

Vadym Mishchenko  
GitHub: https://github.com/Vadym-Mishchenko
