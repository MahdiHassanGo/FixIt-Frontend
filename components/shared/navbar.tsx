"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, UserRound, Wrench, X, Sparkles, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/actions/auth-actions";
import { dashboardForRole } from "@/lib/routes";
import type { User } from "@/lib/types";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Browse Services" },
];

export function Navbar({ user }: { user: User | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-tr from-primary to-teal-400 text-primary-foreground shadow-md shadow-primary/25 transition-transform duration-300 group-hover:scale-105">
            <Wrench className="size-5" />
          </span>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-foreground flex items-center gap-1">
              FixIt<span className="text-primary">Now</span>
              <Sparkles className="size-3.5 text-amber-500 fill-amber-500" />
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex bg-muted/50 p-1 rounded-full border border-border/50">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${
                  active
                    ? "bg-background text-primary shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User Auth Controls */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm" className="rounded-xl border-primary/20">
                <Link href={dashboardForRole(user.role)}>
                  <UserRound className="size-4 text-primary" />
                  <span>Dashboard ({user.role.toLowerCase()})</span>
                </Link>
              </Button>
              <form action={logoutAction}>
                <Button type="submit" variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                  <LogOut className="size-4 mr-1" />
                  Logout
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="rounded-xl">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild size="sm" className="rounded-xl">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-xl"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* Mobile Drawer Menu */}
      {open ? (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-2xl px-4 py-5 md:hidden animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm font-semibold rounded-lg hover:bg-muted text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 border-t border-border/50 pt-3">
              {user ? (
                <div className="flex flex-col gap-2">
                  <Link
                    href={dashboardForRole(user.role)}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-primary bg-primary/10 rounded-lg"
                  >
                    <UserRound className="size-4" />
                    Dashboard ({user.role})
                  </Link>
                  <form action={logoutAction}>
                    <Button type="submit" variant="outline" className="w-full justify-start text-destructive border-destructive/20">
                      <LogOut className="size-4 mr-2" />
                      Logout
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/login">Log in</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/register">Register</Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
