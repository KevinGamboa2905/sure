"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Clock, Users, CalendarDays } from "lucide-react";
import { AGENDA_DAYS, AGENDA_HOURS, AGENDA_SLOTS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type SelectedSlot = { name: string; party: number; hour: string; day: string };

export default function AgendaPage() {
  const [view, setView] = useState<"semaine" | "mois">("semaine");
  const [selected, setSelected] = useState<SelectedSlot | null>(null);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-noir sm:text-3xl">Agenda</h1>
          <p className="mt-1 text-gris-fonce">Semaine du 26 mai au 1<sup>er</sup> juin.</p>
        </div>
        <div className="inline-flex rounded-full border border-hair bg-blanc p-1">
          {(["semaine", "mois"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors",
                view === v ? "bg-noir text-creme" : "text-gris-fonce hover:text-noir",
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === "semaine" ? (
        <div className="overflow-x-auto rounded-2xl border border-hair bg-blanc p-4">
          <div className="min-w-[720px]">
            {/* En-tête jours */}
            <div className="grid" style={{ gridTemplateColumns: "60px repeat(7, minmax(0, 1fr))" }}>
              <span />
              {AGENDA_DAYS.map((d) => (
                <div key={d.day} className="px-1 pb-2 text-center">
                  <p className="text-xs uppercase tracking-wide text-gris-fonce">{d.day}</p>
                  <p className="text-sm font-bold text-noir">{d.date}</p>
                </div>
              ))}
            </div>
            {/* Lignes horaires */}
            {AGENDA_HOURS.map((hour) => (
              <div
                key={hour}
                className="grid border-t border-hair"
                style={{ gridTemplateColumns: "60px repeat(7, minmax(0, 1fr))" }}
              >
                <span className="py-3 pr-2 text-right font-mono text-xs text-gris-fonce">{hour}</span>
                {AGENDA_DAYS.map((_, dayIndex) => {
                  const slot = AGENDA_SLOTS.find((s) => s.dayIndex === dayIndex && s.hour === hour);
                  return (
                    <div key={dayIndex} className="border-l border-hair p-1">
                      {slot && (
                        <button
                          onClick={() => setSelected({ name: slot.name, party: slot.party, hour, day: `${AGENDA_DAYS[dayIndex].day} ${AGENDA_DAYS[dayIndex].date}` })}
                          className="w-full rounded-lg bg-jaune-vif px-2 py-1.5 text-left text-xs transition-transform hover:-translate-y-0.5"
                        >
                          <p className="font-bold text-noir">{slot.name}</p>
                          <p className="text-noir/70">{slot.party} couv.</p>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-hair bg-blanc p-6">
          <div className="grid grid-cols-7 gap-1 text-center">
            {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
              <span key={i} className="py-1 text-xs font-medium uppercase text-gris-fonce">{d}</span>
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
              const busy = [27, 28, 29, 30, 31].includes(day);
              return (
                <div
                  key={day}
                  className={cn(
                    "flex aspect-square flex-col items-center justify-center rounded-lg text-sm",
                    busy ? "bg-jaune-vif/40 font-bold text-noir" : "text-gris-fonce",
                  )}
                >
                  {day}
                  {busy && <span className="mt-0.5 h-1 w-1 rounded-full bg-noir" />}
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-center text-xs text-gris-clair">Vue mois · démo</p>
        </div>
      )}

      {/* Modal détail créneau */}
      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-noir/40" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
              className="relative w-full max-w-sm rounded-t-3xl border border-hair bg-blanc p-6 shadow-lift sm:rounded-3xl"
            >
              <button onClick={() => setSelected(null)} aria-label="Fermer" className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-gris-fonce hover:bg-noir/[0.05]"><X className="h-5 w-5" /></button>
              <p className="text-xs uppercase tracking-label text-gris-fonce">Réservation</p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-noir">{selected.name}</h3>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-center gap-3"><CalendarDays className="h-4 w-4 text-gris-fonce" /><dd className="text-noir">{selected.day}</dd></div>
                <div className="flex items-center gap-3"><Clock className="h-4 w-4 text-gris-fonce" /><dd className="text-noir">{selected.hour}</dd></div>
                <div className="flex items-center gap-3"><Users className="h-4 w-4 text-gris-fonce" /><dd className="text-noir">{selected.party} couverts</dd></div>
              </dl>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
