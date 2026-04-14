import { HTMLAttributes } from "react";

type BadgeVariant = "teal" | "coral" | "gold" | "success" | "alert" | "neutral";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  teal: "bg-[#1B7A6E]/10 text-[#1B7A6E] border border-[#1B7A6E]/20",
  coral: "bg-[#E8845C]/10 text-[#d06a42] border border-[#E8845C]/20",
  gold: "bg-[#C4A962]/15 text-[#8a7240] border border-[#C4A962]/30",
  success: "bg-[#4CAF7D]/10 text-[#2d7a52] border border-[#4CAF7D]/20",
  alert: "bg-[#C75050]/10 text-[#C75050] border border-[#C75050]/20",
  neutral: "bg-[#F5F0E8] text-[#6B6560] border border-[#E8E2D8]",
};

export function Badge({
  variant = "neutral",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold font-body ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
