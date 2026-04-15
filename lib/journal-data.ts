// ─── 90 JournalSpeak Prompts ──────────────────────────────────────────────────

export interface JournaalPrompt {
  dag: number;
  tekst: string;
  categorie: "woede" | "angst" | "relaties" | "werk" | "jeugd" | "verdriet" | "perfectionisme";
  moeilijkheid: "beginner" | "gemiddeld" | "diep";
}

export const journaalPrompts: JournaalPrompt[] = [
  // ── Woede (dag 1-15) ──
  { dag: 1,  tekst: "Schrijf over alles wat je irriteert, boos maakt of frustreert. Niets is te klein.", categorie: "woede", moeilijkheid: "beginner" },
  { dag: 2,  tekst: "Aan wie of wat wil je vandaag iets zeggen wat je normaal inslikt?", categorie: "woede", moeilijkheid: "beginner" },
  { dag: 3,  tekst: "Schrijf over een situatie waar je je mond hield terwijl je eigenlijk woedend was.", categorie: "woede", moeilijkheid: "gemiddeld" },
  { dag: 4,  tekst: "Op wie ben je echt boos? Schrijf alles op — ook wat 'niet mag'.", categorie: "woede", moeilijkheid: "gemiddeld" },
  { dag: 5,  tekst: "Wanneer voelde je je de laatste tijd klein of niet serieus genomen? Schrijf je woede hierover.", categorie: "woede", moeilijkheid: "gemiddeld" },
  { dag: 6,  tekst: "Schrijf een brief vol woede aan de persoon die je het meest heeft teleurgesteld.", categorie: "woede", moeilijkheid: "diep" },
  { dag: 7,  tekst: "Wat maakt je boos aan jezelf? Schrijf het op zonder oordeel.", categorie: "woede", moeilijkheid: "gemiddeld" },
  { dag: 8,  tekst: "Welke regels en verwachtingen van anderen maken je het meest gefrustreerd?", categorie: "woede", moeilijkheid: "gemiddeld" },
  { dag: 9,  tekst: "Schrijf over een moment waarop je onrechtvaardig behandeld werd maar er niets van zei.", categorie: "woede", moeilijkheid: "diep" },
  { dag: 10, tekst: "Wat wil je aan het leven zeggen? Scheld erop als je wilt.", categorie: "woede", moeilijkheid: "beginner" },
  { dag: 11, tekst: "Schrijf over frustraties rondom jouw pijn — de behandelingen, de artsen, het onbegrip.", categorie: "woede", moeilijkheid: "gemiddeld" },
  { dag: 12, tekst: "Wat gun jij jezelf maar geef je jezelf nooit? Schrijf de woede over dit gat.", categorie: "woede", moeilijkheid: "diep" },
  { dag: 13, tekst: "Schrijf over iemand die jou ooit veel pijn heeft gedaan. Zeg alles wat je hem/haar wil zeggen.", categorie: "woede", moeilijkheid: "diep" },
  { dag: 14, tekst: "Wat maakt je boos aan de manier waarop jij bent grootgebracht?", categorie: "woede", moeilijkheid: "diep" },
  { dag: 15, tekst: "Schrijf over je woede ten aanzien van je grenzen die anderen niet respecteren.", categorie: "woede", moeilijkheid: "gemiddeld" },

  // ── Angst (dag 16-30) ──
  { dag: 16, tekst: "Waar ben je het bangst voor? Schrijf het allemaal op, hoe irrationeel het ook klinkt.", categorie: "angst", moeilijkheid: "beginner" },
  { dag: 17, tekst: "Schrijf over je diepste angst als het gaat om jouw pijn en herstel.", categorie: "angst", moeilijkheid: "gemiddeld" },
  { dag: 18, tekst: "Wat zou er gebeuren als mensen je echt zagen — met al je angsten en onzekerheden?", categorie: "angst", moeilijkheid: "diep" },
  { dag: 19, tekst: "Schrijf over je angst om te falen. In welke situaties is die het sterkst?", categorie: "angst", moeilijkheid: "gemiddeld" },
  { dag: 20, tekst: "Wat ben je bang dat je mist of zal missen in het leven?", categorie: "angst", moeilijkheid: "gemiddeld" },
  { dag: 21, tekst: "Schrijf over je angst voor afwijzing. Wanneer voelt die angst het grootst?", categorie: "angst", moeilijkheid: "diep" },
  { dag: 22, tekst: "Wat is je angst bij het volledig herstellen — wat zou er veranderen?", categorie: "angst", moeilijkheid: "diep" },
  { dag: 23, tekst: "Schrijf over je zorgen van de afgelopen week. Alles eruit.", categorie: "angst", moeilijkheid: "beginner" },
  { dag: 24, tekst: "Waar draag je constant spanning over mee, ook al zeg je dat het wel meevalt?", categorie: "angst", moeilijkheid: "gemiddeld" },
  { dag: 25, tekst: "Wat zou je doen als je niet bang was? Schrijf over de versie van jezelf zonder angst.", categorie: "angst", moeilijkheid: "gemiddeld" },
  { dag: 26, tekst: "Schrijf over je angst voor de toekomst — wat zie je aankomen en wat vreet je op?", categorie: "angst", moeilijkheid: "diep" },
  { dag: 27, tekst: "Wanneer voel je je het meest kwetsbaar? Schrijf daarover.", categorie: "angst", moeilijkheid: "diep" },
  { dag: 28, tekst: "Schrijf over je angst voor pijn zelf — de catastroferende gedachten.", categorie: "angst", moeilijkheid: "gemiddeld" },
  { dag: 29, tekst: "Wat is de angst die je het langst met je meedraagt? Geef haar ruimte.", categorie: "angst", moeilijkheid: "diep" },
  { dag: 30, tekst: "Schrijf een brief aan je angst. Zeg haar wat je van haar wil.", categorie: "angst", moeilijkheid: "gemiddeld" },

  // ── Relaties (dag 31-45) ──
  { dag: 31, tekst: "Schrijf over een relatie die je energie kost. Wat wil je daarin veranderen?", categorie: "relaties", moeilijkheid: "beginner" },
  { dag: 32, tekst: "In welke relatie(s) stel jij jezelf altijd op de tweede plaats?", categorie: "relaties", moeilijkheid: "gemiddeld" },
  { dag: 33, tekst: "Schrijf over iemand die nooit aan jouw verwachtingen voldoet — en jouw frustratie daarmee.", categorie: "relaties", moeilijkheid: "gemiddeld" },
  { dag: 34, tekst: "Hoe zou jouw leven eruitzien als je niet steeds voor anderen zorgde ten koste van jezelf?", categorie: "relaties", moeilijkheid: "diep" },
  { dag: 35, tekst: "Schrijf over een conflict dat je vermijdt. Wat wil je eigenlijk zeggen?", categorie: "relaties", moeilijkheid: "gemiddeld" },
  { dag: 36, tekst: "Wanneer voel je je het meest onbegrepen? Door wie? Schrijf erover.", categorie: "relaties", moeilijkheid: "diep" },
  { dag: 37, tekst: "Schrijf over iemand die je teleurgesteld hebt en de schuldgevoelens die je nog draagt.", categorie: "relaties", moeilijkheid: "diep" },
  { dag: 38, tekst: "Wat verwacht jij van anderen wat ze nooit geven? Schrijf je verdriet hierover.", categorie: "relaties", moeilijkheid: "gemiddeld" },
  { dag: 39, tekst: "Schrijf over een relatie die je het gevoel geeft dat je niet goed genoeg bent.", categorie: "relaties", moeilijkheid: "diep" },
  { dag: 40, tekst: "Hoe vaak zeg jij 'ja' terwijl je 'nee' bedoelt? Schrijf hierover zonder filter.", categorie: "relaties", moeilijkheid: "beginner" },
  { dag: 41, tekst: "Schrijf over de onuitgesproken verwachtingen in jouw belangrijkste relaties.", categorie: "relaties", moeilijkheid: "gemiddeld" },
  { dag: 42, tekst: "Aan wie heb jij nog nooit vergiffenis gegeven, ook al zeg je van wel?", categorie: "relaties", moeilijkheid: "diep" },
  { dag: 43, tekst: "Schrijf over een relatie uit het verleden die je nog steeds pijn doet.", categorie: "relaties", moeilijkheid: "diep" },
  { dag: 44, tekst: "Wat is jouw rol in de relaties die je het meest uitputten?", categorie: "relaties", moeilijkheid: "gemiddeld" },
  { dag: 45, tekst: "Schrijf over de liefde die je wil maar nooit hebt gekregen.", categorie: "relaties", moeilijkheid: "diep" },

  // ── Werk (dag 46-55) ──
  { dag: 46, tekst: "Schrijf over je frustraties op het werk of met jouw werkzaamheden.", categorie: "werk", moeilijkheid: "beginner" },
  { dag: 47, tekst: "Welke verwachtingen (van jezelf of anderen) op het werk vreten je op?", categorie: "werk", moeilijkheid: "gemiddeld" },
  { dag: 48, tekst: "Schrijf over een situatie op het werk waar je je onrechtvaardig behandeld voelde.", categorie: "werk", moeilijkheid: "gemiddeld" },
  { dag: 49, tekst: "Wat zou je doen als werk en inkomen geen rol speelden? Schrijf erover.", categorie: "werk", moeilijkheid: "gemiddeld" },
  { dag: 50, tekst: "Schrijf over de druk die je ervaart rondom presteren en productiviteit.", categorie: "werk", moeilijkheid: "diep" },
  { dag: 51, tekst: "Welke ambitie of droom heb je opgegeven? Schrijf over het verdriet hierover.", categorie: "werk", moeilijkheid: "diep" },
  { dag: 52, tekst: "Schrijf over een collega of leidinggevende die je frustreert of boos maakt.", categorie: "werk", moeilijkheid: "gemiddeld" },
  { dag: 53, tekst: "Hoe lang doe jij al meer dan goed voor jou is? Schrijf je moeheid hierover.", categorie: "werk", moeilijkheid: "diep" },
  { dag: 54, tekst: "Schrijf over de angst om niet goed genoeg te zijn in je werk of rol.", categorie: "werk", moeilijkheid: "diep" },
  { dag: 55, tekst: "Wat zou je willen zeggen tegen iedereen die iets van jou verwacht?", categorie: "werk", moeilijkheid: "gemiddeld" },

  // ── Jeugd (dag 56-65) ──
  { dag: 56, tekst: "Schrijf over een moeilijk moment uit je jeugd dat je nog steeds met je meedraagt.", categorie: "jeugd", moeilijkheid: "diep" },
  { dag: 57, tekst: "Welke boodschappen kreeg je als kind mee over wie je moest zijn?", categorie: "jeugd", moeilijkheid: "gemiddeld" },
  { dag: 58, tekst: "Schrijf over iemand uit je jeugd die jou pijn heeft gedaan.", categorie: "jeugd", moeilijkheid: "diep" },
  { dag: 59, tekst: "Wat kreeg jij als kind niet wat je nodig had? Schrijf over dat gemis.", categorie: "jeugd", moeilijkheid: "diep" },
  { dag: 60, tekst: "Schrijf een brief aan het kind dat jij was. Zeg wat dat kind nodig had om te horen.", categorie: "jeugd", moeilijkheid: "diep" },
  { dag: 61, tekst: "Wanneer leerde jij dat jij je gevoelens moest inslikken of verbergen?", categorie: "jeugd", moeilijkheid: "diep" },
  { dag: 62, tekst: "Schrijf over een verwachting uit je jeugd die jij nog steeds met je meedraagt.", categorie: "jeugd", moeilijkheid: "gemiddeld" },
  { dag: 63, tekst: "Hoe heeft jouw jeugd jouw manier van zorgen voor anderen gevormd?", categorie: "jeugd", moeilijkheid: "diep" },
  { dag: 64, tekst: "Schrijf over een ouder, verzorger of familielid en jouw onverwerkte gevoelens.", categorie: "jeugd", moeilijkheid: "diep" },
  { dag: 65, tekst: "Wat deed jij als kind om goedkeuring te krijgen? Doe je dat nu nog steeds?", categorie: "jeugd", moeilijkheid: "diep" },

  // ── Verdriet (dag 66-75) ──
  { dag: 66, tekst: "Schrijf over een verlies dat je nooit goed hebt kunnen verwerken.", categorie: "verdriet", moeilijkheid: "diep" },
  { dag: 67, tekst: "Waar rouw jij om? Het hoeft geen overlijden te zijn — ook gemiste kansen, relaties.", categorie: "verdriet", moeilijkheid: "gemiddeld" },
  { dag: 68, tekst: "Schrijf over het verdriet van jouw pijn — alles wat je niet meer kunt, wat je hebt gemist.", categorie: "verdriet", moeilijkheid: "gemiddeld" },
  { dag: 69, tekst: "Wanneer heb jij voor het laatst echt gehuild? Schrijf over wat erachter zat.", categorie: "verdriet", moeilijkheid: "gemiddeld" },
  { dag: 70, tekst: "Schrijf over een droom of toekomst die je hebt moeten loslaten.", categorie: "verdriet", moeilijkheid: "diep" },
  { dag: 71, tekst: "Welk verdriet draag jij al lang met je mee maar nooit toelaat?", categorie: "verdriet", moeilijkheid: "diep" },
  { dag: 72, tekst: "Schrijf over iemand die je mist — levend of dood.", categorie: "verdriet", moeilijkheid: "diep" },
  { dag: 73, tekst: "Wat is het verdrietigste dat je ooit hebt meegemaakt? Geef het ruimte op papier.", categorie: "verdriet", moeilijkheid: "diep" },
  { dag: 74, tekst: "Schrijf over je verdriet rondom wat je leven 'had moeten zijn'.", categorie: "verdriet", moeilijkheid: "diep" },
  { dag: 75, tekst: "Wat zou je willen dat iemand wist over jouw pijn en verdriet?", categorie: "verdriet", moeilijkheid: "gemiddeld" },

  // ── Perfectionisme (dag 76-90) ──
  { dag: 76, tekst: "Schrijf over hoe jouw perfectionisme jouw leven beheerst. In welke gebieden?", categorie: "perfectionisme", moeilijkheid: "beginner" },
  { dag: 77, tekst: "Wat is het ergste dat kan gebeuren als jij iets niet perfect doet?", categorie: "perfectionisme", moeilijkheid: "gemiddeld" },
  { dag: 78, tekst: "Schrijf over de uitputting van altijd de best mogelijke versie van jezelf te moeten zijn.", categorie: "perfectionisme", moeilijkheid: "diep" },
  { dag: 79, tekst: "Voor wie doe jij het eigenlijk? Wie beoordeelt jou in jouw hoofd?", categorie: "perfectionisme", moeilijkheid: "diep" },
  { dag: 80, tekst: "Schrijf over een moment dat je jezelf genoeg had mogen vinden maar dat niet deed.", categorie: "perfectionisme", moeilijkheid: "gemiddeld" },
  { dag: 81, tekst: "Hoe zou jouw leven eruitzien als je 'goed genoeg' accepteerde als standaard?", categorie: "perfectionisme", moeilijkheid: "gemiddeld" },
  { dag: 82, tekst: "Schrijf over je innerlijke criticus. Wat zegt hij/zij? Vanwaar is die stem?", categorie: "perfectionisme", moeilijkheid: "diep" },
  { dag: 83, tekst: "Wanneer ben jij het meest kritisch op jezelf? Schrijf die kritiek op.", categorie: "perfectionisme", moeilijkheid: "gemiddeld" },
  { dag: 84, tekst: "Schrijf over schaamte. Waar schaam jij je voor?", categorie: "perfectionisme", moeilijkheid: "diep" },
  { dag: 85, tekst: "Wat zou je anders doen als je niet bang was om beoordeeld te worden?", categorie: "perfectionisme", moeilijkheid: "gemiddeld" },
  { dag: 86, tekst: "Schrijf een brief van jouw toekomstige, herstelde zelf naar het jij van nu.", categorie: "perfectionisme", moeilijkheid: "diep" },
  { dag: 87, tekst: "Hoe heeft perfectionisme jou beschermd? Waar beschermde het je tegen?", categorie: "perfectionisme", moeilijkheid: "diep" },
  { dag: 88, tekst: "Schrijf over wat jij nodig hebt om jezelf volledig te accepteren.", categorie: "perfectionisme", moeilijkheid: "diep" },
  { dag: 89, tekst: "Wat is de versie van jezelf die je wilt zijn? Schrijf haar in detail.", categorie: "perfectionisme", moeilijkheid: "gemiddeld" },
  { dag: 90, tekst: "Jij hebt 90 dagen gewerkt aan jouw herstel. Schrijf een brief aan jezelf over deze reis.", categorie: "perfectionisme", moeilijkheid: "diep" },
];

