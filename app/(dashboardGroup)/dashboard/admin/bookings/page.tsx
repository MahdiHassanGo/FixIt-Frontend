import type { Metadata } from "next";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAdminBookings } from "@/lib/data";
import { formatDateTime, formatMoney } from "@/lib/format";

export const metadata: Metadata = { title: "All Bookings" };

export default async function AdminBookingsPage() {
  const bookings = await getAdminBookings();

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Platform records"
        title="All bookings"
        description="A read-only moderation view of customer, technician, schedule, value, and lifecycle status across the platform."
      />
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="data-table w-full min-w-[1050px] text-sm">
            <thead><tr><th className="text-left">Service</th><th className="text-left">Customer</th><th className="text-left">Technician</th><th className="text-left">Schedule</th><th className="text-left">Amount</th><th className="text-left">Status</th></tr></thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="font-semibold">{booking.service?.title || "Service"}</td>
                  <td><p>{booking.customer?.name || "Unknown"}</p><p className="mt-1 text-xs text-muted-foreground">{booking.customer?.email || "No email"}</p></td>
                  <td>{booking.technician?.user?.name || "Unknown"}</td>
                  <td className="text-muted-foreground">{formatDateTime(booking.scheduledAt)}</td>
                  <td className="font-bold">{formatMoney(booking.totalAmount)}</td>
                  <td><StatusBadge status={booking.status} /></td>
                </tr>
              ))}
              {!bookings.length ? <tr><td colSpan={6} className="py-14 text-center text-muted-foreground">No bookings returned by the admin API.</td></tr> : null}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
