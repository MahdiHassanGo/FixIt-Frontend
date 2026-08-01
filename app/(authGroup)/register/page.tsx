import type { Metadata } from "next";
import Link from "next/link";
import { Wrench } from "lucide-react";
import { RegisterForm } from "@/components/auth/register-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <div className="relative grid min-h-[calc(100vh-4rem)] place-items-center bg-gradient-to-br from-background via-muted/30 to-amber-500/5 px-4 py-12 overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute -top-32 -right-32 size-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-2xl space-y-6 relative z-10">
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
            <CardTitle className="text-2xl font-extrabold tracking-tight">Create your account</CardTitle>
            <p className="text-xs text-muted-foreground">Register as a Customer or Technician to start managing home services</p>
          </CardHeader>
          <CardContent className="pt-4">
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
