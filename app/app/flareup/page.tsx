"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  X,
  Activity,
  Shield,
  Heart,
  Mic,
  Hand,
  ChevronRight,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAudioStore } from "@/store/audioStore";

// ─── Types ────────────────────────────────────────────────────────────────────

type Stap = "adem" | "keuze" | "techniek" | "afsluiting";

type TechniekId =
  | "tracking"
  | "veiligheid"
  | "emotie"
  | "peptalk"
  | "grounding";

interface Techniek {
  id: TechniekId;
  label: string;
  beschrijving: string;
  icon: React.ElementType;
  kleur: string;
  iconKleur: string;
  duurMinuten: number;
  audioId: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const technieken: Techniek[] = [
  {
    id: "tracking",
    label: "Somatic Tracking",
    beschrijving: "Observeer je pijn met milde nieuwsgierigheid — geen angst, alleen interesse.",
    icon: Activity,
    kleur: "border-[#1B7A6E]/30 bg-[#1B7A6E]/5",
    iconKleur: "bg-[#1B7A6E]/10 text-[#1B7A6E]",
    duurMinuten: 5,
    audioId: 501,
  },
  {
    id: "veiligheid",
    label: "Veiligheidsherinnering",
    beschrijving: "Jouw lichaam is gezond. De pijn is onschuldig. Hoor dit opnieuw.",
    icon: Shield,
    kleur: "border-[#4CAF7D]/30 bg-[#4CAF7D]/5",
    iconKleur: "bg-[#4CAF7D]/10 text-[#4CAF7D]",
    duurMinuten: 3,
    audioId: 502,
  },
  {
    id: "emotie",
    label: "Emotie check-in",
    beschrijving: "Wat voel je nu écht? Misschien is er iets dat aandacht vraagt.",
    icon: Heart,
    kleur: "border-[#C4A962]/30 bg-[#C4A962]/5",
    iconKleur: "bg-[#C4A962]/15 text-[#8a7240]",
    duurMinuten: 4,
    audioId: 502,
  },
  {
    id: "peptalk",
    label: "Peptalk",
    beschrijving: "Jij bent sterker dan de pijn. Dit gaat voorbij. Luister naar dit.",
    icon: Mic,
    kleur: "border-[#E8845C]/30 bg-[#E8845C]/5",
    iconKleur: "bg-[#E8845C]/10 text-[#E8845C]",
    duurMinuten: 4,
    audioId: 503,
  },
  {
    id: "grounding",
    label: "5-4-3-2-1 Grounding",
    beschrijving: "Kom terug naar het hier en nu via je vijf zintuigen.",
    icon: Hand,
    kleur: "border-[#1B7A6E]/30 bg-[#1B7A6E]/5",
    iconKleur: "bg-[#1B7A6E]/10 text-[#1B7A6E]",
    duurMinuten: 4,
    audioId: 504,
  },
];

// ─── Breathe Circle ────────────────────────────────────────────────────────────

function AdemCircle({ seconden, totaal }: { seconden: number; totaal: number }) {
  const fraction = seconden / totaal;
  // Breathing phases: 0-4s in, 4-8s hold, 8-12s out, 12-16s hold, repeat
  const cyclusDuur = 16;
  const cyclusPositie = (totaal - seconden) % cyclusDuur;
  const schaal = cyclusPositie < 4 ? 1 + (cyclusPositie / 4) * 0.2
    : cyclusPositie < 8 ? 1.2
    : cyclusPositie < 12 ? 1.2 - ((cyclusPositie - 8) / 4) * 0.2
    : 1;
  const fase =
    cyclusPositie < 4 ? "Adem in…"
    : cyclusPositie < 8 ? "Vasthouden…"
    : cyclusPositie < 12 ? "Adem uit…"
    : "Pauzeer…";

  const radius = 80;
  const omtrek = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-56 h-56 flex items-center justify-center">
        {/* Background ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r={radius} fill="none" stroke="#E8E2D8" strokeWidth="6" />
          <circle
            cx="100" cy="100" r={radius}
            fill="none"
            stroke="#1B7A6E"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={omtrek}
            strokeDashoffset={omtrek * (1 - (1 - fraction))}
            className="transition-all duration-1000"
          />
        </svg>

        {/* Breathing orb */}
        <div
          className="w-28 h-28 rounded-full bg-gradient-to-br from-[#1B7A6E] to-[#2a9a8b] shadow-lg transition-transform duration-1000 ease-in-out flex items-center justify-center"
          style={{ transform: `scale(${schaal})` }}
        >
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/30" />
          </div>
        </div>
      </div>

      <p className="text-lg font-heading text-[#2D2A26] mt-4">{fase}</p>
      <p className="text-sm text-[#6B6560] font-body mt-1">{seconden} seconden resterend</p>
    </div>
  );
}

