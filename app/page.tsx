import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Disclaimer } from "@/components/Disclaimer";
import {
  Brain,
  HeartHandshake,
  TrendingUp,
  ChevronRight,
  Star,
  CheckCircle,
  BookOpen,
  Mic,
  Activity,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const watIsTMSBlokken = [
  {
    icon: Brain,
    titel: "Jouw brein als pijnmaker",
    tekst:
      "TMS (Tension Myositis Syndrome) is een aandoening waarbij het brein echte, lichamelijke pijn veroorzaakt als afleiding van onderdrukte emoties. De pijn is 100% echt — maar de oorzaak zit in het zenuwstelsel, niet in een beschadigde wervel.",
  },
  {
    icon: HeartHandshake,
    titel: "Bewezen wetenschap",
    tekst:
      "Dr. John Sarno behandelde meer dan 10.000 patiënten succesvol. De Boulder Back Pain Study (2021) toonde aan dat 66% van deelnemers met Pain Reprocessing Therapy vrijwel pijnvrij werd — vergeleken met 20% placebo.",
  },
  {
    icon: TrendingUp,
    titel: "Herstel is mogelijk",
    tekst:
      "Het zenuwstelsel kan heropgeleid worden. Pijn die geleerd is, kan worden afgeleerd. Via educatie, somatic tracking en expressief schrijven leer je jouw brein dat je lichaam veilig is.",
  },
];

const hoeHetWerktStappen = [
  {
    nummer: "01",
    titel: "Doe de gratis TMS-zelftest",
    beschrijving:
      "12 vragen die in 3 minuten laten zien of jouw pijnprofiel past bij TMS. Geen registratie nodig.",
    kleur: "bg-[#1B7A6E]",
  },
  {
    nummer: "02",
    titel: "Leer jouw pijn begrijpen",
    beschrijving:
      "90 dagen educatie, somatic tracking oefeningen en JournalSpeak sessies — specifiek ontworpen voor het Nederlandse taalgebied.",
    kleur: "bg-[#E8845C]",
  },
  {
    nummer: "03",
    titel: "Herstel stap voor stap",
    beschrijving:
      "Met dagelijkse begeleiding, een persoonlijke bewijs-lijst en Sarno's 12 herinneringen bouw je elke dag aan een pijnvrij leven.",
    kleur: "bg-[#C4A962]",
  },
];

const succesverhalen = [
  {
    naam: "Marieke, 42",
    pijntype: "Chronische rugpijn — 6 jaar",
    quote:
      "Na 6 jaar van fysiotherapie, pijnstillers en drie MRI's was ik het spoor bijster. Binnen 8 weken BreinVrij was ik 80% pijnvrij. Ik kon niet geloven dat dit mogelijk was.",
    sterren: 5,
  },
  {
    naam: "Thomas, 55",
    pijntype: "Fibromyalgie — 4 jaar",
    quote:
      "Ik was sceptisch. Maar de wetenschap overtuigde me. Nu wandel ik elke dag — iets wat ik drie jaar geleden niet durfde. Het programma in het Nederlands maakte het zo toegankelijk.",
    sterren: 5,
  },
  {
    naam: "Anita, 38",
    pijntype: "Nekpijn en migraine — 3 jaar",
    quote:
      "Het JournalSpeak was voor mij de doorbraak. Ik besefte hoeveel ik wegslikte. Nu heb ik al drie maanden geen migraine meer gehad.",
    sterren: 5,
  },
];

const pricingPlannen = [
  {
    naam: "Gratis",
    prijs: "€0",
    periode: "voor altijd",
    kleur: "border-[#E8E2D8]",
    knopVariant: "outline" as const,
    features: [
      "TMS Zelftest",
      "Eerste 3 educatielessen",
      "Sarno's 12 Herinneringen (tekst)",
      "Dag 1-7 van het programma",
    ],
    cta: "Gratis beginnen",
    href: "/zelftest",
  },
  {
    naam: "Volledig programma",
    prijs: "€19",
    periode: "per maand",
    kleur: "border-[#1B7A6E]",
    populair: true,
    knopVariant: "primary" as const,
    features: [
      "Alles uit Gratis",
      "Volledig 90-dagenprogramma",
      "Alle audio-oefeningen",
      "JournalSpeak module",
      "Somatic Tracking sessies",
      "Flare-up hulp (24/7)",
      "Persoonlijke bewijs-lijst",
      "Voortgang & streaks",
    ],
    cta: "Nu beginnen",
    href: "/aanmelden",
  },
];

const contentTypes = [
  { icon: BookOpen, naam: "Educatielessen", beschrijving: "Begrijp de wetenschap achter pijn" },
  { icon: Mic, naam: "Audio-oefeningen", beschrijving: "Somatic tracking & meditaties" },
  { icon: Activity, naam: "JournalSpeak", beschrijving: "Schrijven als medicijn" },
];

// ─── Sections ─────────────────────────────────────────────────────────────────

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-sm border-b border-[#E8E2D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[10px] bg-[#1B7A6E] flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="font-heading text-[#2D2A26] text-lg">BreinVrij</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/aanmelden"
            className="hidden sm:block text-sm text-[#6B6560] hover:text-[#2D2A26] transition-colors font-body"
          >
            Inloggen
          </Link>
          <Link href="/zelftest">
            <Button size="sm" variant="primary">
              Gratis test
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="bg-hero-gradient py-16 sm:py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <Badge variant="teal" className="mb-6 inline-flex">
          <span>Gebaseerd op Peer-Reviewed Wetenschap</span>
        </Badge>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading text-[#2D2A26] mb-6 text-balance leading-tight">
          Jouw pijn is echt.
          <br />
          <span className="text-[#1B7A6E]">En er is een weg</span>
          <br />
          naar herstel.
        </h1>

        <p className="text-lg sm:text-xl text-[#6B6560] mb-10 max-w-2xl mx-auto font-body leading-relaxed text-balance">
          BreinVrij begeleidt je door een 90-dagen herstelprogramma voor chronische pijn,
          gebaseerd op de wetenschap van Dr. John Sarno, Pain Reprocessing Therapy en JournalSpeak.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/zelftest">
            <Button size="lg" variant="primary" className="w-full sm:w-auto">
              Doe de gratis TMS-test
              <ChevronRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="#hoe-het-werkt">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Hoe werkt het?
            </Button>
          </Link>
        </div>

        {/* Social proof strip */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#6B6560] font-body">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C4A962] text-[#C4A962]" />
              ))}
            </div>
            <span>4.9 / 5 (200+ gebruikers)</span>
          </div>
          <span className="hidden sm:block text-[#E8E2D8]">|</span>
          <span>100% Nederlandstalig</span>
          <span className="hidden sm:block text-[#E8E2D8]">|</span>
          <span>Gratis te beginnen</span>
        </div>
      </div>
    </section>
  );
}

