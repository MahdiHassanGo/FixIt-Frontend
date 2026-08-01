import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CircleUserRound } from "lucide-react";
import { ProfileForm } from "@/components/customer/profile-form";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/data";

export const metadata: Metadata = { title: "My Profile" };

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <DashboardPageHeader
        eyebrow="Account"
        title="Profile settings"
        description="Update the account details supported by the backend. Your email and role remain protected identity fields."
      />
      <Card>
        <CardHeader className="border-b border-border/60 pb-5">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary"><CircleUserRound className="size-6" /></span>
            <div className="min-w-0">
              <CardTitle>Account information</CardTitle>
              <p className="truncate text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Badge variant="outline" className="ml-auto">{user.role}</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-5 sm:p-6"><ProfileForm user={user} /></CardContent>
      </Card>
    </div>
  );
}
