"use client";

import { Button } from "@/components/ui/button";

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="mx-auto max-w-xl rounded-2xl border bg-card p-8 text-center"><h2 className="text-2xl font-bold">Dashboard data could not be loaded</h2><p className="mt-3 text-sm text-muted-foreground">{error.message}</p><Button onClick={reset} className="mt-5">Try again</Button></div>;
}

