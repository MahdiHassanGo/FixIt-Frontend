import type { Metadata } from "next";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateTime, formatMoney } from "@/lib/format";
import { getAdminBookings } from "@/lib/data";

export const metadata: Metadata = { title: "All Bookings" };

export default async function AdminBookingsPage() {
  const bookings = await getAdminBookings();
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold">All bookings</h1><p className="text-muted-foreground">Read-only platform-wide booking moderation view.</p></div><Card><CardContent className="overflow-x-auto p-0"><table className="w-full min-w-[1000px] text-sm"><thead className="border-b bg-muted/50 text-left"><tr><th className="p-4">Service</th><th className="p-4">Customer</th><th className="p-4">Technician</th><th className="p-4">Schedule</th><th className="p-4">Amount</th><th className="p-4">Status</th></tr></thead><tbody>{bookings.map((booking) => <tr key={booking.id} className="border-b last:border-0"><td className="p-4">{booking.service?.title}</td><td className="p-4">{booking.customer?.name}<br /><span className="text-xs text-muted-foreground">{booking.customer?.email}</span></td><td className="p-4">{booking.technician?.user?.name}</td><td className="p-4">{formatDateTime(booking.scheduledAt)}</td><td className="p-4">{formatMoney(booking.totalAmount)}</td><td className="p-4"><StatusBadge status={booking.status} /></td></tr>)}</tbody></table></CardContent></Card></div>;
}

