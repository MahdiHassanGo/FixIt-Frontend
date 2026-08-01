"use client";

import { useActionState, useMemo, useState } from "react";
import { CalendarDays, Clock3, Info, MapPin } from "lucide-react";
import { createBookingAction } from "@/app/actions/customer-actions";
import { ActionFeedback } from "@/components/shared/action-feedback";
import { FieldError } from "@/components/shared/field-error";
import { SubmitButton } from "@/components/shared/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { titleCase } from "@/lib/format";
import type { Availability } from "@/lib/types";

const jsDayToApi = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"] as const;

function timeOptions(start: string, end: string) {
  const values: string[] = [];
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  let minute = startHour * 60 + startMinute;
  const last = endHour * 60 + endMinute;

  while (minute < last) {
    values.push(`${Math.floor(minute / 60).toString().padStart(2, "0")}:${(minute % 60).toString().padStart(2, "0")}`);
    minute += 60;
  }
  return values;
}

function localToday() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
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
  const availableDays = availability.filter((slot) => slot.isAvailable);

  return (
    <form action={action} className="space-y-5">
      <ActionFeedback state={state} />
      <input type="hidden" name="serviceId" value={serviceId} />
      <input type="hidden" name="scheduledAt" value={scheduledAt} />

      <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
        <p className="text-xs font-bold uppercase tracking-wider text-primary">Working days</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {availableDays.length
            ? availableDays.map((slot) => <span key={slot.id} className="rounded-full border border-primary/20 bg-background px-2.5 py-1 text-xs font-semibold">{titleCase(slot.dayOfWeek).slice(0, 3)}</span>)
            : <span className="text-xs text-muted-foreground">No availability declared.</span>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="booking-date" className="flex items-center gap-2"><CalendarDays className="size-4 text-primary" /> Service date</Label>
        <Input
          id="booking-date"
          type="date"
          min={localToday()}
          value={date}
          required
          onChange={(event) => { setDate(event.target.value); setTime(""); }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="booking-time" className="flex items-center gap-2"><Clock3 className="size-4 text-primary" /> Available start time</Label>
        <select
          id="booking-time"
          value={time}
          required
          onChange={(event) => setTime(event.target.value)}
          disabled={!selectedSlot}
          className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm shadow-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-55"
        >
          <option value="">{selectedSlot ? `Choose between ${selectedSlot.startTime} and ${selectedSlot.endTime}` : date ? "Technician is unavailable on this day" : "Select a date first"}</option>
          {options.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
        <FieldError messages={state?.fieldErrors?.scheduledAt} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="flex items-center gap-2"><MapPin className="size-4 text-primary" /> Service address</Label>
        <Input id="address" name="address" required minLength={5} placeholder="House, road, area, city" />
        <FieldError messages={state?.fieldErrors?.address} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="note">Problem details</Label>
        <Textarea id="note" name="note" maxLength={1000} placeholder="Describe the issue, access instructions, or anything the technician should know." />
      </div>

      <SubmitButton className="w-full" disabled={!scheduledAt} pendingText="Submitting request...">Submit booking request</SubmitButton>

      <p className="flex gap-2 rounded-xl bg-muted/55 p-3 text-xs leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 size-4 shrink-0 text-primary" />
        The backend provides weekly working windows but does not expose occupied public slots. Final conflict validation happens when the request reaches the API.
      </p>
    </form>
  );
}
