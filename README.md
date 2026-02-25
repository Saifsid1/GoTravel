# GoTravel — India Travel Booking SaaS

A full-stack India-focused travel booking platform built with **Next.js 14**, **NestJS**, **Prisma**, and **PostgreSQL**. Features Group Tours, FIT (Fully Independent Travel) packages, AI-powered itinerary generation, Razorpay payments, real-time notifications, and a full admin dashboard.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), Tailwind CSS, shadcn/ui, React Query, Zustand |
| Backend | NestJS 10, Prisma ORM, PostgreSQL |
| Auth | NextAuth v5 + JWT (Passport) |
| Payments | Razorpay |
| AI | OpenAI GPT-4o (with mock fallback) |
| Notifications | Socket.IO, Twilio (WhatsApp), Resend (email) |
| Monorepo | Turborepo + pnpm workspaces |

---

## Project Structure

```
GoTravel/
├── apps/
│   ├── api/          # NestJS backend (port 4000)
│   └── web/          # Next.js frontend (port 3000)
├── packages/
│   ├── database/     # Prisma schema + seed
│   └── types/        # Shared TypeScript interfaces
├── docker-compose.yml
├── turbo.json
└── pnpm-workspace.yaml
```

---

## Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL 15+ (or Docker)

---

## Setup

### 1. Clone & install

```bash
git clone https://github.com/Saifsid1/GoTravel.git
cd GoTravel
pnpm install
```

### 2. Configure environment variables

Copy the example files and fill in your values:

```bash
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

**`apps/api/.env`** — minimum required:
```env
DATABASE_URL=postgresql://gotravel:gotravel123@localhost:5432/gotravel
JWT_SECRET=your-jwt-secret-min-32-chars-here
PORT=4000
FRONTEND_URL=http://localhost:3000
```

**`apps/web/.env.local`** — minimum required:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

### 3. Start PostgreSQL

**Option A — Docker (recommended):**
```bash
docker compose up postgres -d
```

**Option B — local PostgreSQL:**
Create a database named `gotravel` with user `gotravel` / password `gotravel123`.

### 4. Run database migrations & seed

```bash
# From the packages/database directory
cd packages/database
npx prisma migrate dev --name init
npx prisma db seed
cd ../..
```

This creates all tables and seeds:
- 1 admin user: `admin@gotravel.com` / `Admin@123`
- 8 destinations (Manali, Goa, Kerala, Rajasthan, Ladakh, Andaman, Coorg, Rishikesh)
- 2 packages per destination (Group + FIT)
- Full 5-day itineraries for each package
- FIT add-ons per destination
- 5 testimonials, 3 blog posts, 10 leads, 3 bookings

### 5. Start the development servers

```bash
# From repo root
pnpm dev
```

This starts both API (port 4000) and Web (port 3000) via Turborepo.

- **Frontend:** http://localhost:3000
- **API:** http://localhost:4000
- **Swagger docs:** http://localhost:4000/api

---

## Optional Services

| Service | Variable | Description |
|---|---|---|
| OpenAI | `OPENAI_API_KEY` | AI itinerary generation (mock fallback if absent) |
| Razorpay | `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` | Payments (gracefully skipped if absent) |
| Twilio | `TWILIO_ACCOUNT_SID` + `TWILIO_AUTH_TOKEN` | WhatsApp notifications (optional) |
| Resend | `RESEND_API_KEY` | Email notifications (optional) |
| Google OAuth | `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` | Social login (optional) |

---

## Available Scripts

### Root (runs all apps via Turborepo)
```bash
pnpm dev          # Start all apps in watch mode
pnpm build        # Build all apps
pnpm lint         # Lint all apps
```

### API only
```bash
cd apps/api
pnpm dev          # NestJS watch mode
pnpm build        # Compile TypeScript
pnpm test         # Run Jest tests
```

### Web only
```bash
cd apps/web
pnpm dev          # Next.js dev server
pnpm build        # Production build
pnpm lint         # ESLint
```

### Database
```bash
cd packages/database
pnpm db:generate  # Regenerate Prisma client after schema changes
pnpm db:migrate   # Run migrations
pnpm db:seed      # Seed the database
pnpm db:studio    # Open Prisma Studio
```

---

## Docker (full stack)

```bash
docker compose up --build
```

Services: PostgreSQL (5432), API (4000), Web (3000).

---

## Key Features

- **Group Tours** — fixed-date packages with group pricing
- **FIT (Fully Independent Travel)** — build your own itinerary with add-ons
- **AI Itinerary Generator** — GPT-4o powered with mock fallback
- **Razorpay Integration** — INR payments with webhook verification
- **Lead Management** — Kanban board with WhatsApp/email notifications
- **Admin Dashboard** — revenue charts, booking management, analytics
- **Real-time Notifications** — Socket.IO WebSocket gateway
- **SEO Optimised** — dynamic sitemap, robots.txt, meta tags
- **Mobile-first** — fully responsive with Tailwind CSS

---

## Default Admin Credentials

```
Email:    admin@gotravel.com
Password: Admin@123
```

> ⚠️ Change these credentials before deploying to production.

---

## Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#f97316` (orange-500) | CTAs, highlights |
| `secondary` | `#0d9488` (teal-600) | Accents, badges |

---

## License

MIT
