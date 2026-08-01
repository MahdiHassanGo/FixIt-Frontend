import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { UserRoundCog } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { TechnicianProfileForm } from "@/components/technician/technician-profile-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/data";

export const metadata: Metadata = { title: "Technician Profile" };

export default async function TechnicianProfileManagementPage() {
  const user = await getCurrentUser();
  const profile = user?.technicianProfile;
  if (!profile) redirect("/dashboard/technician");

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <DashboardPageHeader
        eyebrow="Public profile"
        title="Professional information"
        description="Keep your bio, skills, experience, location, and hourly rate accurate so customers can make informed booking decisions."
      />
      <Card>
        <CardHeader className="border-b border-border/60 pb-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary"><UserRoundCog className="size-5" /></span>
            <div><CardTitle>Technician profile</CardTitle><p className="text-sm text-muted-foreground">These fields appear on your public profile.</p></div>
          </div>
        </CardHeader>
        <CardContent className="p-5 sm:p-6"><TechnicianProfileForm profile={profile} /></CardContent>
      </Card>
    </div>
  );
}
