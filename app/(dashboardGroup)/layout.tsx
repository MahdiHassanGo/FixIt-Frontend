import { connection } from "next/server";
import { redirect } from "next/navigation";

import {
  DashboardSidebar,
} from "@/components/dashboard/dashboard-sidebar";
import { Navbar } from "@/components/shared/navbar";
import { getCurrentUser } from "@/lib/data";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  await connection();

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-muted/25">
      <Navbar user={user} />

      <div className="mx-auto flex max-w-[1600px] flex-col md:flex-row">
        <DashboardSidebar role={user.role} />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}