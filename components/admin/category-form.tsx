"use client";

import { useActionState } from "react";
import { createCategoryAction, updateCategoryAction } from "@/app/actions/admin-actions";
import { ActionFeedback } from "@/components/shared/action-feedback";
import { FieldError } from "@/components/shared/field-error";
import { SubmitButton } from "@/components/shared/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Category } from "@/lib/types";

export function CategoryForm({ category }: { category?: Category }) {
  const serverAction = category ? updateCategoryAction.bind(null, category.id) : createCategoryAction;
  const [state, action] = useActionState(serverAction, null);
  return (
    <form action={action} className="space-y-4">
      <ActionFeedback state={state} />
      <div className="space-y-2"><Label htmlFor={`name-${category?.id || "new"}`}>Name</Label><Input id={`name-${category?.id || "new"}`} name="name" defaultValue={category?.name || ""} /><FieldError messages={state?.fieldErrors?.name} /></div>
      <div className="space-y-2"><Label htmlFor={`description-${category?.id || "new"}`}>Description</Label><Textarea id={`description-${category?.id || "new"}`} name="description" defaultValue={category?.description || ""} /></div>
      <SubmitButton size="sm" pendingText="Saving...">{category ? "Update" : "Create category"}</SubmitButton>
    </form>
  );
}

