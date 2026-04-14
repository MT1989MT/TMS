export interface ZelftestVraag {
  id: number;
  vraag: string;
  antwoorden: {
    tekst: string;
    score: number;
  }[];
}

export const zelftestVragen: ZelftestVraag[] = [
  {
    id: 1,
    vraag: "Hebben artsen geen duidelijke structurele oorzaak voor je pijn kunnen vinden?",
    antwoorden: [
      { tekst: "Ja, artsen vinden niets concreets", score: 4 },
      { tekst: "Deels — er is iets gevonden, maar het verklaart de pijn niet volledig", score: 2 },
      { tekst: "Nee, er is een duidelijke structurele oorzaak", score: 0 },
    ],
  },
  {
    id: 2,
    vraag: "Verhuist je pijn weleens naar andere plekken in je lichaam?",
    antwoorden: [
      { tekst: "Ja, mijn pijn verplaatst zich regelmatig", score: 4 },
      { tekst: "Soms — af en toe op een andere plek", score: 2 },
      { tekst: "Nee, de pijn zit altijd op dezelfde plek", score: 0 },
    ],
  },
  {
    id: 3,
    vraag: "Begon je pijn tijdens of kort na een stressvolle periode in je leven?",
    antwoorden: [
      { tekst: "Ja, er was duidelijk een stressvolle periode", score: 4 },
      { tekst: "Weet ik niet zeker", score: 1 },
      { tekst: "Nee, er was geen stressvolle periode", score: 0 },
    ],
  },
  {
    id: 4,
    vraag: "Heb je een voorgeschiedenis van andere stress-gerelateerde klachten? (bijv. hoofdpijn, maagklachten, PDS, eczeem, vermoeidheid)",
    antwoorden: [
      { tekst: "Ja, meerdere van dit soort klachten", score: 4 },
      { tekst: "Eén zo'n klacht", score: 2 },
      { tekst: "Nee, geen van deze klachten", score: 0 },
    ],
  },
  {
    id: 5,
    vraag: "Zou je jezelf omschrijven als perfectionistisch, plichtsgetrouw of iemand die anderen altijd tevreden wil stellen?",
    antwoorden: [
      { tekst: "Sterk — dit past precies bij mij", score: 4 },
      { tekst: "Enigszins — gedeeltelijk herkenbaar", score: 2 },
      { tekst: "Nee, dit past niet bij mij", score: 0 },
    ],
  },
  {
    id: 6,
    vraag: "Varieert je pijn sterk van dag tot dag, zonder dat daar een duidelijke fysieke reden voor is?",
    antwoorden: [
      { tekst: "Ja, er is grote dagelijkse variatie", score: 4 },
      { tekst: "Soms — er is enige variatie", score: 2 },
      { tekst: "Nee, de pijn is vrij constant", score: 0 },
    ],
  },
  {
    id: 7,
    vraag: "Wordt je pijn erger bij stress, conflicten of emotioneel belastende situaties?",
    antwoorden: [
      { tekst: "Ja, duidelijk verband met stress en emoties", score: 4 },
      { tekst: "Soms — niet altijd duidelijk", score: 2 },
      { tekst: "Nee, geen verband met stress", score: 0 },
    ],
  },
  {
    id: 8,
    vraag: "Heb je al meerdere behandelingen geprobeerd (fysiotherapie, chiropractie, medicijnen, etc.) zonder blijvend resultaat?",
    antwoorden: [
      { tekst: "Ja, 3 of meer behandelingen zonder blijvend resultaat", score: 4 },
      { tekst: "1 of 2 behandelingen geprobeerd", score: 2 },
      { tekst: "Nee, nog niet veel geprobeerd", score: 0 },
    ],
  },
  {
    id: 9,
    vraag: "Ervaar je pijn op meerdere plekken tegelijk, of op plekken die medisch gezien niet logisch samenhangen?",
    antwoorden: [
      { tekst: "Ja, pijn op meerdere losse plekken", score: 4 },
      { tekst: "Soms — af en toe op meerdere plekken", score: 2 },
      { tekst: "Nee, pijn is beperkt tot één logisch gebied", score: 0 },
    ],
  },
  {
    id: 10,
    vraag: "Ben je bang dat bewegen of bepaalde activiteiten je pijn erger maakt of je lichaam beschadigt?",
    antwoorden: [
      { tekst: "Ja, ik vermijd veel activiteiten uit angst", score: 4 },
      { tekst: "Enigszins — ik pas me aan maar vermijd niet alles", score: 2 },
      { tekst: "Nee, ik beweeg gewoon", score: 0 },
    ],
  },
  {
    id: 11,
    vraag: "Heb je weleens periodes gehad waarin de pijn (bijna) helemaal weg was, om dan later weer terug te komen?",
    antwoorden: [
      { tekst: "Ja, de pijn komt en gaat", score: 4 },
      { tekst: "Soms — korte periodes van verlichting", score: 2 },
      { tekst: "Nee, de pijn is altijd aanwezig", score: 0 },
    ],
  },
  {
    id: 12,
    vraag: "Had je als kind of jongere te maken met moeilijke situaties, hoge verwachtingen of emotioneel zware ervaringen?",
    antwoorden: [
      { tekst: "Ja, duidelijk herkenbaar", score: 4 },
      { tekst: "Deels — sommige dingen herken ik", score: 2 },
      { tekst: "Nee, mijn jeugd was rustig", score: 0 },
    ],
  },
];

