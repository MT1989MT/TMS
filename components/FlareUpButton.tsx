"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { useAudioStore } from "@/store/audioStore";

/**
 * Floating action button — altijd zichtbaar, altijd bereikbaar.
 * Positie: rechtsonder boven de bottom nav.
 */
export function FlareUpButton() {
  const { currentTrack } = useAudioStore();

  // Lift above audio player when it's active
  const bottomClass = currentTrack
    ? "bottom-[calc(4rem+56px+1rem)]"
    : "bottom-20";

  return (
    <Link
      href="/app/flareup"
      className={[
        "fixed right-4 z-50 transition-all duration-300",
        bottomClass,
        "flex items-center gap-2 bg-[#C75050] text-white rounded-full px-4 py-3",
        "shadow-[0_4px_16px_rgba(199,80,80,0.40)] hover:bg-[#a83f3f] active:scale-95",
        "transition-all duration-200",
      ].join(" ")}
      aria-label="Hulp bij pijnopvlamming"
    >
      <Zap className="w-4 h-4 fill-white" />
      <span className="text-sm font-semibold font-body">Flare-up</span>
    </Link>
  );
}
