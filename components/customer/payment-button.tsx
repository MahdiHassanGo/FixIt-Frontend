"use client";

import { useActionState, useEffect } from "react";
import { createCheckoutAction } from "@/app/actions/customer-actions";
import { ActionFeedback } from "@/components/shared/action-feedback";
import { SubmitButton } from "@/components/shared/submit-button";

export function PaymentButton({ bookingId, fullWidth = false }: { bookingId: string; fullWidth?: boolean }) {
  const [state, action] = useActionState(createCheckoutAction.bind(null, bookingId), null);

  useEffect(() => {
    if (state?.success && state.checkoutUrl) window.location.assign(state.checkoutUrl);
  }, [state]);

  return (
    <form action={action} className={fullWidth ? "w-full" : undefined}>
      <ActionFeedback state={state} />
      <SubmitButton className={fullWidth ? "w-full" : undefined} pendingText="Opening Stripe...">Pay with Stripe</SubmitButton>
    </form>
  );
}

