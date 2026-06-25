"use client";

import { CalendarPlus, Copy, ArrowRight, MessageSquareText, CreditCard, CalendarRange } from "lucide-react";
import { toast } from "sonner";
import { KpiCard } from "./kpi-card";
import { WeekChart } from "./week-chart";
import type { Kpi } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type TodayResa = { id: string; time: string; name: string; party: number; info: string; status: string };
type WeekDatum = { day: string; confirmed: number; noshow: number };

const STATUS: Record<string, { label: string; cls: string }> = {
  confirmed: { label: "Confirmé", cls: "bg-[#27ae60]/12 text-[#1e7e43]" },
  pending: { label: "En attente", cls: "bg-amber-100 text-amber-700" },
  noshow: { label: "No-show", cls: "bg-[#c0392b]/12 text-[#c0392b]" },
  cancelled: { label: "Annulée", cls: "bg-noir/[0.06] text-gris-fonce" },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS[status] ?? STATUS.pending;
  return <span className={cn("inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium", s.cls)}>{s.label}</span>;
}

export function DashboardContent({
  restaurant,
  greeting,
  kpis,
  week,
  today,
  todayLabel,
  isEmpty,
}: {
  restaurant: { name: string; slug: string };
  greeting: string;
  kpis: Kpi[];
  week: WeekDatum[];
  today: TodayResa[];
  todayLabel: string;
  isEmpty: boolean;
}) {
  const publicUrl = `tably.ch/${restaurant.slug}`;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-noir sm:text-3xl">{greeting}</h1>
        <p className="mt-1 text-gris-fonce">Vue d&apos;ensemble de votre activité ce mois-ci.</p>
      </div>

      {isEmpty ? (
        /* ---- État vide / bienvenue (nouveau compte) ---- */
        <div className="overflow-hidden rounded-3xl border border-noir bg-jaune-vif p-6 sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-noir">Bienvenue sur Tably, {restaurant.name} !</h2>
          <p className="mt-2 max-w-xl text-noir/70">Votre compte est prêt. Pour commencer :</p>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <span className="text-sm font-medium text-noir">Partagez votre page client</span>
            <button
              onClick={() => { navigator.clipboard?.writeText(`https://${publicUrl}`); toast.success("Lien copié"); }}
              className="inline-flex items-center gap-2 rounded-full border border-noir/20 bg-blanc px-3 py-1.5 font-mono text-xs text-noir transition-colors hover:border-noir"
            >
              {publicUrl} <Copy className="h-3.5 w-3.5" />
            </button>
          </div>

          <ul className="mt-5 space-y-2 text-sm text-noir/80">
            <li className="flex items-center gap-2"><CreditCard className="h-4 w-4" /> Connectez Stripe pour activer les acomptes</li>
            <li className="flex items-center gap-2"><MessageSquareText className="h-4 w-4" /> Configurez vos rappels SMS</li>
            <li className="flex items-center gap-2"><CalendarRange className="h-4 w-4" /> Créez votre première réservation</li>
          </ul>

          <a href="/dashboard/page-client" className="mt-6 inline-flex items-center gap-2 rounded-full bg-noir px-5 py-3 text-sm font-bold text-jaune-vif transition-transform hover:-translate-y-0.5">
            Voir mes premières étapes <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {kpis.map((kpi) => <KpiCard key={kpi.key} kpi={kpi} />)}
          </div>
          <div className="mt-6">
            <WeekChart data={week} />
          </div>
        </>
      )}

      {/* ---- Aujourd'hui ---- */}
      <div className="mt-6 rounded-2xl border border-hair bg-blanc p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold tracking-tight text-noir">Aujourd&apos;hui · {todayLabel}</h3>
          {today.length > 0 && (
            <span className="rounded-full bg-creme px-3 py-1 text-xs font-medium text-gris-fonce">
              {today.length} résa · {today.reduce((s, r) => s + r.party, 0)} couv.
            </span>
          )}
        </div>

        {today.length === 0 ? (
          <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-hair bg-creme/40 px-6 py-12 text-center">
            <CalendarPlus className="h-8 w-8 text-gris-clair" strokeWidth={1.5} />
            <p className="mt-3 text-sm font-medium text-noir">Aucune réservation pour aujourd&apos;hui</p>
            <p className="mt-1 max-w-sm text-sm text-gris-fonce">
              Quand vos clients réserveront sur votre page, elles apparaîtront ici.
            </p>
            <a href={`/r/${restaurant.slug}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full bg-jaune-vif px-4 py-2 text-sm font-bold text-noir transition-transform hover:-translate-y-0.5">
              Voir ma page de réservation
            </a>
          </div>
        ) : (
          <ul className="mt-3 divide-y divide-[rgba(188,188,188,0.35)]">
            {today.map((r) => (
              <li key={r.id} className="flex items-center gap-4 py-3">
                <span className="w-14 shrink-0 font-mono text-sm font-bold text-noir">{r.time}</span>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hair bg-creme/60 text-sm font-bold text-noir">{r.party}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-noir">{r.name}</p>
                  <p className="truncate text-xs text-gris-fonce">{r.info}</p>
                </div>
                <StatusBadge status={r.status} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
