import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Wrench } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Login | FixItNow" };

export default function LoginPage() {
  return (
    <div className="relative grid min-h-[calc(100vh-4rem)] place-items-center bg-gradient-to-br from-background via-muted/30 to-teal-500/5 px-4 py-12 overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute -top-32 -left-32 size-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-tr from-primary to-teal-400 text-primary-foreground shadow-md shadow-primary/25">
              <Wrench className="size-5" />
            </span>
            <span className="text-2xl font-bold tracking-tight text-foreground">FixIt<span className="text-primary">Now</span></span>
          </Link>
        </div>

        <Card className="w-full rounded-3xl border border-border/70 bg-card/90 shadow-2xl backdrop-blur-xl">
          <CardHeader className="text-center space-y-1.5 pb-2">
            <CardTitle className="text-2xl font-extrabold tracking-tight">Welcome back</CardTitle>
            <p className="text-xs text-muted-foreground">Sign in with your FixItNow credentials to access your portal</p>
          </CardHeader>
          <CardContent className="pt-4">
            <Suspense fallback={<p className="text-center text-xs text-muted-foreground">Loading form...</p>}>
              <LoginForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
