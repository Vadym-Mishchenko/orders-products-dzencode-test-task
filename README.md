src/ – корневая директория проекта
├── app/
├── entities/
├── features/
├── pages/
├── processes/
├── shared/
└── widgets/

1. app/ – инициализация приложения (точка входа, провайдеры)
   ├── index.tsx # Главная точка входа
   ├── App.tsx # Корневой компонент приложения
   └── providers/ # Провайдеры: store, router и т.п.
   ├── RouterProvider.tsx
   ├── StoreProvider.tsx
   └── index.ts # Barrel-файл
   Здесь инициализируются обертки Redux, Router и другие глобальные контексты.

2. entities/ – бизнес-сущности: Order, Product, Session
   ├── order/
   │ ├── model/ # Redux slice, types, selectors
   │ ├── ui/ # UI-компоненты на уровне Order (например, OrderCard)
   │ └── index.ts # Barrel-файл
   ├── product/
   │ ├── model/
   │ ├── ui/
   │ └── index.ts
   └── session/
   ├── model/ # Счетчик сессий через WebSocket
   └── index.ts
   Тут описаны Redux-слайсы, типы, утилиты и базовые UI-компоненты сущностей.

3. features/ – изолированные фичи (небольшие законченные куски функционала)
   ├── filter-products/
   │ ├── model/ # Локальное состояние, slice, hook
   │ ├── ui/ # Компонент фильтра (например, <ProductFilter />)
   │ └── index.ts
   ├── delete-order/
   │ ├── model/ # Логика удаления
   │ ├── ui/ # Кнопка удаления и попап
   │ └── index.ts
   └── toggle-order-info/
   ├── model/
   ├── ui/
   └── index.ts
   Фичи всегда завязаны на конкретную бизнес-функцию (удаление, фильтрация и т.п.).

4. widgets/ – крупные секции интерфейса, состоящие из нескольких сущностей/фичей
   ├── ordersList/
   │ ├── model/
   │ ├── ui/ # <OrdersList /> – отображает список заказов
   │ └── index.ts
   ├── productsList/
   │ ├── ui/ # <ProductsList /> – список продуктов
   │ └── index.ts
   └── orderDetails/
   ├── ui/ # Детали заказа (открываются при выборе)
   └── index.ts
   Это уже более сложные UI-единицы, которые собираются из entities и features.

5. pages/ – страницы для маршрутов
   ├── ordersPage/
   │ ├── ui.tsx
   │ └── index.ts
   ├── productsPage/
   │ ├── ui.tsx
   │ └── index.ts
   └── index.ts # Собираем все страницы для роутера
   Каждая страница подключается к роутеру и содержит конкретный layout, header, widget'ы.

6. processes/ – общие участки приложения (TopMenu, навигация и т.д.)
   ├── topMenu/
   │ ├── ui/ # Текущее время и счетчик сессий
   │ └── index.ts
   ├── navigationMenu/
   │ ├── ui/ # Ссылки на Orders и Products
   │ └── index.ts
   └── index.ts
   Это компоненты, которые часто повторяются на нескольких страницах.

7. shared/ – переиспользуемые ресурсы
   ├── ui/ # Общие UI-компоненты: Button, Select, Modal
   │ ├── button/
   │ ├── select/
   │ └── index.ts
   ├── lib/ # Хелперы, утилиты, hooks
   │ ├── formatDate.ts
   │ ├── useDebounce.ts
   │ └── index.ts
   ├── config/ # Константы, конфигурации
   │ ├── routes.ts
   │ └── currencies.ts
   ├── types/ # Общие типы
   │ └── index.ts
   └── assets/ # Шрифты, изображения и прочее
   Всё, что переиспользуется в любом месте проекта, кладется сюда.
