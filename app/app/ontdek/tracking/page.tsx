import Link from "next/link";
import { ArrowLeft, Activity } from "lucide-react";
import { ContentLijst } from "@/components/ContentLijst";
import { getUserProfile } from "@/lib/auth";
import { somaticTrackingOefeningen } from "@/lib/seed-data";

export const metadata = { title: "Somatic Tracking — BreinVrij" };

export default async function TrackingPage() {
  const profile = await getUserProfile();
  const isBetaald = profile?.subscription_status !== "free";

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <header className="bg-white border-b border-[#E8E2D8] px-4 py-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link href="/app/ontdek" className="w-9 h-9 rounded-full flex items-center justify-center text-[#6B6560] hover:text-[#2D2A26] hover:bg-[#F5F0E8] transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[8px] bg-[#E8845C]/10 flex items-center justify-center">
              <Activity className="w-4 h-4 text-[#E8845C]" />
            </div>
            <div>
              <h1 className="text-base font-heading text-[#2D2A26]">Somatic Tracking</h1>
              <p className="text-xs text-[#6B6560] font-body">{somaticTrackingOefeningen.length} oefeningen</p>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-lg mx-auto px-4 py-5">
        <div className="bg-[#E8845C]/8 border border-[#E8845C]/20 rounded-[14px] p-4 mb-5">
          <p className="text-sm text-[#2D2A26] font-body leading-relaxed">
            <strong>Wat is Somatic Tracking?</strong> Je observeert je pijn met milde nieuwsgierigheid —
            zonder angst, zonder oordeel. Dit stuurt veiligheidssignalen naar je brein en doorbreekt
            de angst-pijn cyclus.
          </p>
        </div>
        <ContentLijst items={somaticTrackingOefeningen} isBetaald={isBetaald} />
        <div className="h-8" />
      </div>
    </div>
  );
}
