"use client";

import { useState } from "react";
import { Play, Pause, ChevronDown, ChevronUp } from "lucide-react";
import { useAudioStore } from "@/store/audioStore";
import type { DagelijkseHerinnering } from "@/lib/seed-data";

export function HerinnernigKaart({ herinnering }: { herinnering: DagelijkseHerinnering }) {
  const [open, setOpen] = useState(false);
  const { currentTrack, isPlaying, play, pause, resume } = useAudioStore();

  const trackId = `herinnering-${herinnering.nummer}`;
  const isDezeBezig = currentTrack?.id === trackId && isPlaying;
  const isDezeGeladen = currentTrack?.id === trackId;

  const handleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDezeGeladen) {
      isPlaying ? pause() : resume();
    } else {
      play({
        id: trackId,
        titel: `Herinnering ${herinnering.nummer} van 12`,
        type: "herinnering",
        audioUrl: `/audio/herinneringen/herinnering-${herinnering.nummer}.mp3`,
      });
    }
  };

  return (
    <div
      className={[
        "bg-white rounded-[14px] border-2 overflow-hidden transition-all duration-200",
        open ? "border-[#1B7A6E]/40 shadow-md" : "border-[#E8E2D8] hover:border-[#1B7A6E]/20",
      ].join(" ")}
    >
      {/* Main row */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start gap-3 p-4 text-left"
        aria-expanded={open}
      >
        {/* Number badge */}
        <div
          className={[
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold font-body flex-shrink-0 mt-0.5",
            open ? "bg-[#1B7A6E] text-white" : "bg-[#F5F0E8] text-[#6B6560]",
          ].join(" ")}
        >
          {herinnering.nummer}
        </div>

        <p className="flex-1 text-sm text-[#2D2A26] font-body leading-snug">
          {herinnering.tekst}
        </p>

        <div className="flex items-center gap-1 flex-shrink-0">
          {open ? (
            <ChevronUp className="w-4 h-4 text-[#6B6560]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#6B6560]" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-[#E8E2D8]">
          <p className="text-sm text-[#6B6560] font-body leading-relaxed pt-3">
            {herinnering.uitleg}
          </p>
          <button
            onClick={handleAudio}
            className="flex items-center gap-2 bg-[#1B7A6E] text-white rounded-full px-4 py-2 text-sm font-semibold font-body hover:bg-[#145f55] transition-colors"
          >
            {isDezeBezig ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5 ml-0.5" />
            )}
            {isDezeBezig ? "Pauzeer" : "Beluister"}
          </button>
        </div>
      )}
    </div>
  );
}
