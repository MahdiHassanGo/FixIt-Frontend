"use client";

import { useActionState } from "react";
import { deleteServiceAction } from "@/app/actions/technician-actions";
import { ActionFeedback } from "@/components/shared/action-feedback";
import { SubmitButton } from "@/components/shared/submit-button";

export function DeleteServiceButton({ serviceId }: { serviceId: string }) {
  const [state, action] = useActionState(deleteServiceAction.bind(null, serviceId), null);
  return <form action={action}><ActionFeedback state={state} /><SubmitButton size="sm" variant="destructive" pendingText="Removing...">Remove</SubmitButton></form>;
}

