"use client";

import { Clock, Lock, Play, Pause } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useAudioStore } from "@/store/audioStore";
import type { ContentItem } from "@/lib/seed-data";

interface Props {
  items: ContentItem[];
  isBetaald: boolean;
}

const FASE_BADGE: Record<string, "teal" | "coral" | "gold"> = {
  ontdekking: "teal",
  hertrainen: "coral",
  verdieping: "gold",
};

export function ContentLijst({ items, isBetaald }: Props) {
  const { currentTrack, isPlaying, play, pause, resume } = useAudioStore();

  const handlePlay = (item: ContentItem) => {
    const id = `content-${item.id}`;
    if (currentTrack?.id === id) {
      isPlaying ? pause() : resume();
    } else {
      play({
        id,
        titel: item.titel,
        type: item.type,
        audioUrl: item.audioUrl ?? `/audio/${item.type}/${item.id}.mp3`,
      });
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const id = `content-${item.id}`;
        const isDezeBezig = currentTrack?.id === id && isPlaying;
        const isGeblokkeerd = !item.isGratis && !isBetaald;

        return (
          <div
            key={item.id}
            className={[
              "bg-white rounded-[14px] border-2 p-4 transition-all duration-200",
              isGeblokkeerd
                ? "border-[#E8E2D8] opacity-75"
                : isDezeBezig
                ? "border-[#1B7A6E]/40 shadow-md"
                : "border-[#E8E2D8] hover:border-[#1B7A6E]/30 hover:shadow-sm",
            ].join(" ")}
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  {item.fase && (
                    <Badge variant={FASE_BADGE[item.fase] ?? "neutral"} className="text-[10px]">
                      {item.fase}
                    </Badge>
                  )}
                  {item.isGratis && (
                    <Badge variant="success" className="text-[10px]">Gratis</Badge>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-[#2D2A26] font-body leading-snug">
                  {item.titel}
                </h3>
                <p className="text-xs text-[#6B6560] font-body leading-relaxed mt-1 line-clamp-2">
                  {item.beschrijving}
                </p>
                <div className="flex items-center gap-1 mt-2 text-xs text-[#6B6560] font-body">
                  <Clock className="w-3 h-3" />
                  <span>{item.duurMinuten} min</span>
                </div>
              </div>

              {isGeblokkeerd ? (
                <div className="w-9 h-9 rounded-full bg-[#F5F0E8] flex items-center justify-center flex-shrink-0">
                  <Lock className="w-4 h-4 text-[#B8B2A8]" />
                </div>
              ) : (
                <button
                  onClick={() => handlePlay(item)}
                  className="w-10 h-10 rounded-full bg-[#1B7A6E] flex items-center justify-center flex-shrink-0 hover:bg-[#145f55] transition-colors shadow-sm"
                  aria-label={isDezeBezig ? "Pauzeren" : `${item.titel} afspelen`}
                >
                  {isDezeBezig ? (
                    <Pause className="w-4 h-4 text-white" />
                  ) : (
                    <Play className="w-4 h-4 text-white ml-0.5" />
                  )}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
