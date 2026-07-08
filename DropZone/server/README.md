# DropZone — Backend

Бэкенд для DropZone: авторизация (JWT), серверное открытие кейсов, CRUD-админка.
Стек: **Node.js + Express + Prisma + SQLite**.

> SQLite выбран для простоты запуска — БД это один файл `prisma/dev.db`, ничего
> устанавливать не нужно. При желании легко перейти на PostgreSQL: поменять
> `provider` и `DATABASE_URL` в `prisma/schema.prisma` / `.env`, вернуть enum'ы и
> прогнать миграцию заново.

## Требования

- Node.js 18+ (проверено на 22)

## Установка и запуск

```bash
cd server
npm install
npx prisma migrate dev --name init   # создаёт dev.db, таблицы и запускает seed
npm run dev                          # API на http://localhost:4000
```

Если seed не запустился автоматически — выполни отдельно:

```bash
npm run seed
```

Демо-учётки после сида:
- **admin / admin123** — роль ADMIN (доступ к админке)
- **user / user123** — обычный пользователь (баланс 1000)

Фронтенд (в отдельном терминале, из папки `DropZone`):

```bash
npm run dev     # Vite на http://localhost:5173, запросы /api проксируются на :4000
```

## API кратко

| Метод | Путь | Доступ | Назначение |
|-------|------|--------|-----------|
| POST | `/api/auth/register` | все | регистрация |
| POST | `/api/auth/login` | все | вход, выдаёт JWT |
| GET | `/api/auth/me` | JWT | текущий пользователь |
| GET | `/api/cases` | все | список кейсов |
| GET | `/api/cases/:id` | все | один кейс |
| POST | `/api/cases/:id/open` | JWT | **открыть кейс (роллит сервер)** |
| GET | `/api/inventory` | JWT | инвентарь |
| POST | `/api/inventory/:id/sell` | JWT | продать предмет |
| GET/POST/PUT/DELETE | `/api/admin/items` | ADMIN | CRUD предметов |
| GET/POST/PUT/DELETE | `/api/admin/cases` | ADMIN | CRUD кейсов |
| GET/PATCH | `/api/admin/users` | ADMIN | пользователи (роль/баланс) |

## Полезное

```bash
npm run studio   # Prisma Studio — визуальный просмотр БД в браузере
```

## Как устроено «честное» открытие

Исход открытия считает **сервер** (`src/routes/cases.js` → `src/lib/roll.js`),
клиент только анимирует уже полученный результат. Алгоритм: выбор редкости
пропорционально её шансу среди присутствующих в кейсе, затем равновероятный
выбор предмета внутри редкости (`crypto.randomInt`). Баланс списывается и приз
кладётся в инвентарь в одной транзакции.
