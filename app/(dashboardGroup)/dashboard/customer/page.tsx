import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarDays,
  CreditCard,
  ListChecks,
  WalletCards,
} from "lucide-react";

import { cancelBookingAction } from "@/app/actions/customer-actions";
import { ActionButton } from "@/components/customer/action-button";
import { PaymentButton } from "@/components/customer/payment-button";
import { ReviewForm } from "@/components/customer/review-form";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  canCustomerCancel,
  formatDateTime,
  formatMoney,
} from "@/lib/format";
import {
  getCustomerBookings,
  getCustomerPayments,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Customer Dashboard",
};

export default async function CustomerDashboardPage() {
  /*
   * Important:
   * This page must call customer endpoints only.
   *
   * getCustomerBookings() -> GET /api/bookings
   * getCustomerPayments() -> GET /api/payments
   *
   * Do not call:
   * getAdminUsers()
   * getAdminBookings()
   * getAdminPayments()
   */
  const [bookings, payments] = await Promise.all([
    getCustomerBookings(),
    getCustomerPayments(),
  ]);

  const paidTotal = payments
    .filter((payment) => payment.status === "COMPLETED")
    .reduce(
      (total, payment) => total + Number(payment.amount),
      0,
    );

  const upcomingBookings = bookings.filter((booking) =>
    ["ACCEPTED", "PAID", "IN_PROGRESS"].includes(
      booking.status,
    ),
  ).length;

  const completedBookings = bookings.filter(
    (booking) => booking.status === "COMPLETED",
  ).length;

  return (
    <div className="space-y-8">
      {/* Dashboard heading */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Customer dashboard
          </h1>

          <p className="text-muted-foreground">
            Track booking requests, payments,
            cancellations, and reviews.
          </p>
        </div>

        <Button asChild>
          <Link href="/services">
            Book another service
          </Link>
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total bookings"
          value={bookings.length}
          icon={ListChecks}
        />

        <StatCard
          label="Upcoming jobs"
          value={upcomingBookings}
          icon={CalendarDays}
        />

        <StatCard
          label="Completed"
          value={completedBookings}
          icon={WalletCards}
        />

        <StatCard
          label="Total paid"
          value={formatMoney(paidTotal)}
          icon={CreditCard}
        />
      </div>

      {/* Booking history */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Booking history
        </h2>

        {bookings.length > 0 ? (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader className="flex-row items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">
                      {booking.service?.title ||
                        "Service booking"}
                    </CardTitle>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Technician:{" "}
                      {booking.technician?.user?.name ||
                        "Unknown"}
                    </p>
                  </div>

                  <StatusBadge status={booking.status} />
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
                    <p>
                      <span className="text-muted-foreground">
                        Scheduled:
                      </span>

                      <br />

                      {formatDateTime(
                        booking.scheduledAt,
                      )}
                    </p>

                    <p>
                      <span className="text-muted-foreground">
                        Amount:
                      </span>

                      <br />

                      {formatMoney(
                        booking.totalAmount,
                      )}
                    </p>

                    <p>
                      <span className="text-muted-foreground">
                        Address:
                      </span>

                      <br />

                      {booking.address}
                    </p>

                    <p>
                      <span className="text-muted-foreground">
                        Requested:
                      </span>

                      <br />

                      {formatDateTime(
                        booking.createdAt,
                      )}
                    </p>
                  </div>

                  {/* Booking action buttons */}
                  <div className="flex flex-wrap gap-2">
                    {booking.status === "ACCEPTED" ? (
                      <>
                        <PaymentButton
                          bookingId={booking.id}
                        />

                        <Button
                          asChild
                          variant="outline"
                        >
                          <Link
                            href={`/dashboard/customer/bookings/${booking.id}/pay`}
                          >
                            Payment details
                          </Link>
                        </Button>
                      </>
                    ) : null}

                    {canCustomerCancel(
                      booking.status,
                    ) ? (
                      <ActionButton
                        action={cancelBookingAction.bind(
                          null,
                          booking.id,
                        )}
                        label="Cancel booking"
                        pendingLabel="Cancelling..."
                        variant="destructive"
                      />
                    ) : null}
                  </div>

                  {/* Review form */}
                  {booking.status === "COMPLETED" &&
                  !booking.review ? (
                    <ReviewForm
                      bookingId={booking.id}
                    />
                  ) : null}

                  {/* Existing review */}
                  {booking.review ? (
                    <p className="rounded-xl bg-muted p-3 text-sm">
                      Your review:{" "}
                      {booking.review.rating}/5 —{" "}
                      {booking.review.comment ||
                        "No comment"}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
            No bookings yet.
          </div>
        )}
      </section>

      {/* Payment history */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Payment history
        </h2>

        <Card>
          <CardContent className="overflow-x-auto p-0">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="border-b bg-muted/50 text-left">
                <tr>
                  <th className="p-4">
                    Transaction
                  </th>

                  <th className="p-4">
                    Service
                  </th>

                  <th className="p-4">
                    Amount
                  </th>

                  <th className="p-4">
                    Status
                  </th>

                  <th className="p-4">
                    Created
                  </th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b last:border-0"
                  >
                    <td className="p-4 font-mono text-xs">
                      {payment.transactionId}
                    </td>

                    <td className="p-4">
                      {payment.booking?.service
                        ?.title || "Service"}
                    </td>

                    <td className="p-4">
                      {formatMoney(
                        payment.amount,
                        payment.currency,
                      )}
                    </td>

                    <td className="p-4">
                      <StatusBadge
                        status={payment.status}
                      />
                    </td>

                    <td className="p-4">
                      {formatDateTime(
                        payment.createdAt,
                      )}
                    </td>
                  </tr>
                ))}

                {payments.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-8 text-center text-muted-foreground"
                    >
                      No payments yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}