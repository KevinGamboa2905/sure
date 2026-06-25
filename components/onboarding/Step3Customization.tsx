"use client";

import { useRef } from "react";
import {
  ImagePlus, Lock, Info, Instagram, Facebook, MapPin, Star, Music2, Globe,
} from "lucide-react";
import { BRAND_PRESETS, FONT_OPTIONS } from "@/lib/mock-data";
import { ColorPresetButton } from "@/components/dashboard/color-preset-button";
import type { OnboardingData } from "./types";
import { cn } from "@/lib/utils";

const inputCls =
  "h-11 w-full rounded-xl border border-hair bg-creme/40 px-3.5 text-sm text-noir outline-none transition-colors placeholder:text-gris-clair focus:border-noir";
const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-gris-fonce";

const SOCIAL_ICONS: Record<string, typeof Instagram> = {
  instagram: Instagram, facebook: Facebook, maps: MapPin, tripadvisor: Star, tiktok: Music2, website: Globe,
};

function PlanBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-noir px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-jaune-vif">
      <Lock className="h-2.5 w-2.5" /> {label}
    </span>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2 flex items-start gap-1.5 text-xs text-gris-fonce">
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gris-clair" /> {children}
    </p>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return parts.map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export function Step3Customization({
  value,
  onChange,
}: {
  value: OnboardingData;
  onChange: (patch: Partial<OnboardingData>) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const activePreset = BRAND_PRESETS.find(
    (p) => p.primary === value.colors.primary && p.bg === value.colors.background && p.text === value.colors.text,
  );

  function onLogoFile(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange({ logoUrl: reader.result as string });
    reader.readAsDataURL(file);
  }

  return (
    <div className="mt-6 space-y-8">
      {/* 1 — Logo */}
      <section>
        <h3 className="text-sm font-bold uppercase tracking-label text-noir">Logo</h3>
        <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/svg+xml" className="hidden" onChange={(e) => onLogoFile(e.target.files?.[0])} />
        <div className="mt-3 flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); onLogoFile(e.dataTransfer.files?.[0]); }}
            className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-hair text-gris-fonce transition-colors hover:border-noir"
            aria-label="Téléverser un logo"
          >
            {value.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value.logoUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="text-lg font-bold text-noir">{initials(value.name)}</span>
            )}
          </button>
          <div className="text-sm text-gris-fonce">
            <button type="button" onClick={() => fileRef.current?.click()} className="font-medium text-noir underline decoration-jaune-vif decoration-2 underline-offset-4">
              Choisir un fichier
            </button>{" "}
            ou glissez-le ici · PNG, JPG, SVG (max 2 Mo).
            <p className="mt-0.5 text-xs text-gris-clair">Sans logo, vos initiales « {initials(value.name)} » seront utilisées.</p>
          </div>
        </div>
      </section>

      {/* 2 — Couleurs */}
      <section>
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold uppercase tracking-label text-noir">Couleurs</h3>
          <PlanBadge label="Pro & Premium" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {BRAND_PRESETS.map((p) => (
            <ColorPresetButton
              key={p.name}
              preset={p}
              active={activePreset?.name === p.name}
              onClick={() => onChange({ colors: { primary: p.primary, background: p.bg, text: p.text } })}
            />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-3">
          {([["primary", "Principale"], ["background", "Fond"], ["text", "Texte"]] as const).map(([k, lbl]) => (
            <label key={k} className="flex items-center gap-2 text-xs text-gris-fonce">
              <input
                type="color"
                value={value.colors[k]}
                onChange={(e) => onChange({ colors: { ...value.colors, [k]: e.target.value } })}
                aria-label={lbl}
                className="h-8 w-10 cursor-pointer rounded-md border border-hair p-0.5"
              />
              {lbl}
            </label>
          ))}
        </div>
        <Hint>Après les 30 jours d&apos;essai, la personnalisation des couleurs nécessitera le plan Pro.</Hint>
      </section>

      {/* 3 — Police */}
      <section>
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold uppercase tracking-label text-noir">Police</h3>
          <PlanBadge label="Premium" />
        </div>
        <select value={value.font} onChange={(e) => onChange({ font: e.target.value })} className={cn(inputCls, "mt-3 appearance-none")}>
          {FONT_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
        <Hint>Hors essai, les polices personnalisées sont réservées au plan Premium.</Hint>
      </section>

      {/* 4 — Acompte */}
      <section>
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold uppercase tracking-label text-noir">Acompte</h3>
          <PlanBadge label="Pro & Premium" />
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={value.depositEnabled}
          onClick={() => onChange({ depositEnabled: !value.depositEnabled })}
          className="mt-3 flex w-full items-center justify-between gap-3 text-sm text-noir"
        >
          <span>Activer les acomptes à la réservation</span>
          <span className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", value.depositEnabled ? "bg-jaune-vif" : "bg-gris-clair/50")}>
            <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-blanc shadow-sm transition-transform", value.depositEnabled ? "translate-x-[22px]" : "translate-x-0.5")} style={{ border: "1px solid rgba(0,0,0,0.1)" }} />
          </span>
        </button>
        {value.depositEnabled && (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Montant par couvert (CHF)</label>
              <input type="number" min={0} value={value.depositPerCover} onChange={(e) => onChange({ depositPerCover: Math.max(0, Number(e.target.value)) })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Délai d&apos;annulation gratuite</label>
              <select value={value.cancellationWindow} onChange={(e) => onChange({ cancellationWindow: Number(e.target.value) })} className={cn(inputCls, "appearance-none")}>
                {[24, 48, 72].map((h) => <option key={h} value={h}>{h}h</option>)}
              </select>
            </div>
          </div>
        )}
        <Hint>Vous pourrez configurer Stripe Connect dans vos paramètres après l&apos;onboarding.</Hint>
      </section>

      {/* 5 — Liens sociaux */}
      <section>
        <h3 className="text-sm font-bold uppercase tracking-label text-noir">Liens sociaux</h3>
        <ul className="mt-3 space-y-2">
          {value.socials.map((s) => {
            const Icon = SOCIAL_ICONS[s.key] ?? Globe;
            return (
              <li key={s.key} className="flex items-center gap-2 rounded-xl border border-hair p-2">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-creme/60">
                  <Icon className="h-4 w-4 text-noir" strokeWidth={2} />
                </span>
                <input
                  value={s.url}
                  placeholder={s.label}
                  onChange={(e) => onChange({ socials: value.socials.map((x) => (x.key === s.key ? { ...x, url: e.target.value } : x)) })}
                  className="h-8 min-w-0 flex-1 rounded-lg border border-transparent bg-transparent px-2 text-xs text-noir outline-none focus:border-hair"
                />
                <button
                  type="button"
                  role="switch"
                  aria-checked={s.enabled}
                  aria-label={s.label}
                  onClick={() => onChange({ socials: value.socials.map((x) => (x.key === s.key ? { ...x, enabled: !x.enabled } : x)) })}
                  className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", s.enabled ? "bg-jaune-vif" : "bg-gris-clair/50")}
                >
                  <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-blanc shadow-sm transition-transform", s.enabled ? "translate-x-[22px]" : "translate-x-0.5")} style={{ border: "1px solid rgba(0,0,0,0.1)" }} />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
