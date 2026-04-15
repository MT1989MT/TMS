import Link from "next/link";
import { BookOpen, PenLine, Clock, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { StreakDisplay } from "@/components/StreakDisplay";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getUserProfile } from "@/lib/auth";
import { getBehaaldeMijlpalen } from "@/lib/journal-data";

export const metadata = { title: "Voortgang — BreinVrij" };

// ─── Kalender Heatmap ─────────────────────────────────────────────────────────

function KalenderHeatmap({ activeDagen }: { activeDagen: Set<string> }) {
  // Toon de laatste 12 weken
  const vandaag = new Date();
  const startDate = new Date(vandaag);
  startDate.setDate(vandaag.getDate() - 83); // 12 weken = 84 dagen

  const dagen: Date[] = [];
  const d = new Date(startDate);
  while (d <= vandaag) {
    dagen.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }

  const weken: Date[][] = [];
  let week: Date[] = [];
  // Pad to start on Monday
  const eersteWeekdag = (dagen[0].getDay() + 6) % 7; // 0=Mon
  for (let i = 0; i < eersteWeekdag; i++) week.push(new Date(0));

  for (const dag of dagen) {
    week.push(dag);
    if (week.length === 7) {
      weken.push(week);
      week = [];
    }
  }
  if (week.length > 0) weken.push(week);

  const dagLabels = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

  return (
    <div>
      <div className="flex gap-1 mb-1">
        <div className="w-5" />
        {weken.slice(-10).map((_, i) => (
          <div key={i} className="flex-1" />
        ))}
      </div>
      <div className="flex gap-1">
        {/* Dag labels */}
        <div className="flex flex-col gap-1">
          {dagLabels.map((l) => (
            <div key={l} className="h-4 w-5 text-[9px] text-[#6B6560] font-body flex items-center">
              {l}
            </div>
          ))}
        </div>
        {/* Heatmap cellen */}
        {weken.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1 flex-1">
            {week.map((dag, di) => {
              if (!dag.getTime()) {
                return <div key={di} className="h-4 rounded-[2px]" />;
              }
              const iso = dag.toISOString().split("T")[0];
              const actief = activeDagen.has(iso);
              const isVandaag = iso === vandaag.toISOString().split("T")[0];
              return (
                <div
                  key={di}
                  title={iso}
                  className={[
                    "h-4 rounded-[2px] transition-colors",
                    isVandaag
                      ? "ring-1 ring-[#1B7A6E] ring-offset-1"
                      : "",
                    actief
                      ? "bg-[#1B7A6E]"
                      : "bg-[#E8E2D8]",
                  ].join(" ")}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2 justify-end">
        <div className="w-3 h-3 bg-[#E8E2D8] rounded-[2px]" />
        <span className="text-[10px] text-[#6B6560] font-body">Geen activiteit</span>
        <div className="w-3 h-3 bg-[#1B7A6E] rounded-[2px]" />
        <span className="text-[10px] text-[#6B6560] font-body">Actief</span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function VoortgangPage() {
  const profile = await getUserProfile();
  const supabase = await createSupabaseServerClient();

  // Stats ophalen
  const { data: statsData } = await supabase
    .from("user_stats")
    .select("*")
    .eq("user_id", profile!.id)
    .single();

  const stats = statsData ?? {
    current_streak: 0,
    longest_streak: 0,
    total_exercises: 0,
    total_journal_sessions: 0,
    total_minutes: 0,
    last_activity_date: null,
  };

  // Actieve dagen (voor heatmap)
  const { data: checkIns } = await supabase
    .from("emotion_checkins")
    .select("date")
    .eq("user_id", profile!.id)
    .order("date", { ascending: false })
    .limit(90);

  const activeDagen = new Set((checkIns ?? []).map((c) => c.date as string));

  // Mijlpalen
  const huidigeDag = profile?.current_day ?? 1;
  const behaaldeMijlpalen = getBehaaldeMijlpalen({
    huidigeDag,
    huidigeStreak: stats.current_streak,
    totaalOefeningen: stats.total_exercises,
    totaalJournaal: stats.total_journal_sessions,
  });

  const urenBesteed = Math.floor(stats.total_minutes / 60);
  const minutenBesteed = stats.total_minutes % 60;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <header className="bg-white border-b border-[#E8E2D8] px-4 pt-6 pb-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-heading text-[#2D2A26] mb-1">Jouw Voortgang</h1>
          <p className="text-sm text-[#6B6560] font-body">Motivatie, niet pijn-tracking</p>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">

        {/* Programma voortgang */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-heading text-[#2D2A26]">90-Dagenprogramma</h2>
            <Link href="/app/programma">
              <span className="text-xs text-[#1B7A6E] font-semibold font-body hover:underline flex items-center gap-0.5">
                Bekijk <ChevronRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
          <Progress
            value={huidigeDag}
            max={90}
            size="lg"
            color="teal"
            showLabel
            label={`Dag ${huidigeDag} van 90`}
          />
          <div className="flex gap-2 mt-3">
            {(["ontdekking", "hertrainen", "verdieping"] as const).map((fase, i) => {
              const van = i * 30 + 1;
              const tot = (i + 1) * 30;
              const actief = huidigeDag >= van;
              const labels = ["Ontdekking", "Hertrainen", "Verdieping"];
              return (
                <div
                  key={fase}
                  className={`flex-1 text-center py-1.5 rounded-[8px] text-[10px] font-semibold font-body transition-colors ${
                    actief ? "bg-[#1B7A6E]/10 text-[#1B7A6E]" : "bg-[#F5F0E8] text-[#B8B2A8]"
                  }`}
                >
                  {labels[i]}
                  <div className="text-[9px] font-normal opacity-70">{van}–{tot}</div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Streaks */}
        <div>
          <h2 className="text-base font-heading text-[#2D2A26] mb-3">Streaks</h2>
          <StreakDisplay
            huidigeStreak={stats.current_streak}
            langsteStreak={stats.longest_streak}
          />
        </div>

        {/* Statistieken */}
        <div>
          <h2 className="text-base font-heading text-[#2D2A26] mb-3">Statistieken</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                waarde: stats.total_exercises,
                label: "Oefeningen",
                icoon: <BookOpen className="w-4 h-4 text-[#1B7A6E]" />,
                kleur: "text-[#1B7A6E]",
              },
              {
                waarde: stats.total_journal_sessions,
                label: "Schrijfsessies",
                icoon: <PenLine className="w-4 h-4 text-[#8a7240]" />,
                kleur: "text-[#8a7240]",
              },
              {
                waarde: urenBesteed > 0 ? `${urenBesteed}u ${minutenBesteed}m` : `${stats.total_minutes}m`,
                label: "Tijd besteed",
                icoon: <Clock className="w-4 h-4 text-[#E8845C]" />,
                kleur: "text-[#E8845C]",
              },
            ].map((s) => (
              <Card key={s.label} variant="default" padding="md" className="text-center">
                <div className="flex justify-center mb-1">{s.icoon}</div>
                <div className={`text-xl font-heading ${s.kleur}`}>{s.waarde}</div>
                <div className="text-[10px] text-[#6B6560] font-body mt-0.5">{s.label}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Heatmap */}
        <Card variant="default" padding="lg">
          <h2 className="text-base font-heading text-[#2D2A26] mb-4">Activiteits-heatmap</h2>
          <KalenderHeatmap activeDagen={activeDagen} />
        </Card>

        {/* Mijlpalen */}
        <div>
          <h2 className="text-base font-heading text-[#2D2A26] mb-3">
            Mijlpalen
            {behaaldeMijlpalen.length > 0 && (
              <Badge variant="teal" className="ml-2">{behaaldeMijlpalen.length}</Badge>
            )}
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {behaaldeMijlpalen.length > 0 ? (
              behaaldeMijlpalen.map((m) => (
                <Card key={m.id} variant="surface" padding="sm" className="text-center">
                  <div className="text-2xl mb-1">{m.icoon}</div>
                  <p className="text-xs font-semibold text-[#2D2A26] font-body leading-tight">
                    {m.titel}
                  </p>
                  <p className="text-[10px] text-[#6B6560] font-body mt-0.5 leading-tight">
                    {m.beschrijving}
                  </p>
                </Card>
              ))
            ) : (
              <div className="col-span-3 py-8 text-center">
                <p className="text-sm text-[#6B6560] font-body">
                  Jouw eerste mijlpaal wacht op je. Blijf actief!
                </p>
              </div>
            )}

            {/* Aankomende vergrendelde mijlpalen */}
            {behaaldeMijlpalen.length < 3 && (
              <>
                {[...Array(Math.min(3 - behaaldeMijlpalen.length, 3))].map((_, i) => (
                  <Card key={`locked-${i}`} variant="surface" padding="sm" className="text-center opacity-40">
                    <div className="text-2xl mb-1">🔒</div>
                    <p className="text-xs font-semibold text-[#6B6560] font-body">
                      Nog te behalen
                    </p>
                  </Card>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}
