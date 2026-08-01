# FixItNow Frontend

A Next.js App Router frontend connected to the existing FixItNow Express/Prisma backend.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set `BACKEND_API_URL`, `JWT_ACCESS_SECRET`, and `JWT_REFRESH_SECRET` in `.env.local`.

The backend should run on port 5000 and the frontend on port 3000 during local development.

## Required backend environment values for frontend payment redirects

```env
FRONTEND_URL=http://localhost:3000
STRIPE_SUCCESS_URL=http://localhost:3000/payment/success
STRIPE_CANCEL_URL=http://localhost:3000/payment/cancel
```

Use the deployed Vercel URL instead of localhost in production.

## Demo credentials from the existing backend seed

- Admin: `admin@fixitnow.com` / `admin123`
- Customer: `customer@fixitnow.com` / `customer123`
- Technician: `technician@fixitnow.com` / `technician123`

