"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, UserRound, Wrench, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/actions/auth-actions";
import { dashboardForRole } from "@/lib/routes";
import type { User } from "@/lib/types";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
];

export function Navbar({ user }: { user: User | null }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Wrench className="size-5" />
          </span>
          FixItNow
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <Button asChild variant="outline">
                <Link href={dashboardForRole(user.role)}>
                  <UserRound className="size-4" /> Dashboard
                </Link>
              </Button>
              <form action={logoutAction}><Button type="submit" variant="ghost">Logout</Button></form>
            </>
          ) : (
            <>
              <Button asChild variant="ghost"><Link href="/login">Login</Link></Button>
              <Button asChild><Link href="/register">Create account</Link></Button>
            </>
          )}
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open ? (
        <div className="border-t px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
            {user ? (
              <>
                <Link href={dashboardForRole(user.role)} onClick={() => setOpen(false)}>Dashboard</Link>
                <form action={logoutAction}><Button type="submit" variant="outline" className="w-full">Logout</Button></form>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline"><Link href="/login">Login</Link></Button>
                <Button asChild><Link href="/register">Register</Link></Button>
              </div>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

