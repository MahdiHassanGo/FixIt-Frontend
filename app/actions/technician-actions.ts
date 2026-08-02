"use server";

import { revalidatePath } from "next/cache";
import { ApiError, jsonPrivateApi } from "@/lib/api";
import { days } from "@/lib/format";
import { serviceSchema, technicianProfileSchema } from "@/lib/schemas";
import type {
  ActionState,
  Availability,
  Booking,
  BookingStatus,
  Service,
  TechnicianProfile,
} from "@/lib/types";
import { apiErrorState, zodState } from "@/app/actions/action-helpers";

export async function updateTechnicianProfileAction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = technicianProfileSchema.safeParse({
    bio: formData.get("bio") || undefined,
    skills: formData.get("skills"),
    experienceYears: formData.get("experienceYears"),
    pricePerHour: formData.get("pricePerHour"),
    location: formData.get("location") || undefined,
  });

  if (!parsed.success) return zodState(parsed.error);

  try {
    await jsonPrivateApi<TechnicianProfile>("/api/technician/profile", "PUT", {
      ...parsed.data,
      skills: parsed.data.skills
        .split(",")
        .map((skill: string) => skill.trim())
        .filter(Boolean),
    });
    revalidatePath("/dashboard/technician", "layout");
    return { success: true, message: "Technician profile updated." };
  } catch (error) {
    return apiErrorState(error);
  }
}

export async function updateAvailabilityAction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const slots = days
    .filter((day) => formData.get(`enabled_${day}`) === "on")
    .map((day) => ({
      dayOfWeek: day,
      startTime: String(formData.get(`start_${day}`) || "09:00"),
      endTime: String(formData.get(`end_${day}`) || "17:00"),
      isAvailable: true,
    }));

  if (slots.some((slot) => slot.startTime >= slot.endTime)) {
    return {
      success: false,
      message: "Every start time must be earlier than its end time.",
    };
  }

  try {
    await jsonPrivateApi<Availability[]>("/api/technician/availability", "PUT", {
      slots,
    });
    revalidatePath("/dashboard/technician/availability");
    return { success: true, message: "Availability schedule updated." };
  } catch (error) {
    return apiErrorState(error);
  }
}

export async function createServiceAction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = serviceSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    location: formData.get("location") || undefined,
    categoryId: formData.get("categoryId"),
  });

  if (!parsed.success) return zodState(parsed.error);

  try {
    await jsonPrivateApi<Service>("/api/services", "POST", parsed.data);
    revalidatePath("/dashboard/technician/services");
    revalidatePath("/services");
    return { success: true, message: "Service created." };
  } catch (error) {
    return apiErrorState(error);
  }
}

export async function updateServiceAction(
  serviceId: string,
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = serviceSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    location: formData.get("location") || undefined,
    categoryId: formData.get("categoryId"),
    isActive: formData.get("isActive") === "on",
  });

  if (!parsed.success) return zodState(parsed.error);

  try {
    await jsonPrivateApi<Service>(`/api/services/${serviceId}`, "PATCH", parsed.data);
    revalidatePath("/dashboard/technician/services");
    revalidatePath("/services");
    return { success: true, message: "Service updated." };
  } catch (error) {
    return apiErrorState(error);
  }
}

export async function deleteServiceAction(
  serviceId: string,
  _previousState: ActionState,
  _formData: FormData,
): Promise<ActionState> {
  void _previousState;
  void _formData;

  try {
    await jsonPrivateApi<Service>(`/api/services/${serviceId}`, "DELETE");
    revalidatePath("/dashboard/technician/services");
    revalidatePath("/services");
    return { success: true, message: "Service removed from public listings." };
  } catch (error) {
    return apiErrorState(error);
  }
}

export async function updateBookingStatusAction(
  bookingId: string,
  status: BookingStatus,
  _previousState: ActionState,
  _formData: FormData,
): Promise<ActionState> {
  void _previousState;
  void _formData;

  try {
    try {
      await jsonPrivateApi<Booking>(
        `/api/technician/bookings/${bookingId}`,
        "PATCH",
        { status },
      );
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        await jsonPrivateApi<Booking>(
          `/api/technician/bookings/${bookingId}/status`,
          "PATCH",
          { status },
        );
      } else {
        throw error;
      }
    }
    revalidatePath("/dashboard/technician", "layout");
    return { success: true, message: `Booking moved to ${status}.` };
  } catch (error) {
    return apiErrorState(error);
  }
}

