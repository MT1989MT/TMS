"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { verwijderBewijs } from "@/app/actions/bewijs";

const CATEGORIE_LABELS: Record<string, { label: string; kleur: string }> = {
  inconsistentie:   { label: "Inconsistentie",        kleur: "bg-[#1B7A6E]/10 text-[#1B7A6E]" },
  stress_trigger:   { label: "Stress-trigger",         kleur: "bg-[#E8845C]/10 text-[#d06a42]" },
  voorgeschiedenis: { label: "Voorgeschiedenis",       kleur: "bg-[#C4A962]/15 text-[#8a7240]" },
  geen_structureel: { label: "Geen structurele oorzaak", kleur: "bg-[#4CAF7D]/10 text-[#2d7a52]" },
};

interface Props {
  id: number;
  tekst: string;
  categorie: string | null;
  datum: string;
}

export function BewijsItem({ id, tekst, categorie, datum }: Props) {
  const [isPending, startTransition] = useTransition();
  const catMeta = categorie ? CATEGORIE_LABELS[categorie] : null;

  const handleVerwijder = () => {
    startTransition(() => verwijderBewijs(id));
  };

  return (
    <div className={`bg-white rounded-[14px] border-2 border-[#E8E2D8] p-4 transition-opacity ${isPending ? "opacity-50" : ""}`}>
      <div className="flex items-start gap-3">
        {/* Number bullet */}
        <div className="w-7 h-7 rounded-full bg-[#1B7A6E]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1B7A6E]" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm text-[#2D2A26] font-body leading-relaxed">{tekst}</p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {catMeta && (
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-body ${catMeta.kleur}`}>
                {catMeta.label}
              </span>
            )}
            <span className="text-[10px] text-[#6B6560] font-body">
              {new Date(datum).toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" })}
            </span>
          </div>
        </div>

        <button
          onClick={handleVerwijder}
          disabled={isPending}
          className="w-8 h-8 flex items-center justify-center rounded-full text-[#B8B2A8] hover:text-[#C75050] hover:bg-[#C75050]/10 transition-colors flex-shrink-0"
          aria-label="Verwijder dit bewijs"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
