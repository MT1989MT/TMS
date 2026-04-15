"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { slaEmotieCheckInOp } from "@/app/actions/emoties";

const EMOTIES = [
  "Angstig", "Gefrustreerd", "Overweldigd", "Boos", "Verdrietig",
  "Eenzaam", "Gespannen", "Moe", "Onzeker", "Teleurgesteld",
  "Hoopvol", "Rustig", "Dankbaar", "Blij", "Nieuwsgierig",
];

const PIJN_REACTIES = [
  { waarde: "angst",          label: "Angst / paniek" },
  { waarde: "nieuwsgierigheid", label: "Nieuwsgierigheid" },
  { waarde: "acceptatie",     label: "Acceptatie / rust" },
  { waarde: "frustratie",     label: "Frustratie" },
];

interface Props {
  onKlaar?: () => void;
  compact?: boolean;
}

export function EmotionCheckin({ onKlaar, compact = false }: Props) {
  const router = useRouter();
  const [state, actie, isPending] = useActionState(slaEmotieCheckInOp, {});
  const [gekozenEmoties, setGekozenEmoties] = useState<string[]>([]);
  const [pijnReactie, setPijnReactie] = useState("");
  const [gejournald, setGejournald] = useState(false);
  const [stap, setStap] = useState<"emoties" | "reactie" | "journaal" | "klaar">("emoties");

  const toggleEmotie = (e: string) =>
    setGekozenEmoties((prev) =>
      prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]
    );

  if (state.succes || stap === "klaar") {
    return (
      <div className="text-center py-6">
        <div className="w-14 h-14 bg-[#4CAF7D]/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="w-7 h-7 text-[#4CAF7D]" />
        </div>
        <p className="font-heading text-[#2D2A26] text-lg mb-1">Check-in opgeslagen</p>
        <p className="text-sm text-[#6B6560] font-body">Goed gedaan. Jij let op jezelf.</p>
        {onKlaar && (
          <Button variant="ghost" size="sm" onClick={onKlaar} className="mt-4">
            Sluiten
          </Button>
        )}
      </div>
    );
  }

  return (
    <form action={actie} className="space-y-5">
      {/* Hidden fields */}
      {gekozenEmoties.map((e) => (
        <input key={e} type="hidden" name="emoties" value={e} />
      ))}
      <input type="hidden" name="pijn_reactie" value={pijnReactie} />
      <input type="hidden" name="gejournald" value={gejournald.toString()} />

      {state.error && (
        <p className="text-sm text-[#C75050] font-body">{state.error}</p>
      )}

      {/* Stap 1: Emoties */}
      {stap === "emoties" && (
        <div className="space-y-4 animate-fade-in-up">
          <p className="text-sm font-semibold text-[#2D2A26] font-body">
            Hoe voel je je vandaag?
          </p>
          <div className="flex flex-wrap gap-2">
            {EMOTIES.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => toggleEmotie(e)}
                className={[
                  "px-3 py-1.5 rounded-full text-sm font-body border-2 transition-all",
                  gekozenEmoties.includes(e)
                    ? "border-[#1B7A6E] bg-[#1B7A6E] text-white"
                    : "border-[#E8E2D8] bg-white text-[#2D2A26] hover:border-[#1B7A6E]/40",
                ].join(" ")}
              >
                {e}
              </button>
            ))}
          </div>
          <Button
            type="button"
            fullWidth
            disabled={gekozenEmoties.length === 0}
            onClick={() => setStap("reactie")}
          >
            Verder
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Stap 2: Reactie op pijn */}
      {stap === "reactie" && (
        <div className="space-y-4 animate-fade-in-up">
          <p className="text-sm font-semibold text-[#2D2A26] font-body">
            Hoe reageer je vandaag op je pijn?
          </p>
          <div className="space-y-2">
            {PIJN_REACTIES.map((r) => (
              <button
                key={r.waarde}
                type="button"
                onClick={() => setPijnReactie(r.waarde)}
                className={[
                  "w-full text-left px-4 py-3 rounded-[12px] border-2 font-body text-sm transition-all",
                  pijnReactie === r.waarde
                    ? "border-[#1B7A6E] bg-[#1B7A6E]/8 text-[#1B7A6E]"
                    : "border-[#E8E2D8] bg-white text-[#2D2A26] hover:border-[#1B7A6E]/30",
                ].join(" ")}
              >
                {r.label}
              </button>
            ))}
          </div>
          <Button
            type="button"
            fullWidth
            disabled={!pijnReactie}
            onClick={() => setStap("journaal")}
          >
            Verder
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Stap 3: Gejournald? */}
      {stap === "journaal" && (
        <div className="space-y-4 animate-fade-in-up">
          <p className="text-sm font-semibold text-[#2D2A26] font-body">
            Heb je vandaag gejournald?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { waarde: true,  label: "Ja, gedaan ✓" },
              { waarde: false, label: "Nee, nog niet" },
            ].map((opt) => (
              <button
                key={String(opt.waarde)}
                type="button"
                onClick={() => setGejournald(opt.waarde)}
                className={[
                  "py-3 rounded-[12px] border-2 font-body text-sm font-semibold transition-all",
                  gejournald === opt.waarde
                    ? "border-[#1B7A6E] bg-[#1B7A6E] text-white"
                    : "border-[#E8E2D8] bg-white text-[#2D2A26] hover:border-[#1B7A6E]/30",
                ].join(" ")}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {!compact && (
            <div>
              <label className="block text-xs text-[#6B6560] font-body mb-1.5">
                Korte notitie (optioneel)
              </label>
              <textarea
                name="notities"
                rows={2}
                placeholder="Bijv. een observatie of inzicht van vandaag…"
                className="w-full px-3 py-2 rounded-[10px] border-2 border-[#E8E2D8] bg-white text-sm text-[#2D2A26] font-body placeholder-[#B8B2A8] focus:outline-none focus:border-[#1B7A6E] resize-none transition-colors"
              />
            </div>
          )}

          <Button type="submit" fullWidth loading={isPending}>
            <CheckCircle className="w-4 h-4" />
            Check-in opslaan
          </Button>
        </div>
      )}
    </form>
  );
}
