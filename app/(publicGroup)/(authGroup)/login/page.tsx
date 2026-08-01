import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return <div className="grid min-h-[calc(100vh-4rem)] place-items-center bg-muted/30 px-4 py-12"><Card className="w-full max-w-md"><CardHeader className="text-center"><CardTitle className="text-3xl">Welcome back</CardTitle><p className="text-sm text-muted-foreground">Use your FixItNow credentials to continue.</p></CardHeader><CardContent><Suspense fallback={<p className="text-center text-sm text-muted-foreground">Loading form...</p>}><LoginForm /></Suspense></CardContent></Card></div>;
}

