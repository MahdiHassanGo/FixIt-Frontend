"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerAction } from "@/app/actions/auth-actions";
import { ActionFeedback } from "@/components/shared/action-feedback";
import { FieldError } from "@/components/shared/field-error";
import { SubmitButton } from "@/components/shared/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
  const [state, action] = useActionState(registerAction, null);

  return (
    <form action={action} className="space-y-5">
      <ActionFeedback state={state} />
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" placeholder="Your full name" />
          <FieldError messages={state?.fieldErrors?.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" />
          <FieldError messages={state?.fieldErrors?.email} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" placeholder="At least 6 characters" />
          <FieldError messages={state?.fieldErrors?.password} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" placeholder="Optional" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" placeholder="Dhaka" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="role">Register as</Label>
          <select id="role" name="role" defaultValue="CUSTOMER" className="h-10 w-full rounded-md border bg-background px-3 text-sm">
            <option value="CUSTOMER">Customer</option>
            <option value="TECHNICIAN">Technician</option>
          </select>
          <FieldError messages={state?.fieldErrors?.role} />
        </div>
      </div>
      <SubmitButton className="w-full" pendingText="Creating account...">Create account</SubmitButton>
      <p className="text-center text-sm text-muted-foreground">
        Already registered? <Link href="/login" className="font-medium text-primary hover:underline">Login</Link>
      </p>
    </form>
  );
}

