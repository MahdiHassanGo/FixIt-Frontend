"use server";

import { revalidatePath } from "next/cache";
import { jsonPrivateApi } from "@/lib/api";
import { bookingSchema, profileSchema, reviewSchema } from "@/lib/schemas";
import type { ActionState, Booking, Review, User } from "@/lib/types";
import { apiErrorState, zodState } from "@/app/actions/action-helpers";

export async function updateProfileAction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone") || undefined,
    location: formData.get("location") || undefined,
  });

  if (!parsed.success) return zodState(parsed.error);

  try {
    await jsonPrivateApi<User>("/api/users/me", "PATCH", parsed.data);
    revalidatePath("/dashboard", "layout");
    return { success: true, message: "Profile updated successfully." };
  } catch (error) {
    return apiErrorState(error);
  }
}

export async function createBookingAction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = bookingSchema.safeParse({
    serviceId: formData.get("serviceId"),
    scheduledAt: formData.get("scheduledAt"),
    address: formData.get("address"),
    note: formData.get("note") || undefined,
  });

  if (!parsed.success) return zodState(parsed.error);

  if (new Date(parsed.data.scheduledAt) <= new Date()) {
    return {
      success: false,
      message: "Choose a future date and time.",
      fieldErrors: { scheduledAt: ["Choose a future date and time"] },
    };
  }

  try {
    await jsonPrivateApi<Booking>("/api/bookings", "POST", parsed.data);
    revalidatePath("/dashboard/customer");
    return {
      success: true,
      message: "Booking request submitted. Wait for technician acceptance.",
    };
  } catch (error) {
    return apiErrorState(error);
  }
}

export async function cancelBookingAction(
  bookingId: string,
  _previousState: ActionState,
  _formData: FormData,
): Promise<ActionState> {
  void _previousState;
  void _formData;

  try {
    await jsonPrivateApi<Booking>(`/api/bookings/${bookingId}/cancel`, "PATCH");
    revalidatePath("/dashboard/customer");
    return { success: true, message: "Booking cancelled." };
  } catch (error) {
    return apiErrorState(error);
  }
}

export async function createReviewAction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = reviewSchema.safeParse({
    bookingId: formData.get("bookingId"),
    rating: formData.get("rating"),
    comment: formData.get("comment") || undefined,
  });

  if (!parsed.success) return zodState(parsed.error);

  try {
    await jsonPrivateApi<Review>("/api/reviews", "POST", parsed.data);
    revalidatePath("/dashboard/customer");
    return { success: true, message: "Review submitted. Thank you." };
  } catch (error) {
    return apiErrorState(error);
  }
}

export async function createCheckoutAction(
  bookingId: string,
  _previousState: ActionState,
  _formData: FormData,
): Promise<ActionState> {
  void _previousState;
  void _formData;

  try {
    const response = await jsonPrivateApi<{
      payment: unknown;
      checkoutUrl: string | null;
    }>("/api/payments/create-checkout-session", "POST", { bookingId });

    if (!response.data.checkoutUrl) {
      return { success: false, message: "Stripe checkout URL was not returned." };
    }

    return {
      success: true,
      message: "Redirecting to Stripe Checkout...",
      checkoutUrl: response.data.checkoutUrl,
    };
  } catch (error) {
    return apiErrorState(error);
  }
}