"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button, type buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";

type Props = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    pendingText?: string;
  };

export function SubmitButton({
  children,
  pendingText = "Saving...",
  disabled,
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending || disabled} {...props}>
      {pending ? <Loader2 className="size-4 animate-spin" /> : null}
      {pending ? pendingText : children}
    </Button>
  );
}

