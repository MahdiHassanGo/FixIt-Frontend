"use client";

import { useActionState } from "react";
import { updateUserStatusAction } from "@/app/actions/admin-actions";
import { ActionFeedback } from "@/components/shared/action-feedback";
import { SubmitButton } from "@/components/shared/submit-button";

export function UserStatusButton({ userId, activeStatus }: { userId: string; activeStatus: "ACTIVE" | "BLOCKED" }) {
  const nextStatus = activeStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
  const [state, action] = useActionState(updateUserStatusAction.bind(null, userId, nextStatus), null);
  return <form action={action}><ActionFeedback state={state} /><SubmitButton size="sm" variant={nextStatus === "BLOCKED" ? "destructive" : "outline"} pendingText="Updating...">{nextStatus === "BLOCKED" ? "Ban" : "Unban"}</SubmitButton></form>;
}

