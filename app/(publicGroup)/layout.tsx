import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { getCurrentUser } from "@/lib/data";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  return <div className="flex min-h-screen flex-col"><Navbar user={user} /><main className="flex-1">{children}</main><Footer /></div>;
}

