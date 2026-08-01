# FixItNow Frontend

FixItNow is a responsive Next.js App Router frontend for a home-service marketplace. It consumes the backend API from the previous assignment and presents role-specific experiences for Customers, Technicians, and Admins.

## Technology

- Next.js 16 App Router and TypeScript
- React 19 Server Components, Client Components, and Server Actions
- Tailwind CSS 4 and reusable UI primitives
- Zod form validation
- HTTP-only JWT cookies with refresh-token handling
- Role-aware route protection through `proxy.ts` (the Next.js 16 replacement for middleware)
- Stripe Checkout redirect flow
- Sonner toast feedback

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

On Windows Command Prompt, use:

```bat
copy .env.example .env.local
```

Configure these server-only values in `.env.local`:

```env
BACKEND_API_URL=https://your-deployed-backend.example.com
JWT_ACCESS_SECRET=<same access secret used by the backend>
JWT_REFRESH_SECRET=<same refresh secret used by the backend>
```

Never commit `.env.local` or real JWT secrets.

## Backend redirect values

The backend payment configuration should point to the frontend deployment:

```env
FRONTEND_URL=http://localhost:3000
STRIPE_SUCCESS_URL=http://localhost:3000/payment/success
STRIPE_CANCEL_URL=http://localhost:3000/payment/cancel
```

Replace localhost with the final frontend URL in production.

## Main frontend routes

| Route | Purpose |
|---|---|
| `/` | Landing page with featured services and technicians |
| `/services` | Real-time service filtering and pagination |
| `/technicians/[id]` | Technician profile, reviews, availability, and booking form |
| `/login` and `/auth/login` | Login flow |
| `/register` and `/auth/register` | Registration with role selection |
| `/dashboard/customer` | Customer bookings, payments, cancellation, and reviews |
| `/dashboard/technician` | Technician statistics and recent requests |
| `/dashboard/technician/bookings` | Booking status management |
| `/dashboard/technician/services` | Service CRUD interface |
| `/dashboard/technician/availability` | Weekly availability scheduler |
| `/dashboard/admin` | Platform statistics |
| `/dashboard/admin/users` | Search, pagination, and ban/unban actions |
| `/dashboard/admin/categories` | Category CRUD interface |
| `/dashboard/admin/bookings` | Platform booking records |
| `/dashboard/admin/payments` | Platform payment records |
| `/payment/success` | Stripe return page with URL reference handling |
| `/payment/cancel` | Cancelled checkout return page |

## Demo credentials

Update these values if your backend seed data differs:

- Admin: `admin@fixitnow.com` / `admin123`
- Customer: `customer@fixitnow.com` / `customer123`
- Technician: `technician@fixitnow.com` / `technician123`

## Submission links

- Frontend repository: `https://github.com/ironbat106/fixitnow-frontend`
- Live frontend: `https://fixitnow-frontend-seven.vercel.app`
- Backend API: set this to the same URL used by `BACKEND_API_URL`
- Demo video: add after recording

Verify all deployment links and demo credentials before submission.

## Backend constraints handled honestly

- The current backend data model does not persist a technician profile-image URL, so the frontend uses an optimized local avatar rather than pretending an upload was saved.
- Public technician data exposes weekly working windows but not occupied public slots. The booking interface therefore shows declared availability and leaves final conflict validation to the API.
- Stripe webhooks are authoritative for changing payment and booking records. The success page does not fake a `PAID` status.
- Rating filtering is applied to technician data embedded in each returned service page because the documented service endpoint does not expose a dedicated rating query parameter.

## Validation commands

```bash
npm run lint
npx tsc --noEmit
npm run build
```

See `ASSIGNMENT_AUDIT.md` and `API_INTEGRATION.md` for the requirement and endpoint maps.
