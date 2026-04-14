export function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs text-[#6B6560] font-body leading-relaxed ${className}`}>
      <strong>Medische disclaimer:</strong> Dit programma vervangt geen medisch advies. Raadpleeg
      altijd een arts om ernstige aandoeningen uit te sluiten. TMS-herstel is een aanvulling op,
      niet een vervanging van professionele medische zorg.
    </p>
  );
}
