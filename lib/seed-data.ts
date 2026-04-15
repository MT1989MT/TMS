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

// ─── Content items (meditaties, somatic tracking, brain training, flareup) ────

export type ContentType =
  | "educatie"
  | "somatic_tracking"
  | "meditatie"
  | "brain_training"
  | "flareup";

export interface ContentItem {
  id: number;
  type: ContentType;
  titel: string;
  beschrijving: string;
  duurMinuten: number;
  fase?: "ontdekking" | "hertrainen" | "verdieping";
  isGratis: boolean;
  audioUrl?: string;
  transcript?: string;
}

export const meditaties: ContentItem[] = [
  {
    id: 201,
    type: "meditatie",
    titel: "Lichaamsscan voor beginners",
    beschrijving:
      "Een zachte reis door je lichaam. Leer je lichaam te observeren zonder oordeel of angst.",
    duurMinuten: 10,
    fase: "ontdekking",
    isGratis: true,
  },
  {
    id: 202,
    type: "meditatie",
    titel: "Veiligheid voelen in het lichaam",
    beschrijving:
      "Een meditatie gericht op het activeren van het parasympathische zenuwstelsel — rust en herstel.",
    duurMinuten: 12,
    fase: "ontdekking",
    isGratis: false,
  },
  {
    id: 203,
    type: "meditatie",
    titel: "De veilige plek",
    beschrijving:
      "Begeleid visualisatie naar een innerlijke plek van veiligheid en rust. Ideaal voor momenten van angst.",
    duurMinuten: 15,
    fase: "hertrainen",
    isGratis: false,
  },
  {
    id: 204,
    type: "meditatie",
    titel: "Compassie voor jezelf",
    beschrijving:
      "Loving-kindness meditatie: leer jezelf dezelfde vriendelijkheid te geven als je aan anderen geeft.",
    duurMinuten: 14,
    fase: "hertrainen",
    isGratis: false,
  },
  {
    id: 205,
    type: "meditatie",
    titel: "Emoties verwelkomen",
    beschrijving:
      "Leer emoties te ervaren als golven — ze komen, zijn er, en gaan weer. Geen strijd, alleen observatie.",
    duurMinuten: 11,
    fase: "verdieping",
    isGratis: false,
  },
  {
    id: 206,
    type: "meditatie",
    titel: "Dankbaarheid en verbinding",
    beschrijving:
      "Een meditatie over wat er wél goed gaat — een krachtig tegengif voor de pijn-focus van het brein.",
    duurMinuten: 8,
    fase: "verdieping",
    isGratis: false,
  },
];

export const somaticTrackingOefeningen: ContentItem[] = [
  {
    id: 301,
    type: "somatic_tracking",
    titel: "Introductie Somatic Tracking",
    beschrijving:
      "Leer de basishouding: nieuwsgierige observatie van pijn zonder angst. De kerntechniek van PRT.",
    duurMinuten: 8,
    fase: "ontdekking",
    isGratis: true,
  },
  {
    id: 302,
    type: "somatic_tracking",
    titel: "Tracking: rugpijn en spanning",
    beschrijving:
      "Begeleid somatic tracking voor rug- en nekgebied. Merk het verschil op wanneer je nieuwsgierig blijft.",
    duurMinuten: 12,
    fase: "ontdekking",
    isGratis: false,
  },
  {
    id: 303,
    type: "somatic_tracking",
    titel: "Van angst naar nieuwsgierigheid",
    beschrijving:
      "Oefening in het omzetten van de angst-reactie op pijn naar mild geïnteresseerde observatie.",
    duurMinuten: 10,
    fase: "hertrainen",
    isGratis: false,
  },
  {
    id: 304,
    type: "somatic_tracking",
    titel: "Veiligheidsberichten sturen",
    beschrijving:
      "Terwijl je de pijn observeert, oefen je bewust veiligheidsberichten naar je zenuwstelsel te sturen.",
    duurMinuten: 14,
    fase: "hertrainen",
    isGratis: false,
  },
  {
    id: 305,
    type: "somatic_tracking",
    titel: "Tracking tijdens bewegen",
    beschrijving:
      "Somatic tracking gecombineerd met lichte beweging — lopen, stretchen, normale dagelijkse activiteiten.",
    duurMinuten: 15,
    fase: "verdieping",
    isGratis: false,
  },
];

