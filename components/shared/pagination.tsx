import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ApiMeta } from "@/lib/types";

export function Pagination({ meta, searchParams }: { meta?: ApiMeta; searchParams: URLSearchParams }) {
  if (!meta || meta.totalPage <= 1) return null;

  function href(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    params.delete("limit");
    return `?${params.toString()}`;
  }

  const previousDisabled = meta.page <= 1;
  const nextDisabled = meta.page >= meta.totalPage;

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-3" aria-label="Pagination">
      <Button asChild variant="outline" className={cn(previousDisabled && "pointer-events-none opacity-50")}>
        <Link aria-disabled={previousDisabled} tabIndex={previousDisabled ? -1 : undefined} href={href(Math.max(1, meta.page - 1))}>
          <ChevronLeft className="size-4" /> Previous
        </Link>
      </Button>
      <span className="rounded-full border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground">
        Page {meta.page} of {meta.totalPage}
      </span>
      <Button asChild variant="outline" className={cn(nextDisabled && "pointer-events-none opacity-50")}>
        <Link aria-disabled={nextDisabled} tabIndex={nextDisabled ? -1 : undefined} href={href(Math.min(meta.totalPage, meta.page + 1))}>
          Next <ChevronRight className="size-4" />
        </Link>
      </Button>
    </nav>
  );
}
