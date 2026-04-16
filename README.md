# AffiliatDesk

IB (Introducing Broker) and Affiliate Management Dashboard for forex brokerages. Gives managers a single interface to track leads, manage partner performance, and review commission records.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, React Router 7, MUI 9 |
| Backend | Node.js, Express 5 |
| Database | PostgreSQL |
| ORM | Prisma 7 |
| Password hashing | bcrypt |

---

## Project Structure

```
my-dashboard/
├── affiliate-desk/       # React frontend (Vite)
│   ├── src/
│   │   ├── contexts/     # AuthContext, ThemeContext
│   │   ├── components/   # Layout, Sidebar
│   │   └── pages/        # Login, SignUp, Dashboard, Leads, Affiliates, Commissions, Reports
│   └── .env.example
│
└── backend/              # Express API
    ├── controllers/      # authController, leadsController, ...
    ├── routes/           # auth, leads, partners, commissions
    ├── lib/prisma.js     # PrismaClient singleton
    ├── prisma/
    │   ├── schema.prisma
    │   └── migrations/
    └── .env.example
```

---

## Prerequisites

- Node.js 18+
- PostgreSQL (running locally or via Docker)

---

## Setup

### 1. Database

Create the database and a dedicated user:

```sql
CREATE DATABASE dashboard_db;
CREATE USER dashboard_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE dashboard_db TO dashboard_user;
ALTER USER dashboard_user CREATEDB;   -- required for Prisma shadow database
```

### 2. Backend

```bash
cd backend
cp .env.example .env          # then edit .env with your real DATABASE_URL
npm install
npx prisma migrate dev        # apply migrations to dashboard_db
node server.js                # starts on http://localhost:4000
```

### 3. Frontend

```bash
cd affiliate-desk
cp .env.example .env          # edit VITE_API_URL if backend runs on a different port
npm install
npm run dev                   # starts on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173), register an account, then sign in.

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login, returns name and role |
| GET | `/api/leads` | List all leads (newest first) |
| POST | `/api/leads` | Create a lead |
| PUT | `/api/leads/:id` | Update a lead |
| DELETE | `/api/leads/:id` | Delete a lead |

All responses follow `{ success, data, message }`.

---

## Environment Variables

**`backend/.env`**

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `PORT` | Express port (default `4000`) |
| `FRONTEND_URL` | Allowed CORS origin (default `http://localhost:5173`) |

**`affiliate-desk/.env`**

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend base URL (default `http://localhost:4000`) |

Never commit `.env` files. Use the `.env.example` files as templates.
