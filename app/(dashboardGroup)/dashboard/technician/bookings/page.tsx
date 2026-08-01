import type { Metadata } from "next";
import { ListChecks } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { BookingStatusActions } from "@/components/technician/booking-status-actions";
import { Card, CardContent } from "@/components/ui/card";
import { getTechnicianBookings } from "@/lib/data";
import { formatDateTime, formatMoney } from "@/lib/format";

export const metadata: Metadata = { title: "Technician Bookings" };

export default async function TechnicianBookingsPage() {
  const bookings = await getTechnicianBookings();

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Operations"
        title="Booking management"
        description="Accept or decline requests, start paid jobs, and mark in-progress work as completed. Invalid transitions remain blocked by the backend."
      />

      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="data-table w-full min-w-[1020px] text-sm">
            <thead>
              <tr>
                <th className="text-left">Customer</th>
                <th className="text-left">Service</th>
                <th className="text-left">Schedule & address</th>
                <th className="text-left">Amount</th>
                <th className="text-left">Status</th>
                <th className="text-left">Next action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <p className="font-semibold">{booking.customer?.name || "Unknown"}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{booking.customer?.email || "No email"}</p>
                    <p className="text-xs text-muted-foreground">{booking.customer?.phone || "No phone"}</p>
                  </td>
                  <td className="font-medium">{booking.service?.title || "Service"}</td>
                  <td>
                    <p className="font-medium">{formatDateTime(booking.scheduledAt)}</p>
                    <p className="mt-1 max-w-64 text-xs leading-relaxed text-muted-foreground">{booking.address}</p>
                  </td>
                  <td className="font-bold">{formatMoney(booking.totalAmount)}</td>
                  <td><StatusBadge status={booking.status} /></td>
                  <td><BookingStatusActions bookingId={booking.id} status={booking.status} /></td>
                </tr>
              ))}
              {!bookings.length ? (
                <tr><td colSpan={6} className="py-14 text-center text-muted-foreground"><ListChecks className="mx-auto mb-2 size-6 text-primary" />No booking requests found.</td></tr>
              ) : null}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
