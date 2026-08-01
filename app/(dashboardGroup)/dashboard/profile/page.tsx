import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/customer/profile-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/data";

export const metadata: Metadata = { title: "My Profile" };

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) return redirect("/login");
  return <div className="mx-auto max-w-3xl space-y-6"><div><h1 className="text-3xl font-bold">My profile</h1><p className="text-muted-foreground">Update the fields supported by the existing backend.</p></div><Card><CardHeader><CardTitle>Account information</CardTitle></CardHeader><CardContent><ProfileForm user={user} /></CardContent></Card></div>;
}

