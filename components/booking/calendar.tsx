"use client";

import { useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toISO } from "@/lib/availability";
import { cn } from "@/lib/utils";

const WD = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MONTHS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

/** Calendrier mensuel générique (sélecteur de date + badges optionnels). */
export function Calendar({
  value,
  onSelect,
  isDisabled,
  renderBadge,
  className,
}: {
  value?: string;
  onSelect?: (iso: string) => void;
  isDisabled?: (date: Date) => boolean;
  renderBadge?: (iso: string) => ReactNode;
  className?: string;
}) {
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()));
  const todayISO = toISO(new Date());

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Décalage lundi-premier : getDay() 0=dim -> on veut lun=0.
  const firstOffset = (new Date(year, month, 1).getDay() + 6) % 7;

  const cells: (Date | null)[] = [
    ...Array(firstOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  return (
    <div className={cn("select-none", className)}>
      {/* En-tête mois */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-bold capitalize text-[var(--brand-ink)]">
          {MONTHS[month]} {year}
        </p>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setCursor(new Date(year, month - 1, 1))}
            aria-label="Mois précédent"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--brand-border)] text-[var(--brand-ink)] transition-colors hover:bg-[var(--brand-accent)] hover:text-[var(--brand-accent-ink)]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setCursor(new Date(year, month + 1, 1))}
            aria-label="Mois suivant"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--brand-border)] text-[var(--brand-ink)] transition-colors hover:bg-[var(--brand-accent)] hover:text-[var(--brand-accent-ink)]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Jours de la semaine */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {WD.map((d) => (
          <span key={d} className="py-1 text-[11px] font-medium uppercase text-[var(--brand-sub)]">
            {d}
          </span>
        ))}
      </div>

      {/* Grille */}
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <span key={`e${i}`} />;
          const iso = toISO(date);
          const disabled = isDisabled?.(date) ?? false;
          const selected = value === iso;
          const isToday = iso === todayISO;

          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => onSelect?.(iso)}
              className={cn(
                "relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm transition-colors",
                disabled && "cursor-not-allowed text-[var(--brand-sub)]/35",
                !disabled &&
                  !selected &&
                  "text-[var(--brand-ink)] hover:bg-[var(--brand-accent)]/12",
                selected &&
                  "bg-[var(--brand-accent)] font-bold text-[var(--brand-accent-ink)]",
                isToday && !selected && "ring-1 ring-inset ring-[var(--brand-accent)]",
              )}
            >
              <span>{date.getDate()}</span>
              {renderBadge?.(iso)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
