"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

interface Props {
  dag: number;
}

export function DagVoltooidButton({ dag }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleVoltooid = () => {
    startTransition(async () => {
      // TODO: server action om dag als voltooid te markeren en current_day te verhogen
      // Voor nu: refresh zodat de UI de state kan updaten zodra supabase is geconfigureerd
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleVoltooid}
      disabled={isPending}
      className="w-full flex items-center justify-center gap-2 py-4 rounded-[14px] bg-[#1B7A6E] text-white font-semibold font-body text-base hover:bg-[#145f55] transition-colors disabled:opacity-60"
    >
      {isPending ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Wordt opgeslagen…
        </>
      ) : (
        <>
          <CheckCircle className="w-5 h-5" />
          Dag {dag} markeren als voltooid
        </>
      )}
    </button>
  );
}
