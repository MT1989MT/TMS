"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const PIJN_REACTIE_LABELS: Record<string, { label: string; kleur: string }> = {
  angst:            { label: "Angst / paniek",      kleur: "bg-[#C75050]/10 text-[#C75050]" },
  nieuwsgierigheid: { label: "Nieuwsgierigheid",     kleur: "bg-[#1B7A6E]/10 text-[#1B7A6E]" },
  acceptatie:       { label: "Acceptatie / rust",    kleur: "bg-[#4CAF7D]/10 text-[#2d7a52]" },
  frustratie:       { label: "Frustratie",           kleur: "bg-[#E8845C]/10 text-[#d06a42]" },
};

interface CheckinItem {
  id: number;
  date: string;
  emotions: string[] | null;
  pain_reaction: string | null;
  journaled: boolean;
  notes: string | null;
}

interface Props {
  items: CheckinItem[];
}

export function EmotieHistorie({ items }: Props) {
  const [uitgevouwen, setUitgevouwen] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const isOpen = uitgevouwen === item.id;
        const datumLabel = new Date(item.date).toLocaleDateString("nl-NL", {
          weekday: "short", day: "numeric", month: "short",
        });
        const reactieMeta = item.pain_reaction ? PIJN_REACTIE_LABELS[item.pain_reaction] : null;

        return (
          <div
            key={item.id}
            className="bg-white rounded-[14px] border-2 border-[#E8E2D8] overflow-hidden transition-all"
          >
            <button
              onClick={() => setUitgevouwen(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex-shrink-0">
                  <div className={`w-2 h-2 rounded-full ${item.journaled ? "bg-[#1B7A6E]" : "bg-[#E8E2D8]"}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#2D2A26] font-body capitalize">{datumLabel}</p>
                  {item.emotions && item.emotions.length > 0 && (
                    <p className="text-xs text-[#6B6560] font-body truncate">
                      {item.emotions.slice(0, 3).join(", ")}
                      {item.emotions.length > 3 && ` +${item.emotions.length - 3}`}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {reactieMeta && (
                  <span className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-body ${reactieMeta.kleur}`}>
                    {reactieMeta.label}
                  </span>
                )}
                {isOpen
                  ? <ChevronUp className="w-4 h-4 text-[#6B6560]" />
                  : <ChevronDown className="w-4 h-4 text-[#6B6560]" />
                }
              </div>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 border-t border-[#F5F0E8] pt-3 space-y-3">
                {/* Emoties */}
                {item.emotions && item.emotions.length > 0 && (
                  <div>
                    <p className="text-[10px] text-[#6B6560] font-body uppercase tracking-wide font-semibold mb-1.5">
                      Emoties
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.emotions.map((e) => (
                        <Badge key={e} variant="teal">{e}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reactie */}
                {reactieMeta && (
                  <div>
                    <p className="text-[10px] text-[#6B6560] font-body uppercase tracking-wide font-semibold mb-1">
                      Reactie op pijn
                    </p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold font-body ${reactieMeta.kleur}`}>
                      {reactieMeta.label}
                    </span>
                  </div>
                )}

                {/* Gejournald */}
                <div className="flex items-center gap-2">
                  <BookOpen className={`w-3.5 h-3.5 ${item.journaled ? "text-[#1B7A6E]" : "text-[#B8B2A8]"}`} />
                  <p className="text-xs text-[#6B6560] font-body">
                    {item.journaled ? "Gejournald" : "Niet gejournald"}
                  </p>
                </div>

                {/* Notitie */}
                {item.notes && (
                  <div className="bg-[#F5F0E8] rounded-[10px] p-3">
                    <p className="text-xs text-[#6B6560] font-body italic">"{item.notes}"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
