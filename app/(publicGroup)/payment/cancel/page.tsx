import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CircleX, ReceiptText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Payment Cancelled" };

export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ bookingId?: string }>;
}) {
  const { bookingId } = await searchParams;

  return (
    <div className="mx-auto grid min-h-[68vh] max-w-2xl place-items-center px-4 py-12">
      <Card className="w-full overflow-hidden border-red-500/20 shadow-xl">
        <div className="h-2 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500" />
        <CardContent className="space-y-6 p-7 text-center sm:p-10">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-red-500/10 text-red-600 ring-8 ring-red-500/5">
            <CircleX className="size-11" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-700">Checkout not completed</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Payment cancelled</h1>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              No completed payment was recorded. You can reopen Stripe Checkout while the booking remains in the accepted state.
            </p>
          </div>

          {bookingId ? (
            <div className="mx-auto max-w-md rounded-xl border border-border/70 bg-muted/35 p-3 text-left">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground"><ReceiptText className="size-3.5 text-primary" /> Booking reference</p>
              <p className="mt-1.5 break-all font-mono text-xs">{bookingId}</p>
            </div>
          ) : null}

          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/dashboard/customer"><ArrowLeft className="size-4" /> Return to dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
