# FixItNow Frontend API Integration Map

Base URL comes from the server-only `BACKEND_API_URL` environment variable. Authenticated requests send the frontend's HTTP-only `accessToken` cookie to the backend as `Authorization: Bearer <token>`.

| Frontend area | Backend endpoint | Method | Access |
|---|---|---:|---|
| Login form | `/api/auth/login` | POST | Public |
| Registration form | `/api/auth/register` | POST | Public |
| Proxy access-token refresh | `/api/auth/refresh-token` | POST | Refresh token |
| Navbar/dashboard session | `/api/auth/me` | GET | Authenticated |
| Profile form | `/api/users/me` | PATCH | All authenticated roles |
| Home/services listing | `/api/services` | GET | Public |
| Service details | `/api/services/:id` | GET | Public |
| Categories/filters | `/api/categories` | GET | Public |
| Technician listing | `/api/technicians` | GET | Public |
| Technician profile | `/api/technicians/:id` | GET | Public |
| Customer booking form | `/api/bookings` | POST | Customer |
| Customer booking history | `/api/bookings` | GET | Customer |
| Booking payment page | `/api/bookings/:id` | GET | Customer/Technician/Admin |
| Customer cancellation | `/api/bookings/:id/cancel` | PATCH | Customer/Admin |
| Customer payment history | `/api/payments` | GET | Customer/Admin |
| Stripe checkout | `/api/payments/create-checkout-session` | POST | Customer |
| Review form | `/api/reviews` | POST | Customer |
| Technician profile form | `/api/technician/profile` | PUT | Technician |
| Availability scheduler | `/api/technician/availability` | PUT | Technician |
| Technician booking table | `/api/technician/bookings` | GET | Technician |
| Technician booking actions | `/api/technician/bookings/:bookingId/status` | PATCH | Technician |
| Technician service list | `/api/services/my-services` | GET | Technician |
| Create technician service | `/api/services` | POST | Technician |
| Update technician service | `/api/services/:id` | PATCH | Technician/Admin |
| Remove technician service | `/api/services/:id` | DELETE | Technician/Admin |
| Admin user table | `/api/admin/users` | GET | Admin |
| Admin ban/unban | `/api/admin/users/:id/status` | PATCH | Admin |
| Admin booking table | `/api/admin/bookings` | GET | Admin |
| Admin payment table | `/api/admin/payments` | GET | Admin |
| Admin category list/create | `/api/admin/categories` | GET/POST | Admin |
| Admin category update/delete | `/api/categories/:id` | PATCH/DELETE | Admin |

## Important existing-backend constraints

1. The API does not store a technician profile-image URL. The frontend uses a local optimized placeholder instead of pretending that an upload is persisted.
2. Public technician data exposes weekly availability blocks but not already occupied public slots. The booking form therefore displays declared working windows only.
4. All API error responses return structured `{ success: false, statusCode, message, details }` objects which are presented via toast alerts, inline form errors, or global error boundaries.

