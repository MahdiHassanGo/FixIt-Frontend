import type { Metadata } from "next";
import Link from "next/link";
import { Banknote, CalendarClock, ListChecks, Plus, Wrench } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { BookingStatusActions } from "@/components/technician/booking-status-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyServices, getTechnicianBookings } from "@/lib/data";
import { formatDateTime, formatMoney } from "@/lib/format";

export const metadata: Metadata = { title: "Technician Dashboard" };

export default async function TechnicianDashboardPage() {
  const [bookings, services] = await Promise.all([getTechnicianBookings(), getMyServices()]);
  const earnings = bookings
    .filter((booking) => booking.payment?.status === "COMPLETED")
    .reduce((sum, booking) => sum + Number(booking.payment?.amount || 0), 0);
  const pending = bookings.filter((booking) => booking.status === "REQUESTED").length;
  const upcoming = bookings.filter((booking) => ["ACCEPTED", "PAID", "IN_PROGRESS"].includes(booking.status)).length;

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Technician workspace"
        title="Manage your service business"
        description="Respond to requests, keep availability accurate, publish services, and move paid jobs through completion."
        actions={
          <Button asChild><Link href="/dashboard/technician/services"><Plus className="size-4" /> Manage services</Link></Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending requests" value={pending} icon={ListChecks} hint="Need a response" />
        <StatCard label="Upcoming jobs" value={upcoming} icon={CalendarClock} hint="Accepted or active" />
        <StatCard label="Active services" value={services.filter((service) => service.isActive).length} icon={Wrench} hint={`${services.length} total`} />
        <StatCard label="Recorded earnings" value={formatMoney(earnings)} icon={Banknote} hint="Completed payments" />
      </div>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black tracking-tight">Recent bookings</h2>
            <p className="mt-1 text-sm text-muted-foreground">The next permitted action is shown for each request.</p>
          </div>
          <Button asChild variant="outline" size="sm"><Link href="/dashboard/technician/bookings">View all bookings</Link></Button>
        </div>

        {bookings.length ? (
          <div className="grid gap-4">
            {bookings.slice(0, 5).map((booking) => (
              <Card key={booking.id}>
                <CardHeader className="flex-row items-start justify-between gap-4 border-b border-border/60 pb-5">
                  <div className="min-w-0">
                    <CardTitle className="truncate text-lg">{booking.service?.title || "Service booking"}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">Customer: {booking.customer?.name || "Unknown"}</p>
                  </div>
                  <StatusBadge status={booking.status} />
                </CardHeader>
                <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between">
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold">{formatDateTime(booking.scheduledAt)}</p>
                    <p className="text-muted-foreground">{booking.address}</p>
                    <p className="font-bold text-primary">{formatMoney(booking.totalAmount)}</p>
                  </div>
                  <BookingStatusActions bookingId={booking.id} status={booking.status} />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState icon={ListChecks} title="No booking requests" description="New customer requests will appear here when they select one of your active services." />
        )}
      </section>
    </div>
  );
}
