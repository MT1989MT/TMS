"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Brain, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Disclaimer } from "@/components/Disclaimer";
import { aanmeldenMetEmail } from "@/app/actions/auth";

// ─── Form component ───────────────────────────────────────────────────────────

function AanmeldenFormulier() {
  const [modus, setModus] = useState<"inloggen" | "registreren">("inloggen");
  const [wachtwoordZichtbaar, setWachtwoordZichtbaar] = useState(false);

  const [state, actie, isPending] = useActionState(aanmeldenMetEmail, {});

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex bg-[#F5F0E8] rounded-[12px] p-1">
        {(["inloggen", "registreren"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setModus(m)}
            className={[
              "flex-1 py-2.5 text-sm font-semibold rounded-[10px] transition-all duration-200 font-body",
              modus === m
                ? "bg-white text-[#2D2A26] shadow-sm"
                : "text-[#6B6560] hover:text-[#2D2A26]",
            ].join(" ")}
          >
            {m === "inloggen" ? "Inloggen" : "Aanmelden"}
          </button>
        ))}
      </div>

      {/* Success message */}
      {state.message && (
        <div className="flex items-start gap-3 p-4 bg-[#4CAF7D]/10 border border-[#4CAF7D]/30 rounded-[12px]">
          <CheckCircle className="w-5 h-5 text-[#4CAF7D] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[#2d7a52] font-body">{state.message}</p>
        </div>
      )}

      {/* Error message */}
      {state.error && (
        <div className="p-4 bg-[#C75050]/10 border border-[#C75050]/30 rounded-[12px]">
          <p className="text-sm text-[#C75050] font-body">{state.error}</p>
        </div>
      )}

      <form action={actie} className="space-y-4">
        <input type="hidden" name="modus" value={modus} />

        {/* Naam field (only for registreren) */}
        {modus === "registreren" && (
          <div>
            <label
              htmlFor="naam"
              className="block text-sm font-semibold text-[#2D2A26] mb-1.5 font-body"
            >
              Jouw naam
            </label>
            <input
              id="naam"
              name="naam"
              type="text"
              autoComplete="name"
              placeholder="Bijv. Marieke"
              required
              className="w-full px-4 py-3 rounded-[12px] border-2 border-[#E8E2D8] bg-white text-[#2D2A26] font-body text-base placeholder-[#B8B2A8] focus:outline-none focus:border-[#1B7A6E] transition-colors"
            />
          </div>
        )}

        {/* Email field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-[#2D2A26] mb-1.5 font-body"
          >
            E-mailadres
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jij@voorbeeld.nl"
            required
            className="w-full px-4 py-3 rounded-[12px] border-2 border-[#E8E2D8] bg-white text-[#2D2A26] font-body text-base placeholder-[#B8B2A8] focus:outline-none focus:border-[#1B7A6E] transition-colors"
          />
        </div>

        {/* Password field */}
        <div>
          <label
            htmlFor="wachtwoord"
            className="block text-sm font-semibold text-[#2D2A26] mb-1.5 font-body"
          >
            Wachtwoord
          </label>
          <div className="relative">
            <input
              id="wachtwoord"
              name="wachtwoord"
              type={wachtwoordZichtbaar ? "text" : "password"}
              autoComplete={
                modus === "inloggen" ? "current-password" : "new-password"
              }
              placeholder={
                modus === "registreren" ? "Minimaal 8 tekens" : "••••••••"
              }
              required
              className="w-full px-4 py-3 pr-12 rounded-[12px] border-2 border-[#E8E2D8] bg-white text-[#2D2A26] font-body text-base placeholder-[#B8B2A8] focus:outline-none focus:border-[#1B7A6E] transition-colors"
            />
            <button
              type="button"
              onClick={() => setWachtwoordZichtbaar((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#6B6560] hover:text-[#2D2A26] transition-colors"
              aria-label={
                wachtwoordZichtbaar ? "Wachtwoord verbergen" : "Wachtwoord tonen"
              }
            >
              {wachtwoordZichtbaar ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={isPending}
          disabled={isPending}
          className="mt-2"
        >
          {modus === "inloggen" ? "Inloggen" : "Account aanmaken"}
        </Button>
      </form>

      {/* Forgot password link */}
      {modus === "inloggen" && (
        <p className="text-center text-sm text-[#6B6560] font-body">
          Wachtwoord vergeten?{" "}
          <button
            type="button"
            className="text-[#1B7A6E] hover:underline font-semibold"
            onClick={() => {
              /* TODO: Password reset flow */
              alert("Stuur een e-mail naar support@herstelbrein.nl voor hulp.");
            }}
          >
            Vraag een reset aan
          </button>
        </p>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AanmeldenPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
      {/* Header */}
      <header className="px-4 py-5 border-b border-[#E8E2D8]">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-4 h-4 text-[#6B6560] group-hover:text-[#2D2A26] transition-colors" />
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-[8px] bg-[#1B7A6E] flex items-center justify-center">
                <Brain className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-heading text-[#2D2A26] text-base">
                HerstelBrein
              </span>
            </div>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="text-3xl font-heading text-[#2D2A26] mb-2">
              Welkom bij HerstelBrein
            </h1>
            <p className="text-[#6B6560] font-body">
              Begin jouw weg naar een pijnvrij leven
            </p>
          </div>

          <Card variant="elevated" padding="lg" className="animate-fade-in-up animation-delay-100">
            <AanmeldenFormulier />
          </Card>

          {/* Benefits for new users */}
          <Card
            variant="surface"
            padding="md"
            className="mt-4 animate-fade-in-up animation-delay-200"
          >
            <p className="text-xs font-semibold text-[#6B6560] uppercase tracking-wide mb-3 font-body">
              Wat je krijgt
            </p>
            <ul className="space-y-2">
              {[
                "Gratis toegang tot dag 1-7 van het programma",
                "Sarno's 12 Herinneringen (tekst + audio)",
                "Jouw persoonlijke TMS-bewijs lijst",
              ].map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-2 text-sm text-[#2D2A26] font-body"
                >
                  <div className="w-4 h-4 rounded-full bg-[#1B7A6E]/15 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1B7A6E]" />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>
          </Card>

          <div className="mt-6 animate-fade-in-up animation-delay-300">
            <Disclaimer />
          </div>
        </div>
      </main>
    </div>
  );
}
