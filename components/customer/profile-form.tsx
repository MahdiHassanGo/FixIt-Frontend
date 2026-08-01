"use client";

import { useActionState } from "react";
import { updateProfileAction } from "@/app/actions/customer-actions";
import { ActionFeedback } from "@/components/shared/action-feedback";
import { FieldError } from "@/components/shared/field-error";
import { SubmitButton } from "@/components/shared/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { User } from "@/lib/types";

export function ProfileForm({ user }: { user: User }) {
  const [state, action] = useActionState(updateProfileAction, null);
  return (
    <form action={action} className="grid gap-5 sm:grid-cols-2">
      <ActionFeedback state={state} />
      <div className="space-y-2 sm:col-span-2"><Label htmlFor="name">Name</Label><Input id="name" name="name" defaultValue={user.name} /><FieldError messages={state?.fieldErrors?.name} /></div>
      <div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" defaultValue={user.phone || ""} /></div>
      <div className="space-y-2"><Label htmlFor="location">Location</Label><Input id="location" name="location" defaultValue={user.location || ""} /></div>
      <div className="sm:col-span-2"><SubmitButton pendingText="Updating...">Update profile</SubmitButton></div>
    </form>
  );
}