// ─── Grounding exercice (text-based, no audio needed) ─────────────────────────

function GroundingOefening({ onKlaar }: { onKlaar: () => void }) {
  const [stap, setStap] = useState(0);
  const stappen = [
    { aantal: 5, zintuig: "dingen die je KAN ZIEN", kleur: "text-[#1B7A6E]" },
    { aantal: 4, zintuig: "dingen die je KAN AANRAKEN", kleur: "text-[#E8845C]" },
    { aantal: 3, zintuig: "dingen die je KAN HOREN", kleur: "text-[#C4A962]" },
    { aantal: 2, zintuig: "dingen die je KAN RUIKEN", kleur: "text-[#4CAF7D]" },
    { aantal: 1, zintuig: "ding dat je KAN PROEVEN", kleur: "text-[#1B7A6E]" },
  ];
  const huidige = stappen[stap];

  return (
    <div className="text-center space-y-6">
      <div>
        <p className="text-xs text-[#6B6560] font-body mb-2">
          Stap {stap + 1} van {stappen.length}
        </p>
        <div className="text-6xl font-heading text-[#1B7A6E] mb-3">{huidige.aantal}</div>
        <p className="text-lg text-[#2D2A26] font-body">
          Noem {huidige.aantal} {huidige.zintuig}
        </p>
        <p className="text-sm text-[#6B6560] font-body mt-2">
          Neem je tijd. Kijk om je heen.
        </p>
      </div>

      <div className="flex gap-3">
        {stap > 0 && (
          <Button variant="outline" onClick={() => setStap((s) => s - 1)} className="flex-1">
            Vorige
          </Button>
        )}
        {stap < stappen.length - 1 ? (
          <Button onClick={() => setStap((s) => s + 1)} className="flex-1">
            Volgende
          </Button>
        ) : (
          <Button onClick={onKlaar} className="flex-1">
            <CheckCircle className="w-4 h-4" />
            Klaar
          </Button>
        )}
      </div>
    </div>
  );
}

// ─── Emotie check ─────────────────────────────────────────────────────────────

const emotieOpties = [
  "Angstig", "Gefrustreerd", "Overweldigd", "Boos", "Verdrietig",
  "Eenzaam", "Gespannen", "Moe", "Onzeker", "Teleurgesteld",
];

