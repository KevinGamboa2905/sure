"use client";

import { Check, Copy } from "lucide-react";
import type { OnboardingData, Service } from "./types";
import { cn } from "@/lib/utils";

const timeCls =
  "h-9 rounded-lg border border-hair bg-creme/40 px-2 text-sm text-noir outline-none focus:border-noir disabled:opacity-40";

function ServiceBlock({
  label,
  service,
  onChange,
}: {
  label: string;
  service: Service;
  onChange: (patch: Partial<Service>) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        role="checkbox"
        aria-checked={service.enabled}
        aria-label={label}
        onClick={() => onChange({ enabled: !service.enabled })}
        className={cn(
          "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-[1.5px] transition-colors",
          service.enabled ? "border-noir bg-jaune-vif text-noir" : "border-hair bg-transparent text-transparent",
        )}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </button>
      <input type="time" value={service.from} disabled={!service.enabled} onChange={(e) => onChange({ from: e.target.value })} className={timeCls} />
      <span className="text-gris-clair">→</span>
      <input type="time" value={service.to} disabled={!service.enabled} onChange={(e) => onChange({ to: e.target.value })} className={timeCls} />
    </div>
  );
}

export function Step2Hours({
  value,
  onChange,
}: {
  value: OnboardingData;
  onChange: (patch: Partial<OnboardingData>) => void;
}) {
  const hours = value.hours;

  const updateService = (dayIdx: number, service: "lunch" | "dinner", patch: Partial<Service>) => {
    onChange({
      hours: hours.map((d, i) => (i === dayIdx ? { ...d, [service]: { ...d[service], ...patch } } : d)),
    });
  };

  // Copie les horaires du Mardi sur Mardi → Samedi.
  const applyToWeek = () => {
    const ref = hours[1];
    onChange({
      hours: hours.map((d, i) =>
        i >= 1 && i <= 5 ? { ...d, lunch: { ...ref.lunch }, dinner: { ...ref.dinner } } : d,
      ),
    });
  };

  return (
    <div className="mt-6">
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={applyToWeek}
          className="inline-flex items-center gap-1.5 rounded-full border border-hair bg-blanc px-3.5 py-1.5 text-xs font-medium text-noir transition-colors hover:border-noir"
        >
          <Copy className="h-3.5 w-3.5" /> Appliquer Mar → Sam à toute la semaine
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-hair">
        {/* En-tête (desktop) */}
        <div className="hidden grid-cols-[110px_1fr_1fr] gap-3 border-b border-hair bg-creme/40 px-4 py-2 text-xs font-medium uppercase tracking-wide text-gris-fonce md:grid">
          <span>Jour</span><span>Midi</span><span>Soir</span>
        </div>

        {hours.map((d, i) => (
          <div
            key={d.day}
            className={cn(
              "grid grid-cols-1 gap-3 px-4 py-3 transition-colors hover:bg-creme/30 md:grid-cols-[110px_1fr_1fr] md:items-center",
              i < hours.length - 1 && "border-b border-hair",
            )}
          >
            <span className="text-sm font-medium text-noir">{d.day}</span>
            <ServiceBlock label={`${d.day} midi`} service={d.lunch} onChange={(p) => updateService(i, "lunch", p)} />
            <ServiceBlock label={`${d.day} soir`} service={d.dinner} onChange={(p) => updateService(i, "dinner", p)} />
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-gris-clair">Décochez un service pour marquer le restaurant fermé sur ce créneau.</p>
    </div>
  );
}
