"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Star, X, Phone, Mail, CalendarCheck } from "lucide-react";
import { CLIENTS, type Client } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={cn("h-3.5 w-3.5", i < n ? "fill-jaune-vif text-jaune-vif" : "text-gris-clair")} />
      ))}
    </span>
  );
}

export default function ClientsPage() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Client | null>(null);

  const rows = CLIENTS.filter(
    (c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.phone.includes(q) || c.email.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-noir sm:text-3xl">Clients</h1>
          <p className="mt-1 text-gris-fonce">{CLIENTS.length} clients dans votre base.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gris-fonce" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un client…"
            className="h-10 w-full rounded-full border border-hair bg-blanc pl-9 pr-4 text-sm text-noir outline-none transition-colors placeholder:text-gris-clair focus:border-noir sm:w-72"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-hair bg-blanc">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-hair text-xs uppercase tracking-wide text-gris-fonce">
              <th className="px-5 py-3 font-medium">Nom</th>
              <th className="px-5 py-3 font-medium">Téléphone</th>
              <th className="px-5 py-3 font-medium">Visites</th>
              <th className="px-5 py-3 font-medium">Dernière visite</th>
              <th className="px-5 py-3 font-medium">Note</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} onClick={() => setSelected(c)} className="cursor-pointer border-b border-hair last:border-0 transition-colors hover:bg-creme/40">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-noir text-xs font-bold text-jaune-vif">
                      {c.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </span>
                    <span className="font-medium text-noir">{c.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-gris-fonce">{c.phone}</td>
                <td className="px-5 py-3 text-gris-fonce">{c.visits}</td>
                <td className="px-5 py-3 text-gris-fonce">{c.lastVisit}</td>
                <td className="px-5 py-3"><Stars n={c.rating} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="px-5 py-10 text-center text-sm text-gris-fonce">Aucun client trouvé.</p>}
      </div>

      {/* Fiche client */}
      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-noir/40" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
              className="relative w-full max-w-md rounded-t-3xl border border-hair bg-blanc p-6 shadow-lift sm:rounded-3xl"
            >
              <button onClick={() => setSelected(null)} aria-label="Fermer" className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-gris-fonce hover:bg-noir/[0.05]"><X className="h-5 w-5" /></button>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-noir text-sm font-bold text-jaune-vif">
                  {selected.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-noir">{selected.name}</h3>
                  <Stars n={selected.rating} />
                </div>
              </div>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-gris-fonce" /><dd className="text-noir">{selected.phone}</dd></div>
                <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-gris-fonce" /><dd className="text-noir">{selected.email}</dd></div>
                <div className="flex items-center gap-3"><CalendarCheck className="h-4 w-4 text-gris-fonce" /><dd className="text-noir">{selected.visits} visites · dernière le {selected.lastVisit}</dd></div>
              </dl>
              <div className="mt-6 flex gap-2">
                <a href={`tel:${selected.phone.replace(/\s/g, "")}`} className="flex-1 rounded-full bg-jaune-vif py-3 text-center text-sm font-bold text-noir transition-transform hover:-translate-y-0.5">Appeler</a>
                <a href={`mailto:${selected.email}`} className="flex-1 rounded-full border border-hair py-3 text-center text-sm font-medium text-noir transition-colors hover:border-noir">Email</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
