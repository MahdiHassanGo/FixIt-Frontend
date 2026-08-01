import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { TechnicianProfileForm } from "@/components/technician/technician-profile-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/data";

export const metadata: Metadata = { title: "Technician Profile" };

export default async function TechnicianProfileManagementPage() {
  const user = await getCurrentUser();
  const profile = user?.technicianProfile;
  if (!profile) return redirect("/dashboard/technician");
  return <div className="mx-auto max-w-3xl space-y-6"><div><h1 className="text-3xl font-bold">Technician profile</h1><p className="text-muted-foreground">Update bio, skills, experience, hourly price, and location.</p></div><Card><CardHeader><CardTitle>Professional information</CardTitle></CardHeader><CardContent><TechnicianProfileForm profile={profile} /></CardContent></Card></div>;
}

