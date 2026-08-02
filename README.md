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

## Backend API Endpoint Documentation

The frontend consumes the FixItNow REST API (`BACKEND_API_URL`). Authenticated requests include an `Authorization: Bearer <access-token>` header or send HTTP-only session cookies.

### 1. Authentication Endpoints

| Method | Endpoint | Access | Description | Payload / Parameters |
|---|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new customer or technician | `{ name, email, password, role, phone?, location? }` |
| `POST` | `/api/auth/login` | Public | Authenticate user & issue tokens | `{ email, password }` |
| `POST` | `/api/auth/refresh` | Public (Refresh token) | Issue new access token | `{ refreshToken }` or refresh cookie |
| `POST` | `/api/auth/logout` | Public | Invalidate refresh token & clear cookies | None |
| `GET` | `/api/auth/me` | Authenticated | Retrieve current user profile | None |
| `PATCH` | `/api/users/me` | Authenticated | Update user name, phone, or location | `{ name?, phone?, location? }` |

### 2. Public Services & Technicians

| Method | Endpoint | Access | Description | Query Filters |
|---|---|---|---|---|
| `GET` | `/api/categories` | Public | Fetch service categories | None |
| `GET` | `/api/services` | Public | Search & filter services | `search`, `categoryId`, `type`, `location`, `minRating`, `minPrice`, `maxPrice`, `technicianId`, `page`, `limit`, `sortBy`, `sortOrder` |
| `GET` | `/api/services/:id` | Public | Service details by ID | `id` path param |
| `GET` | `/api/technicians` | Public | Search & filter technicians | `search`, `skill`, `location`, `categoryId`, `serviceType`, `minRating`, `minPrice`, `maxPrice`, `page`, `limit`, `sortBy`, `sortOrder` |
| `GET` | `/api/technicians/:id` | Public | Technician profile, working hours & reviews | `id` path param |
| `GET` | `/api/reviews/technician/:technicianId` | Public | List reviews for technician | `technicianId` path param |

### 3. Technician Management

| Method | Endpoint | Access | Description | Payload / Parameters |
|---|---|---|---|---|
| `PUT` | `/api/technician/profile` | Technician | Update technician bio, skills, hourly rate & experience | `{ bio?, skills: string[], experienceYears, pricePerHour, location? }` |
| `PUT` | `/api/technician/availability` | Technician | Replace weekly availability working windows | `{ slots: [{ dayOfWeek, startTime, endTime, isAvailable }] }` |
| `GET` | `/api/technician/bookings` | Technician | View assigned job bookings | None |
| `PATCH` | `/api/technician/bookings/:id/status` | Technician | Accept, decline, start, or complete booking | `{ status: "ACCEPTED" \| "DECLINED" \| "IN_PROGRESS" \| "COMPLETED" }` |
| `GET` | `/api/services/my-services` | Technician | View own created services | None |
| `POST` | `/api/services` | Technician | Create new service listing | `{ title, description, price, categoryId, location? }` |
| `PATCH` | `/api/services/:id` | Technician / Admin | Update service details or toggle `isActive` | `{ title?, description?, price?, categoryId?, isActive?, location? }` |
| `DELETE` | `/api/services/:id` | Technician / Admin | Soft-delete service listing | `id` path param |

### 4. Bookings

| Method | Endpoint | Access | Description | Payload / Parameters |
|---|---|---|---|---|
| `POST` | `/api/bookings` | Customer | Create booking request for active service | `{ serviceId, scheduledAt, address, note? }` |
| `GET` | `/api/bookings` | Authenticated | List role-scoped bookings | `page`, `limit`, `status` |
| `GET` | `/api/bookings/:id` | Authorized / Admin | View single booking details | `id` path param |
| `PATCH` | `/api/bookings/:id/cancel` | Customer / Admin | Cancel booking before `IN_PROGRESS` | `id` path param |

#### Booking Lifecycle State Rules
```
REQUESTED ──(technician accepts)──> ACCEPTED ──(verified payment)──> PAID
    │                                  │                               │
    ├──(technician declines)──> DECLINED│                               └──(technician starts)──> IN_PROGRESS
    │                                  │                                                          │
    └──(customer cancels)─────> CANCELLED└──(customer cancels)──> CANCELLED                  └──(technician completes)──> COMPLETED
```

### 5. Payments

| Method | Endpoint | Access | Description | Payload / Parameters |
|---|---|---|---|---|
| `POST` | `/api/payments/create-checkout-session` | Customer | Create Stripe checkout session URL | `{ bookingId }` |
| `POST` | `/api/payments/create` | Customer | Create checkout with gateway choice | `{ bookingId, provider: "STRIPE" \| "SSLCOMMERZ" }` |
| `POST` | `/api/payments/confirm` | Server-side | Verify payment with provider | `{ paymentId, transactionId }` |
| `GET` | `/api/payments` | Authenticated | Customer payment history or all admin payments | None |
| `GET` | `/api/payments/:id` | Authorized | View payment receipt details | `id` path param |
| `POST` | `/api/payments/stripe/webhook` | Stripe | Raw body Stripe webhook notification | `stripe-signature` header |
| `POST` | `/api/payments/sslcommerz/success` | SSLCOMMERZ | Payment success return callback | Form payload |

### 6. Reviews

| Method | Endpoint | Access | Description | Payload / Parameters |
|---|---|---|---|---|
| `POST` | `/api/reviews` | Customer | Submit review for completed booking | `{ bookingId, rating: 1-5, comment? }` |

### 7. Admin Management

| Method | Endpoint | Access | Description | Payload / Parameters |
|---|---|---|---|---|
| `GET` | `/api/admin/users` | Admin | Filter & paginate platform users | `search`, `role`, `status`, `page`, `limit` |
| `PATCH` | `/api/admin/users/:id/status` | Admin | Block or activate user account | `{ isBlocked: boolean }` |
| `GET` | `/api/admin/bookings` | Admin | View all bookings across platform | `page`, `limit`, `status` |
| `GET` | `/api/admin/payments` | Admin | View all payments across platform | `page`, `limit` |
| `GET` | `/api/admin/categories` | Admin | View all categories | None |
| `POST` | `/api/admin/categories` | Admin | Create category | `{ name, icon?, description? }` |
| `PATCH` | `/api/categories/:id` | Admin | Update category details | `{ name?, icon?, description? }` |
| `DELETE` | `/api/categories/:id` | Admin | Delete unused category | `id` path param |

### API Standard Response Structure

#### Success Response (200 OK / 201 Created)
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Resource retrieved successfully",
  "data": {}
}
```

#### Validation & Error Response (400 / 401 / 403 / 404 / 500)
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Request validation failed",
  "details": []
}
```

## Demo credentials

Update these values if your backend seed data differs:

- Admin: `admin@fixitnow.com` / `admin123`
- Customer: `customer@fixitnow.local` / `customer123!`
- Technician: `technician@fixitnow.local` / `technician123!

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
