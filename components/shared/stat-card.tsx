import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
}) {
  return (
    <Card className="rounded-2xl border border-border/70 bg-card hover:border-primary/40 transition-all duration-300 shadow-xs">
      <CardContent className="flex items-center justify-between p-5">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="text-2xl font-black tracking-tight text-foreground">{value}</p>
        </div>
        <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 to-teal-500/10 text-primary shadow-xs border border-primary/20">
          <Icon className="size-6" />
        </div>
      </CardContent>
    </Card>
  );
}
