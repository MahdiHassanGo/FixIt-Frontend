"use client";

import { useActionState } from "react";
import { updateTechnicianProfileAction } from "@/app/actions/technician-actions";
import { ActionFeedback } from "@/components/shared/action-feedback";
import { FieldError } from "@/components/shared/field-error";
import { SubmitButton } from "@/components/shared/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { TechnicianProfile } from "@/lib/types";

export function TechnicianProfileForm({ profile }: { profile: TechnicianProfile }) {
  const [state, action] = useActionState(updateTechnicianProfileAction, null);
  return (
    <form action={action} className="grid gap-5 sm:grid-cols-2">
      <ActionFeedback state={state} />
      <div className="space-y-2 sm:col-span-2"><Label htmlFor="bio">Bio</Label><Textarea id="bio" name="bio" defaultValue={profile.bio || ""} placeholder="Describe your experience and service approach" /></div>
      <div className="space-y-2 sm:col-span-2"><Label htmlFor="skills">Skills</Label><Input id="skills" name="skills" defaultValue={profile.skills.join(", ")} placeholder="Pipe repair, Wiring, Deep cleaning" /><FieldError messages={state?.fieldErrors?.skills} /><p className="text-xs text-muted-foreground">Separate skills with commas.</p></div>
      <div className="space-y-2"><Label htmlFor="experienceYears">Experience (years)</Label><Input id="experienceYears" name="experienceYears" type="number" min="0" defaultValue={profile.experienceYears} /><FieldError messages={state?.fieldErrors?.experienceYears} /></div>
      <div className="space-y-2"><Label htmlFor="pricePerHour">Hourly price (USD)</Label><Input id="pricePerHour" name="pricePerHour" type="number" min="0" step="0.01" defaultValue={Number(profile.pricePerHour)} /><FieldError messages={state?.fieldErrors?.pricePerHour} /></div>
      <div className="space-y-2 sm:col-span-2"><Label htmlFor="location">Location</Label><Input id="location" name="location" defaultValue={profile.location || ""} /></div>
      <div className="sm:col-span-2"><SubmitButton pendingText="Updating profile...">Update technician profile</SubmitButton></div>
    </form>
  );
}

