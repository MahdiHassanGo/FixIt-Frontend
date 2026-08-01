import { redirect } from "next/navigation";
import { dashboardForRole } from "@/lib/routes";
import { getCurrentUser } from "@/lib/data";

export default async function DashboardEntryPage() {
  const user = await getCurrentUser();
  if (!user) return redirect("/login");
  return redirect(dashboardForRole(user.role));
}

