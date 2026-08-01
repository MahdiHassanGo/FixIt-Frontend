import "server-only";

import { ApiError } from "@/lib/api";
import type { ActionState } from "@/lib/types";
import type { ZodError } from "zod";

export function zodState(error: ZodError): ActionState {
  return {
    success: false,
    message: "Please correct the highlighted fields.",
    fieldErrors: error.flatten().fieldErrors as Record<string, string[]>,
  };
}

export function apiErrorState(error: unknown): ActionState {
  if (error instanceof ApiError) {
    return {
      success: false,
      message: error.message,
    };
  }

  console.error(error);

  return {
    success: false,
    message: "Something went wrong. Please try again.",
  };
}