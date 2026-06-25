"use client";

import { useState } from "react";
import { MessageSquareText } from "lucide-react";
import { toast } from "sonner";
import { SMS_WORKFLOWS, SMS_TEMPLATES } from "@/lib/mock-data";
import { EmptyState } from "@/components/dashboard/empty-state";
import { cn } from "@/lib/utils";

const STATS = [
  { label: "SMS envoyés ce mois", value: "0" },
  { label: "Taux de réponse", value: "—" },
  { label: "Crédits restants", value: "Selon plan" },
];

export default function SmsPage() {
  const [workflows, setWorkflows] = useState(SMS_WORKFLOWS);

  function toggle(id: string) {
    setWorkflows((ws) =>
      ws.map((w) => {
        if (w.id !== id) return w;
        const next = !w.enabled;
        toast.success(`${w.name} ${next ? "activé" : "désactivé"}`);
        return { ...w, enabled: next };
      }),
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-noir sm:text-3xl">Rappels SMS</h1>
          <p className="mt-1 text-gris-fonce">Vos automatisations et l&apos;historique des envois.</p>
        </div>
        <button onClick={() => toast.success("SMS de test envoyé")} className="inline-flex h-10 items-center gap-1.5 rounded-full bg-jaune-vif px-4 text-sm font-bold text-noir transition-transform hover:-translate-y-0.5">
          Tester un SMS
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl border border-hair bg-blanc p-4">
            <p className="text-2xl font-bold tracking-tight text-noir sm:text-3xl">{s.value}</p>
            <p className="mt-1 text-xs text-gris-fonce">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Workflows */}
        <section className="rounded-2xl border border-hair bg-blanc p-6">
          <h2 className="text-base font-bold tracking-tight text-noir">Automatisations</h2>
          <ul className="mt-4 space-y-2">
            {workflows.map((w) => (
              <li key={w.id} className="flex items-center justify-between gap-4 rounded-xl border border-hair p-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-noir">{w.name}</p>
                  <p className="text-xs text-gris-fonce">{w.desc}</p>
                </div>
                <button
                  role="switch"
                  aria-checked={w.enabled}
                  aria-label={w.name}
                  onClick={() => toggle(w.id)}
                  className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", w.enabled ? "bg-jaune-vif" : "bg-gris-clair/50")}
                >
                  <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-blanc shadow-sm transition-transform", w.enabled ? "translate-x-[22px]" : "translate-x-0.5")} style={{ border: "1px solid rgba(0,0,0,0.1)" }} />
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Templates */}
        <section className="rounded-2xl border border-hair bg-blanc p-6">
          <h2 className="text-base font-bold tracking-tight text-noir">Modèles de SMS</h2>
          <div className="mt-4 space-y-3">
            {SMS_TEMPLATES.map((t) => (
              <div key={t.id}>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gris-fonce">{t.title}</p>
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-creme/70 px-4 py-2.5 text-sm text-noir">{t.body}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Historique → empty */}
      <section className="mt-6">
        <h2 className="mb-3 text-base font-bold tracking-tight text-noir">Historique des envois</h2>
        <EmptyState
          icon={MessageSquareText}
          title="Aucun SMS envoyé pour l'instant"
          description="L'historique de vos rappels et confirmations apparaîtra ici dès vos premières réservations."
        />
      </section>
    </div>
  );
}