export const brainTrainingOefeningen: ContentItem[] = [
  {
    id: 401,
    type: "brain_training",
    titel: "Pijn herkaderen",
    beschrijving:
      "Leer je brein pijnsignalen opnieuw te interpreteren: niet als gevaar, maar als leugenaarssignalen.",
    duurMinuten: 8,
    fase: "ontdekking",
    isGratis: true,
  },
  {
    id: 402,
    type: "brain_training",
    titel: "Bewijs tellen",
    beschrijving:
      "Interactieve oefening: benoem vandaag 5 stukken bewijs dat jouw pijn TMS is, niet structureel.",
    duurMinuten: 6,
    fase: "ontdekking",
    isGratis: false,
  },
  {
    id: 403,
    type: "brain_training",
    titel: "De pijn uitdagen",
    beschrijving:
      "Doe iets wat je normaal vermijdt uit angst. Begin klein. Registreer wat er werkelijk gebeurt.",
    duurMinuten: 10,
    fase: "hertrainen",
    isGratis: false,
  },
  {
    id: 404,
    type: "brain_training",
    titel: "Visualisatie: pijnvrij leven",
    beschrijving:
      "Stel je voor hoe jouw leven eruitziet als je volledig hersteld bent. In detail. Dit herprogrammeert het brein.",
    duurMinuten: 12,
    fase: "hertrainen",
    isGratis: false,
  },
  {
    id: 405,
    type: "brain_training",
    titel: "Succes anchoren",
    beschrijving:
      "Gebruik momenten van verlichting als bewijspunten en verankert ze in je geheugen als neurale route.",
    duurMinuten: 9,
    fase: "verdieping",
    isGratis: false,
  },
];

export const flareupOefeningen: ContentItem[] = [
  {
    id: 501,
    type: "flareup",
    titel: "Somatic Tracking (crisis)",
    beschrijving: "5-minuten begeleide tracking specifiek voor een acute opvlamming.",
    duurMinuten: 5,
    isGratis: true,
  },
  {
    id: 502,
    type: "flareup",
    titel: "Veiligheidsherinnering",
    beschrijving: "Snelle herinnering: jouw lichaam is gezond. De pijn is onschuldig.",
    duurMinuten: 3,
    isGratis: true,
  },
  {
    id: 503,
    type: "flareup",
    titel: "Peptalk voor moeilijke momenten",
    beschrijving: "Motiverende audio: jij bent sterker dan de pijn. Dit gaat voorbij.",
    duurMinuten: 4,
    isGratis: true,
  },
  {
    id: 504,
    type: "flareup",
    titel: "5-4-3-2-1 Grounding",
    beschrijving: "Zintuiglijke grounding techniek om uit angstspiraal te komen.",
    duurMinuten: 4,
    isGratis: true,
  },
];

// ─── Programma Dagen (eerste 30) ──────────────────────────────────────────────

export type ProgrammaFase = "ontdekking" | "hertrainen" | "verdieping";

export interface ProgrammaDag {
  dag: number;
  fase: ProgrammaFase;
  titel: string;
  intro: string;
  educatieId?: number;
  oefeningId?: number;
  journaalPrompt: string;
  herinnering: number; // 1-12
}

