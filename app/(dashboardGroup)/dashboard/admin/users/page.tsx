import type { Metadata } from "next";
import Link from "next/link";
import { UserStatusButton } from "@/components/admin/user-status-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateTime } from "@/lib/format";
import { getAdminUsers } from "@/lib/data";

export const metadata: Metadata = { title: "User Management" };

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const users = await getAdminUsers();
  const resolved = await searchParams;
  const q = (resolved.q || "").toLowerCase();
  const page = Math.max(1, Number(resolved.page || 1));
  const limit = 10;
  const filtered = q ? users.filter((user) => `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(q)) : users;
  const totalPage = Math.max(1, Math.ceil(filtered.length / limit));
  const safePage = Math.min(page, totalPage);
  const paginated = filtered.slice((safePage - 1) * limit, safePage * limit);
  const pageHref = (target: number) => `?q=${encodeURIComponent(resolved.q || "")}&page=${target}`;

  return <div className="space-y-6"><div><h1 className="text-3xl font-bold">User management</h1><p className="text-muted-foreground">Search, paginate, review roles, and ban or unban accounts.</p></div><form className="flex max-w-md gap-2"><input name="q" defaultValue={resolved.q || ""} placeholder="Search name, email, or role" className="h-10 w-full rounded-md border bg-background px-3 text-sm" /><Button type="submit">Search</Button></form><Card><CardContent className="overflow-x-auto p-0"><table className="w-full min-w-[850px] text-sm"><thead className="border-b bg-muted/50 text-left"><tr><th className="p-4">User</th><th className="p-4">Role</th><th className="p-4">Location</th><th className="p-4">Joined</th><th className="p-4">Status</th><th className="p-4">Action</th></tr></thead><tbody>{paginated.map((user) => <tr key={user.id} className="border-b last:border-0"><td className="p-4"><p className="font-medium">{user.name}</p><p className="text-xs text-muted-foreground">{user.email}</p></td><td className="p-4"><Badge variant="outline">{user.role}</Badge></td><td className="p-4">{user.location || "—"}</td><td className="p-4">{formatDateTime(user.createdAt)}</td><td className="p-4"><Badge variant={user.activeStatus === "ACTIVE" ? "default" : "destructive"}>{user.activeStatus}</Badge></td><td className="p-4">{user.role === "ADMIN" ? <span className="text-xs text-muted-foreground">Protected</span> : <UserStatusButton userId={user.id} activeStatus={user.activeStatus} />}</td></tr>)}{!paginated.length ? <tr><td colSpan={6} className="p-10 text-center text-muted-foreground">No matching users.</td></tr> : null}</tbody></table></CardContent></Card><div className="flex items-center justify-center gap-3"><Button asChild variant="outline"><Link href={pageHref(Math.max(1, safePage - 1))}>Previous</Link></Button><span className="text-sm text-muted-foreground">Page {safePage} of {totalPage}</span><Button asChild variant="outline"><Link href={pageHref(Math.min(totalPage, safePage + 1))}>Next</Link></Button></div></div>;
}

