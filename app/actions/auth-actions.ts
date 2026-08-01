"use server";

import { redirect } from "next/navigation";
import { publicApi } from "@/lib/api";
import {
  clearAuthCookies,
  decodeAccessToken,
  setAuthCookies,
} from "@/lib/auth";
import { dashboardForRole } from "@/lib/routes";
import { loginSchema, registerSchema } from "@/lib/schemas";
import type { ActionState, User } from "@/lib/types";
import { apiErrorState, zodState } from "@/app/actions/action-helpers";

function safeRedirect(value: string) {
  return value.startsWith("/") && !value.startsWith("//") ? value : null;
}

export async function loginAction(
  redirectTo: string,
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) return zodState(parsed.error);

  let destination = "/dashboard";

  try {
    const result = await publicApi<{
      accessToken: string;
      refreshToken: string;
      user: User;
    }>(
      "/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      },
      false,
    );

    await setAuthCookies(result.data.accessToken, result.data.refreshToken);
    const decoded = decodeAccessToken(result.data.accessToken);
    destination =
      safeRedirect(redirectTo) ||
      dashboardForRole(decoded?.role || result.data.user.role);
  } catch (error) {
    return apiErrorState(error);
  }

  redirect(destination);
}


export async function registerAction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    phone: formData.get("phone") || undefined,
    location: formData.get("location") || undefined,
    role: formData.get("role"),
  });

  if (!parsed.success) return zodState(parsed.error);

  try {
    await publicApi<User>(
      "/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      },
      false,
    );
  } catch (error) {
    return apiErrorState(error);
  }

  return redirect("/login?registered=1");
}

export async function logoutAction() {
  await clearAuthCookies();
  redirect("/login");
}