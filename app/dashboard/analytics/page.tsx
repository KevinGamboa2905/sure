"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ANALYTICS, TOP_SLOTS, FUNNEL, type AnalyticsRange } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const RANGES: { key: AnalyticsRange; label: string }[] = [
  { key: "30", label: "30 jours" },
  { key: "90", label: "90 jours" },
  { key: "365", label: "1 an" },
];

export default function AnalyticsPage() {
  const [range, setRange] = useState<AnalyticsRange>("30");
  const data = ANALYTICS[range];
  const maxSeries = Math.max(...data.series);
  const maxFunnel = FUNNEL[0].value;
  const maxSlot = TOP_SLOTS[0].count;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-noir sm:text-3xl">Statistiques</h1>
          <p className="mt-1 text-gris-fonce">Votre performance sur la période.</p>
        </div>
        <div className="inline-flex rounded-full border border-hair bg-blanc p-1">
          {RANGES.map((r) => (
            <button key={r.key} onClick={() => setRange(r.key)}
              className={cn("rounded-full px-4 py-1.5 text-sm font-medium transition-colors", range === r.key ? "bg-noir text-creme" : "text-gris-fonce hover:text-noir")}>
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {data.kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-hair bg-blanc p-5">
            <p className="text-xs font-medium uppercase tracking-label text-gris-fonce">{k.label}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-noir">{k.value}</p>
            <p className="mt-1 text-xs text-[#1e7e43]">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Chart évolution */}
      <div className="mt-6 rounded-2xl border border-hair bg-blanc p-6">
        <h3 className="text-base font-bold tracking-tight text-noir">Évolution des réservations</h3>
        <div className="mt-6 flex h-44 items-end justify-between gap-1.5">
          {data.series.map((v, i) => (
            <motion.div
              key={`${range}-${i}`}
              initial={{ height: 0 }}
              animate={{ height: `${(v / maxSeries) * 100}%` }}
              transition={{ delay: i * 0.03, type: "spring", stiffness: 90, damping: 16 }}
              className="flex-1 rounded-t-md bg-jaune-vif"
              style={{ minHeight: 4 }}
              title={`${v}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top créneaux */}
        <div className="rounded-2xl border border-hair bg-blanc p-6">
          <h3 className="text-base font-bold tracking-tight text-noir">Top créneaux demandés</h3>
          <ul className="mt-4 space-y-3">
            {TOP_SLOTS.map((s) => (
              <li key={s.slot}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-noir">{s.slot}</span>
                  <span className="font-mono text-gris-fonce">{s.count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-creme">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${(s.count / maxSlot) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="h-full rounded-full bg-noir" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Funnel */}
        <div className="rounded-2xl border border-hair bg-blanc p-6">
          <h3 className="text-base font-bold tracking-tight text-noir">Funnel de conversion</h3>
          <ul className="mt-4 space-y-3">
            {FUNNEL.map((f, i) => (
              <li key={f.stage}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-noir">{f.stage}</span>
                  <span className="font-mono text-gris-fonce">{f.value.toLocaleString("fr-CH")}</span>
                </div>
                <div className="h-7 overflow-hidden rounded-lg bg-creme">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${(f.value / maxFunnel) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="flex h-full items-center justify-end rounded-lg bg-jaune-vif px-2 text-[11px] font-bold text-noir">
                    {Math.round((f.value / maxFunnel) * 100)}%
                  </motion.div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
