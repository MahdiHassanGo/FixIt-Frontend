import { Wrench, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-gradient-to-b from-background to-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-tr from-primary to-teal-400 text-primary-foreground shadow-xs">
                <Wrench className="size-4" />
              </span>
              <span className="text-xl font-bold tracking-tight text-foreground">
                FixIt<span className="text-primary">Now</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              Your trusted home service marketplace connecting homeowners with verified professional technicians. Fast booking, transparent pricing, and Stripe secure payments.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
              <span className="inline-flex items-center gap-1"><ShieldCheck className="size-4 text-primary" /> Verified Pros</span>
              <span className="inline-flex items-center gap-1"><HeartHandshake className="size-4 text-amber-500" /> 100% Satisfaction</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Explore</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home Overview</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">Browse Services</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-primary transition-colors">Become a Pro</Link>
              </li>
            </ul>
          </div>

          {/* Account & Support */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Account</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/login" className="hover:text-primary transition-colors">Customer Login</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-primary transition-colors">Create Account</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} FixItNow Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with Next.js & Tailwind CSS <Sparkles className="size-3 text-amber-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}