function EmotieCheck({ onKlaar }: { onKlaar: () => void }) {
  const [gekozen, setGekozen] = useState<string[]>([]);

  const toggle = (e: string) =>
    setGekozen((prev) =>
      prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]
    );

  return (
    <div className="space-y-5">
      <p className="text-sm text-[#6B6560] font-body text-center">
        Selecteer wat je nu voelt. Er is geen goed of fout antwoord.
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        {emotieOpties.map((e) => (
          <button
            key={e}
            onClick={() => toggle(e)}
            className={[
              "px-3 py-2 rounded-full text-sm font-body border-2 transition-all",
              gekozen.includes(e)
                ? "border-[#1B7A6E] bg-[#1B7A6E] text-white"
                : "border-[#E8E2D8] bg-white text-[#2D2A26] hover:border-[#1B7A6E]/40",
            ].join(" ")}
          >
            {e}
          </button>
        ))}
      </div>
      {gekozen.length > 0 && (
        <div className="bg-[#F5F0E8] rounded-[12px] p-4">
          <p className="text-sm text-[#2D2A26] font-body leading-relaxed">
            <strong>Goed.</strong> Je voelt {gekozen.join(", ")}. Die gevoelens zijn er.
            Ze zijn oké. Je lichaam reageert op die emoties — niet op schade.
          </p>
        </div>
      )}
      <Button
        fullWidth
        disabled={gekozen.length === 0}
        onClick={onKlaar}
      >
        <CheckCircle className="w-4 h-4" />
        Ik heb ingecheckt
      </Button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function FlareupPage() {
  const [stap, setStap] = useState<Stap>("adem");
  const [gekozenTechniek, setGekozenTechniek] = useState<Techniek | null>(null);
  const [ademSeconden, setAdemSeconden] = useState(60);
  const { play, pause, currentTrack, isPlaying } = useAudioStore();

  // Countdown for breathing
  useEffect(() => {
    if (stap !== "adem") return;
    if (ademSeconden <= 0) { setStap("keuze"); return; }
    const t = setTimeout(() => setAdemSeconden((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [stap, ademSeconden]);

  const kiesTechniek = useCallback((t: Techniek) => {
    setGekozenTechniek(t);
    setStap("techniek");
    if (t.id !== "grounding" && t.id !== "emotie") {
      play({
        id: `flareup-${t.audioId}`,
        titel: t.label,
        type: "flareup",
        audioUrl: `/audio/flareup/${t.audioId}.mp3`,
      });
    }
  }, [play]);

  const techniekKlaar = useCallback(() => {
    pause();
    setStap("afsluiting");
  }, [pause]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#E8E2D8] px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link
            href="/app"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#6B6560] hover:text-[#2D2A26] hover:bg-[#F5F0E8] transition-colors"
          >
            <X className="w-4 h-4" />
          </Link>
          <h1 className="text-base font-heading text-[#2D2A26]">Flare-up hulp</h1>
          {stap !== "adem" ? (
            <button
              onClick={() => setStap("keuze")}
              className="text-xs text-[#6B6560] font-body hover:text-[#2D2A26] transition-colors"
            >
              Andere techniek
            </button>
          ) : (
            <div className="w-9" />
          )}
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">

          {/* ── Stap 1: Adem ──────────────────────── */}
          {stap === "adem" && (
            <div className="text-center space-y-8 animate-fade-in-up">
              <div>
                <h2 className="text-2xl font-heading text-[#2D2A26] mb-2">
                  Je bent veilig. 💚
                </h2>
                <p className="text-[#6B6560] font-body">
                  Laten we even rustig ademen. Volg de cirkel.
                </p>
              </div>

              <AdemCircle seconden={ademSeconden} totaal={60} />

              <Button
                variant="outline"
                onClick={() => setStap("keuze")}
                className="mx-auto"
              >
                Sla ademhaling over
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* ── Stap 2: Keuze ─────────────────────── */}
          {stap === "keuze" && (
            <div className="space-y-4 animate-fade-in-up">
              <div className="text-center mb-6">
                <h2 className="text-xl font-heading text-[#2D2A26] mb-2">
                  Wat helpt jou nu het meest?
                </h2>
                <p className="text-sm text-[#6B6560] font-body">
                  Kies een techniek. Je kunt er altijd een andere proberen.
                </p>
              </div>

              {technieken.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => kiesTechniek(t)}
                    className={`w-full flex items-center gap-4 p-4 rounded-[14px] border-2 text-left transition-all hover:shadow-md ${t.kleur}`}
                  >
                    <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 ${t.iconKleur}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#2D2A26] font-body text-sm">{t.label}</p>
                      <p className="text-xs text-[#6B6560] font-body mt-0.5">{t.beschrijving}</p>
                    </div>
                    <div className="text-xs text-[#6B6560] font-body flex-shrink-0">
                      {t.duurMinuten} min
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Stap 3: Techniek ─────────────────── */}
          {stap === "techniek" && gekozenTechniek && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="text-center">
                <h2 className="text-xl font-heading text-[#2D2A26] mb-1">
                  {gekozenTechniek.label}
                </h2>
                <p className="text-sm text-[#6B6560] font-body">
                  {gekozenTechniek.duurMinuten} minuten · neem de tijd
                </p>
              </div>

              {/* Grounding: tekstgebaseerd */}
              {gekozenTechniek.id === "grounding" && (
                <GroundingOefening onKlaar={techniekKlaar} />
              )}

              {/* Emotie: keuze */}
              {gekozenTechniek.id === "emotie" && (
                <EmotieCheck onKlaar={techniekKlaar} />
              )}

              {/* Audio-based technieken */}
              {gekozenTechniek.id !== "grounding" && gekozenTechniek.id !== "emotie" && (
                <div className="space-y-5">
                  {/* Audio indicator */}
                  <div className="bg-[#1B7A6E]/8 border border-[#1B7A6E]/20 rounded-[14px] p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1B7A6E] flex items-center justify-center flex-shrink-0">
                      {currentTrack && isPlaying ? (
                        <div className="flex gap-0.5 items-end h-4">
                          {[3, 5, 4, 6, 3].map((h, i) => (
                            <div
                              key={i}
                              className="w-1 bg-white rounded-full animate-pulse"
                              style={{ height: `${h * 2}px`, animationDelay: `${i * 100}ms` }}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-white" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1B7A6E] font-body">
                        {currentTrack ? "Wordt afgespeeld" : "Geladen…"}
                      </p>
                      <p className="text-sm text-[#2D2A26] font-body">{gekozenTechniek.label}</p>
                    </div>
                  </div>

                  {/* Tekst-inhoud per techniek */}
                  {gekozenTechniek.id === "veiligheid" && (
                    <div className="bg-white rounded-[14px] border border-[#E8E2D8] p-5 space-y-3">
                      {[
                        "Jouw lichaam is structureel gezond.",
                        "Er is geen schade. Er is geen gevaar.",
                        "Pijn is een signaal van jouw brein — niet van jouw lichaam.",
                        "Je brein vergist zich. Het overdrijft. Je bent veilig.",
                        "Je kunt dit. Je hebt dit al eerder doorstaan.",
                      ].map((zin, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#4CAF7D]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-[#4CAF7D]" />
                          </div>
                          <p className="text-sm text-[#2D2A26] font-body">{zin}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <Button fullWidth onClick={techniekKlaar}>
                    <CheckCircle className="w-4 h-4" />
                    Klaar met deze techniek
                  </Button>
                </div>
              )}

              <button
                onClick={() => { pause(); setStap("keuze"); }}
                className="w-full py-2 text-sm text-[#6B6560] font-body hover:text-[#2D2A26] transition-colors flex items-center justify-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Andere techniek kiezen
              </button>
            </div>
          )}

          {/* ── Stap 4: Afsluiting ───────────────── */}
          {stap === "afsluiting" && (
            <div className="text-center space-y-6 animate-fade-in-up">
              <div className="w-20 h-20 bg-[#4CAF7D]/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-[#4CAF7D]" />
              </div>
              <div>
                <h2 className="text-2xl font-heading text-[#2D2A26] mb-3">
                  Goed gedaan.
                </h2>
                <p className="text-[#6B6560] font-body leading-relaxed max-w-sm mx-auto">
                  Je hebt een moeilijk moment doorstaan. Dat is wat herstel betekent —
                  niet de afwezigheid van pijn, maar jouw reactie erop.
                </p>
              </div>

              <div className="bg-[#F5F0E8] rounded-[14px] p-4 max-w-sm mx-auto text-left">
                <p className="text-xs font-semibold text-[#6B6560] uppercase tracking-wide mb-2 font-body">
                  Onthoud
                </p>
                <p className="text-sm text-[#2D2A26] font-body italic">
                  &ldquo;Jij bent niet je pijn. Jij bent de persoon die zijn pijn observeert.&rdquo;
                </p>
              </div>

              <div className="space-y-3">
                <Link href="/app">
                  <Button fullWidth size="lg">
                    Terug naar dashboard
                  </Button>
                </Link>
                <button
                  onClick={() => { setStap("keuze"); setGekozenTechniek(null); }}
                  className="w-full py-2 text-sm text-[#6B6560] font-body hover:text-[#2D2A26] transition-colors"
                >
                  Nog een techniek proberen
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
