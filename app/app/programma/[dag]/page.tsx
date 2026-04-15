import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Activity,
  PenLine,
  CheckCircle,
  Lock,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DagVoltooidButton } from "./DagVoltooidButton";
import { AudioSpeelKnop } from "./AudioSpeelKnop";
import { getUserProfile } from "@/lib/auth";
import {
  getProgrammaDag,
  getProgrammaFaseLabel,
  getFaseVoorDag,
  getContentById,
  getDagHerinnering,
  programmaData,
} from "@/lib/seed-data";

interface Props {
  params: Promise<{ dag: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { dag: dagStr } = await params;
  const dag = parseInt(dagStr, 10);
  const data = getProgrammaDag(dag);
  return {
    title: data ? `Dag ${dag}: ${data.titel} — HerstelBrein` : "Dag niet gevonden",
  };
}

const TYPE_ICON = {
  educatie:        { icon: BookOpen,  kleur: "bg-[#1B7A6E]/10 text-[#1B7A6E]",  label: "Educatieles" },
  somatic_tracking:{ icon: Activity,  kleur: "bg-[#E8845C]/10 text-[#E8845C]",  label: "Somatic Tracking" },
  meditatie:       { icon: Activity,  kleur: "bg-[#C4A962]/15 text-[#8a7240]",  label: "Meditatie" },
  brain_training:  { icon: BookOpen,  kleur: "bg-[#1B7A6E]/10 text-[#1B7A6E]",  label: "Brain Training" },
  flareup:         { icon: Activity,  kleur: "bg-[#C75050]/10 text-[#C75050]",  label: "Flare-up" },
} as const;

export default async function DagDetailPage({ params }: Props) {
  const { dag: dagStr } = await params;
  const dagNummer = parseInt(dagStr, 10);

  if (isNaN(dagNummer) || dagNummer < 1 || dagNummer > 90) notFound();

  const profile = await getUserProfile();
  const huidigeDag = profile?.current_day ?? 1;
  const isBetaald = profile?.subscription_status !== "free";
  const isGratis = dagNummer <= 7;
  const isVergrendeld = !isGratis && !isBetaald;
  const isVoltooid = dagNummer < huidigeDag;

  const data = getProgrammaDag(dagNummer);
  const fase = getFaseVoorDag(dagNummer);
  const herinnering = getDagHerinnering(dagNummer);

  const educatie = data?.educatieId ? getContentById(data.educatieId) : null;
  const oefening = data?.oefeningId ? getContentById(data.oefeningId) : null;

  const vorigeDag = dagNummer > 1 ? dagNummer - 1 : null;
  const volgendeDag = dagNummer < 90 ? dagNummer + 1 : null;
  const heeftVolgendeDag = !!programmaData.find((d) => d.dag === (dagNummer + 1));

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <header className="bg-white border-b border-[#E8E2D8] px-4 py-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Link
              href="/app/programma"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#6B6560] hover:text-[#2D2A26] hover:bg-[#F5F0E8] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant={
                    fase === "ontdekking" ? "teal" : fase === "hertrainen" ? "coral" : "gold"
                  }
                >
                  {getProgrammaFaseLabel(fase)}
                </Badge>
                {isVoltooid && (
                  <Badge variant="success">
                    <CheckCircle className="w-3 h-3" /> Voltooid
                  </Badge>
                )}
                {dagNummer === huidigeDag && (
                  <Badge variant="teal">Vandaag</Badge>
                )}
              </div>
            </div>
          </div>
          <div className="pl-12">
            <h1 className="text-lg font-heading text-[#2D2A26] leading-tight">
              Dag {dagNummer}
              {data ? ` — ${data.titel}` : ""}
            </h1>
          </div>
        </div>
      </header>

