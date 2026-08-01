"use client";

import { useActionState } from "react";
import type { ActionState } from "@/lib/types";
import { ActionFeedback } from "@/components/shared/action-feedback";
import { SubmitButton } from "@/components/shared/submit-button";

export function ActionButton({
  action,
  label,
  pendingLabel,
  variant = "default",
}: {
  action: (_state: ActionState, formData: FormData) => Promise<ActionState>;
  label: string;
  pendingLabel: string;
  variant?: "default" | "outline" | "destructive" | "secondary" | "ghost";
}) {
  const [state, formAction] = useActionState(action, null);
  return (
    <form action={formAction}>
      <ActionFeedback state={state} />
      <SubmitButton size="sm" variant={variant} pendingText={pendingLabel}>{label}</SubmitButton>
    </form>
  );
}

