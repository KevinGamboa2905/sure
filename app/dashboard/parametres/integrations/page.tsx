"use client";

import { useState } from "react";
import { CreditCard, Calendar, Mail } from "lucide-react";
import { toast } from "sonner";
import { SettingCard } from "@/components/dashboard/setting-card";
import { cn } from "@/lib/utils";

const INITIAL = [
  { id: "stripe", name: "Stripe", desc: "Encaissez les acomptes de réservation.", icon: CreditCard, status: "connected" as const },
  { id: "gcal", name: "Google Calendar", desc: "Synchronisez vos réservations.", icon: Calendar, status: "toggle" as const },
  { id: "mailchimp", name: "Mailchimp", desc: "Campagnes email vers vos clients.", icon: Mail, status: "soon" as const },
];

export default function IntegrationsPage() {
  const [gcal, setGcal] = useState(false);

  return (
    <SettingCard title="Intégrations" desc="Connectez Tably à vos outils.">
      <ul className="space-y-2">
        {INITIAL.map((it) => (
          <li key={it.id} className="flex items-center gap-3 rounded-xl border border-hair p-4">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-creme/60"><it.icon className="h-5 w-5 text-noir" strokeWidth={2} /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-noir">{it.name}</p>
              <p className="text-xs text-gris-fonce">{it.desc}</p>
            </div>
            {it.status === "connected" && (
              <span className="rounded-full bg-[#27ae60]/12 px-2.5 py-1 text-xs font-medium text-[#1e7e43]">Connecté</span>
            )}
            {it.status === "soon" && (
              <span className="rounded-full border border-hair px-2.5 py-1 text-xs font-medium text-gris-fonce">Bientôt</span>
            )}
            {it.status === "toggle" && (
              <button role="switch" aria-checked={gcal} aria-label={it.name}
                onClick={() => { setGcal((v) => !v); toast.success(`Google Calendar ${!gcal ? "connecté" : "déconnecté"}`); }}
                className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", gcal ? "bg-jaune-vif" : "bg-gris-clair/50")}>
                <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-blanc shadow-sm transition-transform", gcal ? "translate-x-[22px]" : "translate-x-0.5")} style={{ border: "1px solid rgba(0,0,0,0.1)" }} />
              </button>
            )}
          </li>
        ))}
      </ul>
    </SettingCard>
  );
}
