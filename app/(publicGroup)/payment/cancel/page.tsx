import type { Metadata } from "next";
import Link from "next/link";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Payment Cancelled" };

export default async function PaymentCancelPage({ searchParams }: { searchParams: Promise<{ bookingId?: string }> }) {
  const bookingId = (await searchParams).bookingId;
  return <div className="mx-auto grid min-h-[65vh] max-w-xl place-items-center px-4 py-12"><Card className="w-full"><CardContent className="space-y-5 p-8 text-center"><CircleX className="mx-auto size-16 text-destructive" /><h1 className="text-3xl font-bold">Payment was cancelled</h1><p className="text-muted-foreground">No completed payment was recorded. You can return to the booking and start Stripe Checkout again while it remains accepted.</p>{bookingId ? <p className="rounded-lg bg-muted p-3 font-mono text-xs">Booking: {bookingId}</p> : null}<Button asChild variant="outline" className="w-full"><Link href="/dashboard/customer">Return to dashboard</Link></Button></CardContent></Card></div>;
}

