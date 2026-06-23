"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Link2,
  Check,
  Users,
  CalendarDays,
  TrendingUp,
  Clock,
} from "lucide-react";
import { type Restaurant, weekdayLabel } from "@/lib/restaurants";
import {
  type Reservation,
  type ResaStatus,
  reservationsForDay,
  dayCovers,
  toISO,
  fromISO,
  todayISO,
} from "@/lib/availability";
import { Calendar } from "@/components/booking/calendar";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<ResaStatus, string> = {
  "confirmé": "bg-[#2f8f4e]/12 text-[#2f8f4e]",
  "en attente": "bg-amber-100 text-amber-700",
  "honoré": "bg-noir/[0.06] text-gris-fonce",
  "no-show": "bg-[#d64541]/12 text-[#d64541]",
};

// Palette Tably exposée au Calendar via variables CSS.
const TS_BRAND = {
  "--brand-page": "#fffee7",
  "--brand-surface": "#ffffff",
  "--brand-ink": "#000000",
  "--brand-sub": "#555553",
  "--brand-border": "rgba(188,188,188,0.4)",
  "--brand-accent": "#fcf376",
  "--brand-accent-ink": "#000000",
} as React.CSSProperties;

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  icon: typeof Users;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5",
        accent ? "border-noir bg-jaune-vif" : "border-hair bg-blanc",
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-label text-noir/60">{label}</p>
        <Icon className="h-4 w-4 text-noir/70" strokeWidth={2} />
      </div>
      <p className="mt-2 text-3xl font-bold tracking-tight text-noir">{value}</p>
    </div>
  );
}

function longDate(iso: string): string {
  const d = fromISO(iso);
  return `${weekdayLabel(d.getDay())} ${d.getDate()} ${[
    "jan", "fév", "mars", "avr", "mai", "juin",
    "juil", "août", "sept", "oct", "nov", "déc",
  ][d.getMonth()]}`;
}

export function Dashboard({ restaurant: r }: { restaurant: Restaurant }) {
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSelected(todayISO());
  }, []);

  const dayResas = useMemo<Reservation[]>(
    () => (selected ? reservationsForDay(r, selected) : []),
    [selected, r],
  );

  // Statistiques sur 30 jours glissants + 7 jours à venir.
  const stats = useMemo(() => {
    if (!mounted) return { todayCovers: 0, presence: 0, noShows: 0, upcoming: 0 };
    const today = new Date();
    let honored = 0;
    let noShows = 0;
    for (let i = -30; i <= 0; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      for (const resa of reservationsForDay(r, toISO(d))) {
        if (resa.status === "honoré") honored++;
        if (resa.status === "no-show") noShows++;
      }
    }
    let upcoming = 0;
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      upcoming += reservationsForDay(r, toISO(d)).length;
    }
    const presence = honored + noShows > 0 ? Math.round((honored / (honored + noShows)) * 100) : 100;
    return {
      todayCovers: dayCovers(reservationsForDay(r, todayISO())),
      presence,
      noShows,
      upcoming,
    };
  }, [mounted, r]);

  if (!mounted) {
    return <div className="min-h-[100dvh] bg-creme" />;
  }

  return (
    <div className="min-h-[100dvh] bg-creme">
      {/* Top bar */}
      <header className="border-b border-hair bg-creme/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-noir text-sm font-bold text-jaune-vif">
              {r.monogram}
            </span>
            <div>
              <p className="text-sm font-bold tracking-tight text-noir">{r.name}</p>
              <p className="text-xs text-gris-fonce">Tableau de bord</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard
                  ?.writeText(`${window.location.origin}/${r.slug}`)
                  .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-hair bg-blanc px-4 py-2 text-xs font-medium text-noir transition-colors hover:border-noir"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
              {copied ? "Lien copié" : "Copier le lien public"}
            </button>
            <a
              href={`/${r.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-jaune-vif px-4 py-2 text-xs font-bold text-noir transition-transform hover:-translate-y-0.5"
            >
              Voir la page
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <a href="/" className="inline-flex items-center gap-1.5 text-sm text-gris-fonce hover:text-noir">
          <ArrowLeft className="h-4 w-4" /> Tably
        </a>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Couverts ce soir" value={String(stats.todayCovers)} icon={Users} accent />
          <StatCard label="Présence (30j)" value={`${stats.presence}%`} icon={TrendingUp} />
          <StatCard label="No-shows (30j)" value={String(stats.noShows)} icon={Clock} />
          <StatCard label="À venir (7j)" value={String(stats.upcoming)} icon={CalendarDays} />
        </div>

        {/* Calendrier + jour sélectionné */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_1.2fr]">
          {/* Calendrier */}
          <div style={TS_BRAND} className="rounded-3xl border border-hair bg-blanc p-6">
            <p className="mb-4 text-sm font-bold tracking-tight text-noir">Calendrier</p>
            <Calendar
              value={selected}
              onSelect={setSelected}
              renderBadge={(iso) => {
                const n = reservationsForDay(r, iso).length;
                if (n === 0) return null;
                return (
                  <span className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-[var(--brand-accent)] ring-1 ring-noir/30" />
                );
              }}
            />
            <p className="mt-4 flex items-center gap-2 text-xs text-gris-fonce">
              <span className="h-1.5 w-1.5 rounded-full bg-jaune-vif ring-1 ring-noir/30" />
              Jour avec réservations
            </p>
          </div>

          {/* Réservations du jour */}
          <div className="rounded-3xl border border-hair bg-blanc p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold capitalize tracking-tight text-noir">
                {longDate(selected)}
              </p>
              <span className="rounded-full bg-creme px-3 py-1 text-xs font-medium text-gris-fonce">
                {dayResas.length} résa · {dayCovers(dayResas)} couv.
              </span>
            </div>

            {dayResas.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-dashed border-hair p-8 text-center text-sm text-gris-fonce">
                Aucune réservation ce jour-là.
              </div>
            ) : (
              <ul className="mt-4 divide-y divide-[rgba(188,188,188,0.35)]">
                {dayResas.map((resa) => (
                  <li key={resa.id} className="flex items-center gap-3 py-3">
                    <span className="w-12 shrink-0 font-mono text-sm font-medium text-noir">
                      {resa.time}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-noir">
                        {resa.name}
                        {resa.source === "client" && (
                          <span className="ml-2 rounded-full bg-jaune-vif px-1.5 py-0.5 text-[10px] font-bold text-noir">
                            nouveau
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gris-fonce">
                        {resa.partySize} couv.{resa.phone ? ` · ${resa.phone}` : ""}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize",
                        STATUS_STYLES[resa.status],
                      )}
                    >
                      {resa.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
