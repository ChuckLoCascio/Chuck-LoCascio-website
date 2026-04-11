import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "destructive" | "success";
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "border border-ch-volt bg-ch-volt text-ch-ink",
  secondary: "border border-ch-charcoal bg-ch-near-black text-ch-silver",
  outline: "border border-ch-volt/50 bg-transparent text-ch-volt",
  destructive: "border border-red-500/30 bg-destructive/20 text-red-400",
  success: "border border-emerald-700/50 bg-emerald-950/40 text-emerald-300",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 font-sans text-xs font-semibold uppercase tracking-wide",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
