"use client";

import { useActionState, useRef, useEffect } from "react";
import { Plus, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { voegBewijsToe } from "@/app/actions/bewijs";

const categorieOpties = [
  { value: "inconsistentie",   label: "Inconsistentie" },
  { value: "stress_trigger",   label: "Stress-trigger" },
  { value: "voorgeschiedenis", label: "Voorgeschiedenis" },
  { value: "geen_structureel", label: "Geen structurele oorzaak" },
];

export function BewijsFormulier() {
  const [state, actie, isPending] = useActionState(voegBewijsToe, {});
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form after success
  useEffect(() => {
    if (state.succes) formRef.current?.reset();
  }, [state.succes]);

  return (
    <form ref={formRef} action={actie} className="space-y-3">
      {state.error && (
        <p className="text-sm text-[#C75050] font-body bg-[#C75050]/8 rounded-[10px] px-3 py-2">
          {state.error}
        </p>
      )}
      {state.succes && (
        <div className="flex items-center gap-2 text-sm text-[#2d7a52] font-body bg-[#4CAF7D]/10 rounded-[10px] px-3 py-2">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          Bewijs toegevoegd!
        </div>
      )}

      <textarea
        name="tekst"
        required
        minLength={5}
        maxLength={500}
        rows={3}
        placeholder="Beschrijf jouw persoonlijk bewijs… bijv. 'Mijn pijn verhuist van rug naar nek' of 'Na vakantie was de pijn tijdelijk weg'"
        className="w-full px-4 py-3 rounded-[12px] border-2 border-[#E8E2D8] bg-white text-[#2D2A26] font-body text-sm placeholder-[#B8B2A8] focus:outline-none focus:border-[#1B7A6E] resize-none transition-colors"
      />

      <div className="flex items-center gap-3">
        <select
          name="categorie"
          className="flex-1 px-3 py-2.5 rounded-[10px] border-2 border-[#E8E2D8] bg-white text-sm text-[#2D2A26] font-body focus:outline-none focus:border-[#1B7A6E] transition-colors"
        >
          <option value="">Categorie (optioneel)</option>
          {categorieOpties.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <Button type="submit" loading={isPending} size="md" className="flex-shrink-0">
          <Plus className="w-4 h-4" />
          Toevoegen
        </Button>
      </div>
    </form>
  );
}
