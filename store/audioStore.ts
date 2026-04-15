import { create } from "zustand";

export interface Track {
  id: string;
  titel: string;
  type: string; // 'educatie' | 'somatic_tracking' | 'meditatie' | 'brain_training' | 'herinnering'
  audioUrl: string;
  duurSeconden?: number;
}

interface AudioState {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number; // 0-1 (fraction of duration)
  volume: number; // 0-1
  isMinimized: boolean;

  // Actions
  play: (track: Track) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  setProgress: (progress: number) => void;
  setVolume: (volume: number) => void;
  toggleMinimize: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  progress: 0,
  volume: 1,
  isMinimized: false,

  play: (track) => {
    set({ currentTrack: track, isPlaying: true, progress: 0, isMinimized: false });
  },

  pause: () => set({ isPlaying: false }),

  resume: () => {
    if (get().currentTrack) {
      set({ isPlaying: true });
    }
  },

  stop: () => set({ currentTrack: null, isPlaying: false, progress: 0 }),

  setProgress: (progress) => set({ progress: Math.max(0, Math.min(1, progress)) }),

  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),

  toggleMinimize: () => set((s) => ({ isMinimized: !s.isMinimized })),
}));