export const programmaData: ProgrammaDag[] = [
  // ── Fase 1: Ontdekking (dag 1-30) ──
  {
    dag: 1, fase: "ontdekking", titel: "Welkom op je herstelpad",
    intro: "Vandaag begin je aan iets bijzonders. Je hebt de moed gevonden om een nieuwe weg te bewandelen. Laten we rustig beginnen.",
    educatieId: 1, oefeningId: 301,
    journaalPrompt: "Schrijf over hoe je je voelt nu je dit programma begint. Wat hoop je te vinden? Wat ben je bereid los te laten?",
    herinnering: 1,
  },
  {
    dag: 2, fase: "ontdekking", titel: "Leer je brein kennen",
    intro: "Jouw brein is niet je vijand — het probeert je te beschermen. Vandaag leer je hoe dat systeem werkt.",
    educatieId: 2, oefeningId: 201,
    journaalPrompt: "Beschrijf een moment waarop je pijn duidelijk slechter was bij stress. Wat gebeurde er om je heen?",
    herinnering: 2,
  },
  {
    dag: 3, fase: "ontdekking", titel: "Het bewijs is er al",
    intro: "Je hebt waarschijnlijk al meer bewijs voor TMS dan je denkt. Vandaag leren we het te zien.",
    educatieId: 3, oefeningId: 401,
    journaalPrompt: "Maak een lijst van alle dingen die jouw pijn niet kunnen verklaren. Hoe verhuist ze? Wanneer verdwijnt ze tijdelijk?",
    herinnering: 3,
  },
  {
    dag: 4, fase: "ontdekking", titel: "De angst doorbreken",
    intro: "Angst is de brandstof van chronische pijn. Vandaag begin je die vicieuze cirkel te begrijpen — en te doorbreken.",
    educatieId: 4, oefeningId: 301,
    journaalPrompt: "Schrijf over je angsten rondom je pijn. Wat ben je bang dat er zal gebeuren als je beweegt? Als je niet beter wordt?",
    herinnering: 4,
  },
  {
    dag: 5, fase: "ontdekking", titel: "Emoties en je lichaam",
    intro: "Wat we niet voelen, voelt ons lichaam. Vandaag onderzoeken we de verbinding tussen emoties en pijn.",
    educatieId: 5, oefeningId: 202,
    journaalPrompt: "Welke emoties slik jij regelmatig weg? Schrijf hierover zonder filter, voor minimaal 10 minuten.",
    herinnering: 5,
  },
  {
    dag: 6, fase: "ontdekking", titel: "Herken jezelf",
    intro: "De TMS-persoonlijkheid is geen zwakte — het zijn juist kwaliteiten die uit balans zijn geraakt.",
    educatieId: 6, oefeningId: 402,
    journaalPrompt: "Beschrijf wanneer jij je perfectionisme of people-pleasing het sterkst voelt. In welke relaties? In welke situaties?",
    herinnering: 6,
  },
  {
    dag: 7, fase: "ontdekking", titel: "Jouw persoonlijk bewijs",
    intro: "Einde van week 1. Vandaag bouw je jouw persoonlijke bewijslijst op — het fundament van jouw herstel.",
    educatieId: 7, oefeningId: 301,
    journaalPrompt: "Schrijf een brief aan je pijn. Zeg haar wat je nu weet. Zeg haar dat je haar doorziet.",
    herinnering: 7,
  },
  {
    dag: 8, fase: "ontdekking", titel: "Somatic Tracking leren",
    intro: "Vandaag leer je de kerntechniek van Pain Reprocessing Therapy. Dit wordt jouw meest waardevolle instrument.",
    educatieId: 8, oefeningId: 302,
    journaalPrompt: "Hoe was het om je pijn nieuwsgierig te observeren in plaats van er bang voor te zijn? Wat merkte je?",
    herinnering: 8,
  },
  {
    dag: 9, fase: "ontdekking", titel: "Schrijven als medicijn",
    intro: "JournalSpeak is niet dagboekschrijven — het is gerichte emotionele ontkoppeling. Vandaag de uitleg.",
    educatieId: 9,
    journaalPrompt: "Schrijf 20 minuten zonder stoppen over alles wat je irriteert, boos maakt, of verdrietig maakt. Niets is te klein.",
    herinnering: 9,
  },
  {
    dag: 10, fase: "ontdekking", titel: "Bewegen is veilig",
    intro: "Vandaag nemen we de grootste mythe van chronische pijn onder de loep: dat bewegen gevaarlijk is.",
    educatieId: 10, oefeningId: 403,
    journaalPrompt: "Welke activiteiten vermijd je nu vanwege pijn? Schrijf hoe je leven eruit zou zien als je ze weer deed.",
    herinnering: 10,
  },
  {
    dag: 11, fase: "ontdekking", titel: "Diep ademen",
    intro: "Het zenuwstelsel kalmeert via de adem. Vandaag oefenen we bewust ademen als tegenmiddel voor spanning.",
    oefeningId: 203,
    journaalPrompt: "Beschrijf een situatie van vroeger die je nog steeds bezighoudt. Schrijf erover zonder oordeel.",
    herinnering: 11,
  },
  {
    dag: 12, fase: "ontdekking", titel: "Patronen herkennen",
    intro: "Pijn heeft patronen. Door ze te herkennen verlies je de macht over je reactie erop.",
    oefeningId: 303,
    journaalPrompt: "Op welke tijdstippen of in welke situaties is jouw pijn het ergst? Wat zegt dit over je triggers?",
    herinnering: 12,
  },
  {
    dag: 13, fase: "ontdekking", titel: "Woede is oké",
    intro: "Woede is de meest onderdrukte emotie bij TMS-patiënten. Vandaag geven we haar ruimte.",
    oefeningId: 302,
    journaalPrompt: "Op wie of wat ben je eigenlijk boos? Schrijf alles op — ook wat 'niet mag'. Dit is privé.",
    herinnering: 1,
  },
  {
    dag: 14, fase: "ontdekking", titel: "Week 2 reflectie",
    intro: "Halverwege de eerste fase. Hoe gaat het echt? Vandaag nemen we de tijd voor dieper reflecteren.",
    oefeningId: 204,
    journaalPrompt: "Wat heeft de afgelopen twee weken je het meest geraakt of verrast? Wat weerstand je biedt?",
    herinnering: 2,
  },
  {
    dag: 15, fase: "ontdekking", titel: "De kritische stem",
    intro: "De innerlijke criticus is een van de grootste bronnen van onderdrukte spanning. Herken hem vandaag.",
    oefeningId: 404,
    journaalPrompt: "Schrijf een dialoog met je innerlijke criticus. Wat zegt hij? Wat zou je hem willen antwoorden?",
    herinnering: 3,
  },
  {
    dag: 16, fase: "ontdekking", titel: "Grenzen en pijn",
    intro: "Grenzen niet stellen kost energie — en die energie gaat ergens naartoe. Vandaag onderzoeken we dit.",
    oefeningId: 303,
    journaalPrompt: "Schrijf over een situatie waar je 'ja' zei maar 'nee' bedoelde. Hoe voelde dat?",
    herinnering: 4,
  },
  {
    dag: 17, fase: "ontdekking", titel: "Vergeven om te herstellen",
    intro: "Vergeven is niet voor de ander — het is voor jouw zenuwstelsel. Vandaag een zachte verkenning.",
    oefeningId: 205,
    journaalPrompt: "Is er iemand die je nog niet vergeven hebt? Schrijf een brief die je nooit hoeft te versturen.",
    herinnering: 5,
  },
  {
    dag: 18, fase: "ontdekking", titel: "Lichaam als bondgenoot",
    intro: "Jouw lichaam is niet je vijand. Vandaag leer je hem te zien als bondgenoot in je herstel.",
    oefeningId: 304,
    journaalPrompt: "Schrijf een brief aan je lichaam. Bedank het voor alles wat het voor je doet.",
    herinnering: 6,
  },
  {
    dag: 19, fase: "ontdekking", titel: "Perfectionisme loslaten",
    intro: "Perfectionisme is angst in vermomming. Vandaag oefenen we 'goed genoeg' te accepteren.",
    oefeningId: 402,
    journaalPrompt: "In welk gebied van je leven ben je het meest perfectionistisch? Wat kost je dat?",
    herinnering: 7,
  },
  {
    dag: 20, fase: "ontdekking", titel: "Kleine overwinningen",
    intro: "Herstel gaat niet lineair. Kleine stappen vooruit tellen. Vandaag vieren we bewust.",
    oefeningId: 405,
    journaalPrompt: "Schrijf over drie momenten deze week waarop je je goed voelde, hoe kort ook.",
    herinnering: 8,
  },
  {
    dag: 21, fase: "ontdekking", titel: "Drie weken in",
    intro: "Je bent drie weken op weg. Je brein begint te veranderen — ook al voel je dat nog niet altijd.",
    oefeningId: 305,
    journaalPrompt: "Vergelijk hoe je denkt over je pijn nu met drie weken geleden. Wat is anders?",
    herinnering: 9,
  },
  {
    dag: 22, fase: "ontdekking", titel: "Vriendelijkheid als medicijn",
    intro: "Zelfcompassie is bewezen effectiever dan zelfkritiek voor herstel. Vandaag oefenen we het echt.",
    oefeningId: 204,
    journaalPrompt: "Schrijf over jezelf zoals je over een goede vriend zou schrijven die dezelfde pijn heeft.",
    herinnering: 10,
  },
  {
    dag: 23, fase: "ontdekking", titel: "Hertrainen begint",
    intro: "Je hebt de basiskennis opgebouwd. Nu beginnen we de hertraining: actief nieuwe paden aanleggen.",
    oefeningId: 303,
    journaalPrompt: "Wat is één ding dat je morgen gaat doen wat je nu vermijdt? Hoe voelt die gedachte?",
    herinnering: 11,
  },
  {
    dag: 24, fase: "ontdekking", titel: "Succes visualiseren",
    intro: "Het brein maakt geen onderscheid tussen echte en levendige verbeelde ervaringen. Dit is krachtig.",
    oefeningId: 404,
    journaalPrompt: "Beschrijf in detail hoe jij over 6 maanden leeft. Wat doe je? Hoe beweeg je?",
    herinnering: 12,
  },
  {
    dag: 25, fase: "ontdekking", titel: "Sociale druk en pijn",
    intro: "Wat anderen van ons verwachten, draagt bij aan onze spanningslading. Vandaag onderzoeken we dit.",
    oefeningId: 302,
    journaalPrompt: "Welke verwachtingen van anderen leggen een last op je? Van wie verlang je goedkeuring?",
    herinnering: 1,
  },
  {
    dag: 26, fase: "ontdekking", titel: "Slaap en herstel",
    intro: "Slaap is wanneer het brein consolideert. Goede slaap versnelt TMS-herstel aanzienlijk.",
    oefeningId: 203,
    journaalPrompt: "Hoe slaapt u? Wat houdt u 's nachts wakker? Schrijf over uw gedachtepatroon voor het slapen.",
    herinnering: 2,
  },
  {
    dag: 27, fase: "ontdekking", titel: "Het verleden loslaten",
    intro: "Oude wonden laten sporen achter in het zenuwstelsel. Vandaag beginnen we die traces te erkennen.",
    oefeningId: 205,
    journaalPrompt: "Schrijf over een moeilijke periode uit je verleden die nog steeds pijn doet. Wat draag je mee?",
    herinnering: 3,
  },
  {
    dag: 28, fase: "ontdekking", titel: "Verbinding herstellen",
    intro: "TMS trekt ons terug in onszelf. Vandaag kijken we naar het herstel van verbinding — met anderen en jezelf.",
    oefeningId: 206,
    journaalPrompt: "Schrijf over een relatie die je energie geeft. En een die energie kost. Wat doe je daarmee?",
    herinnering: 4,
  },
  {
    dag: 29, fase: "ontdekking", titel: "Fase 1 afronden",
    intro: "Je hebt de ontdekkingsfase bijna voltooid. Morgen begin je aan hertrainen. Vandaag kijk je terug.",
    oefeningId: 405,
    journaalPrompt: "Wat is de belangrijkste inzicht uit de eerste maand? Schrijf een brief aan iemand die net begint.",
    herinnering: 5,
  },
  {
    dag: 30, fase: "ontdekking", titel: "30 dagen — mijlpaal",
    intro: "Dertig dagen! Je zenuwstelsel is al anders dan een maand geleden. Vanavond vier je dat bewust.",
    oefeningId: 405,
    journaalPrompt: "Schrijf 3 pagina's over wie jij bent los van je pijn. Wie ben jij echt?",
    herinnering: 6,
  },
];

// Hulpfuncties voor programma-data

export function getProgrammaDag(dag: number): ProgrammaDag | undefined {
  return programmaData.find((d) => d.dag === dag);
}

export function getProgrammaFaseLabel(fase: ProgrammaFase): string {
  return { ontdekking: "Ontdekking", hertrainen: "Hertrainen", verdieping: "Verdieping" }[fase];
}

export function getFaseVoorDag(dag: number): ProgrammaFase {
  if (dag <= 30) return "ontdekking";
  if (dag <= 60) return "hertrainen";
  return "verdieping";
}

export function getContentById(id: number): ContentItem | undefined {
  return [
    ...educatieLessen.map((l) => ({ ...l, type: "educatie" as ContentType })),
    ...meditaties,
    ...somaticTrackingOefeningen,
    ...brainTrainingOefeningen,
    ...flareupOefeningen,
  ].find((c) => c.id === id);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getDagHerinnering(dag: number): DagelijkseHerinnering {
  const index = (dag - 1) % dagelijkseHerinneringen.length;
  return dagelijkseHerinneringen[index];
}
