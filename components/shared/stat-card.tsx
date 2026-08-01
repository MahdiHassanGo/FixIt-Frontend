import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  hint?: string;
}) {
  return (
    <Card className="relative overflow-hidden border-border/70 bg-card/95">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-teal-400 to-amber-400" />
      <CardContent className="flex items-start justify-between gap-4 p-5 pt-6">
        <div className="min-w-0 space-y-1">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
          <p className="truncate text-2xl font-black tracking-tight sm:text-3xl">{value}</p>
          {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
        </div>
        <div className="grid size-11 shrink-0 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
      </CardContent>
    </Card>
  );
}
