"use client";

import { motion } from "framer-motion";

type WeekDatum = { day: string; confirmed: number; noshow: number };

export function WeekChart({ data }: { data: WeekDatum[] }) {
  const max = Math.max(1, ...data.map((d) => d.confirmed + d.noshow));

  return (
    <div className="rounded-2xl border border-hair bg-blanc p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold tracking-tight text-noir">
          Réservations · 7 derniers jours
        </h3>
        <div className="flex items-center gap-4 text-xs text-gris-fonce">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-jaune-vif" /> Confirmées
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-noir/30" /> No-shows
          </span>
        </div>
      </div>

      <div className="mt-6 flex h-44 items-end justify-between gap-3">
        {data.map((d) => (
          <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full flex-1 items-end justify-center gap-1">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${(d.confirmed / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 80, damping: 16 }}
                className="w-3.5 rounded-t-md bg-jaune-vif sm:w-5"
                style={{ minHeight: 4 }}
                title={`${d.confirmed} confirmées`}
              />
              {d.noshow > 0 && (
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(d.noshow / max) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 80, damping: 16 }}
                  className="w-3.5 rounded-t-md bg-noir/30 sm:w-5"
                  style={{ minHeight: 4 }}
                  title={`${d.noshow} no-show`}
                />
              )}
            </div>
            <span className="text-xs text-gris-fonce">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