export function getPromptVoorDag(dag: number): JournaalPrompt {
  return journaalPrompts[Math.min(dag, journaalPrompts.length) - 1];
}

export function getWillekeurigePrompt(categorie?: JournaalPrompt["categorie"]): JournaalPrompt {
  const bron = categorie
    ? journaalPrompts.filter((p) => p.categorie === categorie)
    : journaalPrompts;
  return bron[Math.floor(Math.random() * bron.length)];
}

// ─── Mijlpalen ────────────────────────────────────────────────────────────────

export interface Mijlpaal {
  id: string;
  titel: string;
  beschrijving: string;
  icoon: string;
  type: "streaks" | "oefeningen" | "journaal" | "programma" | "speciaal";
  drempel: number; // streak-dagen, aantal oefeningen, etc.
}

export const mijlpalen: Mijlpaal[] = [
  // Programma-mijlpalen
  { id: "dag1",     titel: "Eerste stap",          beschrijving: "Dag 1 van het programma voltooid",    icoon: "🌱", type: "programma",   drempel: 1  },
  { id: "dag7",     titel: "Eerste week",           beschrijving: "Een volledige week voltooid",         icoon: "🌿", type: "programma",   drempel: 7  },
  { id: "dag14",    titel: "Twee weken",            beschrijving: "Twee weken op het herstelpad",        icoon: "🌳", type: "programma",   drempel: 14 },
  { id: "dag30",    titel: "Eerste maand",          beschrijving: "30 dagen programma voltooid!",        icoon: "🏆", type: "programma",   drempel: 30 },
  { id: "dag60",    titel: "Twee maanden",          beschrijving: "60 dagen — meer dan halverwege!",     icoon: "🌟", type: "programma",   drempel: 60 },
  { id: "dag90",    titel: "Volledig programma",    beschrijving: "Het volledige 90-dagenprogramma!",    icoon: "🎉", type: "programma",   drempel: 90 },

  // Streak-mijlpalen
  { id: "streak3",  titel: "3 Dagen op rij",        beschrijving: "Drie opeenvolgende actieve dagen",   icoon: "🔥", type: "streaks",     drempel: 3  },
  { id: "streak7",  titel: "Een week zonder pauze", beschrijving: "7 dagen aaneengesloten",             icoon: "🔥", type: "streaks",     drempel: 7  },
  { id: "streak14", titel: "Twee weken streak",     beschrijving: "14 dagen aaneengesloten",            icoon: "🔥", type: "streaks",     drempel: 14 },
  { id: "streak30", titel: "Maandstreak",           beschrijving: "30 dagen op rij — geweldig!",        icoon: "🔥", type: "streaks",     drempel: 30 },

  // JournalSpeak-mijlpalen
  { id: "journal1",  titel: "Eerste journal",      beschrijving: "Jouw eerste JournalSpeak sessie",     icoon: "✍️", type: "journaal",   drempel: 1  },
  { id: "journal5",  titel: "5 Schrijfsessies",    beschrijving: "Vijf JournalSpeak sessies voltooid",  icoon: "📓", type: "journaal",   drempel: 5  },
  { id: "journal20", titel: "20 Schrijfsessies",   beschrijving: "Twintig sessies — schrijver!",        icoon: "📚", type: "journaal",   drempel: 20 },

  // Oefeningen-mijlpalen
  { id: "oefen10",  titel: "10 Oefeningen",        beschrijving: "Tien oefeningen voltooid",            icoon: "💪", type: "oefeningen", drempel: 10 },
  { id: "oefen25",  titel: "25 Oefeningen",        beschrijving: "Vijfentwintig oefeningen — indrukwekkend!", icoon: "🏅", type: "oefeningen", drempel: 25 },
  { id: "oefen50",  titel: "50 Oefeningen",        beschrijving: "50 oefeningen — een ware atleet!",   icoon: "🥇", type: "oefeningen", drempel: 50 },
];

export function getBehaaldeMijlpalen(stats: {
  huidigeDag: number;
  huidigeStreak: number;
  totaalOefeningen: number;
  totaalJournaal: number;
}): Mijlpaal[] {
  return mijlpalen.filter((m) => {
    switch (m.type) {
      case "programma":   return stats.huidigeDag   >= m.drempel;
      case "streaks":     return stats.huidigeStreak >= m.drempel;
      case "oefeningen":  return stats.totaalOefeningen >= m.drempel;
      case "journaal":    return stats.totaalJournaal >= m.drempel;
      default:            return false;
    }
  });
}
