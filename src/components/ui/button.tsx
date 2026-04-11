import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  /** Coinbase: pill CTAs use ~56px radius — use `lg` + rounded-full */
  size?: "sm" | "md" | "lg" | "pill" | "icon";
  loading?: boolean;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  /** Primary: Coinbase Blue, near-black text on blue (preview-dark) */
  primary:
    "rounded-full border border-ch-volt bg-ch-volt text-ch-ink shadow-none transition-colors duration-200 hover:bg-ch-volt-pale active:opacity-95",
  /** Gray surface — secondary */
  secondary:
    "rounded-full border border-transparent bg-ch-near-black text-ch-white shadow-none transition-colors duration-200 hover:bg-ch-volt-pale hover:text-ch-white",
  outline:
    "rounded-full border border-ch-volt bg-transparent text-ch-volt transition-colors duration-200 hover:bg-ch-volt/10",
  ghost:
    "rounded-ch text-ch-white transition-colors duration-150 hover:bg-ch-near-black/80 hover:text-ch-volt",
  destructive:
    "rounded-ch bg-destructive text-destructive-foreground hover:bg-destructive/90",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-4 text-sm font-semibold",
  md: "h-10 px-4 text-sm font-semibold",
  lg: "h-12 px-7 text-base font-semibold tracking-[0.01em]",
  pill: "min-h-11 rounded-full px-8 py-2.5 text-base font-semibold",
  icon: "h-10 w-10 rounded-ch",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ch-volt focus-visible:ring-offset-2 focus-visible:ring-offset-ch-page disabled:pointer-events-none disabled:opacity-50";

export function buttonClassName(
  options: Pick<ButtonProps, "variant" | "size" | "className"> & {
    variant?: ButtonProps["variant"];
    size?: ButtonProps["size"];
  }
): string {
  const { variant = "primary", size = "md", className } = options;
  return cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={buttonClassName({ variant, size, className })}
        {...props}
      >
        {loading && (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
