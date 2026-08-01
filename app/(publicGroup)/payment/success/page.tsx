import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleCheck, ReceiptText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Payment Successful" };

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ bookingId?: string; session_id?: string }>;
}) {
  const { bookingId, session_id: sessionId } = await searchParams;

  return (
    <div className="mx-auto grid min-h-[68vh] max-w-2xl place-items-center px-4 py-12">
      <Card className="w-full overflow-hidden border-emerald-500/20 shadow-xl">
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-400 to-primary" />
        <CardContent className="space-y-6 p-7 text-center sm:p-10">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-emerald-500/10 text-emerald-600 ring-8 ring-emerald-500/5">
            <CircleCheck className="size-11" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Checkout returned successfully</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Payment submitted</h1>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              Stripe returned you to FixItNow. The Stripe webhook remains authoritative and updates the payment and booking status after confirmation.
            </p>
          </div>

          {(bookingId || sessionId) ? (
            <div className="grid gap-3 text-left sm:grid-cols-2">
              {bookingId ? <Reference label="Booking reference" value={bookingId} icon={ReceiptText} /> : null}
              {sessionId ? <Reference label="Stripe session" value={sessionId} icon={ShieldCheck} /> : null}
            </div>
          ) : null}

          <div className="rounded-xl border border-amber-500/20 bg-amber-500/8 p-3 text-xs leading-relaxed text-muted-foreground">
            A successful redirect does not fake a PAID status. Refresh your dashboard after the webhook has processed.
          </div>

          <Button asChild className="w-full sm:w-auto">
            <Link href="/dashboard/customer">Open customer dashboard <ArrowRight className="size-4" /></Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Reference({ label, value, icon: Icon }: { label: string; value: string; icon: typeof ReceiptText }) {
  return (
    <div className="rounded-xl border border-border/70 bg-muted/35 p-3">
      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground"><Icon className="size-3.5 text-primary" /> {label}</p>
      <p className="mt-1.5 break-all font-mono text-xs">{value}</p>
    </div>
  );
}
