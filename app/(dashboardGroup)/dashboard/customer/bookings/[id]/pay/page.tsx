import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PaymentButton } from "@/components/customer/payment-button";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApiError } from "@/lib/api";
import {
  formatDateTime,
  formatMoney,
} from "@/lib/format";
import { getBooking } from "@/lib/data";

export const metadata: Metadata = {
  title: "Pay for Booking",
};

type PaymentInitiationPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PaymentInitiationPage({
  params,
}: PaymentInitiationPageProps) {
  const { id } = await params;

  let booking;

  try {
    booking = await getBooking(id);
  } catch (error) {
    if (
      error instanceof ApiError &&
      error.status === 404
    ) {
      notFound();
    }

    throw error;
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Payment checkout
        </h1>

        <p className="text-muted-foreground">
          Stripe payment is available only when the
          technician has accepted the booking.
        </p>
      </div>

      <Card>
        <CardHeader className="flex-row items-start justify-between gap-4">
          <div>
            <CardTitle>
              {booking.service?.title ||
                "Service booking"}
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              {formatDateTime(
                booking.scheduledAt,
              )}
            </p>
          </div>

          <StatusBadge status={booking.status} />
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-xl bg-muted p-4">
            <p className="text-sm text-muted-foreground">
              Total amount
            </p>

            <p className="text-3xl font-bold">
              {formatMoney(
                booking.totalAmount,
              )}
            </p>
          </div>

          {booking.status === "ACCEPTED" ? (
            <PaymentButton
              bookingId={booking.id}
              fullWidth
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              Payment cannot start while the booking
              status is{" "}
              <strong>{booking.status}</strong>.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}