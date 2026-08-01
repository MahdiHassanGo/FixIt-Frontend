import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AvailabilityForm } from "@/components/technician/availability-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser, getTechnician } from "@/lib/data";

export const metadata: Metadata = { title: "Availability" };

export default async function AvailabilityPage() {
  const user = await getCurrentUser();
  const profile = user?.technicianProfile;
  if (!profile) return redirect("/dashboard/technician/profile");
  const fullProfile = await getTechnician(profile.id);
  return <div className="mx-auto max-w-4xl space-y-6"><div><h1 className="text-3xl font-bold">Availability scheduler</h1><p className="text-muted-foreground">Set one working window per day, matching the current backend data model.</p></div><Card><CardHeader><CardTitle>Weekly working hours</CardTitle></CardHeader><CardContent><AvailabilityForm availability={fullProfile.availability || []} /></CardContent></Card></div>;
}

