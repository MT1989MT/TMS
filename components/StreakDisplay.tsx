import { Flame, TrendingUp } from "lucide-react";

interface Props {
  huidigeStreak: number;
  langsteStreak: number;
  className?: string;
}

export function StreakDisplay({ huidigeStreak, langsteStreak, className = "" }: Props) {
  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      <div className="bg-white rounded-[14px] border-2 border-[#E8845C]/30 p-4 text-center">
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <Flame className="w-5 h-5 text-[#E8845C]" />
          <span className="text-3xl font-heading text-[#2D2A26]">{huidigeStreak}</span>
        </div>
        <p className="text-xs text-[#6B6560] font-body">
          {huidigeStreak === 1 ? "dag op rij" : "dagen op rij"}
        </p>
        <p className="text-[10px] text-[#E8845C] font-semibold font-body mt-1">Huidige streak</p>
      </div>

      <div className="bg-white rounded-[14px] border-2 border-[#C4A962]/30 p-4 text-center">
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <TrendingUp className="w-5 h-5 text-[#C4A962]" />
          <span className="text-3xl font-heading text-[#2D2A26]">{langsteStreak}</span>
        </div>
        <p className="text-xs text-[#6B6560] font-body">
          {langsteStreak === 1 ? "dag record" : "dagen record"}
        </p>
        <p className="text-[10px] text-[#8a7240] font-semibold font-body mt-1">Beste streak</p>
      </div>
    </div>
  );
}
