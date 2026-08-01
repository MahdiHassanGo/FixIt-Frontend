"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarClock,
  CreditCard,
  FolderCog,
  LayoutDashboard,
  ListChecks,
  Settings,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Role, SidebarItem } from "@/lib/types";

const items: Record<Role, SidebarItem[]> = {
  CUSTOMER: [
    { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
    { label: "Profile", href: "/dashboard/profile", icon: Settings },
  ],
  TECHNICIAN: [
    { label: "Overview", href: "/dashboard/technician", icon: LayoutDashboard },
    { label: "Bookings", href: "/dashboard/technician/bookings", icon: ListChecks },
    { label: "Services", href: "/dashboard/technician/services", icon: Wrench },
    { label: "Availability", href: "/dashboard/technician/availability", icon: CalendarClock },
    { label: "Profile", href: "/dashboard/technician/profile", icon: Settings },
  ],
  ADMIN: [
    { label: "Overview", href: "/dashboard/admin", icon: ShieldCheck },
    { label: "Users", href: "/dashboard/admin/users", icon: Users },
    { label: "Categories", href: "/dashboard/admin/categories", icon: FolderCog },
    { label: "Bookings", href: "/dashboard/admin/bookings", icon: ListChecks },
    { label: "Payments", href: "/dashboard/admin/payments", icon: CreditCard },
    { label: "Profile", href: "/dashboard/profile", icon: Settings },
  ],
};

export function DashboardSidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  return (
    <aside className="w-full border-b bg-card md:min-h-[calc(100vh-4rem)] md:w-64 md:border-b-0 md:border-r">
      <nav className="flex gap-2 overflow-x-auto p-3 md:flex-col md:p-4">
        {items[role].map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
                active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

