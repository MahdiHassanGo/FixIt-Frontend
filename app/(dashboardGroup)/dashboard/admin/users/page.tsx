import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { UserStatusButton } from "@/components/admin/user-status-button";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAdminUsers } from "@/lib/data";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "User Management" };

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const [users, resolved] = await Promise.all([getAdminUsers(), searchParams]);
  const q = (resolved.q || "").trim().toLowerCase();
  const requestedPage = Math.max(1, Number(resolved.page || 1) || 1);
  const limit = 10;
  const filtered = q
    ? users.filter((user) => `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(q))
    : users;
  const totalPage = Math.max(1, Math.ceil(filtered.length / limit));
  const page = Math.min(requestedPage, totalPage);
  const paginated = filtered.slice((page - 1) * limit, page * limit);
  const pageHref = (target: number) => `?q=${encodeURIComponent(resolved.q || "")}&page=${target}`;

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Moderation"
        title="User management"
        description="Search accounts, inspect roles and locations, and block or restore non-admin users."
      />

      <form className="flex max-w-xl flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input name="q" defaultValue={resolved.q || ""} placeholder="Search name, email, or role" className="pl-9" />
        </div>
        <Button type="submit">Search users</Button>
        {resolved.q ? <Button asChild variant="outline"><Link href="/dashboard/admin/users">Clear</Link></Button> : null}
      </form>

      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="data-table w-full min-w-[920px] text-sm">
            <thead>
              <tr>
                <th className="text-left">User</th>
                <th className="text-left">Role</th>
                <th className="text-left">Location</th>
                <th className="text-left">Joined</th>
                <th className="text-left">Status</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((user) => (
                <tr key={user.id}>
                  <td><p className="font-semibold">{user.name}</p><p className="mt-1 text-xs text-muted-foreground">{user.email}</p></td>
                  <td><Badge variant="outline">{user.role}</Badge></td>
                  <td>{user.location || "—"}</td>
                  <td className="text-muted-foreground">{formatDateTime(user.createdAt)}</td>
                  <td><Badge variant={user.activeStatus === "ACTIVE" ? "default" : "destructive"}>{user.activeStatus}</Badge></td>
                  <td>{user.role === "ADMIN" ? <span className="text-xs font-semibold text-muted-foreground">Protected account</span> : <UserStatusButton userId={user.id} activeStatus={user.activeStatus} />}</td>
                </tr>
              ))}
              {!paginated.length ? <tr><td colSpan={6} className="py-14 text-center text-muted-foreground">No users match this search.</td></tr> : null}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <nav className="flex flex-wrap items-center justify-center gap-3" aria-label="User table pagination">
        <Button asChild variant="outline" className={cn(page <= 1 && "pointer-events-none opacity-50")}>
          <Link href={pageHref(Math.max(1, page - 1))} aria-disabled={page <= 1} tabIndex={page <= 1 ? -1 : undefined}>Previous</Link>
        </Button>
        <span className="rounded-full border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground">Page {page} of {totalPage}</span>
        <Button asChild variant="outline" className={cn(page >= totalPage && "pointer-events-none opacity-50")}>
          <Link href={pageHref(Math.min(totalPage, page + 1))} aria-disabled={page >= totalPage} tabIndex={page >= totalPage ? -1 : undefined}>Next</Link>
        </Button>
      </nav>
    </div>
  );
}
