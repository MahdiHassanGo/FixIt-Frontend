import { Navbar } from "@/components/shared/navbar";
import { getCurrentUser } from "@/lib/data";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  return <div className="min-h-screen"><Navbar user={user} />{children}</div>;
}

