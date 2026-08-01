"use client";

import { useActionState } from "react";
import { createReviewAction } from "@/app/actions/customer-actions";
import { ActionFeedback } from "@/components/shared/action-feedback";
import { FieldError } from "@/components/shared/field-error";
import { SubmitButton } from "@/components/shared/submit-button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ReviewForm({ bookingId }: { bookingId: string }) {
  const [state, action] = useActionState(createReviewAction, null);
  return (
    <form action={action} className="mt-4 space-y-3 rounded-xl border bg-muted/30 p-4">
      <ActionFeedback state={state} />
      <input type="hidden" name="bookingId" value={bookingId} />
      <div className="space-y-2">
        <Label htmlFor={`rating-${bookingId}`}>Rating</Label>
        <select id={`rating-${bookingId}`} name="rating" defaultValue="5" className="h-10 w-full rounded-md border bg-background px-3 text-sm">
          {[5,4,3,2,1].map((rating) => <option key={rating} value={rating}>{rating} star{rating > 1 ? "s" : ""}</option>)}
        </select>
        <FieldError messages={state?.fieldErrors?.rating} />
      </div>
      <div className="space-y-2"><Label htmlFor={`comment-${bookingId}`}>Comment</Label><Textarea id={`comment-${bookingId}`} name="comment" placeholder="Describe your experience" /></div>
      <SubmitButton size="sm" pendingText="Submitting...">Leave review</SubmitButton>
    </form>
  );
}

