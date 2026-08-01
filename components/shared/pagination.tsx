import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { ApiMeta } from "@/lib/types";

export function Pagination({ meta, searchParams }: { meta?: ApiMeta; searchParams: URLSearchParams }) {
  if (!meta || meta.totalPage <= 1) return null;

  function href(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `?${params.toString()}`;
  }

  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <Button asChild variant="outline" disabled={meta.page <= 1}>
        <Link aria-disabled={meta.page <= 1} href={href(Math.max(1, meta.page - 1))}>Previous</Link>
      </Button>
      <span className="text-sm text-muted-foreground">Page {meta.page} of {meta.totalPage}</span>
      <Button asChild variant="outline" disabled={meta.page >= meta.totalPage}>
        <Link aria-disabled={meta.page >= meta.totalPage} href={href(Math.min(meta.totalPage, meta.page + 1))}>Next</Link>
      </Button>
    </div>
  );
}