function WatIsTMSSection() {
  return (
    <section className="py-16 sm:py-20 px-4 bg-white" id="wat-is-tms">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="neutral" className="mb-4 inline-flex">
            Wat is TMS?
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-heading text-[#2D2A26] mb-4">
            Pijn zonder duidelijke oorzaak?
          </h2>
          <p className="text-[#6B6560] max-w-2xl mx-auto font-body">
            Misschien heb je alle onderzoeken gedaan en is er niets gevonden. Of alles wat gevonden
            is verklaart jouw pijn niet volledig. Dan kan TMS de sleutel zijn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {watIsTMSBlokken.map((blok) => {
            const Icon = blok.icon;
            return (
              <Card key={blok.titel} variant="surface" padding="lg">
                <div className="w-12 h-12 rounded-[12px] bg-[#1B7A6E]/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#1B7A6E]" />
                </div>
                <h3 className="text-xl font-heading text-[#2D2A26] mb-3">{blok.titel}</h3>
                <p className="text-[#6B6560] font-body leading-relaxed text-sm">{blok.tekst}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WetenschapSection() {
  return (
    <section className="py-16 sm:py-20 px-4 bg-[#1B7A6E]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 inline-flex bg-white/20 text-white border-white/30">
              Gepubliceerd onderzoek
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-heading text-white mb-6">
              De wetenschap bewijst het
            </h2>
            <p className="text-white/80 font-body mb-8 leading-relaxed">
              De Boulder Back Pain Study (JAMA Psychiatry, 2021) is de eerste gerandomiseerde
              gecontroleerde studie naar Pain Reprocessing Therapy — de methode achter BreinVrij.
            </p>
            <Link href="/zelftest">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-[#1B7A6E] hover:bg-white/90"
              >
                Ontdek of jij in aanmerking komt
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                getal: "66%",
                beschrijving: "Van deelnemers werd pijnvrij of vrijwel pijnvrij na PRT",
              },
              {
                getal: "10.000+",
                beschrijving: "Patiënten succesvol behandeld door Dr. John Sarno",
              },
              {
                getal: "90",
                beschrijving:
                  "Dagen gestructureerd hersteltraject — stap voor stap naar een pijnvrij leven",
              },
              {
                getal: "3 min",
                beschrijving: "Doe nu de gratis zelftest en ontdek direct jouw TMS-score",
              },
            ].map((stat) => (
              <Card key={stat.getal} variant="elevated" padding="md" className="text-center">
                <div className="text-3xl font-heading text-[#1B7A6E] mb-2">{stat.getal}</div>
                <p className="text-sm text-[#6B6560] font-body leading-snug">{stat.beschrijving}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HoeHetWerktSection() {
  return (
    <section className="py-16 sm:py-20 px-4 bg-[#FAF7F2]" id="hoe-het-werkt">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="teal" className="mb-4 inline-flex">
            Hoe het werkt
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-heading text-[#2D2A26] mb-4">
            Drie stappen naar herstel
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {hoeHetWerktStappen.map((stap) => (
            <div key={stap.nummer} className="text-center">
              <div
                className={`w-16 h-16 ${stap.kleur} rounded-[16px] flex items-center justify-center mx-auto mb-4`}
              >
                <span className="text-2xl font-heading text-white">{stap.nummer}</span>
              </div>
              <h3 className="text-xl font-heading text-[#2D2A26] mb-3">{stap.titel}</h3>
              <p className="text-[#6B6560] font-body text-sm leading-relaxed">
                {stap.beschrijving}
              </p>
            </div>
          ))}
        </div>

        {/* Content types */}
        <Card variant="surface" padding="lg">
          <h3 className="text-lg font-heading text-[#2D2A26] mb-6 text-center">
            Wat je krijgt in het programma
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {contentTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div key={type.naam} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-[10px] bg-[#E8845C]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#E8845C]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#2D2A26] font-body">{type.naam}</div>
                    <div className="text-sm text-[#6B6560] font-body">{type.beschrijving}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </section>
  );
}

function SuccesverhaalSection() {
  return (
    <section className="py-16 sm:py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="gold" className="mb-4 inline-flex">
            Ervaringen
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-heading text-[#2D2A26] mb-4">
            Zij gingen je voor
          </h2>
          <p className="text-[#6B6560] font-body">
            Echte verhalen van mensen die het TMS-herstelpad hebben bewandeld.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {succesverhalen.map((verhaal) => (
            <Card key={verhaal.naam} variant="elevated" padding="lg">
              <div className="flex mb-3">
                {[...Array(verhaal.sterren)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C4A962] text-[#C4A962]" />
                ))}
              </div>
              <blockquote className="text-[#2D2A26] font-body text-sm leading-relaxed mb-4 italic">
                &ldquo;{verhaal.quote}&rdquo;
              </blockquote>
              <div>
                <div className="font-semibold text-[#2D2A26] font-body text-sm">{verhaal.naam}</div>
                <div className="text-xs text-[#6B6560] font-body">{verhaal.pijntype}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="py-16 sm:py-20 px-4 bg-[#FAF7F2]" id="prijzen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="teal" className="mb-4 inline-flex">
            Prijzen
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-heading text-[#2D2A26] mb-4">
            Begin gratis, groei verder
          </h2>
          <p className="text-[#6B6560] font-body">
            Geen creditcard nodig om te beginnen. De zelftest en eerste lessen zijn altijd gratis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {pricingPlannen.map((plan) => (
            <Card
              key={plan.naam}
              variant={plan.populair ? "elevated" : "default"}
              padding="lg"
              className={`border-2 ${plan.kleur} relative`}
            >
              {plan.populair && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="teal" className="shadow-sm">
                    Meest gekozen
                  </Badge>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-heading text-[#2D2A26] mb-1">{plan.naam}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-heading text-[#2D2A26]">{plan.prijs}</span>
                  <span className="text-[#6B6560] font-body text-sm">/{plan.periode}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1B7A6E] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#2D2A26] font-body">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href} className="block">
                <Button variant={plan.knopVariant} fullWidth size="md">
                  {plan.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16 sm:py-20 px-4 bg-[#1B7A6E]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-heading text-white mb-6">
          Klaar om te ontdekken of jouw pijn TMS kan zijn?
        </h2>
        <p className="text-white/80 font-body mb-8 text-lg">
          De zelftest duurt 3 minuten en geeft je direct inzicht. Geen registratie nodig.
        </p>
        <Link href="/zelftest">
          <Button
            size="xl"
            className="bg-white text-[#1B7A6E] hover:bg-white/90 font-semibold shadow-lg"
          >
            Doe de gratis TMS-zelftest
            <ChevronRight className="w-6 h-6" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="py-10 px-4 bg-[#2D2A26]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[10px] bg-white/10 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading text-white text-lg">BreinVrij</span>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { href: "/zelftest", label: "TMS Zelftest" },
              { href: "#wat-is-tms", label: "Wat is TMS?" },
              { href: "#hoe-het-werkt", label: "Hoe het werkt" },
              { href: "#prijzen", label: "Prijzen" },
              { href: "/aanmelden", label: "Aanmelden" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors font-body"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/10 pt-6">
          <Disclaimer className="text-white/50 max-w-3xl" />
          <p className="text-xs text-white/40 mt-3 font-body">
            © {new Date().getFullYear()} BreinVrij. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <HeroSection />
      <WatIsTMSSection />
      <WetenschapSection />
      <HoeHetWerktSection />
      <SuccesverhaalSection />
      <PricingSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
