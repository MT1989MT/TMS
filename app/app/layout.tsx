import { BottomNav } from "@/components/BottomNav";
import { AudioPlayer } from "@/components/AudioPlayer";
import { FlareUpButton } from "@/components/FlareUpButton";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-16">
      {/* Main content */}
      <main>{children}</main>

      {/* Persistent bottom navigation */}
      <BottomNav />

      {/* Persistent audio player (renders above bottom nav when active) */}
      <AudioPlayer />

      {/* Flare-up floating action button */}
      <FlareUpButton />
    </div>
  );
}
