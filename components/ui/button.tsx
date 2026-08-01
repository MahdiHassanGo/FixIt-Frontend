import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center rounded-2xl border border-transparent bg-clip-padding text-sm font-bold tracking-tight whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-purple-500/40 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 hover:shadow-xl hover:shadow-purple-600/50 hover:brightness-110 hover:scale-[1.02] border-purple-400/20",
        secondary:
          "bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50 hover:brightness-110 hover:scale-[1.02]",
        outline:
          "border-purple-500/30 bg-background/90 text-foreground hover:bg-purple-600/10 hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 shadow-xs backdrop-blur-md",
        ghost:
          "text-foreground hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-400 aria-expanded:bg-purple-500/10",
        destructive:
          "bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md shadow-rose-600/25 hover:shadow-lg hover:shadow-rose-600/40 focus-visible:border-rose-400 focus-visible:ring-rose-400/30",
        link: "text-purple-600 dark:text-purple-400 underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-11 gap-2 px-5 py-2.5 text-sm",
        xs: "h-7 gap-1 px-3 text-xs rounded-xl [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 px-3.5 text-xs rounded-xl",
        lg: "h-12 gap-3 px-7 text-base rounded-2xl shadow-xl",
        icon: "size-11 rounded-2xl",
        "icon-xs": "size-7 rounded-xl [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9 rounded-xl",
        "icon-lg": "size-12 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
