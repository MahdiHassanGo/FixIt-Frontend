import "server-only";

import { cookies } from "next/headers";
import type { ApiErrorResponse, ApiResponse } from "@/lib/types";

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

function getBaseUrl() {
  const baseUrl = process.env.BACKEND_API_URL || "https://fix-it-now-6b1c.vercel.app";
  return baseUrl.replace(/\/$/, "");
}

async function parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const body = (await response.json().catch(() => null)) as
    | ApiResponse<T>
    | ApiErrorResponse
    | null;

  if (!response.ok || !body || !body.success) {
    const errorBody = body as ApiErrorResponse | null;
    throw new ApiError(
      errorBody?.message || `Request failed with status ${response.status}`,
      response.status,
      errorBody?.errorDetails,
    );
  }

  return body as ApiResponse<T>;
}

export async function publicApi<T>(
  path: string,
  init: RequestInit = {},
  revalidate: number | false = 60,
) {
  const response = await fetch(`${getBaseUrl()}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...init.headers,
    },
    ...(revalidate === false
      ? { cache: "no-store" as const }
      : { next: { revalidate } }),
  });

  return parseResponse<T>(response);
}

export async function privateApi<T>(path: string, init: RequestInit = {}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new ApiError("You are not logged in", 401);
  }

  const response = await fetch(`${getBaseUrl()}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...init.headers,
    },
  });

  return parseResponse<T>(response);
}

export async function jsonPrivateApi<T>(
  path: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  body?: unknown,
) {
  return privateApi<T>(path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

