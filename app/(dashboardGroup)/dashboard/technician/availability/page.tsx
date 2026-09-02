import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CalendarClock } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { AvailabilityForm } from "@/components/technician/availability-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser, getTechnician } from "@/lib/data";

export const metadata: Metadata = { title: "Availability" };

export default async function AvailabilityPage() {
  const user = await getCurrentUser();
  const profile = user?.technicianProfile;
  if (!profile) redirect("/dashboard/technician/profile");
  const fullProfile = await getTechnician(profile.id);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <DashboardPageHeader
        eyebrow="Schedule"
        title="Weekly availability"
        description="Enable working days and define one service window per day. Customers only see dates that match these declared hours."
      />
      <Card>
        <CardHeader className="border-b border-border/60 pb-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary"><CalendarClock className="size-5" /></span>
            <div><CardTitle>Working hours</CardTitle><p className="text-sm text-muted-foreground">Saving replaces the previous weekly schedule.</p></div>
          </div>
        </CardHeader>
        <CardContent className="p-5 sm:p-6"><AvailabilityForm availability={fullProfile?.availability || []} /></CardContent>
      </Card>
    </div>
  );
}
