"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Brain, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StepProgress } from "@/components/ui/Progress";
import { zelftestVragen, berekenScore } from "@/lib/zelftest-data";
import { Disclaimer } from "@/components/Disclaimer";

type Antwoorden = Record<number, number>;

// ─── Header ───────────────────────────────────────────────────────────────────

function ZelftestHeader({
  currentStep,
  totalSteps,
  onClose,
}: {
  currentStep: number;
  totalSteps: number;
  onClose: () => void;
}) {
  const percentage = Math.round(((currentStep) / totalSteps) * 100);

  return (
    <header className="bg-[#FAF7F2] border-b border-[#E8E2D8] px-4 py-4 sticky top-0 z-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[8px] bg-[#1B7A6E] flex items-center justify-center">
              <Brain className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-heading text-[#2D2A26] text-base">BreinVrij</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-sm text-[#6B6560] font-body">
              {currentStep === 0
                ? "Introductie"
                : `Vraag ${currentStep} van ${totalSteps}`}
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#6B6560] hover:text-[#2D2A26] hover:bg-[#E8E2D8] transition-colors"
              aria-label="Zelftest sluiten"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {currentStep > 0 && (
          <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
        )}

        {currentStep > 0 && (
          <div className="flex justify-end mt-1">
            <span className="text-xs text-[#6B6560] font-body">{percentage}% voltooid</span>
          </div>
        )}
      </div>
    </header>
  );
}

// ─── Intro Screen ─────────────────────────────────────────────────────────────

function IntroScherm({ onStart }: { onStart: () => void }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center animate-fade-in-up">
      <div className="w-20 h-20 bg-[#1B7A6E]/10 rounded-[20px] flex items-center justify-center mx-auto mb-6">
        <Brain className="w-10 h-10 text-[#1B7A6E]" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-heading text-[#2D2A26] mb-4">
        TMS Zelftest
      </h1>
      <p className="text-[#6B6560] font-body text-lg mb-6 leading-relaxed">
        Deze 12 vragen helpen jou ontdekken of jouw chronische pijn mogelijk veroorzaakt wordt door
        TMS (Tension Myositis Syndrome).
      </p>

      <div className="bg-[#F5F0E8] rounded-[16px] p-6 mb-8 text-left space-y-3">
        {[
          "Duurt slechts 3 minuten",
          "Geen registratie of e-mailadres nodig",
          "Gebaseerd op Schechter/Sarno diagnostische criteria",
          "Direct resultaat met persoonlijk advies",
        ].map((punt) => (
          <div key={punt} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-[#1B7A6E] flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-sm text-[#2D2A26] font-body">{punt}</span>
          </div>
        ))}
      </div>

      <Button size="lg" fullWidth onClick={onStart}>
        Start de test
        <ChevronRight className="w-5 h-5" />
      </Button>

      <div className="mt-6">
        <Disclaimer />
      </div>
    </div>
  );
}

// ─── Question Screen ──────────────────────────────────────────────────────────

function VraagScherm({
  vraag,
  vraagIndex,
  geselecteerd,
  onAntwoord,
  onVolgende,
  onVorige,
  isLaatste,
  isVerwerken,
}: {
  vraag: (typeof zelftestVragen)[0];
  vraagIndex: number;
  geselecteerd: number | undefined;
  onAntwoord: (score: number) => void;
  onVolgende: () => void;
  onVorige: () => void;
  isLaatste: boolean;
  isVerwerken: boolean;
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 animate-fade-in-up">
      {/* Question number indicator */}
      <div className="flex items-center gap-2 mb-6">
        <span className="w-8 h-8 rounded-full bg-[#1B7A6E] text-white text-sm font-semibold flex items-center justify-center font-body flex-shrink-0">
          {vraagIndex + 1}
        </span>
        <span className="text-sm text-[#6B6560] font-body">van {zelftestVragen.length} vragen</span>
      </div>

      <h2 className="text-xl sm:text-2xl font-heading text-[#2D2A26] mb-8 leading-snug">
        {vraag.vraag}
      </h2>

      {/* Answer options */}
      <div className="space-y-3 mb-10">
        {vraag.antwoorden.map((antwoord, i) => {
          const isGekozen = geselecteerd === antwoord.score;
          return (
            <button
              key={i}
              onClick={() => onAntwoord(antwoord.score)}
              className={[
                "w-full text-left px-5 py-4 rounded-[14px] border-2 font-body",
                "transition-all duration-200 cursor-pointer",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B7A6E] focus-visible:ring-offset-2",
                isGekozen
                  ? "border-[#1B7A6E] bg-[#1B7A6E]/8 text-[#1B7A6E]"
                  : "border-[#E8E2D8] bg-white text-[#2D2A26] hover:border-[#1B7A6E]/40 hover:bg-[#F5F0E8]",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-pressed={isGekozen}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    isGekozen
                      ? "border-[#1B7A6E] bg-[#1B7A6E]"
                      : "border-[#E8E2D8]"
                  }`}
                >
                  {isGekozen && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="text-sm sm:text-base leading-snug">{antwoord.tekst}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={onVorige}
          disabled={vraagIndex === 0}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          Vorige
        </Button>

        <Button
          variant="primary"
          onClick={onVolgende}
          disabled={geselecteerd === undefined || isVerwerken}
          loading={isVerwerken && isLaatste}
          className="flex items-center gap-1 min-w-[120px]"
        >
          {isLaatste ? "Bekijk resultaat" : "Volgende"}
          {!isLaatste && <ChevronRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ZelftestPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 = intro
  const [antwoorden, setAntwoorden] = useState<Antwoorden>({});
  const [isVerwerken, setIsVerwerken] = useState(false);

  const totalVragen = zelftestVragen.length;
  const currentVraagIndex = currentStep - 1; // 0-based
  const currentVraag = currentStep > 0 ? zelftestVragen[currentVraagIndex] : null;
  const isLaatsteVraag = currentStep === totalVragen;

  const handleStart = useCallback(() => {
    setCurrentStep(1);
  }, []);

  const handleAntwoord = useCallback(
    (score: number) => {
      if (!currentVraag) return;
      setAntwoorden((prev) => ({ ...prev, [currentVraag.id]: score }));
    },
    [currentVraag]
  );

  const handleVolgende = useCallback(async () => {
    if (isLaatsteVraag) {
      setIsVerwerken(true);
      const score = berekenScore(antwoorden);
      // Small delay for UX feedback
      await new Promise((r) => setTimeout(r, 600));
      router.push(`/zelftest/resultaat?score=${score}`);
      return;
    }
    setCurrentStep((prev) => prev + 1);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [isLaatsteVraag, antwoorden, router]);

  const handleVorige = useCallback(() => {
    if (currentStep <= 1) {
      setCurrentStep(0);
      return;
    }
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const handleClose = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <ZelftestHeader
        currentStep={currentStep}
        totalSteps={totalVragen}
        onClose={handleClose}
      />

      <main>
        {currentStep === 0 ? (
          <IntroScherm onStart={handleStart} />
        ) : currentVraag ? (
          <VraagScherm
            vraag={currentVraag}
            vraagIndex={currentVraagIndex}
            geselecteerd={antwoorden[currentVraag.id]}
            onAntwoord={handleAntwoord}
            onVolgende={handleVolgende}
            onVorige={handleVorige}
            isLaatste={isLaatsteVraag}
            isVerwerken={isVerwerken}
          />
        ) : null}
      </main>

      {/* Bottom disclaimer on intro */}
      {currentStep === 0 && (
        <div className="max-w-2xl mx-auto px-4 pb-8" />
      )}
    </div>
  );
}
