"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  MessageSquareText,
  Link2,
  Settings,
  X,
} from "lucide-react";
import { Wordmark } from "@/components/brand/wordmark";
import { DEMO_RESTAURANT } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Agenda", href: "/dashboard/agenda", icon: CalendarDays },
  { label: "Réservations", href: "/dashboard/reservations", icon: ClipboardList },
  { label: "Rappels SMS", href: "/dashboard/sms", icon: MessageSquareText },
  { label: "Ma page client", href: "/dashboard/page-client", icon: Link2 },
  { label: "Paramètres", href: "/dashboard/parametres", icon: Settings },
];

function NavContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pt-5">
        <Wordmark />
        {/* Bloc info restaurant */}
        <div className="mt-5 rounded-2xl border border-hair bg-creme/60 p-3">
          <p className="text-sm font-bold tracking-tight text-noir">
            {DEMO_RESTAURANT.name}
          </p>
          <span className="mt-1 inline-flex items-center rounded-full bg-jaune-vif px-2 py-0.5 text-[11px] font-bold text-noir">
            {DEMO_RESTAURANT.plan}
          </span>
        </div>
      </div>

      <nav className="mt-6 flex-1 space-y-1 px-3" aria-label="Navigation espace restaurateur">
        {NAV.map((item) => {
          const active = item.href === pathname;
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl border-l-[3px] px-3 py-2.5 text-sm transition-colors",
                active
                  ? "border-jaune-vif bg-jaune-vif/15 font-medium text-noir"
                  : "border-transparent text-gris-fonce hover:bg-noir/[0.04] hover:text-noir",
              )}
            >
              <item.icon className="h-[18px] w-[18px]" strokeWidth={2} />
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="px-5 py-4">
        <p className="text-[11px] text-gris-clair">Démo · données fictives</p>
      </div>
    </div>
  );
}

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {/* Desktop : fixe */}
      <aside className="fixed left-0 top-0 z-30 hidden h-[100dvh] w-[220px] border-r border-hair bg-blanc lg:block">
        <NavContent />
      </aside>

      {/* Mobile : drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          onClick={onClose}
          className={cn(
            "absolute inset-0 bg-noir/40 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          className={cn(
            "absolute left-0 top-0 h-full w-[260px] border-r border-hair bg-blanc transition-transform duration-300",
            open ? "translate-x-0" : "-translate-x-full",
          )}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={onClose}
            aria-label="Fermer le menu"
            className="absolute right-3 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-noir"
          >
            <X className="h-5 w-5" />
          </button>
          <NavContent onNavigate={onClose} />
        </aside>
      </div>
    </>
  );
}
