# FixItNow Frontend

A responsive Next.js App Router frontend for the FixItNow home-service marketplace. It consumes the existing Express/Prisma backend and supports Customer, Technician, and Admin roles.

## Technology

- Next.js App Router + TypeScript
- Tailwind CSS and reusable UI components
- Server Components, Client Components, and Server Actions
- Zod validation
- HTTP-only JWT cookies and role-aware proxy protection
- Stripe Checkout redirect flow

## Local Setup

```bash
npm install
copy .env.example .env.local
npm run dev
```

Configure these server-only values in `.env.local`:

```env
BACKEND_API_URL=http://localhost:5000
JWT_ACCESS_SECRET=<same as backend>
JWT_REFRESH_SECRET=<same as backend>
```

## Required Backend Redirect Values

```env
FRONTEND_URL=http://localhost:3000
STRIPE_SUCCESS_URL=http://localhost:3000/payment/success
STRIPE_CANCEL_URL=http://localhost:3000/payment/cancel
```

Use the final Vercel URL instead of localhost in production.

## Demo Credentials

- Admin: `admin@fixitnow.com` / `admin123`
- Customer: `customer@fixitnow.com` / `customer123`
- Technician: `technician@fixitnow.com` / `technician123`

## Submission Information

Frontend Repository:
https://github.com/ironbat106/fixitnow-frontend

Live Frontend:
https://fixitnow-frontend-seven.vercel.app

Backend API:
https://fixitnow-backend-rust.vercel.app

Demo Video:
Add after recording

Admin Email:
admin@fixitnow.com

Admin Password:
admin123

## API Documentation

See `API_INTEGRATION.md` for the frontend-to-backend endpoint map.

## Known Backend Constraints

- The backend does not persist a technician profile image; the frontend uses a local optimized placeholder.
- Public technician data exposes weekly working windows but not occupied public slots.
- Stripe webhooks are authoritative for changing a paid booking to `PAID`; the success page does not fake this status.
