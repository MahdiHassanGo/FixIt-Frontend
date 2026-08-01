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
    { label: "Profile Settings", href: "/dashboard/profile", icon: Settings },
  ],
  TECHNICIAN: [
    { label: "Overview", href: "/dashboard/technician", icon: LayoutDashboard },
    { label: "Bookings", href: "/dashboard/technician/bookings", icon: ListChecks },
    { label: "My Services", href: "/dashboard/technician/services", icon: Wrench },
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
    <aside className="w-full border-b border-border/70 bg-card/80 backdrop-blur-xl md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:w-64 md:shrink-0 md:border-b-0 md:border-r">
      <div className="hidden border-b border-border/60 px-5 py-5 md:block">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">Workspace</p>
        <p className="mt-1 text-sm font-extrabold text-foreground">{role.charAt(0) + role.slice(1).toLowerCase()} Portal</p>
      </div>
      <nav className="flex gap-2 overflow-x-auto p-3 md:flex-col md:gap-1.5 md:p-4" aria-label="Dashboard navigation">
        {items[role].map((item) => {
          const isOverview = item.href === `/dashboard/${role.toLowerCase()}`;
          const active = isOverview ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all",
                active
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className={cn("size-4 shrink-0", active ? "text-primary-foreground" : "text-primary")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
