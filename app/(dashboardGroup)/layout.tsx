import { connection } from "next/server";
import { redirect } from "next/navigation";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Navbar } from "@/components/shared/navbar";
import { getCurrentUser } from "@/lib/data";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await connection();
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <div className="dashboard-surface min-h-screen">
      <Navbar user={user} />
      <div className="mx-auto flex max-w-[1600px] flex-col md:flex-row">
        <DashboardSidebar role={user.role} />
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-[1320px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
