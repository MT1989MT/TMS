import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "surface" | "elevated" | "outlined" | "teal";
  padding?: "sm" | "md" | "lg" | "none";
}

const variantStyles = {
  default: "bg-white border border-[#E8E2D8]",
  surface: "bg-[#F5F0E8] border border-[#E8E2D8]",
  elevated: "bg-white shadow-[0_4px_12px_rgba(45,42,38,0.10),0_2px_4px_rgba(45,42,38,0.06)]",
  outlined: "bg-transparent border-2 border-[#E8E2D8]",
  teal: "bg-[#1B7A6E]/8 border border-[#1B7A6E]/20",
};

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  variant = "default",
  padding = "md",
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={[
        "rounded-[16px]",
        variantStyles[variant],
        paddingStyles[padding],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-xl font-heading text-[#2D2A26] ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`text-[#6B6560] text-sm mt-1 ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mt-4 pt-4 border-t border-[#E8E2D8] ${className}`} {...props}>
      {children}
    </div>
  );
}
