import type { Metadata } from "next";
import { BookingStatusActions } from "@/components/technician/booking-status-actions";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateTime, formatMoney } from "@/lib/format";
import { getTechnicianBookings } from "@/lib/data";

export const metadata: Metadata = { title: "Technician Bookings" };

export default async function TechnicianBookingsPage() {
  const bookings = await getTechnicianBookings();
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Booking management</h1><p className="text-muted-foreground">Allowed transitions are enforced by the existing backend.</p></div><Card><CardContent className="overflow-x-auto p-0"><table className="w-full min-w-[950px] text-sm"><thead className="border-b bg-muted/50 text-left"><tr><th className="p-4">Customer</th><th className="p-4">Service</th><th className="p-4">Schedule</th><th className="p-4">Amount</th><th className="p-4">Status</th><th className="p-4">Action</th></tr></thead><tbody>{bookings.map((booking) => <tr key={booking.id} className="border-b align-top last:border-0"><td className="p-4"><p className="font-medium">{booking.customer?.name}</p><p className="text-xs text-muted-foreground">{booking.customer?.email}</p><p className="text-xs text-muted-foreground">{booking.customer?.phone}</p></td><td className="p-4">{booking.service?.title}</td><td className="p-4"><p>{formatDateTime(booking.scheduledAt)}</p><p className="max-w-52 text-xs text-muted-foreground">{booking.address}</p></td><td className="p-4">{formatMoney(booking.totalAmount)}</td><td className="p-4"><StatusBadge status={booking.status} /></td><td className="p-4"><BookingStatusActions bookingId={booking.id} status={booking.status} /></td></tr>)}{!bookings.length ? <tr><td colSpan={6} className="p-10 text-center text-muted-foreground">No booking requests.</td></tr> : null}</tbody></table></CardContent></Card></div>;
}

