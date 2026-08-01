"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { loginAction } from "@/app/actions/auth-actions";
import { ActionFeedback } from "@/components/shared/action-feedback";
import { FieldError } from "@/components/shared/field-error";
import { SubmitButton } from "@/components/shared/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "";
  const [state, action] = useActionState(loginAction.bind(null, redirectTo), null);

  useEffect(() => {
    if (searchParams.get("registered") === "1") {
      toast.success("Registration completed. You can log in now.");
    }
  }, [searchParams]);

  return (
    <form action={action} className="space-y-5">
      <ActionFeedback state={state} />

      <div className="space-y-2">
        <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className="pl-9 rounded-xl h-11" />
        </div>
        <FieldError messages={state?.fieldErrors?.email} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input id="password" name="password" type="password" autoComplete="current-password" placeholder="At least 6 characters" className="pl-9 rounded-xl h-11" />
        </div>
        <FieldError messages={state?.fieldErrors?.password} />
      </div>

      <SubmitButton className="w-full h-11 rounded-xl shadow-md shadow-primary/20 text-base" pendingText="Logging in...">
        Login to Account <ArrowRight className="size-4 ml-1" />
      </SubmitButton>

      <p className="text-center text-xs text-muted-foreground pt-2">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-bold text-primary hover:underline">
          Register now
        </Link>
      </p>
    </form>
  );
}
