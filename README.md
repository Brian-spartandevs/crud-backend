# CRUD Backend API

REST API backend built with Node.js, Express, Prisma ORM, and SQLite. Includes JWT authentication and Zod validation.

## Stack

- **Node.js** (ES Modules)
- **Express.js** — HTTP framework
- **Prisma ORM** — Database layer (SQLite)
- **Zod** — Request validation
- **JWT** — Authentication
- **bcryptjs** — Password hashing

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migration
npm run db:migrate

# Start development server
npm run dev
```

The server starts at `http://localhost:3000`.

## API Endpoints

### Auth (public)

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login, get JWT    |

### Products (protected — requires `Authorization: Bearer <token>`)

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| POST   | `/api/products`      | Create product     |
| GET    | `/api/products`      | List all products  |
| GET    | `/api/products/:id`  | Get product by id  |
| PUT    | `/api/products/:id`  | Update product     |
| DELETE | `/api/products/:id`  | Delete product     |

## Project Structure

```
src/
├── controllers/    # Route handlers
├── middlewares/     # Auth, validation, error handling
├── routes/         # Express route definitions
├── schemas/        # Zod validation schemas
└── index.js        # App entry point
prisma/
├── schema.prisma   # Database models
└── dev.db          # SQLite database
http/               # Bruno API request files
```

## Scripts

| Script           | Description                  |
| ---------------- | ---------------------------- |
| `npm run dev`    | Start with file watching     |
| `npm start`      | Start production server      |
| `npm run db:migrate` | Run Prisma migrations   |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:studio` | Open Prisma Studio        |
