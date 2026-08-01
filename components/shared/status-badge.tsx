import { Badge } from "@/components/ui/badge";
import { titleCase } from "@/lib/format";
import type { BookingStatus, PaymentStatus } from "@/lib/types";

const styles: Record<BookingStatus | PaymentStatus, string> = {
  REQUESTED: "border-amber-500/30 bg-amber-500/10 text-amber-700 font-semibold dark:text-amber-400",
  ACCEPTED: "border-blue-500/30 bg-blue-500/10 text-blue-700 font-semibold dark:text-blue-400",
  DECLINED: "border-rose-500/30 bg-rose-500/10 text-rose-700 font-semibold dark:text-rose-400",
  PAID: "border-violet-500/30 bg-violet-500/10 text-violet-700 font-semibold dark:text-violet-400",
  IN_PROGRESS: "border-teal-500/30 bg-teal-500/10 text-teal-700 font-semibold dark:text-teal-400",
  COMPLETED: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 font-semibold dark:text-emerald-400",
  CANCELLED: "border-zinc-500/30 bg-zinc-500/10 text-zinc-600 font-semibold dark:text-zinc-400",
  PENDING: "border-amber-500/30 bg-amber-500/10 text-amber-700 font-semibold dark:text-amber-400",
  FAILED: "border-rose-500/30 bg-rose-500/10 text-rose-700 font-semibold dark:text-rose-400",
};

export function StatusBadge({ status }: { status: BookingStatus | PaymentStatus }) {
  return (
    <Badge variant="outline" className={`rounded-full px-3 py-0.5 text-xs inline-flex items-center gap-1.5 ${styles[status]}`}>
      <span className="size-1.5 rounded-full bg-current animate-pulse" />
      <span>{titleCase(status)}</span>
    </Badge>
  );
}
