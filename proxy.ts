import jwt, { type JwtPayload } from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { Role } from "@/lib/types";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/services", "/technicians", "/payment/success", "/payment/cancel"];

function verify(token: string | undefined, secret: string | undefined) {
  if (!token || !secret) return null;
  try { return jwt.verify(token, secret) as JwtPayload & { role: Role }; }
  catch { return null; }
}

function dashboard(role: Role) {
  if (role === "ADMIN") return "/dashboard/admin";
  if (role === "TECHNICIAN") return "/dashboard/technician";
  return "/dashboard/customer";
}

function isRoute(pathname: string, routes: string[]) {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  let payload = verify(accessToken, process.env.JWT_ACCESS_SECRET);
  let refreshedAccessToken: string | null = null;

  if (!payload && refreshToken && verify(refreshToken, process.env.JWT_REFRESH_SECRET)) {
    try {
      const response = await fetch(`${process.env.BACKEND_API_URL}/api/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
        cache: "no-store",
      });
      const result = await response.json();
      if (response.ok && result.success) {
        accessToken = result.data.accessToken;
        refreshedAccessToken = accessToken || null;
        payload = verify(accessToken, process.env.JWT_ACCESS_SECRET);
      }
    } catch {
      payload = null;
    }
  }

  const finalize = (response: NextResponse) => {
    if (refreshedAccessToken) {
      response.cookies.set("accessToken", refreshedAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24,
      });
    }
    if (!payload && (accessToken || refreshToken)) {
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
    }
    return response;
  };

  if (payload && isRoute(pathname, AUTH_ROUTES)) {
    return finalize(NextResponse.redirect(new URL(dashboard(payload.role), request.url)));
  }

  const isPublic = isRoute(pathname, PUBLIC_ROUTES);
  const isAuth = isRoute(pathname, AUTH_ROUTES);
  if (!payload && !isPublic && !isAuth) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return finalize(NextResponse.redirect(loginUrl));
  }

  if (payload && pathname.startsWith("/dashboard/customer") && payload.role !== "CUSTOMER") return finalize(NextResponse.redirect(new URL(dashboard(payload.role), request.url)));
  if (payload && pathname.startsWith("/dashboard/technician") && payload.role !== "TECHNICIAN") return finalize(NextResponse.redirect(new URL(dashboard(payload.role), request.url)));
  if (payload && pathname.startsWith("/dashboard/admin") && payload.role !== "ADMIN") return finalize(NextResponse.redirect(new URL(dashboard(payload.role), request.url)));

  return finalize(NextResponse.next());
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};