export function berekenScore(antwoorden: Record<number, number>): number {
  return Object.values(antwoorden).reduce((sum, score) => sum + score, 0);
}

export function getResultaat(score: number): {
  titel: string;
  beschrijving: string;
  kleur: string;
  kans: string;
  advies: string;
} {
  if (score <= 12) {
    return {
      titel: "Lage waarschijnlijkheid",
      kans: "Lage kans op TMS",
      kleur: "text-blue-700",
      beschrijving:
        "Op basis van jouw antwoorden lijkt TMS minder waarschijnlijk als hoofdoorzaak van jouw pijn. Dat betekent niet dat er niets aan de hand is — pijn is altijd serieus.",
      advies:
        "We raden je aan om eerst een arts te raadplegen om andere oorzaken goed te laten onderzoeken. Als je toch nieuwsgierig bent naar TMS, kun je onze gratis educatielessen bekijken.",
    };
  } else if (score <= 24) {
    return {
      titel: "Matige waarschijnlijkheid",
      kans: "Matige kans op TMS",
      kleur: "text-amber-700",
      beschrijving:
        "TMS speelt mogelijk een rol bij jouw pijn. Jouw antwoorden laten een gemengd beeld zien — er zijn zowel signalen die op TMS wijzen als factoren die om nader onderzoek vragen.",
      advies:
        "Het is verstandig om ook een arts te raadplegen. Tegelijkertijd kan ons programma je helpen begrijpen hoe stress en emoties pijn kunnen beïnvloeden.",
    };
  } else if (score <= 36) {
    return {
      titel: "Hoge waarschijnlijkheid",
      kans: "Hoge kans op TMS",
      kleur: "text-[#1B7A6E]",
      beschrijving:
        "Jouw antwoorden passen sterk bij het TMS-profiel. Veel mensen met jouw profiel hebben grote verlichting gevonden door het TMS-herstelproces.",
      advies:
        "We raden je aan om met ons 90-dagenprogramma te beginnen. Zorg er wel voor dat je eerst ernstige aandoeningen hebt laten uitsluiten door een arts.",
    };
  } else {
    return {
      titel: "Zeer hoge waarschijnlijkheid",
      kans: "Klassiek TMS-profiel",
      kleur: "text-[#1B7A6E]",
      beschrijving:
        "Jouw antwoorden passen vrijwel perfect bij een klassiek TMS-profiel. Dit is goed nieuws: TMS is een behandelbare aandoening en veel mensen herstellen volledig.",
      advies:
        "Begin vandaag nog met ons 90-dagenprogramma. Jij hebt alle kenmerken die samengaan met een succesvol herstel. Je pijn is echt — en je lichaam is in staat te herstellen.",
    };
  }
}
