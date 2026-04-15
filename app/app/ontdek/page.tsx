import Link from "next/link";
import {
  BookOpen,
  Activity,
  PenLine,
  Brain,
  Dumbbell,
  ChevronRight,
  Lock,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getUserProfile } from "@/lib/auth";
import {
  educatieLessen,
  meditaties,
  somaticTrackingOefeningen,
  brainTrainingOefeningen,
} from "@/lib/seed-data";

export const metadata = { title: "Ontdek — HerstelBrein" };

const categorieen = [
  {
    href: "/app/ontdek/educatie",
    label: "Educatielessen",
    sublabel: "Begrijp de wetenschap achter pijn",
    icon: BookOpen,
    kleur: "bg-[#1B7A6E]/10 text-[#1B7A6E]",
    border: "border-[#1B7A6E]/20",
    aantalGratis: educatieLessen.filter((l) => l.isGratis).length,
    totaal: educatieLessen.length,
  },
  {
    href: "/app/ontdek/tracking",
    label: "Somatic Tracking",
    sublabel: "Kerntechniek van Pain Reprocessing Therapy",
    icon: Activity,
    kleur: "bg-[#E8845C]/10 text-[#E8845C]",
    border: "border-[#E8845C]/20",
    aantalGratis: somaticTrackingOefeningen.filter((l) => l.isGratis).length,
    totaal: somaticTrackingOefeningen.length,
  },
  {
    href: "/app/ontdek/schrijven",
    label: "JournalSpeak",
    sublabel: "Expressief schrijven als medicijn",
    icon: PenLine,
    kleur: "bg-[#C4A962]/15 text-[#8a7240]",
    border: "border-[#C4A962]/25",
    aantalGratis: 1,
    totaal: 90,
  },
  {
    href: "/app/ontdek/meditatie",
    label: "Meditaties",
    sublabel: "Rust en veiligheid voor het zenuwstelsel",
    icon: Brain,
    kleur: "bg-[#1B7A6E]/10 text-[#1B7A6E]",
    border: "border-[#1B7A6E]/20",
    aantalGratis: meditaties.filter((l) => l.isGratis).length,
    totaal: meditaties.length,
  },
  {
    href: "/app/ontdek/braintraining",
    label: "Brain Training",
    sublabel: "Hersenpaden hertrainen voor herstel",
    icon: Dumbbell,
    kleur: "bg-[#E8845C]/10 text-[#E8845C]",
    border: "border-[#E8845C]/20",
    aantalGratis: brainTrainingOefeningen.filter((l) => l.isGratis).length,
    totaal: brainTrainingOefeningen.length,
  },
];

export default async function OntdekPage() {
  const profile = await getUserProfile();
  const isBetaald = profile?.subscription_status !== "free";

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <header className="bg-white border-b border-[#E8E2D8] px-4 pt-6 pb-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-heading text-[#2D2A26] mb-1">Ontdek</h1>
          <p className="text-sm text-[#6B6560] font-body">
            Alle content op één plek
          </p>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-3">
        {!isBetaald && (
          <div className="bg-[#C4A962]/15 border border-[#C4A962]/30 rounded-[14px] px-4 py-3 flex items-center gap-3">
            <Lock className="w-4 h-4 text-[#8a7240] flex-shrink-0" />
            <p className="text-xs text-[#8a7240] font-body">
              Gratis plan: beperkte toegang. Upgrade voor de volledige bibliotheek.
            </p>
            <Link href="/app/profiel" className="ml-auto flex-shrink-0">
              <span className="text-xs font-semibold text-[#8a7240] font-body whitespace-nowrap hover:underline">
                Upgrade →
              </span>
            </Link>
          </div>
        )}

        {categorieen.map((cat) => {
          const Icon = cat.icon;
          const vrijContent = cat.aantalGratis;

          return (
            <Link key={cat.href} href={cat.href}>
              <Card
                variant="elevated"
                padding="md"
                className="hover:shadow-[0_8px_24px_rgba(45,42,38,0.12)] transition-all duration-200 cursor-pointer mb-3"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-[14px] flex items-center justify-center flex-shrink-0 ${cat.kleur}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="text-base font-heading text-[#2D2A26]">{cat.label}</h2>
                    <p className="text-xs text-[#6B6560] font-body mt-0.5">
                      {cat.sublabel}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Badge variant="neutral" className="text-[10px]">
                        {cat.totaal} items
                      </Badge>
                      {!isBetaald && vrijContent > 0 && (
                        <Badge variant="success" className="text-[10px]">
                          {vrijContent} gratis
                        </Badge>
                      )}
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-[#6B6560] flex-shrink-0" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
