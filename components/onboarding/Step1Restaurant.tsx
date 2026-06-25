"use client";

import { Check } from "lucide-react";
import { CUISINES, ONBOARDING_CITIES, type OnboardingData } from "./types";
import { cn } from "@/lib/utils";

const inputCls =
  "h-11 w-full rounded-xl border border-hair bg-creme/40 px-3.5 text-sm text-noir outline-none transition-colors placeholder:text-gris-clair focus:border-noir";
const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-gris-fonce";

export function Step1Restaurant({
  value,
  onChange,
}: {
  value: OnboardingData;
  onChange: (patch: Partial<OnboardingData>) => void;
}) {
  const toggleCuisine = (c: string) =>
    onChange({
      cuisines: value.cuisines.includes(c)
        ? value.cuisines.filter((x) => x !== c)
        : [...value.cuisines, c],
    });

  return (
    <div className="mt-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ob-name" className={labelCls}>Nom du restaurant</label>
          <input id="ob-name" value={value.name} onChange={(e) => onChange({ name: e.target.value })} placeholder="Ex. Le Cerf Genevois" className={inputCls} />
        </div>
        <div>
          <label htmlFor="ob-tagline" className={labelCls}>Tagline <span className="text-gris-clair">(optionnel)</span></label>
          <input id="ob-tagline" value={value.tagline} maxLength={100} onChange={(e) => onChange({ tagline: e.target.value })} placeholder="Cuisine de terroir" className={inputCls} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
        <div>
          <label htmlFor="ob-address" className={labelCls}>Adresse</label>
          <input id="ob-address" value={value.address} onChange={(e) => onChange({ address: e.target.value })} placeholder="Rue de Rive 12" className={inputCls} />
        </div>
        <div>
          <label htmlFor="ob-cp" className={labelCls}>Code postal</label>
          <input id="ob-cp" inputMode="numeric" value={value.postalCode} onChange={(e) => onChange({ postalCode: e.target.value.replace(/\D/g, "").slice(0, 4) })} placeholder="1204" className={inputCls} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ob-city" className={labelCls}>Ville</label>
          <select id="ob-city" value={value.city} onChange={(e) => onChange({ city: e.target.value })} className={cn(inputCls, "appearance-none", !value.city && "text-gris-clair")}>
            <option value="" disabled>Choisir…</option>
            {ONBOARDING_CITIES.map((c) => <option key={c} value={c} className="text-noir">{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="ob-phone" className={labelCls}>Téléphone</label>
          <input id="ob-phone" type="tel" value={value.phone} onChange={(e) => onChange({ phone: e.target.value })} placeholder="+41 22 000 00 00" className={inputCls} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ob-email" className={labelCls}>Email de contact</label>
          <input id="ob-email" type="email" value={value.email} onChange={(e) => onChange({ email: e.target.value })} placeholder="contact@restaurant.ch" className={inputCls} />
        </div>
        <div>
          <label htmlFor="ob-covers" className={labelCls}>Couverts moyen / service</label>
          <input id="ob-covers" type="number" min={1} value={value.avgCovers} onChange={(e) => onChange({ avgCovers: Math.max(0, Number(e.target.value)) })} placeholder="50" className={inputCls} />
        </div>
      </div>

      {/* Type de cuisine — chips multi-select */}
      <div>
        <label className={labelCls}>Type de cuisine <span className="text-gris-clair">(au moins 1)</span></label>
        <div className="flex flex-wrap gap-2">
          {CUISINES.map((c) => {
            const on = value.cuisines.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggleCuisine(c)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
                  on ? "border-noir bg-jaune-vif font-medium text-noir" : "border-hair text-noir hover:border-noir",
                )}
              >
                {on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                {c}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
