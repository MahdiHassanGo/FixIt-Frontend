import "server-only";

import { ApiError, privateApi, publicApi } from "@/lib/api";
import type {
  Booking,
  Category,
  Payment,
  Service,
  TechnicianProfile,
  User,
} from "@/lib/types";

export async function getCurrentUser() {
  try {
    const response = await privateApi<User>("/api/auth/me");
    return response.data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return null;
    throw error;
  }
}

export async function getCategories() {
  return (await publicApi<Category[]>("/api/categories")).data;
}

export async function getServices(query = "") {
  return publicApi<Service[]>(`/api/services${query ? `?${query}` : ""}`);
}

export async function getService(id: string) {
  return (await publicApi<Service>(`/api/services/${id}`)).data;
}

export async function getTechnicians(query = "") {
  return publicApi<TechnicianProfile[]>(
    `/api/technicians${query ? `?${query}` : ""}`,
  );
}

export async function getTechnician(id: string) {
  return (await publicApi<TechnicianProfile>(`/api/technicians/${id}`)).data;
}

export async function getCustomerBookings() {
  return (
    await privateApi<Booking[]>("/api/bookings")
  ).data;
}

export async function getBooking(id: string) {
  return (
    await privateApi<Booking>(
      `/api/bookings/${id}`,
    )
  ).data;
}

export async function getCustomerPayments() {
  return (
    await privateApi<Payment[]>("/api/payments")
  ).data;
}

export async function getTechnicianBookings() {
  return (await privateApi<Booking[]>("/api/technician/bookings")).data;
}

export async function getMyServices() {
  try {
    return (await privateApi<Service[]>("/api/services/mine")).data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return (await privateApi<Service[]>("/api/services/my-services")).data;
    }
    throw error;
  }
}

export async function getAdminUsers() {
  return (await privateApi<User[]>("/api/admin/users")).data;
}

export async function getAdminBookings() {
  return (await privateApi<Booking[]>("/api/admin/bookings")).data;
}

export async function getAdminPayments() {
  return (await privateApi<Payment[]>("/api/admin/payments")).data;
}