      {/* Vergrendeld */}
      {isVergrendeld ? (
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="w-16 h-16 bg-[#F5F0E8] rounded-full flex items-center justify-center mx-auto mb-5">
            <Lock className="w-7 h-7 text-[#B8B2A8]" />
          </div>
          <h2 className="text-2xl font-heading text-[#2D2A26] mb-3">
            Dag {dagNummer} is vergrendeld
          </h2>
          <p className="text-[#6B6560] font-body mb-6 max-w-sm mx-auto">
            Dag 8 t/m 90 zijn beschikbaar met het volledige programma.
          </p>
          <Link href="/app/profiel">
            <button className="bg-[#1B7A6E] text-white rounded-full px-6 py-3 font-semibold font-body hover:bg-[#145f55] transition-colors flex items-center gap-2 mx-auto">
              Bekijk abonnementen
              <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      ) : (
        <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
          {/* Intro */}
          {data?.intro && (
            <Card variant="surface" padding="md">
              <p className="text-[#2D2A26] font-body leading-relaxed">{data.intro}</p>
            </Card>
          )}

          {/* Dagelijkse herinnering */}
          <Card variant="teal" padding="md">
            <p className="text-xs font-semibold text-[#1B7A6E] uppercase tracking-wide mb-2 font-body">
              Herinnering van vandaag
            </p>
            <p className="text-sm text-[#2D2A26] font-body italic mb-3">
              &ldquo;{herinnering.tekst}&rdquo;
            </p>
            <Link href="/app/reminders">
              <span className="text-xs text-[#1B7A6E] font-semibold font-body hover:underline">
                Alle 12 herinneringen →
              </span>
            </Link>
          </Card>

          {/* Educatieles */}
          {educatie && (
            <ContentBlok
              type={educatie.type}
              titel={educatie.titel}
              beschrijving={educatie.beschrijving}
              duurMinuten={educatie.duurMinuten}
              contentId={educatie.id}
            />
          )}

          {/* Oefening */}
          {oefening && (
            <ContentBlok
              type={oefening.type}
              titel={oefening.titel}
              beschrijving={oefening.beschrijving}
              duurMinuten={oefening.duurMinuten}
              contentId={oefening.id}
            />
          )}

          {/* Journaal prompt */}
          {data?.journaalPrompt && (
            <Card variant="default" padding="lg">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-[10px] bg-[#C4A962]/15 flex items-center justify-center flex-shrink-0">
                  <PenLine className="w-4 h-4 text-[#8a7240]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#8a7240] uppercase tracking-wide font-body">
                    JournalSpeak opdracht
                  </p>
                  <p className="text-sm font-semibold text-[#2D2A26] font-body mt-0.5">
                    Schrijfsessie van vandaag
                  </p>
                </div>
              </div>
              <p className="text-sm text-[#6B6560] font-body leading-relaxed mb-4 italic">
                &ldquo;{data.journaalPrompt}&rdquo;
              </p>
              <Link href="/app/ontdek/schrijven">
                <button className="w-full py-3 rounded-[12px] border-2 border-[#C4A962] text-[#8a7240] font-semibold font-body text-sm hover:bg-[#C4A962]/8 transition-colors flex items-center justify-center gap-2">
                  <PenLine className="w-4 h-4" />
                  Begin schrijfsessie
                </button>
              </Link>
            </Card>
          )}

          {/* Voltooid knop */}
          {!isVoltooid && dagNummer === huidigeDag && (
            <DagVoltooidButton dag={dagNummer} />
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between gap-3 pt-2">
            {vorigeDag ? (
              <Link href={`/app/programma/${vorigeDag}`} className="flex-1">
                <button className="w-full flex items-center gap-2 px-4 py-3 rounded-[12px] border border-[#E8E2D8] text-sm text-[#6B6560] font-body hover:border-[#1B7A6E]/30 hover:text-[#2D2A26] transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Dag {vorigeDag}
                </button>
              </Link>
            ) : <div className="flex-1" />}

            {volgendeDag && heeftVolgendeDag ? (
              <Link href={`/app/programma/${volgendeDag}`} className="flex-1">
                <button className="w-full flex items-center justify-end gap-2 px-4 py-3 rounded-[12px] border border-[#E8E2D8] text-sm text-[#6B6560] font-body hover:border-[#1B7A6E]/30 hover:text-[#2D2A26] transition-colors">
                  Dag {volgendeDag}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            ) : volgendeDag ? (
              <Link href={`/app/programma/${volgendeDag}`} className="flex-1">
                <button className="w-full flex items-center justify-end gap-2 px-4 py-3 rounded-[12px] border border-[#E8E2D8] text-sm text-[#B8B2A8] font-body cursor-pointer hover:border-[#1B7A6E]/20 transition-colors">
                  Dag {volgendeDag}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            ) : null}
          </div>

          <div className="h-4" />
        </div>
      )}
    </div>
  );
}

// ─── Content blok component ───────────────────────────────────────────────────

function ContentBlok({
  type,
  titel,
  beschrijving,
  duurMinuten,
  contentId,
}: {
  type: string;
  titel: string;
  beschrijving: string;
  duurMinuten: number;
  contentId: number;
}) {
  const meta = TYPE_ICON[type as keyof typeof TYPE_ICON] ?? TYPE_ICON.educatie;
  const Icon = meta.icon;

  return (
    <Card variant="default" padding="lg">
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 ${meta.kleur}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide font-body text-[#6B6560]">
            {meta.label}
          </p>
          <h3 className="text-base font-heading text-[#2D2A26]">{titel}</h3>
        </div>
      </div>

      <p className="text-sm text-[#6B6560] font-body leading-relaxed mb-4">
        {beschrijving}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-[#6B6560] font-body">
          <Clock className="w-3.5 h-3.5" />
          <span>{duurMinuten} minuten</span>
        </div>
        <AudioSpeelKnop
          id={`content-${contentId}`}
          titel={titel}
          type={type}
          audioUrl={`/audio/${type}/${contentId}.mp3`}
        />
      </div>
    </Card>
  );
}
