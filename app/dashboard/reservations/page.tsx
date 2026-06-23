"use client";

import { useState } from "react";
import { MoreHorizontal, Search, Download, Plus } from "lucide-react";
import { toast } from "sonner";
import { ALL_RESERVATIONS, type ResaStatus } from "@/lib/mock-data";
import { BadgeStatus } from "@/components/dashboard/badge-status";
import { NewReservationModal } from "@/components/dashboard/new-reservation-modal";
import { cn } from "@/lib/utils";

const TABS: { label: string; value: "Toutes" | ResaStatus }[] = [
  { label: "Toutes", value: "Toutes" },
  { label: "Confirmées", value: "Confirmé" },
  { label: "En attente", value: "En attente" },
  { label: "No-shows", value: "No-show" },
];

export default function ReservationsPage() {
  const [tab, setTab] = useState<"Toutes" | ResaStatus>("Toutes");
  const [q, setQ] = useState("");
  const [modal, setModal] = useState(false);

  const rows = ALL_RESERVATIONS.filter(
    (r) => (tab === "Toutes" || r.status === tab) &&
      (r.client.toLowerCase().includes(q.toLowerCase()) || r.date.includes(q)),
  );

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-noir sm:text-3xl">Réservations</h1>
          <p className="mt-1 text-gris-fonce">Toutes vos réservations à venir et passées.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gris-fonce" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher…" className="h-10 w-44 rounded-full border border-hair bg-blanc pl-9 pr-3 text-sm text-noir outline-none transition-colors placeholder:text-gris-clair focus:border-noir sm:w-56" />
          </div>
          <button onClick={() => toast.success("Export CSV généré")} className="inline-flex h-10 items-center gap-1.5 rounded-full border border-hair bg-blanc px-4 text-sm font-medium text-noir transition-colors hover:border-noir">
            <Download className="h-4 w-4" /> <span className="hidden sm:inline">Exporter CSV</span>
          </button>
          <button onClick={() => setModal(true)} className="inline-flex h-10 items-center gap-1.5 rounded-full bg-jaune-vif px-4 text-sm font-bold text-noir transition-transform hover:-translate-y-0.5">
            <Plus className="h-4 w-4" strokeWidth={2.5} /> <span className="hidden sm:inline">Nouvelle réservation</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {TABS.map((t) => {
          const count = t.value === "Toutes" ? ALL_RESERVATIONS.length : ALL_RESERVATIONS.filter((r) => r.status === t.value).length;
          return (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                tab === t.value ? "border-noir bg-noir text-creme" : "border-hair bg-blanc text-gris-fonce hover:border-noir hover:text-noir",
              )}
            >
              {t.label} <span className="opacity-60">· {count}</span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-hair bg-blanc">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr className="border-b border-hair text-xs uppercase tracking-wide text-gris-fonce">
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Client</th>
              <th className="px-5 py-3 font-medium">Couverts</th>
              <th className="px-5 py-3 font-medium">Acompte</th>
              <th className="px-5 py-3 font-medium">Statut</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-hair last:border-0 transition-colors hover:bg-creme/40">
                <td className="px-5 py-3 text-noir">
                  <span className="font-medium">{r.date}</span>
                  <span className="ml-2 font-mono text-xs text-gris-fonce">{r.time}</span>
                </td>
                <td className="px-5 py-3 font-medium text-noir">{r.client}</td>
                <td className="px-5 py-3 text-gris-fonce">{r.party}</td>
                <td className="px-5 py-3 text-gris-fonce">{r.deposit}</td>
                <td className="px-5 py-3"><BadgeStatus status={r.status} /></td>
                <td className="px-5 py-3 text-right">
                  <button
                    onClick={() => toast(`${r.client} · ${r.date} ${r.time} — démo`)}
                    aria-label="Actions"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gris-fonce transition-colors hover:bg-noir/[0.06] hover:text-noir"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-gris-fonce">Aucune réservation dans cette catégorie.</p>
        )}
      </div>

      <NewReservationModal open={modal} onClose={() => setModal(false)} />
    </div>
  );
}
