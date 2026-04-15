import { CheckCircle2, BookOpen, Heart } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmotionCheckin } from "@/components/EmotionCheckin";
import { EmotieHistorie } from "./EmotieHistorie";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getUserProfile } from "@/lib/auth";

export const metadata = { title: "Emotie Check-in — HerstelBrein" };

const PIJN_REACTIE_LABELS: Record<string, string> = {
  angst:           "Angst / paniek",
  nieuwsgierigheid: "Nieuwsgierigheid",
  acceptatie:      "Acceptatie / rust",
  frustratie:      "Frustratie",
};

export default async function EmotiesPage() {
  const profile = await getUserProfile();
  const supabase = await createSupabaseServerClient();

  // Vandaag al ingecheckt?
  const vandaag = new Date().toISOString().split("T")[0];
  const { data: vandaagCheckin } = await supabase
    .from("emotion_checkins")
    .select("*")
    .eq("user_id", profile!.id)
    .eq("date", vandaag)
    .maybeSingle();

  // Afgelopen 30 check-ins voor de historie
  const { data: historiItems } = await supabase
    .from("emotion_checkins")
    .select("*")
    .eq("user_id", profile!.id)
    .order("date", { ascending: false })
    .limit(30);

  const historie = historiItems ?? [];

  // Statistieken
  const totaalCheckins = historie.length;
  const gejournaldCount = historie.filter((c) => c.journaled).length;
  const meestVoorkomendeEmotie = (() => {
    const counts: Record<string, number> = {};
    for (const c of historie) {
      for (const e of c.emotions ?? []) {
        counts[e] = (counts[e] ?? 0) + 1;
      }
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
  })();

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <header className="bg-white border-b border-[#E8E2D8] px-4 pt-6 pb-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-heading text-[#2D2A26] mb-1">Emotie Check-in</h1>
          <p className="text-sm text-[#6B6560] font-body">Bewustzijn, niet controle</p>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">

        {/* Vandaag check-in */}
        <Card variant="elevated" padding="lg">
          {vandaagCheckin ? (
            /* Al ingecheckt vandaag */
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#4CAF7D]/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-[#4CAF7D]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#2D2A26] font-body">Vandaag ingecheckt</p>
                  <p className="text-xs text-[#6B6560] font-body">
                    {new Date(vandaagCheckin.date).toLocaleDateString("nl-NL", {
                      weekday: "long", day: "numeric", month: "long",
                    })}
                  </p>
                </div>
              </div>

              {/* Emoties */}
              {vandaagCheckin.emotions && vandaagCheckin.emotions.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-[#6B6560] font-body mb-2 uppercase tracking-wide font-semibold">
                    Jouw emoties
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {vandaagCheckin.emotions.map((e: string) => (
                      <Badge key={e} variant="teal">{e}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Reactie */}
              {vandaagCheckin.pain_reaction && (
                <div className="mb-3">
                  <p className="text-xs text-[#6B6560] font-body mb-1 uppercase tracking-wide font-semibold">
                    Reactie op pijn
                  </p>
                  <p className="text-sm text-[#2D2A26] font-body">
                    {PIJN_REACTIE_LABELS[vandaagCheckin.pain_reaction] ?? vandaagCheckin.pain_reaction}
                  </p>
                </div>
              )}

              {/* Gejournald */}
              <div className="flex items-center gap-2">
                <BookOpen className={`w-4 h-4 ${vandaagCheckin.journaled ? "text-[#1B7A6E]" : "text-[#B8B2A8]"}`} />
                <p className="text-xs text-[#6B6560] font-body">
                  {vandaagCheckin.journaled ? "Je hebt vandaag gejournald" : "Nog niet gejournald vandaag"}
                </p>
              </div>

              {vandaagCheckin.notes && (
                <div className="mt-3 bg-[#F5F0E8] rounded-[10px] p-3">
                  <p className="text-xs text-[#6B6560] font-body italic">"{vandaagCheckin.notes}"</p>
                </div>
              )}
            </div>
          ) : (
            /* Nog niet ingecheckt */
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#E8845C]/10 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-[#E8845C]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#2D2A26] font-body">Check-in voor vandaag</p>
                  <p className="text-xs text-[#6B6560] font-body">
                    {new Date().toLocaleDateString("nl-NL", {
                      weekday: "long", day: "numeric", month: "long",
                    })}
                  </p>
                </div>
              </div>
              <EmotionCheckin />
            </div>
          )}
        </Card>

        {/* Statistieken */}
        {totaalCheckins > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {[
              { waarde: totaalCheckins, label: "Check-ins", kleur: "text-[#1B7A6E]" },
              { waarde: gejournaldCount, label: "Gejournald", kleur: "text-[#8a7240]" },
              { waarde: meestVoorkomendeEmotie ?? "–", label: "Vaakst", kleur: "text-[#E8845C]" },
            ].map((s) => (
              <Card key={s.label} variant="default" padding="md" className="text-center">
                <div className={`text-xl font-heading ${s.kleur} truncate`}>{s.waarde}</div>
                <div className="text-[10px] text-[#6B6560] font-body mt-0.5">{s.label}</div>
              </Card>
            ))}
          </div>
        )}

        {/* Historie */}
        {historie.length > 0 && (
          <div>
            <h2 className="text-base font-heading text-[#2D2A26] mb-3">
              Afgelopen check-ins
              <Badge variant="teal" className="ml-2">{historie.length}</Badge>
            </h2>
            <EmotieHistorie items={historie} />
          </div>
        )}

        {/* Lege staat */}
        {!vandaagCheckin && historie.length === 0 && (
          <div className="text-center py-8">
            <div className="w-14 h-14 bg-[#F5F0E8] rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-[#B8B2A8]" />
            </div>
            <p className="text-sm text-[#6B6560] font-body">
              Jouw eerste check-in staat hierboven klaar.
            </p>
          </div>
        )}

        <div className="h-4" />
      </div>
    </div>
  );
}
