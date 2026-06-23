"use client";

import { useState } from "react";
import { toast } from "sonner";
import { SettingCard } from "@/components/dashboard/setting-card";
import { cn } from "@/lib/utils";

const PREFS = [
  { id: "new_resa_email", label: "Nouvelle réservation", channel: "Email", on: true },
  { id: "new_resa_sms", label: "Nouvelle réservation", channel: "SMS", on: false },
  { id: "noshow_email", label: "No-show détecté", channel: "Email", on: true },
  { id: "daily_recap", label: "Récapitulatif quotidien", channel: "Email", on: true },
  { id: "weekly_report", label: "Rapport hebdomadaire", channel: "Email", on: false },
];

export default function NotificationsPage() {
  const [prefs, setPrefs] = useState(PREFS);

  function toggle(id: string) {
    setPrefs((ps) => ps.map((p) => {
      if (p.id !== id) return p;
      toast.success(`Préférence mise à jour`);
      return { ...p, on: !p.on };
    }));
  }

  return (
    <SettingCard title="Préférences de notification" desc="Choisissez ce que vous recevez, et comment.">
      <ul className="space-y-2">
        {prefs.map((p) => (
          <li key={p.id} className="flex items-center justify-between gap-4 rounded-xl border border-hair p-3">
            <div>
              <p className="text-sm font-medium text-noir">{p.label}</p>
              <p className="text-xs text-gris-fonce">Canal : {p.channel}</p>
            </div>
            <button role="switch" aria-checked={p.on} aria-label={`${p.label} ${p.channel}`}
              onClick={() => toggle(p.id)}
              className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", p.on ? "bg-jaune-vif" : "bg-gris-clair/50")}>
              <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-blanc shadow-sm transition-transform", p.on ? "translate-x-[22px]" : "translate-x-0.5")} style={{ border: "1px solid rgba(0,0,0,0.1)" }} />
            </button>
          </li>
        ))}
      </ul>
    </SettingCard>
  );
}
