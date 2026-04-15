import Link from "next/link";
import {
  BookOpen,
  Activity,
  PenLine,
  Brain,
  Dumbbell,
  Bell,
  Flame,
  ChevronRight,
  SmilePlus,
  Sun,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { DailyReminder } from "@/components/DailyReminder";
import { getUserProfile } from "@/lib/auth";
import { getDagHerinnering, educatieLessen } from "@/lib/seed-data";
import type { Database } from "@/types/database";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function begroeting(): string {
  const uur = new Date().getHours();
  if (uur < 6) return "Goedenacht";
  if (uur < 12) return "Goedemorgen";
  if (uur < 18) return "Goedemiddag";
  return "Goedenavond";
}

function getFase(dag: number): string {
  if (dag <= 30) return "Ontdekking";
  if (dag <= 60) return "Hertrainen";
  return "Verdieping";
}

// ─── Quick-access buttons ─────────────────────────────────────────────────────

const snelkeuzeItems = [
  {
    href: "/app/ontdek/educatie",
    label: "Educatie",
    icon: BookOpen,
    kleur: "bg-[#1B7A6E]/10 text-[#1B7A6E]",
  },
  {
    href: "/app/ontdek/tracking",
    label: "Tracking",
    icon: Activity,
    kleur: "bg-[#E8845C]/10 text-[#E8845C]",
  },
  {
    href: "/app/ontdek/schrijven",
    label: "Schrijven",
    icon: PenLine,
    kleur: "bg-[#C4A962]/15 text-[#8a7240]",
  },
  {
    href: "/app/ontdek/meditatie",
    label: "Meditatie",
    icon: Brain,
    kleur: "bg-[#1B7A6E]/10 text-[#1B7A6E]",
  },
  {
    href: "/app/ontdek/braintraining",
    label: "Training",
    icon: Dumbbell,
    kleur: "bg-[#E8845C]/10 text-[#E8845C]",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function DashboardHeader({ profile }: { profile: Profile | null }) {
  const naam = profile?.display_name ?? "jij";
  const dag = profile?.current_day ?? 1;
  const fase = getFase(dag);

  return (
    <div className="bg-white px-4 pt-6 pb-4 border-b border-[#E8E2D8]">
      <div className="max-w-lg mx-auto">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-[#6B6560] font-body">{begroeting()},</p>
            <h1 className="text-2xl font-heading text-[#2D2A26]">{naam}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/app/reminders"
              className="w-9 h-9 rounded-full bg-[#F5F0E8] flex items-center justify-center text-[#6B6560] hover:text-[#1B7A6E] hover:bg-[#1B7A6E]/10 transition-colors"
              aria-label="12 Herinneringen"
            >
              <Bell className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Day progress */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Badge variant="teal">Fase: {fase}</Badge>
            <span className="text-sm text-[#6B6560] font-body">Dag {dag} van 90</span>
          </div>
          <span className="text-sm font-semibold text-[#2D2A26] font-body">
            {Math.round((dag / 90) * 100)}%
          </span>
        </div>
        <Progress value={dag} max={90} size="sm" color="teal" />
      </div>
    </div>
  );
}

function StreakCard({ streak }: { streak: number }) {
  if (streak === 0) return null;

  return (
    <div className="flex items-center gap-2 bg-[#E8845C]/10 border border-[#E8845C]/20 rounded-[14px] px-4 py-3">
      <Flame className="w-5 h-5 text-[#E8845C]" />
      <span className="text-sm font-semibold text-[#2D2A26] font-body">
        {streak} dag{streak !== 1 ? "en" : ""} op rij
      </span>
      <span className="text-xs text-[#6B6560] font-body ml-auto">Blijf doorgaan!</span>
    </div>
  );
}

function EmotieCheckinPrompt({ heeftIngecheckt }: { heeftIngecheckt: boolean }) {
  if (heeftIngecheckt) return null;

  return (
    <Link href="/app/emoties">
      <Card
        variant="surface"
        padding="md"
        className="border border-[#C4A962]/30 hover:border-[#C4A962]/60 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[10px] bg-[#C4A962]/15 flex items-center justify-center flex-shrink-0">
            <SmilePlus className="w-5 h-5 text-[#8a7240]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#2D2A26] font-body">
              Hoe voel je je vandaag?
            </p>
            <p className="text-xs text-[#6B6560] font-body">
              Dagelijkse emotie check-in — nog niet gedaan
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B6560]" />
        </div>
      </Card>
    </Link>
  );
}

function VandaagVoorJou({ dag }: { dag: number }) {
  // Show first available free lesson if early days, otherwise programma
  const les = educatieLessen[0];

  return (
    <Link href={`/app/programma/${dag}`}>
      <Card
        variant="elevated"
        padding="lg"
        className="hover:shadow-[0_8px_24px_rgba(45,42,38,0.12)] transition-shadow cursor-pointer"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-[12px] bg-[#1B7A6E] flex items-center justify-center flex-shrink-0">
            <Sun className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#1B7A6E] uppercase tracking-wide mb-1 font-body">
              Vandaag voor jou · Dag {dag}
            </p>
            <h3 className="text-base font-heading text-[#2D2A26] mb-1">{les.titel}</h3>
            <p className="text-xs text-[#6B6560] font-body line-clamp-2">
              {les.beschrijving}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="teal">{les.duurMinuten} min</Badge>
              <Badge variant="neutral">{les.fase}</Badge>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B6560] flex-shrink-0 mt-1" />
        </div>
      </Card>
    </Link>
  );
}

function Snelkeuze() {
  return (
    <div>
      <h2 className="text-base font-heading text-[#2D2A26] mb-3">Snel naar</h2>
      <div className="grid grid-cols-5 gap-2">
        {snelkeuzeItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div
                className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${item.kleur} group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-[#6B6560] font-body text-center leading-tight group-hover:text-[#2D2A26] transition-colors">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ─── Page (Server Component) ──────────────────────────────────────────────────

export default async function DashboardPage() {
  const profile = await getUserProfile();
  const dag = profile?.current_day ?? 1;
  const streak = 0; // TODO: fetch from user_stats
  const herinnering = getDagHerinnering(dag);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <DashboardHeader profile={profile} />

      <div className="max-w-lg mx-auto px-4 py-5 space-y-5">
        {/* Streak */}
        <StreakCard streak={streak} />

        {/* Dagelijkse herinnering */}
        <section>
          <DailyReminder herinnering={herinnering} />
        </section>

        {/* Vandaag voor jou */}
        <section>
          <VandaagVoorJou dag={dag} />
        </section>

        {/* Snelkeuze */}
        <section>
          <Snelkeuze />
        </section>

        {/* Emotie check-in */}
        <EmotieCheckinPrompt heeftIngecheckt={false} />

        {/* Sarno reminder link */}
        <Link href="/app/reminders">
          <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-[14px] border border-[#E8E2D8] hover:border-[#1B7A6E]/30 transition-colors group">
            <Bell className="w-4 h-4 text-[#1B7A6E]" />
            <span className="text-sm text-[#2D2A26] font-body flex-1">
              Alle 12 Herinneringen van Dr. Sarno
            </span>
            <ChevronRight className="w-4 h-4 text-[#6B6560] group-hover:text-[#1B7A6E] transition-colors" />
          </div>
        </Link>
      </div>
    </div>
  );
}
