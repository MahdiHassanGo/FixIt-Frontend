import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  return <div className="grid min-h-[calc(100vh-4rem)] place-items-center bg-muted/30 px-4 py-12"><Card className="w-full max-w-2xl"><CardHeader className="text-center"><CardTitle className="text-3xl">Create your account</CardTitle><p className="text-sm text-muted-foreground">Choose Customer or Technician. Admin registration is intentionally unavailable.</p></CardHeader><CardContent><RegisterForm /></CardContent></Card></div>;
}

