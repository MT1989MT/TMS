"use client";

import { Play, Pause } from "lucide-react";
import { useAudioStore } from "@/store/audioStore";

interface Props {
  id: string;
  titel: string;
  type: string;
  audioUrl: string;
}

export function AudioSpeelKnop({ id, titel, type, audioUrl }: Props) {
  const { currentTrack, isPlaying, play, pause, resume } = useAudioStore();

  const isDezeGeladen = currentTrack?.id === id;
  const isDezeBezig = isDezeGeladen && isPlaying;

  const handle = () => {
    if (isDezeGeladen) {
      isPlaying ? pause() : resume();
    } else {
      play({ id, titel, type, audioUrl });
    }
  };

  return (
    <button
      onClick={handle}
      className="flex items-center gap-2 bg-[#1B7A6E] text-white rounded-full px-4 py-2 text-sm font-semibold font-body hover:bg-[#145f55] transition-colors"
    >
      {isDezeBezig ? (
        <Pause className="w-3.5 h-3.5" />
      ) : (
        <Play className="w-3.5 h-3.5 ml-0.5" />
      )}
      {isDezeBezig ? "Pauze" : "Afspelen"}
    </button>
  );
}
