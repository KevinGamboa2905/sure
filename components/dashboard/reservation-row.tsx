import { ChevronRight } from "lucide-react";
import type { DashReservation } from "@/lib/mock-data";
import { BadgeStatus } from "./badge-status";

export function ReservationRow({
  resa,
  onSelect,
}: {
  resa: DashReservation;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="group flex w-full items-center gap-4 py-3 text-left transition-colors hover:bg-noir/[0.02]"
    >
      <span className="w-14 shrink-0 font-mono text-sm font-bold text-noir">
        {resa.time}
      </span>
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hair bg-creme/60 text-sm font-bold text-noir">
        {resa.party}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-noir">{resa.name}</p>
        <p className="truncate text-xs text-gris-fonce">{resa.info}</p>
      </div>
      <BadgeStatus status={resa.status} />
      <ChevronRight className="hidden h-4 w-4 shrink-0 text-gris-clair transition-transform group-hover:translate-x-0.5 sm:block" />
    </button>
  );
}
