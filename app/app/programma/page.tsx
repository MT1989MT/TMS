import Link from "next/link";
import { ArrowLeft, Lock, CheckCircle, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { getUserProfile } from "@/lib/auth";
import {
  programmaData,
  getProgrammaFaseLabel,
  type ProgrammaFase,
} from "@/lib/seed-data";

export const metadata = { title: "90-Dagenprogramma — HerstelBrein" };

// Stub entries for days 31-90 (content to be built in later phases)
function getAllDagen() {
  const result = [...programmaData];
  for (let d = 31; d <= 90; d++) {
    const fase: ProgrammaFase = d <= 60 ? "hertrainen" : "verdieping";
    if (!result.find((r) => r.dag === d)) {
      result.push({
        dag: d,
        fase,
        titel: `Dag ${d}`,
        intro: "",
        journaalPrompt: "",
        herinnering: ((d - 1) % 12) + 1,
      });
    }
  }
  return result.sort((a, b) => a.dag - b.dag);
}

const FASE_KLEUR: Record<ProgrammaFase, { bg: string; text: string; border: string }> = {
  ontdekking: { bg: "bg-[#1B7A6E]/8", text: "text-[#1B7A6E]", border: "border-[#1B7A6E]/20" },
  hertrainen:  { bg: "bg-[#E8845C]/8", text: "text-[#E8845C]", border: "border-[#E8845C]/20" },
  verdieping:  { bg: "bg-[#C4A962]/10", text: "text-[#8a7240]", border: "border-[#C4A962]/25" },
};

const FASE_RANGES: { fase: ProgrammaFase; van: number; tot: number }[] = [
  { fase: "ontdekking", van: 1,  tot: 30 },
  { fase: "hertrainen", van: 31, tot: 60 },
  { fase: "verdieping", van: 61, tot: 90 },
];

export default async function ProgrammaPage() {
  const profile = await getUserProfile();
  const huidigeDag = profile?.current_day ?? 1;
  const isBetaald = profile?.subscription_status !== "free";
  const alleData = getAllDagen();

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
            <h1 className="text-lg font-heading text-[#2D2A26]">90-Dagenprogramma</h1>
            <p className="text-xs text-[#6B6560] font-body">Jouw persoonlijk herstelpad</p>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-8">
        {/* Progress summary */}
        <div className="bg-white rounded-[16px] border border-[#E8E2D8] p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-[#2D2A26] font-body">
              Jouw voortgang
            </span>
            <span className="text-sm text-[#6B6560] font-body">
              Dag {huidigeDag} van 90
            </span>
          </div>
          <div className="h-2.5 bg-[#E8E2D8] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1B7A6E] rounded-full transition-all duration-700"
              style={{ width: `${Math.round((huidigeDag / 90) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-[#6B6560] font-body">
            <span>Start</span>
            <span className="text-[#1B7A6E] font-semibold">
              {Math.round((huidigeDag / 90) * 100)}% voltooid
            </span>
            <span>Dag 90</span>
          </div>
        </div>

        {/* Fase sections */}
        {FASE_RANGES.map(({ fase, van, tot }) => {
          const kleur = FASE_KLEUR[fase];
          const dagenInFase = alleData.filter((d) => d.dag >= van && d.dag <= tot);
          const voltooidInFase = dagenInFase.filter((d) => d.dag < huidigeDag).length;

          return (
            <section key={fase}>
              {/* Fase header */}
              <div className={`${kleur.bg} border ${kleur.border} rounded-[14px] px-4 py-3 mb-3`}>
                <div className="flex items-center justify-between">
                  <div>
                    <Badge
                      className={`${kleur.bg} ${kleur.text} border ${kleur.border} mb-1`}
                    >
                      {getProgrammaFaseLabel(fase)}
                    </Badge>
                    <p className="text-xs text-[#6B6560] font-body">
                      Dag {van}–{tot} · {voltooidInFase} van 30 voltooid
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`text-2xl font-heading ${kleur.text}`}>
                      {voltooidInFase}
                    </span>
                    <span className="text-xs text-[#6B6560] font-body">/30</span>
                  </div>
                </div>
              </div>

              {/* Dag grid */}
              <div className="grid grid-cols-5 gap-2">
                {dagenInFase.map((dag) => {
                  const isVoltooid = dag.dag < huidigeDag;
                  const isHuidig = dag.dag === huidigeDag;
                  const isVergrendeld = dag.dag > 7 && !isBetaald;
                  const heeftContent = !!programmaData.find((d) => d.dag === dag.dag);

                  return (
                    <Link
                      key={dag.dag}
                      href={isVergrendeld ? "/app/profiel" : `/app/programma/${dag.dag}`}
                      className={[
                        "relative flex flex-col items-center justify-center aspect-square rounded-[12px] text-xs font-body transition-all duration-200",
                        isHuidig
                          ? "bg-[#1B7A6E] text-white shadow-md scale-105"
                          : isVoltooid
                          ? "bg-[#4CAF7D]/15 text-[#2d7a52] border border-[#4CAF7D]/30"
                          : isVergrendeld
                          ? "bg-[#F5F0E8] text-[#B8B2A8] cursor-pointer"
                          : heeftContent
                          ? "bg-white border border-[#E8E2D8] text-[#2D2A26] hover:border-[#1B7A6E]/40 hover:shadow-sm"
                          : "bg-[#F5F0E8] text-[#B8B2A8] cursor-default",
                      ].join(" ")}
                      aria-label={`Dag ${dag.dag}${isHuidig ? " (vandaag)" : ""}${isVoltooid ? " (voltooid)" : ""}${isVergrendeld ? " (vergrendeld)" : ""}`}
                    >
                      {isVoltooid && !isHuidig ? (
                        <CheckCircle className="w-4 h-4 text-[#4CAF7D]" />
                      ) : isVergrendeld ? (
                        <Lock className="w-3 h-3 opacity-50" />
                      ) : (
                        <span className={`font-semibold ${isHuidig ? "text-white" : ""}`}>
                          {dag.dag}
                        </span>
                      )}
                      {isHuidig && (
                        <span className="text-[9px] text-white/80 mt-0.5">Vandaag</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* Paywall banner */}
        {!isBetaald && (
          <div className="bg-[#1B7A6E] rounded-[16px] p-5 text-center">
            <Lock className="w-6 h-6 text-white/70 mx-auto mb-2" />
            <h3 className="text-base font-heading text-white mb-1">
              Dag 8–90 ontgrendelen
            </h3>
            <p className="text-sm text-white/80 font-body mb-4">
              Het volledige programma is beschikbaar met een betaald abonnement.
            </p>
            <Link href="/app/profiel">
              <button className="bg-white text-[#1B7A6E] rounded-full px-5 py-2.5 text-sm font-semibold font-body hover:bg-white/90 transition-colors flex items-center gap-1.5 mx-auto">
                Bekijk abonnementen
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        )}

        <div className="h-4" />
      </div>
    </div>
  );
}
