"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, PenLine, Timer, Trash2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

// ─── Timer helpers ─────────────────────────────────────────────────────────────

function formatTijd(seconden: number): string {
  const m = Math.floor(seconden / 60);
  const s = seconden % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─── Prompts ──────────────────────────────────────────────────────────────────

const dagelijksPrompts = [
  "Schrijf over alles wat je irriteert, boos maakt of frustreert. Niets is te klein of te groot.",
  "Aan wie of wat wil je vandaag iets zeggen wat je normaal inslikt?",
  "Schrijf over een verwachting die anderen aan jou stellen die je zwaar valt.",
  "Wat voel je nu echt, los van wat je denkt dat je zou moeten voelen?",
  "Schrijf over iemand die je boos maakt. Wat wil je hem of haar vertellen?",
  "Welke zorgen draag je al een tijdje met je mee? Gooi ze eruit.",
  "Wat ben je moe van? Schrijf alles op zonder filter.",
];

type Fase = "intro" | "timer" | "vernietig" | "klaar" | "papier";
type DuurOptie = 10 | 20 | 30;

// ─── Component ────────────────────────────────────────────────────────────────

export default function SchrijvenPage() {
  const [fase, setFase] = useState<Fase>("intro");
  const [duur, setDuur] = useState<DuurOptie>(20);
  const [resterend, setResterend] = useState(duur * 60);
  const [loopt, setLoopt] = useState(false);
  const [tekst, setTekst] = useState("");
  const [prompt] = useState(() => dagelijksPrompts[Math.floor(Math.random() * dagelijksPrompts.length)]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync timer duration when duur changes (only in intro)
  useEffect(() => {
    if (fase === "intro") setResterend(duur * 60);
  }, [duur, fase]);

  const startTimer = useCallback(() => {
    setFase("timer");
    setLoopt(true);
  }, []);

  useEffect(() => {
    if (!loopt) return;
    intervalRef.current = setInterval(() => {
      setResterend((r) => {
        if (r <= 1) {
          clearInterval(intervalRef.current!);
          setLoopt(false);
          setFase("vernietig");
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [loopt]);

  const stopVroeg = () => {
    clearInterval(intervalRef.current!);
    setLoopt(false);
    setFase("vernietig");
  };

  const vernietigTekst = () => {
    setTekst("");
    setFase("klaar");
  };

  const percentage = fase === "timer" ? ((duur * 60 - resterend) / (duur * 60)) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <header className="bg-white border-b border-[#E8E2D8] px-4 py-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link href="/app/ontdek" className="w-9 h-9 rounded-full flex items-center justify-center text-[#6B6560] hover:text-[#2D2A26] hover:bg-[#F5F0E8] transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[8px] bg-[#C4A962]/15 flex items-center justify-center">
              <PenLine className="w-4 h-4 text-[#8a7240]" />
            </div>
            <h1 className="text-base font-heading text-[#2D2A26]">JournalSpeak</h1>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6">

        {/* ── Intro ─────────────────────────────────── */}
        {fase === "intro" && (
          <div className="space-y-5 animate-fade-in-up">
            <Card variant="surface" padding="lg">
              <p className="text-xs font-semibold text-[#8a7240] uppercase tracking-wide mb-2 font-body">
                Wat is JournalSpeak?
              </p>
              <p className="text-sm text-[#6B6560] font-body leading-relaxed">
                JournalSpeak (Nicole Sachs) is 20-30 minuten ongefiltreerd schrijven over je diepste
                emoties. Je schrijft alles wat je boos, bang of verdrietig maakt — zonder censuur.
                De tekst vernietig je daarna. Niet voor de inhoud, maar voor het loslaten.
              </p>
            </Card>

            <Card variant="teal" padding="md">
              <p className="text-xs font-semibold text-[#1B7A6E] uppercase tracking-wide mb-2 font-body">
                Prompt van vandaag
              </p>
              <p className="text-base text-[#2D2A26] font-body italic leading-relaxed">
                &ldquo;{prompt}&rdquo;
              </p>
            </Card>

            {/* Duration selector */}
            <div>
              <p className="text-sm font-semibold text-[#2D2A26] font-body mb-3">
                Hoe lang wil je schrijven?
              </p>
              <div className="flex gap-2">
                {([10, 20, 30] as DuurOptie[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuur(d)}
                    className={[
                      "flex-1 py-3 rounded-[12px] border-2 text-sm font-semibold font-body transition-all",
                      duur === d
                        ? "border-[#1B7A6E] bg-[#1B7A6E] text-white"
                        : "border-[#E8E2D8] bg-white text-[#2D2A26] hover:border-[#1B7A6E]/40",
                    ].join(" ")}
                  >
                    {d} min
                  </button>
                ))}
              </div>
            </div>

            <Button fullWidth size="lg" onClick={startTimer}>
              <Timer className="w-4 h-4" />
              Start schrijfsessie
            </Button>

            <button
              onClick={() => setFase("papier")}
              className="w-full py-3 text-sm text-[#6B6560] font-body hover:text-[#2D2A26] transition-colors"
            >
              Ik schrijf liever op papier →
            </button>
          </div>
        )}

        {/* ── Timer + Tekstveld ──────────────────────── */}
        {fase === "timer" && (
          <div className="space-y-4 animate-fade-in-up">
            {/* Timer display */}
            <div className="bg-white rounded-[16px] border border-[#E8E2D8] p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-[#1B7A6E]" />
                  <span className="text-2xl font-heading text-[#1B7A6E]">
                    {formatTijd(resterend)}
                  </span>
                </div>
                <Badge variant="teal" className="animate-pulse-slow">
                  Bezig
                </Badge>
              </div>
              <div className="h-2 bg-[#E8E2D8] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1B7A6E] rounded-full transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            {/* Text area */}
            <div className="bg-white rounded-[16px] border-2 border-[#E8E2D8] overflow-hidden">
              <p className="text-xs text-[#6B6560] font-body px-4 pt-3 pb-1 italic">
                &ldquo;{prompt}&rdquo;
              </p>
              <textarea
                value={tekst}
                onChange={(e) => setTekst(e.target.value)}
                placeholder="Begin te schrijven... niets is te raar of te zwaar."
                autoFocus
                className="w-full min-h-[40vh] px-4 py-3 text-sm text-[#2D2A26] font-body leading-relaxed resize-none outline-none placeholder-[#B8B2A8]"
              />
            </div>

            <p className="text-xs text-center text-[#6B6560] font-body">
              Jouw tekst wordt <strong>nooit opgeslagen</strong>. Schrijf vrij.
            </p>

            <Button variant="outline" fullWidth onClick={stopVroeg}>
              Klaar met schrijven
            </Button>
          </div>
        )}

        {/* ── Vernietig ─────────────────────────────── */}
        {fase === "vernietig" && (
          <div className="text-center space-y-6 animate-fade-in-up py-8">
            <div className="w-20 h-20 bg-[#C75050]/10 rounded-full flex items-center justify-center mx-auto">
              <Trash2 className="w-10 h-10 text-[#C75050]" />
            </div>
            <div>
              <h2 className="text-2xl font-heading text-[#2D2A26] mb-3">
                Vernietig jouw tekst
              </h2>
              <p className="text-[#6B6560] font-body leading-relaxed max-w-sm mx-auto">
                Dit is het ritueel. Niet de woorden tellen — het loslaten telt.
                Jij hebt de emoties hun plek gegeven. Nu mogen ze gaan.
              </p>
            </div>
            <Button
              variant="danger"
              size="lg"
              fullWidth
              onClick={vernietigTekst}
            >
              <Trash2 className="w-4 h-4" />
              Tekst verwijderen en loslaten
            </Button>
          </div>
        )}

        {/* ── Klaar ─────────────────────────────────── */}
        {fase === "klaar" && (
          <div className="text-center space-y-6 animate-fade-in-up py-8">
            <div className="w-20 h-20 bg-[#4CAF7D]/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-[#4CAF7D]" />
            </div>
            <div>
              <h2 className="text-2xl font-heading text-[#2D2A26] mb-3">
                Goed gedaan. 🌱
              </h2>
              <p className="text-[#6B6560] font-body leading-relaxed max-w-sm mx-auto">
                Je hebt vandaag gejournald. Je zenuwstelsel heeft een uitlaatklep gehad.
                Dit telt voor je streak.
              </p>
            </div>
            <div className="space-y-3">
              <Link href="/app">
                <Button fullWidth size="lg">Terug naar dashboard</Button>
              </Link>
              <button
                onClick={() => { setFase("intro"); setTekst(""); setResterend(duur * 60); }}
                className="w-full py-3 text-sm text-[#6B6560] font-body hover:text-[#2D2A26] transition-colors"
              >
                Nog een sessie starten
              </button>
            </div>
          </div>
        )}

        {/* ── Papier optie ──────────────────────────── */}
        {fase === "papier" && (
          <div className="text-center space-y-6 animate-fade-in-up py-8">
            <div className="w-20 h-20 bg-[#C4A962]/15 rounded-full flex items-center justify-center mx-auto">
              <PenLine className="w-10 h-10 text-[#8a7240]" />
            </div>
            <div>
              <h2 className="text-2xl font-heading text-[#2D2A26] mb-3">
                Schrijven op papier
              </h2>
              <p className="text-[#6B6560] font-body leading-relaxed max-w-sm mx-auto">
                Pak pen en papier en schrijf {duur} minuten over:
              </p>
              <div className="bg-[#F5F0E8] rounded-[14px] p-4 mt-4 text-left max-w-sm mx-auto">
                <p className="text-sm text-[#2D2A26] font-body italic">&ldquo;{prompt}&rdquo;</p>
              </div>
            </div>
            <Button
              fullWidth
              size="lg"
              onClick={() => setFase("klaar")}
            >
              <CheckCircle className="w-4 h-4" />
              Ik heb geschreven
            </Button>
            <button
              onClick={() => setFase("intro")}
              className="w-full py-2 text-sm text-[#6B6560] font-body hover:text-[#2D2A26] transition-colors"
            >
              ← Terug
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
