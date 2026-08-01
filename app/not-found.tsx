import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return <div className="grid min-h-[70vh] place-items-center px-4 text-center"><div className="space-y-4"><p className="text-sm font-semibold text-primary">404</p><h1 className="text-4xl font-bold">Page not found</h1><p className="text-muted-foreground">The requested page does not exist or you do not have access.</p><Button asChild><Link href="/">Return home</Link></Button></div></div>;
}

