"use client";

import { useState } from "react";
import { Play, Pause, ChevronDown, ChevronUp } from "lucide-react";
import { useAudioStore } from "@/store/audioStore";
import type { DagelijkseHerinnering } from "@/lib/seed-data";

interface DailyReminderProps {
  herinnering: DagelijkseHerinnering;
}

export function DailyReminder({ herinnering }: DailyReminderProps) {
  const [uitgevouwen, setUitgevouwen] = useState(false);
  const { currentTrack, isPlaying, play, pause, resume } = useAudioStore();

  const trackId = `herinnering-${herinnering.nummer}`;
  const isDezeBezig =
    currentTrack?.id === trackId && isPlaying;
  const isDezeGeladen = currentTrack?.id === trackId;

  const handleAudio = () => {
    if (isDezeGeladen) {
      isPlaying ? pause() : resume();
    } else {
      play({
        id: trackId,
        titel: `Herinnering ${herinnering.nummer}`,
        type: "herinnering",
        // Placeholder URL — wordt vervangen met echte Supabase Storage URL
        audioUrl: `/audio/herinneringen/herinnering-${herinnering.nummer}.mp3`,
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1B7A6E]/8 to-[#1B7A6E]/4 border border-[#1B7A6E]/20 rounded-[16px] p-5">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <p className="text-xs font-semibold text-[#1B7A6E] uppercase tracking-wide mb-1 font-body">
            Herinnering {herinnering.nummer} van 12
          </p>
          <p className="text-base font-body text-[#2D2A26] leading-snug">
            &ldquo;{herinnering.tekst}&rdquo;
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Play button */}
        <button
          onClick={handleAudio}
          className="flex items-center gap-2 bg-[#1B7A6E] text-white rounded-full px-4 py-2 text-sm font-semibold font-body hover:bg-[#145f55] transition-colors"
          aria-label={isDezeBezig ? "Pauzeren" : "Afspelen"}
        >
          {isDezeBezig ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5 ml-0.5" />
          )}
          {isDezeBezig ? "Pauze" : "Beluister"}
        </button>

        {/* Expand/collapse uitleg */}
        <button
          onClick={() => setUitgevouwen((v) => !v)}
          className="flex items-center gap-1 text-sm text-[#1B7A6E] hover:text-[#145f55] transition-colors font-body"
          aria-expanded={uitgevouwen}
        >
          Uitleg
          {uitgevouwen ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Uitleg */}
      {uitgevouwen && (
        <div className="mt-3 pt-3 border-t border-[#1B7A6E]/15">
          <p className="text-sm text-[#6B6560] font-body leading-relaxed">
            {herinnering.uitleg}
          </p>
        </div>
      )}
    </div>
  );
}
