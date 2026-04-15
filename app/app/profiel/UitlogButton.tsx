"use client";

import { useTransition } from "react";
import { LogOut } from "lucide-react";
import { uitloggen } from "@/app/actions/auth";

export function UitlogButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => uitloggen())}
      disabled={isPending}
      className={[
        "w-full flex items-center justify-center gap-2 py-3 rounded-[14px] border-2 border-[#C75050]/30",
        "text-sm font-semibold font-body text-[#C75050]",
        "hover:bg-[#C75050]/5 transition-colors",
        isPending ? "opacity-50 cursor-not-allowed" : "",
      ].join(" ")}
    >
      <LogOut className="w-4 h-4" />
      {isPending ? "Uitloggen…" : "Uitloggen"}
    </button>
  );
}
