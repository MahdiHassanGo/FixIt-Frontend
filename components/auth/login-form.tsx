"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
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
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
        <FieldError messages={state?.fieldErrors?.email} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" autoComplete="current-password" placeholder="At least 6 characters" />
        <FieldError messages={state?.fieldErrors?.password} />
      </div>
      <SubmitButton className="w-full" pendingText="Logging in...">Login</SubmitButton>
      <p className="text-center text-sm text-muted-foreground">
        No account? <Link href="/register" className="font-medium text-primary hover:underline">Register</Link>
      </p>
    </form>
  );
}

