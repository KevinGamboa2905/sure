"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Users, Clock, Phone } from "lucide-react";
import { TODAY_RESERVATIONS, TODAY_LABEL, type DashReservation } from "@/lib/mock-data";
import { ReservationRow } from "./reservation-row";
import { BadgeStatus } from "./badge-status";

export function TodayList() {
  const [selected, setSelected] = useState<DashReservation | null>(null);

  const totalCovers = TODAY_RESERVATIONS.reduce((s, r) => s + r.party, 0);

  return (
    <div className="rounded-2xl border border-hair bg-blanc p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold tracking-tight text-noir">
          Aujourd&apos;hui · {TODAY_LABEL}
        </h3>
        <span className="rounded-full bg-creme px-3 py-1 text-xs font-medium text-gris-fonce">
          {TODAY_RESERVATIONS.length} résa · {totalCovers} couv.
        </span>
      </div>

      <ul className="mt-3 divide-y divide-[rgba(188,188,188,0.35)]">
        {TODAY_RESERVATIONS.map((r) => (
          <li key={r.id}>
            <ReservationRow resa={r} onSelect={() => setSelected(r)} />
          </li>
        ))}
      </ul>

      {/* Modal détail */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-noir/40" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ y: 30, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
              className="relative w-full max-w-md rounded-t-3xl border border-hair bg-blanc p-6 shadow-lift sm:rounded-3xl"
              role="dialog"
              aria-modal="true"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Fermer"
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-gris-fonce hover:bg-noir/[0.05]"
              >
                <X className="h-5 w-5" />
              </button>

              <p className="text-xs uppercase tracking-label text-gris-fonce">Réservation</p>
              <h4 className="mt-1 text-2xl font-bold tracking-tight text-noir">{selected.name}</h4>
              <div className="mt-2"><BadgeStatus status={selected.status} /></div>

              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-gris-fonce" />
                  <dt className="text-gris-fonce">Heure</dt>
                  <dd className="ml-auto font-medium text-noir">{selected.time}</dd>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-gris-fonce" />
                  <dt className="text-gris-fonce">Couverts</dt>
                  <dd className="ml-auto font-medium text-noir">{selected.party} personnes</dd>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gris-fonce" />
                  <dt className="text-gris-fonce">Acompte / rappel</dt>
                  <dd className="ml-auto font-medium text-noir">{selected.info}</dd>
                </div>
              </dl>

              <div className="mt-6 flex gap-2">
                <button className="flex-1 rounded-full bg-jaune-vif py-3 text-sm font-bold text-noir transition-transform hover:-translate-y-0.5">
                  Renvoyer un SMS
                </button>
                <button className="rounded-full border border-hair px-4 py-3 text-sm font-medium text-noir transition-colors hover:border-noir">
                  Modifier
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
