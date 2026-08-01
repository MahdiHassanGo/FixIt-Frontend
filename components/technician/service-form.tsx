"use client";

import { useActionState } from "react";
import { createServiceAction, updateServiceAction } from "@/app/actions/technician-actions";
import { ActionFeedback } from "@/components/shared/action-feedback";
import { FieldError } from "@/components/shared/field-error";
import { SubmitButton } from "@/components/shared/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Category, Service } from "@/lib/types";

export function ServiceForm({ categories, service }: { categories: Category[]; service?: Service }) {
  const action = service ? updateServiceAction.bind(null, service.id) : createServiceAction;
  const [state, formAction] = useActionState(action, null);
  return (
    <form action={formAction} className="grid gap-4 sm:grid-cols-2">
      <ActionFeedback state={state} />
      <div className="space-y-2 sm:col-span-2"><Label htmlFor={`title-${service?.id || "new"}`}>Title</Label><Input id={`title-${service?.id || "new"}`} name="title" defaultValue={service?.title || ""} /><FieldError messages={state?.fieldErrors?.title} /></div>
      <div className="space-y-2 sm:col-span-2"><Label htmlFor={`description-${service?.id || "new"}`}>Description</Label><Textarea id={`description-${service?.id || "new"}`} name="description" defaultValue={service?.description || ""} /><FieldError messages={state?.fieldErrors?.description} /></div>
      <div className="space-y-2"><Label htmlFor={`price-${service?.id || "new"}`}>Price (USD)</Label><Input id={`price-${service?.id || "new"}`} name="price" type="number" min="1" step="0.01" defaultValue={service ? Number(service.price) : ""} /><FieldError messages={state?.fieldErrors?.price} /></div>
      <div className="space-y-2"><Label htmlFor={`location-${service?.id || "new"}`}>Location</Label><Input id={`location-${service?.id || "new"}`} name="location" defaultValue={service?.location || ""} /></div>
      <div className="space-y-2 sm:col-span-2"><Label htmlFor={`category-${service?.id || "new"}`}>Category</Label><select id={`category-${service?.id || "new"}`} name="categoryId" defaultValue={service?.categoryId || ""} className="h-10 w-full rounded-xl border border-input bg-background shadow-xs px-3 text-sm"><option value="">Select category</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select><FieldError messages={state?.fieldErrors?.categoryId} /></div>
      {service ? <label className="flex items-center gap-2 sm:col-span-2"><input type="checkbox" name="isActive" defaultChecked={service.isActive} /> Active service</label> : null}
      <div className="sm:col-span-2"><SubmitButton pendingText={service ? "Updating..." : "Creating..."}>{service ? "Update service" : "Create service"}</SubmitButton></div>
    </form>
  );
}

