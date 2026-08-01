import type { Role } from "@/lib/types";

export function dashboardForRole(role: Role) {
  if (role === "ADMIN") return "/dashboard/admin";
  if (role === "TECHNICIAN") return "/dashboard/technician";
  return "/dashboard/customer";
}

