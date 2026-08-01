"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="grid min-h-screen place-items-center px-4"><div className="max-w-lg space-y-4 text-center"><AlertTriangle className="mx-auto size-12 text-destructive" /><h1 className="text-3xl font-bold">Unable to load this page</h1><p className="text-muted-foreground">{error.message || "An unexpected error occurred."}</p><Button onClick={reset}>Try again</Button></div></div>;
}

