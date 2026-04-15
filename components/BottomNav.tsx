"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Compass,
  BarChart2,
  UserCircle,
} from "lucide-react";

const navItems = [
  { href: "/app", label: "Vandaag", icon: LayoutDashboard, exact: true },
  { href: "/app/programma", label: "Programma", icon: Calendar, exact: false },
  { href: "/app/ontdek", label: "Ontdek", icon: Compass, exact: false },
  { href: "/app/voortgang", label: "Voortgang", icon: BarChart2, exact: false },
  { href: "/app/profiel", label: "Profiel", icon: UserCircle, exact: false },
];

export function BottomNav() {
  const pathname = usePathname();

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E8E2D8] h-16 safe-area-bottom">
      <div className="flex items-center justify-around h-full max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex flex-col items-center gap-0.5 px-3 py-2 rounded-[10px] transition-colors min-w-0",
                active
                  ? "text-[#1B7A6E]"
                  : "text-[#6B6560] hover:text-[#2D2A26]",
              ].join(" ")}
              aria-current={active ? "page" : undefined}
            >
              <Icon
                className={`w-5 h-5 ${active ? "stroke-[2.2px]" : "stroke-[1.6px]"}`}
              />
              <span className={`text-[10px] font-body truncate ${active ? "font-semibold" : ""}`}>
                {item.label}
              </span>
              {active && (
                <div className="absolute bottom-0 w-1 h-1 rounded-full bg-[#1B7A6E]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
