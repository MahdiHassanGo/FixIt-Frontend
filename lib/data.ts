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
  try {
    const response = await publicApi<TechnicianProfile>(`/api/technicians/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch technician ${id}:`, error);
    return null;
  }
}

export async function getCustomerBookings() {
  try {
    return (await privateApi<Booking[]>("/api/bookings")).data || [];
  } catch (error) {
    console.error("Failed to fetch customer bookings:", error);
    return [];
  }
}

export async function getBooking(id: string) {
  try {
    return (await privateApi<Booking>(`/api/bookings/${id}`)).data;
  } catch (error) {
    console.error(`Failed to fetch booking ${id}:`, error);
    return null;
  }
}

export async function getCustomerPayments() {
  try {
    return (await privateApi<Payment[]>("/api/payments")).data || [];
  } catch (error) {
    console.error("Failed to fetch customer payments:", error);
    return [];
  }
}

export async function getTechnicianBookings() {
  try {
    return (await privateApi<Booking[]>("/api/technician/bookings")).data || [];
  } catch (error) {
    console.error("Failed to fetch technician bookings:", error);
    return [];
  }
}

export async function getMyServices() {
  try {
    return (await privateApi<Service[]>("/api/services/mine")).data || [];
  } catch (error) {
    try {
      return (await privateApi<Service[]>("/api/services/my-services")).data || [];
    } catch {
      console.error("Failed to fetch my services:", error);
      return [];
    }
  }
}

export async function getAdminUsers() {
  try {
    return (await privateApi<User[]>("/api/admin/users")).data || [];
  } catch (error) {
    console.error("Failed to fetch admin users:", error);
    return [];
  }
}

export async function getAdminBookings() {
  try {
    return (await privateApi<Booking[]>("/api/admin/bookings")).data || [];
  } catch (error) {
    console.error("Failed to fetch admin bookings:", error);
    return [];
  }
}

export async function getAdminPayments() {
  try {
    return (await privateApi<Payment[]>("/api/admin/payments")).data || [];
  } catch (error) {
    console.error("Failed to fetch admin payments:", error);
    return [];
  }
}

