"use client";

import Link from "next/link";
import { useActionState } from "react";
import { User, Mail, Lock, Phone, MapPin, ShieldCheck, ArrowRight } from "lucide-react";
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
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input id="name" name="name" placeholder="John Doe" className="pl-9 rounded-xl h-11" />
          </div>
          <FieldError messages={state?.fieldErrors?.name} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input id="email" name="email" type="email" placeholder="you@example.com" className="pl-9 rounded-xl h-11" />
          </div>
          <FieldError messages={state?.fieldErrors?.email} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input id="password" name="password" type="password" placeholder="At least 6 chars" className="pl-9 rounded-xl h-11" />
          </div>
          <FieldError messages={state?.fieldErrors?.password} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input id="phone" name="phone" placeholder="+123 456 789" className="pl-9 rounded-xl h-11" />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="location" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input id="location" name="location" placeholder="City or Area" className="pl-9 rounded-xl h-11" />
          </div>
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="role" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Account Type</Label>
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <select id="role" name="role" defaultValue="CUSTOMER" className="h-11 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-primary/20">
              <option value="CUSTOMER">Customer (Book Services)</option>
              <option value="TECHNICIAN">Technician (Offer Services)</option>
            </select>
          </div>
          <FieldError messages={state?.fieldErrors?.role} />
        </div>
      </div>

      <SubmitButton className="w-full h-11 rounded-xl shadow-md shadow-primary/20 text-base" pendingText="Creating account...">
        Create Account <ArrowRight className="size-4 ml-1" />
      </SubmitButton>

      <p className="text-center text-xs text-muted-foreground pt-2">
        Already registered?{" "}
        <Link href="/login" className="font-bold text-primary hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
