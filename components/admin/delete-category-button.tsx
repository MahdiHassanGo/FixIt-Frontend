"use client";

import { useActionState } from "react";
import { deleteCategoryAction } from "@/app/actions/admin-actions";
import { ActionFeedback } from "@/components/shared/action-feedback";
import { SubmitButton } from "@/components/shared/submit-button";

export function DeleteCategoryButton({ categoryId }: { categoryId: string }) {
  const [state, action] = useActionState(deleteCategoryAction.bind(null, categoryId), null);
  return <form action={action}><ActionFeedback state={state} /><SubmitButton size="sm" variant="destructive" pendingText="Deleting...">Delete</SubmitButton></form>;
}

