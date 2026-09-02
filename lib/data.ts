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
    return null;
  }
}

export async function getCategories() {
  try {
    const response = await publicApi<Category[]>("/api/categories");
    return response.data || [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export async function getServices(query = "") {
  try {
    return await publicApi<Service[]>(`/api/services${query ? `?${query}` : ""}`);
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return {
      success: false,
      data: [],
      meta: { page: 1, limit: 10, total: 0, totalPage: 1 },
    };
  }
}

export async function getService(id: string) {
  try {
    const response = await publicApi<Service>(`/api/services/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch service ${id}:`, error);
    return null;
  }
}

export async function getTechnicians(query = "") {
  try {
    return await publicApi<TechnicianProfile[]>(
      `/api/technicians${query ? `?${query}` : ""}`,
    );
  } catch (error) {
    console.error("Failed to fetch technicians:", error);
    return {
      success: false,
      data: [],
      meta: { page: 1, limit: 10, total: 0, totalPage: 1 },
    };
  }
}

export async function getTechnician(id: string) {
  const response = await publicApi<TechnicianProfile>(`/api/technicians/${id}`);
  return response.data;
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

