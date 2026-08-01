import type { Metadata } from "next";
import Link from "next/link";
import { Banknote, CalendarClock, ListChecks, Wrench } from "lucide-react";
import { BookingStatusActions } from "@/components/technician/booking-status-actions";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime, formatMoney } from "@/lib/format";
import { getMyServices, getTechnicianBookings } from "@/lib/data";

export const metadata: Metadata = { title: "Technician Dashboard" };

export default async function TechnicianDashboardPage() {
  const [bookings, services] = await Promise.all([getTechnicianBookings(), getMyServices()]);
  const earnings = bookings.filter((booking) => booking.payment?.status === "COMPLETED").reduce((sum, booking) => sum + Number(booking.payment?.amount || 0), 0);
  const pending = bookings.filter((booking) => booking.status === "REQUESTED").length;
  const upcoming = bookings.filter((booking) => ["ACCEPTED", "PAID", "IN_PROGRESS"].includes(booking.status)).length;

  return <div className="space-y-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-bold">Technician dashboard</h1><p className="text-muted-foreground">Manage requests, services, availability, and job progress.</p></div><Button asChild><Link href="/dashboard/technician/services">Manage services</Link></Button></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Pending requests" value={pending} icon={ListChecks} /><StatCard label="Upcoming jobs" value={upcoming} icon={CalendarClock} /><StatCard label="Active services" value={services.filter((service) => service.isActive).length} icon={Wrench} /><StatCard label="Recorded earnings" value={formatMoney(earnings)} icon={Banknote} /></div><section className="space-y-4"><div className="flex items-center justify-between"><h2 className="text-2xl font-bold">Recent bookings</h2><Button asChild variant="outline"><Link href="/dashboard/technician/bookings">View all</Link></Button></div><div className="grid gap-4">{bookings.slice(0, 5).map((booking) => <Card key={booking.id}><CardHeader className="flex-row items-start justify-between"><div><CardTitle className="text-lg">{booking.service?.title}</CardTitle><p className="text-sm text-muted-foreground">Customer: {booking.customer?.name}</p></div><StatusBadge status={booking.status} /></CardHeader><CardContent className="flex flex-wrap items-end justify-between gap-4"><div className="text-sm"><p>{formatDateTime(booking.scheduledAt)}</p><p className="text-muted-foreground">{booking.address}</p></div><BookingStatusActions bookingId={booking.id} status={booking.status} /></CardContent></Card>)}{!bookings.length ? <div className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">No bookings assigned yet.</div> : null}</div></section></div>;
}

