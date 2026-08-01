import type { Metadata } from "next";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAdminPayments } from "@/lib/data";
import { formatDateTime, formatMoney } from "@/lib/format";

export const metadata: Metadata = { title: "All Payments" };

export default async function AdminPaymentsPage() {
  const payments = await getAdminPayments();

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Finance"
        title="Payment records"
        description="Review Stripe transaction identifiers, customers, linked services, amounts, and payment outcomes."
      />
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="data-table w-full min-w-[980px] text-sm">
            <thead><tr><th className="text-left">Transaction</th><th className="text-left">Customer</th><th className="text-left">Service</th><th className="text-left">Amount</th><th className="text-left">Status</th><th className="text-left">Created</th></tr></thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="font-mono text-xs">{payment.transactionId}</td>
                  <td><p className="font-medium">{payment.user?.name || "Unknown"}</p><p className="mt-1 text-xs text-muted-foreground">{payment.user?.email || "No email"}</p></td>
                  <td>{payment.booking?.service?.title || "Service"}</td>
                  <td className="font-bold">{formatMoney(payment.amount, payment.currency)}</td>
                  <td><StatusBadge status={payment.status} /></td>
                  <td className="text-muted-foreground">{formatDateTime(payment.createdAt)}</td>
                </tr>
              ))}
              {!payments.length ? <tr><td colSpan={6} className="py-14 text-center text-muted-foreground">No payment records returned by the admin API.</td></tr> : null}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
