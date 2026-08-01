"use server";

import { revalidatePath } from "next/cache";
import { jsonPrivateApi } from "@/lib/api";
import { categorySchema } from "@/lib/schemas";
import type { ActionState, Category, User } from "@/lib/types";
import { apiErrorState, zodState } from "@/app/actions/action-helpers";

export async function updateUserStatusAction(
  userId: string,
  activeStatus: "ACTIVE" | "BLOCKED",
  _previousState: ActionState,
  _formData: FormData,
): Promise<ActionState> {
  void _previousState;
  void _formData;

  try {
    await jsonPrivateApi<User>(`/api/admin/users/${userId}/status`, "PATCH", {
      activeStatus,
    });
    revalidatePath("/dashboard/admin", "layout");
    return {
      success: true,
      message: activeStatus === "BLOCKED" ? "User blocked." : "User unblocked.",
    };
  } catch (error) {
    return apiErrorState(error);
  }
}

export async function createCategoryAction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = categorySchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description") || undefined,
  });

  if (!parsed.success) return zodState(parsed.error);

  try {
    await jsonPrivateApi<Category>("/api/admin/categories", "POST", parsed.data);
    revalidatePath("/dashboard/admin/categories");
    revalidatePath("/services");
    return { success: true, message: "Category created." };
  } catch (error) {
    return apiErrorState(error);
  }
}

export async function updateCategoryAction(
  categoryId: string,
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = categorySchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description") || undefined,
  });

  if (!parsed.success) return zodState(parsed.error);

  try {
    await jsonPrivateApi<Category>(`/api/categories/${categoryId}`, "PATCH", parsed.data);
    revalidatePath("/dashboard/admin/categories");
    revalidatePath("/services");
    return { success: true, message: "Category updated." };
  } catch (error) {
    return apiErrorState(error);
  }
}

export async function deleteCategoryAction(
  categoryId: string,
  _previousState: ActionState,
  _formData: FormData,
): Promise<ActionState> {
  void _previousState;
  void _formData;

  try {
    await jsonPrivateApi<Category>(`/api/categories/${categoryId}`, "DELETE");
    revalidatePath("/dashboard/admin/categories");
    revalidatePath("/services");
    return { success: true, message: "Category deleted." };
  } catch (error) {
    return apiErrorState(error);
  }
}

