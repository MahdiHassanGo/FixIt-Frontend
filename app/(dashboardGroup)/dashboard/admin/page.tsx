import type { Metadata } from "next";
import Link from "next/link";
import { Banknote, CalendarCheck, FolderCog, Users } from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMoney } from "@/lib/format";
import { getAdminBookings, getAdminPayments, getAdminUsers, getCategories } from "@/lib/data";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default async function AdminDashboardPage() {
  const [users, bookings, payments, categories] = await Promise.all([getAdminUsers(), getAdminBookings(), getAdminPayments(), getCategories()]);
  const revenue = payments.filter((payment) => payment.status === "COMPLETED").reduce((sum, payment) => sum + Number(payment.amount), 0);
  const activeBookings = bookings.filter((booking) => ["REQUESTED", "ACCEPTED", "PAID", "IN_PROGRESS"].includes(booking.status)).length;
  return <div className="space-y-8"><div><h1 className="text-3xl font-bold">Admin dashboard</h1><p className="text-muted-foreground">Global platform statistics and moderation shortcuts.</p></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Total users" value={users.length} icon={Users} /><StatCard label="Active bookings" value={activeBookings} icon={CalendarCheck} /><StatCard label="Categories" value={categories.length} icon={FolderCog} /><StatCard label="Completed revenue" value={formatMoney(revenue)} icon={Banknote} /></div><div className="grid gap-6 xl:grid-cols-2"><Card><CardHeader className="flex-row items-center justify-between"><CardTitle>Recent users</CardTitle><Button asChild variant="outline" size="sm"><Link href="/dashboard/admin/users">Manage users</Link></Button></CardHeader><CardContent className="space-y-3">{users.slice(0, 6).map((user) => <div key={user.id} className="flex items-center justify-between rounded-xl border p-3"><div><p className="font-medium">{user.name}</p><p className="text-xs text-muted-foreground">{user.email} · {user.role}</p></div><span className="text-sm">{user.activeStatus}</span></div>)}</CardContent></Card><Card><CardHeader className="flex-row items-center justify-between"><CardTitle>Recent bookings</CardTitle><Button asChild variant="outline" size="sm"><Link href="/dashboard/admin/bookings">View bookings</Link></Button></CardHeader><CardContent className="space-y-3">{bookings.slice(0, 6).map((booking) => <div key={booking.id} className="flex items-center justify-between gap-3 rounded-xl border p-3"><div><p className="font-medium">{booking.service?.title}</p><p className="text-xs text-muted-foreground">{booking.customer?.name} → {booking.technician?.user?.name}</p></div><StatusBadge status={booking.status} /></div>)}</CardContent></Card></div></div>;
}

