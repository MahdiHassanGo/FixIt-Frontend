import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="grid min-h-56 place-items-center rounded-2xl border border-dashed border-border bg-card/55 p-8 text-center">
      <div className="max-w-sm space-y-3">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="size-6" />
        </span>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        {action ? <div className="pt-1">{action}</div> : null}
      </div>
    </div>
  );
}
