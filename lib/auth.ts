import "server-only";

import jwt, { type JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import type { Role } from "@/lib/types";

export type TokenPayload = JwtPayload & {
  id: string;
  name: string;
  email: string;
  role: Role;
};

const secureCookie = process.env.NODE_ENV === "production";

export async function setAuthCookies(accessToken: string, refreshToken?: string) {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: secureCookie,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  if (refreshToken) {
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: secureCookie,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}

export function decodeAccessToken(token: string) {
  return jwt.decode(token) as TokenPayload | null;
}

