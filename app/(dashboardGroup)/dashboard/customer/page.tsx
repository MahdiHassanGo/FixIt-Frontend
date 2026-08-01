import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarDays,
  CircleCheckBig,
  CreditCard,
  ListChecks,
  MapPin,
  Plus,
  ReceiptText,
  UserRound,
} from "lucide-react";

import { cancelBookingAction } from "@/app/actions/customer-actions";
import { ActionButton } from "@/components/customer/action-button";
import { PaymentButton } from "@/components/customer/payment-button";
import { ReviewForm } from "@/components/customer/review-form";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCustomerBookings, getCustomerPayments } from "@/lib/data";
import { canCustomerCancel, formatDateTime, formatMoney } from "@/lib/format";

export const metadata: Metadata = { title: "Customer Dashboard" };

export default async function CustomerDashboardPage() {
  const [bookings, payments] = await Promise.all([
    getCustomerBookings(),
    getCustomerPayments(),
  ]);

  const paidTotal = payments
    .filter((payment) => payment.status === "COMPLETED")
    .reduce((total, payment) => total + Number(payment.amount), 0);
  const upcomingBookings = bookings.filter((booking) => ["ACCEPTED", "PAID", "IN_PROGRESS"].includes(booking.status)).length;
  const completedBookings = bookings.filter((booking) => booking.status === "COMPLETED").length;

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Customer workspace"
        title="Your service activity"
        description="Track booking requests, complete accepted payments, follow job progress, and review finished work."
        actions={
          <Button asChild>
            <Link href="/services"><Plus className="size-4" /> Book a service</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total bookings" value={bookings.length} icon={ListChecks} hint="All requests" />
        <StatCard label="Upcoming jobs" value={upcomingBookings} icon={CalendarDays} hint="Accepted or active" />
        <StatCard label="Completed" value={completedBookings} icon={CircleCheckBig} hint="Ready for reviews" />
        <StatCard label="Total paid" value={formatMoney(paidTotal)} icon={CreditCard} hint="Completed payments" />
      </div>

      <section id="bookings" className="scroll-mt-24 space-y-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Booking history</h2>
          <p className="mt-1 text-sm text-muted-foreground">Actions automatically change according to each booking status.</p>
        </div>

        {bookings.length ? (
          <div className="grid gap-5">
            {bookings.map((booking) => (
              <Card key={booking.id} className="overflow-visible border-border/70">
                <CardHeader className="flex-row items-start justify-between gap-4 border-b border-border/60 pb-5">
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">Booking #{booking.id.slice(0, 8)}</p>
                    <CardTitle className="mt-1 truncate text-xl">{booking.service?.title || "Service booking"}</CardTitle>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <UserRound className="size-4" /> {booking.technician?.user?.name || "Technician not available"}
                    </p>
                  </div>
                  <StatusBadge status={booking.status} />
                </CardHeader>

                <CardContent className="space-y-5 p-5 sm:p-6">
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <Detail label="Scheduled" value={formatDateTime(booking.scheduledAt)} icon={CalendarDays} />
                    <Detail label="Amount" value={formatMoney(booking.totalAmount)} icon={ReceiptText} />
                    <Detail label="Service address" value={booking.address} icon={MapPin} />
                    <Detail label="Requested" value={formatDateTime(booking.createdAt)} icon={ListChecks} />
                  </div>

                  {booking.note ? (
                    <div className="rounded-xl border border-border/60 bg-muted/35 p-3 text-sm">
                      <span className="font-bold">Your note:</span> <span className="text-muted-foreground">{booking.note}</span>
                    </div>
                  ) : null}

                  <div className="flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
                    {booking.status === "ACCEPTED" ? (
                      <>
                        <PaymentButton bookingId={booking.id} />
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/dashboard/customer/bookings/${booking.id}/pay`}>Payment details</Link>
                        </Button>
                      </>
                    ) : null}

                    {canCustomerCancel(booking.status) ? (
                      <ActionButton
                        action={cancelBookingAction.bind(null, booking.id)}
                        label="Cancel booking"
                        pendingLabel="Cancelling..."
                        variant="destructive"
                      />
                    ) : null}

                    {!canCustomerCancel(booking.status) && booking.status !== "COMPLETED" ? (
                      <p className="text-xs text-muted-foreground">No customer action is available at this stage.</p>
                    ) : null}
                  </div>

                  {booking.status === "COMPLETED" && !booking.review ? <ReviewForm bookingId={booking.id} /> : null}
                  {booking.review ? (
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm">
                      <p className="font-bold">Your review: {booking.review.rating}/5</p>
                      <p className="mt-1 text-muted-foreground">{booking.review.comment || "No written comment."}</p>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={ListChecks}
            title="No bookings yet"
            description="Browse the marketplace and submit your first home-service request."
            action={<Button asChild size="sm"><Link href="/services">Browse services</Link></Button>}
          />
        )}
      </section>

      <section id="payments" className="scroll-mt-24 space-y-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Payment history</h2>
          <p className="mt-1 text-sm text-muted-foreground">Stripe transactions associated with your bookings.</p>
        </div>

        <Card>
          <CardContent className="overflow-x-auto p-0">
            <table className="data-table w-full min-w-[760px] text-sm">
              <thead>
                <tr>
                  <th className="text-left">Transaction</th>
                  <th className="text-left">Service</th>
                  <th className="text-left">Amount</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Created</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="font-mono text-xs">{payment.transactionId}</td>
                    <td className="font-medium">{payment.booking?.service?.title || "Service"}</td>
                    <td className="font-semibold">{formatMoney(payment.amount, payment.currency)}</td>
                    <td><StatusBadge status={payment.status} /></td>
                    <td className="text-muted-foreground">{formatDateTime(payment.createdAt)}</td>
                  </tr>
                ))}
                {!payments.length ? (
                  <tr><td colSpan={5} className="py-12 text-center text-muted-foreground">No payments recorded yet.</td></tr>
                ) : null}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function Detail({ label, value, icon: Icon }: { label: string; value: string; icon: typeof CalendarDays }) {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/25 p-3">
      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground"><Icon className="size-3.5 text-primary" /> {label}</p>
      <p className="mt-1.5 break-words text-sm font-semibold leading-relaxed">{value}</p>
    </div>
  );
}
