import type { Metadata } from "next";
import Link from "next/link";
import { Banknote, CalendarCheck, FolderCog, Users } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminBookings, getAdminPayments, getAdminUsers, getCategories } from "@/lib/data";
import { formatMoney } from "@/lib/format";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default async function AdminDashboardPage() {
  const [users, bookings, payments, categories] = await Promise.all([
    getAdminUsers(),
    getAdminBookings(),
    getAdminPayments(),
    getCategories(),
  ]);

  const revenue = payments
    .filter((payment) => payment.status === "COMPLETED")
    .reduce((sum, payment) => sum + Number(payment.amount), 0);
  const activeBookings = bookings.filter((booking) => ["REQUESTED", "ACCEPTED", "PAID", "IN_PROGRESS"].includes(booking.status)).length;

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Platform control"
        title="Admin overview"
        description="Monitor platform health, review recent activity, and jump into moderation tools for users, bookings, payments, and categories."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total users" value={users.length} icon={Users} hint={`${users.filter((user) => user.activeStatus === "BLOCKED").length} blocked`} />
        <StatCard label="Active bookings" value={activeBookings} icon={CalendarCheck} hint={`${bookings.length} total`} />
        <StatCard label="Categories" value={categories.length} icon={FolderCog} hint="Marketplace groups" />
        <StatCard label="Completed revenue" value={formatMoney(revenue)} icon={Banknote} hint={`${payments.length} transactions`} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between gap-4 border-b border-border/60 pb-5">
            <CardTitle>Recent users</CardTitle>
            <Button asChild variant="outline" size="sm"><Link href="/dashboard/admin/users">Manage users</Link></Button>
          </CardHeader>
          <CardContent className="space-y-3 p-5">
            {users.slice(0, 6).map((user) => (
              <div key={user.id} className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-muted/20 p-3.5">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email} · {user.role}</p>
                </div>
                <Badge variant={user.activeStatus === "ACTIVE" ? "default" : "destructive"}>{user.activeStatus}</Badge>
              </div>
            ))}
            {!users.length ? <p className="py-10 text-center text-sm text-muted-foreground">No users returned by the API.</p> : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between gap-4 border-b border-border/60 pb-5">
            <CardTitle>Recent bookings</CardTitle>
            <Button asChild variant="outline" size="sm"><Link href="/dashboard/admin/bookings">View bookings</Link></Button>
          </CardHeader>
          <CardContent className="space-y-3 p-5">
            {bookings.slice(0, 6).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-muted/20 p-3.5">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{booking.service?.title || "Service booking"}</p>
                  <p className="truncate text-xs text-muted-foreground">{booking.customer?.name || "Customer"} → {booking.technician?.user?.name || "Technician"}</p>
                </div>
                <StatusBadge status={booking.status} />
              </div>
            ))}
            {!bookings.length ? <p className="py-10 text-center text-sm text-muted-foreground">No bookings returned by the API.</p> : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
