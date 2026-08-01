"use client";

import { useActionState, useMemo, useState } from "react";
import { createBookingAction } from "@/app/actions/customer-actions";
import { ActionFeedback } from "@/components/shared/action-feedback";
import { FieldError } from "@/components/shared/field-error";
import { SubmitButton } from "@/components/shared/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Availability } from "@/lib/types";

const jsDayToApi = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"] as const;

function timeOptions(start: string, end: string) {
  const values: string[] = [];
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  let minute = startHour * 60 + startMinute;
  const last = endHour * 60 + endMinute;
  while (minute < last) {
    const hour = Math.floor(minute / 60).toString().padStart(2, "0");
    const mins = (minute % 60).toString().padStart(2, "0");
    values.push(`${hour}:${mins}`);
    minute += 60;
  }
  return values;
}

export function BookingForm({ serviceId, availability }: { serviceId: string; availability: Availability[] }) {
  const [state, action] = useActionState(createBookingAction, null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const selectedSlot = useMemo(() => {
    if (!date) return null;
    const day = jsDayToApi[new Date(`${date}T12:00:00`).getDay()];
    return availability.find((slot) => slot.dayOfWeek === day && slot.isAvailable) || null;
  }, [date, availability]);

  const options = selectedSlot ? timeOptions(selectedSlot.startTime, selectedSlot.endTime) : [];
  const scheduledAt = date && time ? new Date(`${date}T${time}:00`).toISOString() : "";
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={action} className="space-y-4">
      <ActionFeedback state={state} />
      <input type="hidden" name="serviceId" value={serviceId} />
      <input type="hidden" name="scheduledAt" value={scheduledAt} />
      <div className="space-y-2">
        <Label htmlFor="booking-date">Date</Label>
        <Input id="booking-date" type="date" min={today} value={date} onChange={(event) => { setDate(event.target.value); setTime(""); }} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="booking-time">Available time</Label>
        <select id="booking-time" value={time} onChange={(event) => setTime(event.target.value)} disabled={!selectedSlot} className="h-10 w-full rounded-md border bg-background px-3 text-sm disabled:opacity-50">
          <option value="">{selectedSlot ? "Select a time" : "No declared availability for this day"}</option>
          {options.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
        <FieldError messages={state?.fieldErrors?.scheduledAt} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Service address</Label>
        <Input id="address" name="address" placeholder="House, road, area, city" />
        <FieldError messages={state?.fieldErrors?.address} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="note">Note</Label>
        <Textarea id="note" name="note" placeholder="Optional problem details" />
      </div>
      <SubmitButton className="w-full" disabled={!scheduledAt} pendingText="Submitting request...">Submit booking request</SubmitButton>
      <p className="text-xs text-muted-foreground">The backend exposes weekly working windows, but not public occupied-slot data. This form therefore shows declared availability only.</p>
    </form>
  );
}

