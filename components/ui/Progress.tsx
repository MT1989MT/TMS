"use client";

interface ProgressProps {
  value: number; // 0-100
  max?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "teal" | "coral" | "gold" | "success";
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

const colorStyles = {
  teal: "bg-[#1B7A6E]",
  coral: "bg-[#E8845C]",
  gold: "bg-[#C4A962]",
  success: "bg-[#4CAF7D]",
};

const heightStyles = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export function Progress({
  value,
  max = 100,
  className = "",
  size = "md",
  color = "teal",
  showLabel = false,
  label,
  animated = true,
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-[#6B6560] font-body">
            {label ?? `${Math.round(percentage)}%`}
          </span>
          <span className="text-sm font-semibold text-[#2D2A26] font-body">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div
        className={`w-full bg-[#E8E2D8] rounded-full overflow-hidden ${heightStyles[size]}`}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`${heightStyles[size]} ${colorStyles[color]} rounded-full ${
            animated ? "transition-all duration-700 ease-out" : ""
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function StepProgress({ currentStep, totalSteps, className = "" }: StepProgressProps) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
            i < currentStep
              ? "bg-[#1B7A6E]"
              : i === currentStep
              ? "bg-[#1B7A6E]/40"
              : "bg-[#E8E2D8]"
          }`}
        />
      ))}
    </div>
  );
}
