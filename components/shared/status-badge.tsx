import { Badge } from "@/components/ui/badge";
import { titleCase } from "@/lib/format";
import type { BookingStatus, PaymentStatus } from "@/lib/types";

const styles: Record<BookingStatus | PaymentStatus, string> = {
  REQUESTED: "border-amber-500/35 bg-amber-500/12 text-amber-700",
  ACCEPTED: "border-blue-500/35 bg-blue-500/10 text-blue-700",
  DECLINED: "border-red-500/35 bg-red-500/10 text-red-700",
  PAID: "border-violet-500/35 bg-violet-500/10 text-violet-700",
  IN_PROGRESS: "border-emerald-500/35 bg-emerald-500/10 text-emerald-700",
  COMPLETED: "border-slate-400/40 bg-slate-500/10 text-slate-700",
  CANCELLED: "border-red-900/30 bg-red-950/10 text-red-900",
  PENDING: "border-amber-500/35 bg-amber-500/12 text-amber-700",
  FAILED: "border-red-500/35 bg-red-500/10 text-red-700",
};

export function StatusBadge({ status }: { status: BookingStatus | PaymentStatus }) {
  return (
    <Badge variant="outline" className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${styles[status]}`}>
      <span className="mr-1.5 size-1.5 rounded-full bg-current" />
      {titleCase(status)}
    </Badge>
  );
}
