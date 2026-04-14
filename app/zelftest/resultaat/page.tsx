"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import {
  Brain,
  ChevronRight,
  RefreshCw,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";
import { Disclaimer } from "@/components/Disclaimer";
import { getResultaat } from "@/lib/zelftest-data";

const MAX_SCORE = 48; // 12 vragen × max 4 punten

// ─── Score Gauge ──────────────────────────────────────────────────────────────

function ScoreGauge({ score }: { score: number }) {
  const percentage = Math.round((score / MAX_SCORE) * 100);
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(percentage), 200);
    return () => clearTimeout(timer);
  }, [percentage]);

  const getColor = () => {
    if (score <= 12) return "#3B82F6"; // blue
    if (score <= 24) return "#F59E0B"; // amber
    return "#1B7A6E"; // teal
  };

  return (
    <div className="flex flex-col items-center">
      {/* Circular gauge using SVG */}
      <div className="relative w-40 h-40 mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          {/* Background track */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#E8E2D8"
            strokeWidth="10"
          />
          {/* Progress arc */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke={getColor()}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 50}`}
            strokeDashoffset={`${2 * Math.PI * 50 * (1 - animatedValue / 100)}`}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-heading text-[#2D2A26]">{score}</span>
          <span className="text-xs text-[#6B6560] font-body">van {MAX_SCORE}</span>
        </div>
      </div>

      <Progress
        value={animatedValue}
        className="w-full max-w-xs"
        size="md"
        color={score <= 12 ? "teal" : score <= 24 ? "gold" : "teal"}
        animated
      />
      <span className="text-sm text-[#6B6560] font-body mt-2">{percentage}% overeenkomst</span>
    </div>
  );
}

// ─── Wat Betekent Dit Section ─────────────────────────────────────────────────

function WatBetekentDit({ score }: { score: number }) {
  const resultaat = getResultaat(score);

  const kenmerken = [
    score >= 13 && "Pijn die verhuist of varieert",
    score >= 13 && "Stress en emotionele invloed op pijn",
    score >= 25 && "Klassiek TMS-persoonlijkheidsprofiel",
    score >= 25 && "Meerdere mislukte behandelingen",
    score >= 37 && "Sterke overeenkomst met Sarno-criteria",
  ].filter(Boolean) as string[];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-heading text-[#2D2A26]">Wat betekent dit?</h3>
      <p className="text-[#6B6560] font-body text-sm leading-relaxed">
        {resultaat.beschrijving}
      </p>

      {kenmerken.length > 0 && (
        <div className="bg-[#F5F0E8] rounded-[12px] p-4">
          <p className="text-xs font-semibold text-[#6B6560] uppercase tracking-wide mb-3 font-body">
            Herkende kenmerken
          </p>
          <ul className="space-y-2">
            {kenmerken.map((kenmerk) => (
              <li key={kenmerk} className="flex items-center gap-2 text-sm text-[#2D2A26] font-body">
                <CheckCircle className="w-4 h-4 text-[#1B7A6E] flex-shrink-0" />
                {kenmerk}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Next Steps Section ───────────────────────────────────────────────────────

function VolgendeStappen({ score }: { score: number }) {
  const resultaat = getResultaat(score);

  const stappen =
    score >= 25
      ? [
          {
            icon: BookOpen,
            titel: "Lees over TMS",
            beschrijving: "Begrijp de wetenschap achter jouw pijn",
            href: "/aanmelden",
            variant: "primary" as const,
          },
          {
            icon: Brain,
            titel: "Begin het programma",
            beschrijving: "90 dagen begeleiding naar herstel",
            href: "/aanmelden",
            variant: "outline" as const,
          },
        ]
      : [
          {
            icon: AlertCircle,
            titel: "Raadpleeg een arts",
            beschrijving: "Laat ernstige oorzaken eerst uitsluiten",
            href: "/aanmelden",
            variant: "outline" as const,
          },
          {
            icon: BookOpen,
            titel: "Leer meer over TMS",
            beschrijving: "Bekijk de gratis educatielessen",
            href: "/aanmelden",
            variant: "ghost" as const,
          },
        ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-heading text-[#2D2A26]">Wat nu?</h3>
      <p className="text-sm text-[#6B6560] font-body leading-relaxed">{resultaat.advies}</p>

      <div className="space-y-3">
        {stappen.map((stap) => {
          const Icon = stap.icon;
          return (
            <Link key={stap.titel} href={stap.href} className="block">
              <div className="flex items-center gap-4 p-4 bg-white rounded-[12px] border border-[#E8E2D8] hover:border-[#1B7A6E]/40 hover:shadow-sm transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-[10px] bg-[#1B7A6E]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#1B7A6E]" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-[#2D2A26] text-sm font-body">{stap.titel}</div>
                  <div className="text-xs text-[#6B6560] font-body">{stap.beschrijving}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#6B6560] group-hover:text-[#1B7A6E] transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ─── Sarno Reminder ───────────────────────────────────────────────────────────

function SarnoKaart() {
  return (
    <Card variant="teal" padding="md">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-[8px] bg-[#1B7A6E] flex items-center justify-center flex-shrink-0">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-xs font-semibold text-[#1B7A6E] uppercase tracking-wide mb-1 font-body">
            Herinnering van Dr. Sarno
          </p>
          <p className="text-sm text-[#2D2A26] font-body leading-relaxed italic">
            &ldquo;Aangezien mijn lichaam in wezen gezond is, is er niets om bang voor te zijn. Pijn
            is onschuldig — ze is een signaal van het brein, geen teken van schade.&rdquo;
          </p>
        </div>
      </div>
    </Card>
  );
}

// ─── Resultaat Content (requires useSearchParams) ─────────────────────────────

function ResultaatContent() {
  const searchParams = useSearchParams();
  const scoreParam = searchParams.get("score");
  const score = scoreParam ? parseInt(scoreParam, 10) : 0;
  const resultaat = getResultaat(score);

  const [gedeeld, setGedeeld] = useState(false);

  const handleDelen = async () => {
    const tekst = `Ik heb de TMS zelftest gedaan op HerstelBrein en scoorde ${score}/${MAX_SCORE}. Ontdek of jouw chronische pijn TMS kan zijn!`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Mijn TMS Zelftest Resultaat", text: tekst });
        setGedeeld(true);
      } catch {
        // User cancelled or share not available
      }
    } else {
      await navigator.clipboard.writeText(tekst);
      setGedeeld(true);
      setTimeout(() => setGedeeld(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <header className="bg-[#FAF7F2] border-b border-[#E8E2D8] px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[8px] bg-[#1B7A6E] flex items-center justify-center">
              <Brain className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-heading text-[#2D2A26] text-base">HerstelBrein</span>
          </Link>
          <Link href="/zelftest">
            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-[#6B6560]">
              <RefreshCw className="w-3.5 h-3.5" />
              Opnieuw
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10 space-y-8">
        {/* Result card */}
        <div className="text-center animate-fade-in-up">
          <Badge
            variant={score >= 25 ? "teal" : score >= 13 ? "gold" : "neutral"}
            className="mb-4 inline-flex"
          >
            {resultaat.kans}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-heading text-[#2D2A26] mb-2">
            Jouw testresultaat
          </h1>
          <p className="text-[#6B6560] font-body">
            Op basis van jouw antwoorden hebben we jouw TMS-profiel bepaald.
          </p>
        </div>

        {/* Score gauge */}
        <Card variant="elevated" padding="lg" className="animate-fade-in-up animation-delay-100">
          <div className="text-center mb-6">
            <ScoreGauge score={score} />
          </div>
          <div className="text-center">
            <h2 className={`text-xl font-heading mb-2 ${resultaat.kleur}`}>
              {resultaat.titel}
            </h2>
          </div>
        </Card>

        {/* What it means */}
        <Card
          variant="default"
          padding="lg"
          className="animate-fade-in-up animation-delay-200"
        >
          <WatBetekentDit score={score} />
        </Card>

        {/* Sarno quote */}
        {score >= 13 && (
          <div className="animate-fade-in-up animation-delay-300">
            <SarnoKaart />
          </div>
        )}

        {/* Next steps */}
        <Card
          variant="default"
          padding="lg"
          className="animate-fade-in-up animation-delay-400"
        >
          <VolgendeStappen score={score} />
        </Card>

        {/* CTA */}
        {score >= 25 && (
          <div className="bg-[#1B7A6E] rounded-[16px] p-6 text-center animate-fade-in-up animation-delay-500">
            <h3 className="text-xl font-heading text-white mb-3">
              Begin vandaag met herstel
            </h3>
            <p className="text-white/80 font-body text-sm mb-5">
              Jij hebt de kenmerken van iemand die kan herstellen. Het 90-dagenprogramma begeleidt
              je stap voor stap.
            </p>
            <Link href="/aanmelden">
              <Button
                size="lg"
                fullWidth
                className="bg-white text-[#1B7A6E] hover:bg-white/90 font-semibold"
              >
                Gratis aanmelden
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        )}

        {/* Share button */}
        <div className="flex justify-center animate-fade-in-up animation-delay-500">
          <Button variant="outline" size="sm" onClick={handleDelen} className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            {gedeeld ? "Gekopieerd!" : "Deel resultaat"}
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="animate-fade-in-up animation-delay-500">
          <Disclaimer />
        </div>

        {/* Footer */}
        <div className="text-center pb-4">
          <Link
            href="/"
            className="text-sm text-[#6B6560] hover:text-[#2D2A26] transition-colors font-body"
          >
            ← Terug naar HerstelBrein
          </Link>
        </div>
      </main>
    </div>
  );
}

// ─── Page (with Suspense for useSearchParams) ─────────────────────────────────

export default function ResultaatPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#1B7A6E] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#6B6560] font-body">Resultaat laden…</p>
          </div>
        </div>
      }
    >
      <ResultaatContent />
    </Suspense>
  );
}
