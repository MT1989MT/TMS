// ─── Sarno's 12 Dagelijkse Herinneringen ─────────────────────────────────────

export interface DagelijkseHerinnering {
  nummer: number;
  tekst: string;
  uitleg: string;
}

export const dagelijkseHerinneringen: DagelijkseHerinnering[] = [
  {
    nummer: 1,
    tekst: "De pijn wordt veroorzaakt door TMS, niet door een structurele afwijking.",
    uitleg:
      "De meeste beeldvormingsafwijkingen (hernia, slijtage) zijn bij pijnvrije mensen net zo aanwezig. Ze zijn de oorzaak niet.",
  },
  {
    nummer: 2,
    tekst: "De directe reden voor de pijn is een milde zuurstoftekort in de spieren.",
    uitleg:
      "Het brein vermindert de bloedtoevoer naar spieren en zenuwen. Dit veroorzaakt echte pijn — maar het is onschadelijk.",
  },
  {
    nummer: 3,
    tekst: "TMS is een onschuldige aandoening, veroorzaakt door mijn onderdrukte emoties.",
    uitleg:
      "Pijn als afleiding van onbewuste emotionele spanning. Onschuldig voor je lichaam, een signaal voor je geest.",
  },
  {
    nummer: 4,
    tekst: "De belangrijkste emotie is onderdrukte woede en frustratie.",
    uitleg:
      "Perfectionisten en people-pleasers verzamelen jarenlang onverwerkte frustratie. Het lichaam draagt die last.",
  },
  {
    nummer: 5,
    tekst: "TMS bestaat alleen om mijn aandacht af te leiden van mijn emoties.",
    uitleg:
      "Het brein gebruikt pijn als beschermingsmechanisme. Zodra je dit doorziet, verliest de pijn zijn doel.",
  },
  {
    nummer: 6,
    tekst: "Aangezien mijn lichaam in wezen gezond is, is er niets om bang voor te zijn.",
    uitleg:
      "Angst versterkt pijn. Veiligheidskennis — dat je lichaam gezond is — is het tegengif.",
  },
  {
    nummer: 7,
    tekst: "Daarom is fysieke activiteit niet gevaarlijk.",
    uitleg:
      "Er is geen structurele schade. Bewegen is veilig. Elke beweging die je maakt bevestigt dit aan je brein.",
  },
  {
    nummer: 8,
    tekst: "En ik moet al mijn normale fysieke activiteiten hervatten.",
    uitleg:
      "Vermijding versterkt het pijnsysteem. Terugkeer naar normaal leven is therapie.",
  },
  {
    nummer: 9,
    tekst: "Ik zal me niet laten intimideren door de pijn.",
    uitleg:
      "Pijn is een boodschap, geen bevel. Jij bepaalt hoe je erop reageert.",
  },
  {
    nummer: 10,
    tekst: "Ik zal mijn aandacht verleggen van de pijn naar emotionele kwesties.",
    uitleg:
      "Wanneer de pijn om aandacht vraagt, keer je je bewust om: naar gevoelens, niet naar het symptoom.",
  },
  {
    nummer: 11,
    tekst: "Ik ben van plan om de controle over mijn onderbewuste te herwinnen.",
    uitleg:
      "Herstel is een actieve keuze. Je leert je brein opnieuw dat er geen gevaar is.",
  },
  {
    nummer: 12,
    tekst: "Ik moet elke dag aan TMS denken totdat ik volledig genezen ben.",
    uitleg:
      "Dagelijkse herhaling bouwt nieuwe neurale paden. Consistentie is het medicijn.",
  },
];

// ─── Eerste 10 Educatielessen ─────────────────────────────────────────────────

export interface EducatieLes {
  id: number;
  titel: string;
  beschrijving: string;
  duurMinuten: number;
  fase: "ontdekking" | "hertrainen" | "verdieping";
  isGratis: boolean;
}

export const educatieLessen: EducatieLes[] = [
  {
    id: 1,
    titel: "Wat is TMS?",
    beschrijving:
      "Introductie: Dr. Sarno's ontdekking, hoe het brein pijn creëert en waarom dit goed nieuws is.",
    duurMinuten: 12,
    fase: "ontdekking",
    isGratis: true,
  },
  {
    id: 2,
    titel: "Jouw brein als alarminstallatie",
    beschrijving:
      "Hoe het zenuwstelsel werkt, wanneer het vastloopt in een chronische staat, en hoe je dat verandert.",
    duurMinuten: 10,
    fase: "ontdekking",
    isGratis: true,
  },
  {
    id: 3,
    titel: "Waarom structurele afwijkingen vaak niets betekenen",
    beschrijving:
      "MRI's, hernia's en het bewijs: studies tonen dat beeldvormingsafwijkingen bij pijnvrije mensen even vaak voorkomen.",
    duurMinuten: 8,
    fase: "ontdekking",
    isGratis: true,
  },
  {
    id: 4,
    titel: "De angst-pijn cyclus",
    beschrijving:
      "Hoe angst pijn versterkt en hoe je die negatieve spiraal doorbreekt met veiligheidskennis.",
    duurMinuten: 11,
    fase: "ontdekking",
    isGratis: false,
  },
  {
    id: 5,
    titel: "Onderdrukte emoties en pijn",
    beschrijving:
      "De directe link tussen wat je voelt (of niet voelt) en wat je lichaam doet. Inclusief oefening.",
    duurMinuten: 14,
    fase: "ontdekking",
    isGratis: false,
  },
  {
    id: 6,
    titel: "De TMS-persoonlijkheid",
    beschrijving:
      "Perfectionisme, people-pleasing en goodism herkennen in jezelf — de drijvende krachten achter spanning.",
    duurMinuten: 13,
    fase: "ontdekking",
    isGratis: false,
  },
  {
    id: 7,
    titel: "Het bewijs verzamelen",
    beschrijving:
      "Hoe je voor jezelf bewijst dat jouw pijn neuroplastisch is. Bouw jouw persoonlijke bewijslijst op.",
    duurMinuten: 10,
    fase: "hertrainen",
    isGratis: false,
  },
  {
    id: 8,
    titel: "Wat is Somatic Tracking?",
    beschrijving:
      "Introductie tot de kerntechniek van Pain Reprocessing Therapy: nieuwsgierig observeren zonder angst.",
    duurMinuten: 15,
    fase: "hertrainen",
    isGratis: false,
  },
  {
    id: 9,
    titel: "JournalSpeak: schrijven als medicijn",
    beschrijving:
      "Hoe expressief schrijven je zenuwstelsel kalmeert en onderdrukte emoties een uitlaatklep geeft.",
    duurMinuten: 12,
    fase: "hertrainen",
    isGratis: false,
  },
  {
    id: 10,
    titel: "Beweging is veilig",
    beschrijving:
      "Waarom je lichaam niet kapot is en hoe je stap voor stap terugkeert naar normaal bewegen.",
    duurMinuten: 9,
    fase: "hertrainen",
    isGratis: false,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getDagHerinnering(dag: number): DagelijkseHerinnering {
  const index = ((dag - 1) % dagelijkseHerinneringen.length);
  return dagelijkseHerinneringen[index];
}
