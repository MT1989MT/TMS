import Link from "next/link";
import { ArrowLeft, Brain } from "lucide-react";
import { ContentLijst } from "@/components/ContentLijst";
import { getUserProfile } from "@/lib/auth";
import { meditaties } from "@/lib/seed-data";

export const metadata = { title: "Meditaties — BreinVrij" };

export default async function MeditatiesPage() {
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
            <div className="w-8 h-8 rounded-[8px] bg-[#1B7A6E]/10 flex items-center justify-center">
              <Brain className="w-4 h-4 text-[#1B7A6E]" />
            </div>
            <div>
              <h1 className="text-base font-heading text-[#2D2A26]">Meditaties</h1>
              <p className="text-xs text-[#6B6560] font-body">{meditaties.length} meditaties</p>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-lg mx-auto px-4 py-5">
        <p className="text-sm text-[#6B6560] font-body mb-5 leading-relaxed">
          Meditaties kalmeren het zenuwstelsel en activeren het parasympathische systeem —
          de tegenpool van de vecht-of-vlucht reactie die pijn in stand houdt.
        </p>
        <ContentLijst items={meditaties} isBetaald={isBetaald} />
        <div className="h-8" />
      </div>
    </div>
  );
}
