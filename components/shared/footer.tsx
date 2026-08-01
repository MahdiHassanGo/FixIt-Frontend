import { Wrench } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
        <div>
          <p className="flex items-center gap-2 font-bold text-primary">
            <Wrench className="size-5" />
            FixItNow
          </p>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            A role-based home service marketplace for customers,
            technicians, and administrators.
          </p>
        </div>

        <div className="flex gap-6 md:justify-end">
          <Link
            href="/services"
            className="text-sm hover:text-primary"
          >
            Browse services
          </Link>

          <Link
            href="/login"
            className="text-sm hover:text-primary"
          >
            Login
          </Link>
        </div>
      </div>
    </footer>
  );
}