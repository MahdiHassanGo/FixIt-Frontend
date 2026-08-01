import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Payment Successful" };

export default async function PaymentSuccessPage({ searchParams }: { searchParams: Promise<{ bookingId?: string }> }) {
  const bookingId = (await searchParams).bookingId;
  return <div className="mx-auto grid min-h-[65vh] max-w-xl place-items-center px-4 py-12"><Card className="w-full"><CardContent className="space-y-5 p-8 text-center"><CircleCheck className="mx-auto size-16 text-primary" /><h1 className="text-3xl font-bold">Payment submitted successfully</h1><p className="text-muted-foreground">Stripe has returned you to FixItNow. The webhook updates the payment and booking records; this can take a few seconds.</p>{bookingId ? <p className="rounded-lg bg-muted p-3 font-mono text-xs">Booking: {bookingId}</p> : null}<Button asChild className="w-full"><Link href="/dashboard/customer">Return to customer dashboard</Link></Button></CardContent></Card></div>;
}

