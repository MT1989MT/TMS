import Link from "next/link";
import { ArrowLeft, Brain } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { dagelijkseHerinneringen } from "@/lib/seed-data";
import { HerinnernigKaart } from "./HerinnernigKaart";

export const metadata = {
  title: "12 Herinneringen — BreinVrij",
};

export default function HerinneringenPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <header className="bg-white border-b border-[#E8E2D8] px-4 py-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link
            href="/app"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#6B6560] hover:text-[#2D2A26] hover:bg-[#F5F0E8] transition-colors"
            aria-label="Terug naar dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-lg font-heading text-[#2D2A26]">12 Dagelijkse Herinneringen</h1>
            <p className="text-xs text-[#6B6560] font-body">Dr. John Sarno</p>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Intro */}
        <Card variant="teal" padding="md">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-[10px] bg-[#1B7A6E] flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#2D2A26] font-body mb-1">
                Hoe gebruik je deze herinneringen?
              </p>
              <p className="text-sm text-[#6B6560] font-body leading-relaxed">
                Lees of beluister deze 12 herinneringen elke dag. Dr. Sarno adviseerde dit totdat je
                volledig hersteld bent. Ze versterken de kennis dat jouw lichaam gezond is en dat
                pijn onschuldig is.
              </p>
            </div>
          </div>
        </Card>

        {/* Badge */}
        <div className="flex items-center gap-2">
          <Badge variant="teal">12 herinneringen</Badge>
          <span className="text-xs text-[#6B6560] font-body">Tik op een herinnering voor uitleg</span>
        </div>

        {/* Herinneringen lijst */}
        <div className="space-y-3">
          {dagelijkseHerinneringen.map((herinnering) => (
            <HerinnernigKaart key={herinnering.nummer} herinnering={herinnering} />
          ))}
        </div>

        {/* Footer note */}
        <p className="text-xs text-[#6B6560] font-body text-center pb-4">
          Bron: Dr. John Sarno, &ldquo;Healing Back Pain&rdquo; (1991)
        </p>
      </div>
    </div>
  );
}
