"use client";

import { useActionState } from "react";
import { updateAvailabilityAction } from "@/app/actions/technician-actions";
import { ActionFeedback } from "@/components/shared/action-feedback";
import { SubmitButton } from "@/components/shared/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { days, titleCase } from "@/lib/format";
import type { Availability } from "@/lib/types";

export function AvailabilityForm({ availability }: { availability: Availability[] }) {
  const [state, action] = useActionState(updateAvailabilityAction, null);
  return (
    <form action={action} className="space-y-4">
      <ActionFeedback state={state} />
      {days.map((day) => {
        const slot = availability.find((item) => item.dayOfWeek === day);
        return (
          <div key={day} className="grid items-center gap-3 rounded-xl border p-4 sm:grid-cols-[1.2fr_1fr_1fr]">
            <label className="flex items-center gap-3 font-medium">
              <input type="checkbox" name={`enabled_${day}`} defaultChecked={Boolean(slot?.isAvailable)} className="size-4" />
              {titleCase(day)}
            </label>
            <div className="space-y-1"><Label htmlFor={`start_${day}`}>Start</Label><Input id={`start_${day}`} name={`start_${day}`} type="time" defaultValue={slot?.startTime || "09:00"} /></div>
            <div className="space-y-1"><Label htmlFor={`end_${day}`}>End</Label><Input id={`end_${day}`} name={`end_${day}`} type="time" defaultValue={slot?.endTime || "17:00"} /></div>
          </div>
        );
      })}
      <SubmitButton pendingText="Updating schedule...">Save weekly availability</SubmitButton>
      <p className="text-xs text-muted-foreground">Saving replaces the previous weekly schedule because that is how the existing backend endpoint is designed.</p>
    </form>
  );
}

