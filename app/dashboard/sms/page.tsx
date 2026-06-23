"use client";

import { useState } from "react";
import { Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { SMS_WORKFLOWS, SMS_TEMPLATES, SMS_HISTORY, SMS_STATS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

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
        {SMS_STATS.map((s) => (
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
                  <span
                    className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-blanc shadow-sm transition-transform", w.enabled ? "translate-x-[22px]" : "translate-x-0.5")}
                    style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                  />
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
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-creme/70 px-4 py-2.5 text-sm text-noir">
                  {t.body}
                </div>
              </div>
            ))}
            <button
              onClick={() => toast("Éditeur de modèle — démo")}
              className="mt-1 text-sm font-medium text-noir underline decoration-jaune-vif decoration-2 underline-offset-4"
            >
              Modifier les modèles
            </button>
          </div>
        </section>
      </div>

      {/* Historique */}
      <section className="mt-6 rounded-2xl border border-hair bg-blanc p-6">
        <h2 className="text-base font-bold tracking-tight text-noir">Historique des envois</h2>
        <ul className="mt-4 divide-y divide-[rgba(188,188,188,0.35)]">
          {SMS_HISTORY.map((s) => {
            const ok = s.status === "Livré";
            return (
              <li key={s.id} className="flex items-center gap-4 py-3">
                <span className={cn("inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full", ok ? "bg-[#27ae60]/12 text-[#1e7e43]" : "bg-[#c0392b]/12 text-[#c0392b]")}>
                  {ok ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <AlertCircle className="h-3.5 w-3.5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-noir">{s.type}</p>
                  <p className="truncate text-xs text-gris-fonce">{s.to}</p>
                </div>
                <span className="hidden text-xs text-gris-fonce sm:block">{s.time}</span>
                <span className={cn("text-xs font-medium", ok ? "text-[#1e7e43]" : "text-[#c0392b]")}>{s.status}</span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
