import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BreinVrij — Herstel van chronische pijn",
  description:
    "Een 90-dagen herstelprogramma voor mensen met chronische pijn veroorzaakt door TMS. Gebaseerd op de wetenschap van Dr. John Sarno, Pain Reprocessing Therapy en JournalSpeak.",
  keywords: ["TMS", "chronische pijn", "herstel", "Dr. Sarno", "Pain Reprocessing Therapy"],
  openGraph: {
    title: "BreinVrij — Herstel van chronische pijn",
    description: "Jouw pijn is echt. En er is een weg naar herstel.",
    type: "website",
    locale: "nl_NL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${dmSans.variable} ${dmSerifDisplay.variable}`}>
      <body className="antialiased" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
