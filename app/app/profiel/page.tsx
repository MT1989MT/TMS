import { User, Bell, Crown, Shield, LogOut, ChevronRight, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { UitlogButton } from "./UitlogButton";
import { ReminderTijdForm } from "./ReminderTijdForm";
import { getUserProfile } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const metadata = { title: "Profiel — BreinVrij" };

const ABONNEMENT_LABELS: Record<string, { label: string; kleur: string; badge: "teal" | "gold" | "neutral" }> = {
  free:     { label: "Gratis",      kleur: "text-[#6B6560]",  badge: "neutral" },
  pro:      { label: "Pro",         kleur: "text-[#1B7A6E]",  badge: "teal" },
  lifetime: { label: "Lifetime",    kleur: "text-[#8a7240]",  badge: "gold" },
};

const PRO_VOORDELEN = [
  "Toegang tot alle 90 programma-dagen",
  "Alle meditaties en oefeningen ontgrendeld",
  "Voortgang & statistieken bijhouden",
  "JournalSpeak onbeperkt gebruik",
  "Flare-up SOS altijd beschikbaar",
  "Nieuwe content elke maand",
];

export default async function ProfielPage() {
  const profile = await getUserProfile();
  const supabase = await createSupabaseServerClient();

  const { data: statsData } = await supabase
    .from("user_stats")
    .select("total_exercises, total_journal_sessions, current_streak")
    .eq("user_id", profile!.id)
    .single();

  const stats = statsData ?? { total_exercises: 0, total_journal_sessions: 0, current_streak: 0 };
  const status = profile?.subscription_status ?? "free";
  const abonnementMeta = ABONNEMENT_LABELS[status] ?? ABONNEMENT_LABELS.free;
  const isPro = status === "pro" || status === "lifetime";

  const initials = (profile?.display_name ?? "?")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <header className="bg-white border-b border-[#E8E2D8] px-4 pt-6 pb-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-heading text-[#2D2A26] mb-1">Profiel</h1>
          <p className="text-sm text-[#6B6560] font-body">Jouw account & instellingen</p>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">

        {/* Avatar + naam */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#1B7A6E]/10 border-2 border-[#1B7A6E]/20 flex items-center justify-center flex-shrink-0">
              {initials ? (
                <span className="text-xl font-heading text-[#1B7A6E]">{initials}</span>
              ) : (
                <User className="w-7 h-7 text-[#1B7A6E]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-heading text-[#2D2A26] truncate">
                {profile?.display_name ?? "Anoniem"}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={abonnementMeta.badge}>
                  {abonnementMeta.label}
                </Badge>
                <span className="text-xs text-[#6B6560] font-body">
                  Dag {profile?.current_day ?? 1} van 90
                </span>
              </div>
            </div>
          </div>

          {/* Mini-stats */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#F5F0E8]">
            {[
              { waarde: stats.total_exercises,       label: "Oefeningen",  kleur: "text-[#1B7A6E]" },
              { waarde: stats.total_journal_sessions, label: "Journaals",   kleur: "text-[#8a7240]" },
              { waarde: stats.current_streak,         label: "Streak",      kleur: "text-[#E8845C]" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className={`text-2xl font-heading ${s.kleur}`}>{s.waarde}</p>
                <p className="text-[10px] text-[#6B6560] font-body mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Upgrade CTA — alleen voor gratis gebruikers */}
        {!isPro && (
          <Card variant="teal" padding="lg">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-[10px] bg-[#1B7A6E] flex items-center justify-center flex-shrink-0">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-base font-heading text-[#2D2A26]">Upgrade naar Pro</p>
                <p className="text-sm text-[#6B6560] font-body mt-0.5">
                  Ontgrendel je volledige 90-dagenreis
                </p>
              </div>
            </div>
            <ul className="space-y-2 mb-4">
              {PRO_VOORDELEN.map((v) => (
                <li key={v} className="flex items-center gap-2 text-sm text-[#2D2A26] font-body">
                  <CheckCircle className="w-4 h-4 text-[#1B7A6E] flex-shrink-0" />
                  {v}
                </li>
              ))}
            </ul>
            <Button fullWidth>
              <Crown className="w-4 h-4" />
              Upgraden — €9,99/maand
            </Button>
            <p className="text-center text-[10px] text-[#6B6560] font-body mt-2">
              Of €79 eenmalig voor Lifetime toegang
            </p>
          </Card>
        )}

        {/* Pro badge voor betaalde gebruikers */}
        {isPro && (
          <Card variant="surface" padding="md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-[#1B7A6E]/10 flex items-center justify-center flex-shrink-0">
                <Crown className="w-4 h-4 text-[#1B7A6E]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#2D2A26] font-body">
                  {status === "lifetime" ? "Lifetime toegang" : "Pro abonnement actief"}
                </p>
                <p className="text-xs text-[#6B6560] font-body">
                  Alle content is voor jou ontgrendeld
                </p>
              </div>
              <Badge variant="teal" className="ml-auto flex-shrink-0">Actief</Badge>
            </div>
          </Card>
        )}

        {/* Herinneringstijd */}
        <Card variant="default" padding="lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-[10px] bg-[#E8E2D8] flex items-center justify-center flex-shrink-0">
              <Bell className="w-4 h-4 text-[#6B6560]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#2D2A26] font-body">Dagelijkse herinnering</p>
              <p className="text-xs text-[#6B6560] font-body">
                Kies een tijd voor je dagelijkse check-in reminder
              </p>
            </div>
          </div>
          <ReminderTijdForm huidigeReminderTijd={profile?.reminder_time ?? "08:00"} />
        </Card>

        {/* Privacy */}
        <Card variant="default" padding="md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-[#E8E2D8] flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-[#6B6560]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#2D2A26] font-body">Privacy & gegevens</p>
              <p className="text-xs text-[#6B6560] font-body">
                Jouw journaalinhoud wordt nooit opgeslagen
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-[#B8B2A8]" />
          </div>
        </Card>

        {/* Uitloggen */}
        <UitlogButton />

        <p className="text-center text-[10px] text-[#B8B2A8] font-body pb-2">
          BreinVrij v1.0 · Gemaakt met zorg
        </p>

        <div className="h-4" />
      </div>
    </div>
  );
}
