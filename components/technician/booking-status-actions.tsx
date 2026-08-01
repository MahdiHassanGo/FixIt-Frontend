"use client";

import { useActionState } from "react";
import { updateBookingStatusAction } from "@/app/actions/technician-actions";
import { ActionFeedback } from "@/components/shared/action-feedback";
import { SubmitButton } from "@/components/shared/submit-button";
import type { ActionState, BookingStatus } from "@/lib/types";

function StatusButton({ bookingId, status, label, variant = "default" }: { bookingId: string; status: BookingStatus; label: string; variant?: "default" | "destructive" | "outline" }) {
  const action = updateBookingStatusAction.bind(null, bookingId, status);
  const [state, formAction] = useActionState(action as (_state: ActionState, formData: FormData) => Promise<ActionState>, null);
  return <form action={formAction}><ActionFeedback state={state} /><SubmitButton size="sm" variant={variant} pendingText="Updating...">{label}</SubmitButton></form>;
}

export function BookingStatusActions({ bookingId, status }: { bookingId: string; status: BookingStatus }) {
  if (status === "REQUESTED") return <div className="flex flex-wrap gap-2"><StatusButton bookingId={bookingId} status="ACCEPTED" label="Accept" /><StatusButton bookingId={bookingId} status="DECLINED" label="Decline" variant="destructive" /></div>;
  if (status === "PAID") return <StatusButton bookingId={bookingId} status="IN_PROGRESS" label="Start job" />;
  if (status === "IN_PROGRESS") return <StatusButton bookingId={bookingId} status="COMPLETED" label="Mark completed" />;
  return <span className="text-sm text-muted-foreground">No action available</span>;
}

