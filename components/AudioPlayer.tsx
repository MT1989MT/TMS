"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  X,
  ChevronDown,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useAudioStore } from "@/store/audioStore";

const TYPE_LABELS: Record<string, string> = {
  educatie: "Educatieles",
  somatic_tracking: "Somatic Tracking",
  meditatie: "Meditatie",
  brain_training: "Brain Training",
  herinnering: "Herinnering",
  flareup: "Flare-up hulp",
};

function formatTijd(seconden: number): string {
  const m = Math.floor(seconden / 60);
  const s = Math.floor(seconden % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function AudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    progress,
    volume,
    isMinimized,
    pause,
    resume,
    stop,
    setProgress,
    setVolume,
    toggleMinimize,
  } = useAudioStore();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Sync audio element when track changes
  useEffect(() => {
    if (!currentTrack) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentTrack.audioUrl;
    audio.load();
    if (isPlaying) audio.play().catch(() => {});
  }, [currentTrack?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      audio.play().catch(() => pause());
    } else {
      audio.pause();
    }
  }, [isPlaying]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setCurrentTime(audio.currentTime);
    setProgress(audio.currentTime / audio.duration);
  }, [setProgress]);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const handleEnded = useCallback(() => {
    pause();
    setProgress(0);
    setCurrentTime(0);
  }, [pause, setProgress]);

  const seek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      const bar = progressBarRef.current;
      if (!audio || !bar || !audio.duration) return;

      const rect = bar.getBoundingClientRect();
      const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      audio.currentTime = fraction * audio.duration;
      setProgress(fraction);
    },
    [setProgress]
  );

  const skip = useCallback(
    (seconds: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + seconds));
    },
    []
  );

  if (!currentTrack) return null;

  const typeLabel = TYPE_LABELS[currentTrack.type] ?? currentTrack.type;

  // Minimized pill
  if (isMinimized) {
    return (
      <div className="fixed bottom-20 right-4 z-50 md:bottom-6">
        <button
          onClick={toggleMinimize}
          className="flex items-center gap-2 bg-[#1B7A6E] text-white rounded-full pl-3 pr-4 py-2 shadow-lg hover:bg-[#145f55] transition-colors"
          aria-label="Audio uitklappen"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            {isPlaying ? (
              <Pause className="w-3 h-3" />
            ) : (
              <Play className="w-3 h-3 ml-0.5" />
            )}
          </div>
          <span className="text-xs font-semibold font-body truncate max-w-[120px]">
            {currentTrack.titel}
          </span>
          <ChevronDown className="w-3 h-3 opacity-70" />
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* Player bar */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E8E2D8] shadow-[0_-4px_16px_rgba(45,42,38,0.10)]">
        {/* Progress bar */}
        <div
          ref={progressBarRef}
          onClick={seek}
          className="h-1 bg-[#E8E2D8] cursor-pointer group"
          role="slider"
          aria-label="Afspeelvoortgang"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-[#1B7A6E] relative transition-none"
            style={{ width: `${progress * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#1B7A6E] rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm" />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 px-4 py-3 max-w-2xl mx-auto">
          {/* Track info */}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#1B7A6E] font-semibold font-body truncate">
              {typeLabel}
            </p>
            <p className="text-sm font-semibold text-[#2D2A26] font-body truncate">
              {currentTrack.titel}
            </p>
            {duration > 0 && (
              <p className="text-xs text-[#6B6560] font-body">
                {formatTijd(currentTime)} / {formatTijd(duration)}
              </p>
            )}
          </div>

          {/* Playback controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => skip(-15)}
              className="w-9 h-9 flex items-center justify-center rounded-full text-[#6B6560] hover:text-[#2D2A26] hover:bg-[#F5F0E8] transition-colors"
              aria-label="15 seconden terug"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={isPlaying ? pause : resume}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1B7A6E] text-white hover:bg-[#145f55] transition-colors"
              aria-label={isPlaying ? "Pauzeren" : "Afspelen"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </button>

            <button
              onClick={() => skip(15)}
              className="w-9 h-9 flex items-center justify-center rounded-full text-[#6B6560] hover:text-[#2D2A26] hover:bg-[#F5F0E8] transition-colors"
              aria-label="15 seconden vooruit"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Secondary controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMuted((m) => !m)}
              className="w-8 h-8 flex items-center justify-center rounded-full text-[#6B6560] hover:text-[#2D2A26] hover:bg-[#F5F0E8] transition-colors"
              aria-label={isMuted ? "Geluid aan" : "Geluid uit"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={toggleMinimize}
              className="w-8 h-8 flex items-center justify-center rounded-full text-[#6B6560] hover:text-[#2D2A26] hover:bg-[#F5F0E8] transition-colors"
              aria-label="Minimaliseren"
            >
              <ChevronDown className="w-4 h-4" />
            </button>

            <button
              onClick={stop}
              className="w-8 h-8 flex items-center justify-center rounded-full text-[#6B6560] hover:text-[#C75050] hover:bg-[#C75050]/10 transition-colors"
              aria-label="Stoppen"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
