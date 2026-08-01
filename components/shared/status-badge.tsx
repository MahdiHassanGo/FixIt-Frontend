import { Badge } from "@/components/ui/badge";
import { titleCase } from "@/lib/format";
import type { BookingStatus, PaymentStatus } from "@/lib/types";

const styles: Record<BookingStatus | PaymentStatus, string> = {
  REQUESTED: "border-amber-300 bg-amber-100 text-amber-800",
  ACCEPTED: "border-blue-300 bg-blue-100 text-blue-800",
  DECLINED: "border-red-300 bg-red-100 text-red-800",
  PAID: "border-violet-300 bg-violet-100 text-violet-800",
  IN_PROGRESS: "border-emerald-300 bg-emerald-100 text-emerald-800",
  COMPLETED: "border-slate-300 bg-slate-100 text-slate-700",
  CANCELLED: "border-red-400 bg-red-950 text-red-100",
  PENDING: "border-amber-300 bg-amber-100 text-amber-800",
  FAILED: "border-red-300 bg-red-100 text-red-800",
};

export function StatusBadge({ status }: { status: BookingStatus | PaymentStatus }) {
  return (
    <Badge variant="outline" className={styles[status]}>
      {titleCase(status)}
    </Badge>
  );
}

