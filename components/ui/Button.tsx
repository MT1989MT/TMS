"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[#1B7A6E] text-white hover:bg-[#145f55] active:bg-[#0f4a43] shadow-sm hover:shadow-md",
  secondary:
    "bg-[#E8845C] text-white hover:bg-[#d06a42] active:bg-[#bf5a32] shadow-sm hover:shadow-md",
  outline:
    "border-2 border-[#1B7A6E] text-[#1B7A6E] bg-transparent hover:bg-[#1B7A6E]/8 active:bg-[#1B7A6E]/15",
  ghost:
    "text-[#1B7A6E] bg-transparent hover:bg-[#1B7A6E]/8 active:bg-[#1B7A6E]/15",
  danger:
    "bg-[#C75050] text-white hover:bg-[#a83f3f] active:bg-[#8f3333] shadow-sm",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-[10px]",
  md: "px-6 py-3 text-base rounded-[12px]",
  lg: "px-8 py-4 text-lg rounded-[14px]",
  xl: "px-10 py-5 text-xl rounded-[16px]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      className = "",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={[
          "inline-flex items-center justify-center gap-2 font-body font-semibold",
          "transition-all duration-200 cursor-pointer select-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B7A6E] focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth ? "w-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
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
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
