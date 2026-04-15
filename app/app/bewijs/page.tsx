import Link from "next/link";
import { ArrowLeft, Shield, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BewijsFormulier } from "./BewijsFormulier";
import { BewijsItem } from "./BewijsItem";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getUserProfile } from "@/lib/auth";

export const metadata = { title: "Bewijs-lijst — BreinVrij" };

const categorieCount = (items: { category: string | null }[], cat: string) =>
  items.filter((i) => i.category === cat).length;

export default async function BewijsPage() {
  const profile = await getUserProfile();
  const supabase = await createSupabaseServerClient();

  const { data: bewijsItems } = await supabase
    .from("evidence_list")
    .select("*")
    .eq("user_id", profile!.id)
    .order("created_at", { ascending: false });

  const items = bewijsItems ?? [];

  const voorbeelden = [
    "Mijn pijn verhuist van plek naar plek",
    "Na vakantie was de pijn tijdelijk verdwenen",
    "Bij stress wordt de pijn altijd erger",
    "Artsen hebben nooit een duidelijke structurele oorzaak gevonden",
    "Als ik afgeleid ben, voel ik de pijn nauwelijks",
    "Ik had al eerder stress-gerelateerde klachten (PDS, hoofdpijn, eczeem)",
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <header className="bg-white border-b border-[#E8E2D8] px-4 py-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link href="/app" className="w-9 h-9 rounded-full flex items-center justify-center text-[#6B6560] hover:text-[#2D2A26] hover:bg-[#F5F0E8] transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-lg font-heading text-[#2D2A26]">Persoonlijke Bewijs-lijst</h1>
            <p className="text-xs text-[#6B6560] font-body">
              {items.length} {items.length === 1 ? "bewijs" : "bewijzen"} verzameld
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Uitleg */}
        <Card variant="teal" padding="md">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-[#1B7A6E] flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#2D2A26] font-body mb-1">
                Waarom een bewijs-lijst?
              </p>
              <p className="text-sm text-[#6B6560] font-body leading-relaxed">
                Jouw brein heeft concreet bewijs nodig dat jouw pijn TMS is, niet structureel.
                Elke keer dat je twijfelt, lees je deze lijst. Dit is jouw persoonlijk fundament
                voor herstel.
              </p>
            </div>
          </div>
        </Card>

        {/* Statistieken */}
        {items.length > 0 && (
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Totaal", waarde: items.length, kleur: "text-[#1B7A6E]" },
              { label: "Inconsis.", waarde: categorieCount(items, "inconsistentie"), kleur: "text-[#1B7A6E]" },
              { label: "Stress", waarde: categorieCount(items, "stress_trigger"), kleur: "text-[#d06a42]" },
              { label: "Structuur", waarde: categorieCount(items, "geen_structureel"), kleur: "text-[#2d7a52]" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-[12px] border border-[#E8E2D8] p-3 text-center">
                <div className={`text-xl font-heading ${s.kleur}`}>{s.waarde}</div>
                <div className="text-[10px] text-[#6B6560] font-body mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Formulier */}
        <Card variant="default" padding="lg">
          <h2 className="text-base font-heading text-[#2D2A26] mb-4">Nieuw bewijs toevoegen</h2>
          <BewijsFormulier />
        </Card>

        {/* Lijst */}
        {items.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-heading text-[#2D2A26]">Jouw bewijs</h2>
              <Badge variant="teal">{items.length} items</Badge>
            </div>
            {items.map((item) => (
              <BewijsItem
                key={item.id}
                id={item.id}
                tekst={item.text}
                categorie={item.category}
                datum={item.created_at}
              />
            ))}
          </div>
        ) : (
          /* Lege staat */
          <div className="space-y-4">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#F5F0E8] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-[#B8B2A8]" />
              </div>
              <p className="text-[#6B6560] font-body text-sm">
                Nog geen bewijs toegevoegd. Begin met één observatie.
              </p>
            </div>

            {/* Voorbeelden */}
            <Card variant="surface" padding="md">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-[#C4A962]" />
                <p className="text-xs font-semibold text-[#6B6560] uppercase tracking-wide font-body">
                  Voorbeelden van bewijs
                </p>
              </div>
              <ul className="space-y-2">
                {voorbeelden.map((v) => (
                  <li key={v} className="flex items-start gap-2 text-sm text-[#6B6560] font-body">
                    <span className="text-[#1B7A6E] mt-0.5 flex-shrink-0">→</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}

        <div className="h-4" />
      </div>
    </div>
  );
}
