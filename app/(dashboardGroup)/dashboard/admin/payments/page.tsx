import type { Metadata } from "next";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateTime, formatMoney } from "@/lib/format";
import { getAdminPayments } from "@/lib/data";

export const metadata: Metadata = { title: "All Payments" };

export default async function AdminPaymentsPage() {
  const payments = await getAdminPayments();
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold">All payments</h1><p className="text-muted-foreground">Stripe transaction records returned by the admin API.</p></div><Card><CardContent className="overflow-x-auto p-0"><table className="w-full min-w-[900px] text-sm"><thead className="border-b bg-muted/50 text-left"><tr><th className="p-4">Transaction</th><th className="p-4">Customer</th><th className="p-4">Service</th><th className="p-4">Amount</th><th className="p-4">Status</th><th className="p-4">Created</th></tr></thead><tbody>{payments.map((payment) => <tr key={payment.id} className="border-b last:border-0"><td className="p-4 font-mono text-xs">{payment.transactionId}</td><td className="p-4">{payment.user?.name}<br /><span className="text-xs text-muted-foreground">{payment.user?.email}</span></td><td className="p-4">{payment.booking?.service?.title}</td><td className="p-4">{formatMoney(payment.amount, payment.currency)}</td><td className="p-4"><StatusBadge status={payment.status} /></td><td className="p-4">{formatDateTime(payment.createdAt)}</td></tr>)}</tbody></table></CardContent></Card></div>;
}

