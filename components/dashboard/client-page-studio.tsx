"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  Copy,
  Check,
  Smartphone,
  Monitor,
  ImagePlus,
  GripVertical,
  Instagram,
  Facebook,
  MapPin,
  Star,
  Globe,
  Music2,
  RotateCcw,
} from "lucide-react";
import {
  DEMO_RESTAURANT,
  DEFAULT_SOCIALS,
  BRAND_PRESETS,
  DEFAULT_BRANDING,
  FONT_OPTIONS,
  OPENING_HOURS,
  type SocialKey,
} from "@/lib/mock-data";
import { toast } from "sonner";
import { ColorPresetButton } from "@/components/dashboard/color-preset-button";
import { PhoneFrame } from "@/components/dashboard/phone-frame";
import {
  LinktreePreview,
  type Customization,
} from "@/components/dashboard/linktree-preview";
import { cn } from "@/lib/utils";

const PUBLIC_URL = `tably.ch/${DEMO_RESTAURANT.slug}`;
const PUBLIC_ROUTE = `/r/${DEMO_RESTAURANT.slug}`;

const inputCls =
  "h-11 w-full rounded-xl border border-hair bg-creme/40 px-3.5 text-sm text-noir outline-none transition-colors placeholder:text-gris-clair focus:border-noir";
const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-gris-fonce";

const SOCIAL_ICONS: Record<SocialKey, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
  maps: MapPin,
  tripadvisor: Star,
  website: Globe,
  tiktok: Music2,
};

function Section({ title, desc, children }: { title: string; desc?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-hair bg-blanc p-5">
      <h3 className="text-xs font-bold uppercase tracking-label text-noir">{title}</h3>
      {desc && <p className="mt-1 text-xs text-gris-fonce">{desc}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label || undefined}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 text-sm text-noir"
    >
      {label && <span>{label}</span>}
      <span
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-jaune-vif" : "bg-gris-clair/50",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-blanc shadow-sm transition-transform",
            checked ? "translate-x-[22px]" : "translate-x-0.5",
          )}
          style={{ border: "1px solid rgba(0,0,0,0.1)" }}
        />
      </span>
    </button>
  );
}

const DEFAULT_STATE: Customization = {
  restaurantName: DEMO_RESTAURANT.name,
  tagline: DEMO_RESTAURANT.tagline,
  logoUrl: null,
  colors: { ...DEFAULT_BRANDING },
  font: "Helvetica Now Display",
  address: DEMO_RESTAURANT.address,
  phone: DEMO_RESTAURANT.phone,
  email: DEMO_RESTAURANT.email,
  website: DEMO_RESTAURANT.website,
  socialLinks: DEFAULT_SOCIALS.map((s) => ({ ...s })),
  reservations: { enabled: true, requireDeposit: true, depositPerCover: 10, cancellationWindow: "48h" },
};

export function ClientPageStudio() {
  const [c, setC] = useState<Customization>(DEFAULT_STATE);
  const [view, setView] = useState<"mobile" | "desktop">("mobile");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (patch: Partial<Customization>) => setC((p) => ({ ...p, ...patch }));
  const setColor = (key: "primary" | "background" | "text", val: string) =>
    setC((p) => ({ ...p, colors: { ...p.colors, [key]: val } }));

  const activePreset = BRAND_PRESETS.find(
    (p) => p.primary === c.colors.primary && p.bg === c.colors.background && p.text === c.colors.text,
  );

  function onLogoFile(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => set({ logoUrl: reader.result as string });
    reader.readAsDataURL(file);
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* ============================ PANNEAU GAUCHE ============================ */}
      <div className="space-y-5 pb-4">
        {/* 1 — Identité */}
        <Section title="Identité">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onLogoFile(e.target.files?.[0])}
          />
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                onLogoFile(e.dataTransfer.files?.[0]);
              }}
              className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-hair text-gris-fonce transition-colors hover:border-noir"
              aria-label="Téléverser un logo"
            >
              {c.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.logoUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <ImagePlus className="h-6 w-6" strokeWidth={1.5} />
              )}
            </button>
            <div className="text-sm text-gris-fonce">
              <p className="font-medium text-noir">Logo du restaurant</p>
              <p className="mt-0.5">Glissez une image ou cliquez. PNG/JPG, carré de préférence.</p>
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="cz-name" className={labelCls}>Nom du restaurant</label>
            <input id="cz-name" value={c.restaurantName} onChange={(e) => set({ restaurantName: e.target.value })} className={inputCls} />
          </div>

          <div className="mt-4">
            <label htmlFor="cz-tag" className={labelCls}>Tagline</label>
            <textarea
              id="cz-tag"
              value={c.tagline}
              maxLength={100}
              onChange={(e) => set({ tagline: e.target.value })}
              rows={2}
              className={cn(inputCls, "h-auto resize-none py-2.5")}
            />
            <p className="mt-1 text-right text-xs text-gris-clair">{c.tagline.length}/100</p>
          </div>
        </Section>

        {/* 2 — Couleurs */}
        <Section title="Couleurs de marque" desc="Choisissez un preset ou réglez chaque couleur.">
          <div className="grid grid-cols-2 gap-2">
            {BRAND_PRESETS.map((p) => (
              <ColorPresetButton
                key={p.name}
                preset={p}
                active={activePreset?.name === p.name}
                onClick={() => set({ colors: { primary: p.primary, background: p.bg, text: p.text } })}
              />
            ))}
          </div>

          <div className="mt-5 space-y-3">
            {([
              ["primary", "Couleur principale (CTA)"],
              ["background", "Couleur de fond"],
              ["text", "Couleur du texte"],
            ] as const).map(([key, label]) => (
              <div key={key} className="flex items-center gap-3">
                <input
                  type="color"
                  value={c.colors[key]}
                  onChange={(e) => setColor(key, e.target.value)}
                  aria-label={label}
                  className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border border-hair bg-transparent p-1"
                />
                <div className="flex flex-1 items-center justify-between">
                  <span className="text-sm text-noir">{label}</span>
                  <span className="font-mono text-xs uppercase text-gris-fonce">{c.colors[key]}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setC(DEFAULT_STATE);
              toast.success("Branding réinitialisé");
            }}
            className="mt-4 inline-flex items-center gap-1.5 text-xs text-gris-fonce underline decoration-gris-clair underline-offset-4 hover:text-noir"
          >
            <RotateCcw className="h-3 w-3" />
            Réinitialiser au branding Tably
          </button>
        </Section>

        {/* 3 — Police */}
        <Section title="Police">
          <select
            value={c.font}
            onChange={(e) => set({ font: e.target.value })}
            className={cn(inputCls, "appearance-none")}
          >
            {FONT_OPTIONS.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </Section>

        {/* 4 — Infos */}
        <Section title="Informations restaurant">
          <div className="space-y-3">
            {([
              ["address", "Adresse"],
              ["phone", "Téléphone"],
              ["email", "Email"],
              ["website", "Site web"],
            ] as const).map(([key, label]) => (
              <div key={key}>
                <label className={labelCls}>{label}</label>
                <input value={c[key]} onChange={(e) => set({ [key]: e.target.value } as Partial<Customization>)} className={inputCls} />
              </div>
            ))}
          </div>

          <div className="mt-5">
            <p className={labelCls}>Horaires</p>
            <div className="overflow-hidden rounded-xl border border-hair">
              {OPENING_HOURS.map((h, i) => (
                <div
                  key={h.day}
                  className={cn(
                    "grid grid-cols-[1fr_auto] gap-2 px-3 py-2 text-xs",
                    i % 2 === 0 ? "bg-creme/40" : "bg-blanc",
                  )}
                >
                  <span className="text-noir">{h.day}</span>
                  <span className="font-mono text-gris-fonce">{h.midi} · {h.soir}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 5 — Liens sociaux */}
        <Section title="Liens sociaux" desc="Activez et réordonnez les liens de votre page.">
          <ul className="space-y-2">
            {c.socialLinks.map((l) => {
              const Icon = SOCIAL_ICONS[l.key];
              return (
                <li key={l.key} className="flex items-center gap-2 rounded-xl border border-hair p-2">
                  <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-gris-clair" />
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-creme/60">
                    <Icon className="h-4 w-4 text-noir" strokeWidth={2} />
                  </span>
                  <input
                    value={l.url}
                    onChange={(e) =>
                      set({ socialLinks: c.socialLinks.map((s) => (s.key === l.key ? { ...s, url: e.target.value } : s)) })
                    }
                    className="h-8 min-w-0 flex-1 rounded-lg border border-transparent bg-transparent px-2 text-xs text-noir outline-none focus:border-hair"
                  />
                  <Toggle
                    label=""
                    checked={l.enabled}
                    onChange={(v) =>
                      set({ socialLinks: c.socialLinks.map((s) => (s.key === l.key ? { ...s, enabled: v } : s)) })
                    }
                  />
                </li>
              );
            })}
          </ul>
        </Section>

        {/* 6 — Réservation */}
        <Section title="Options de réservation">
          <div className="space-y-4">
            <Toggle
              label="Activer les réservations en ligne"
              checked={c.reservations.enabled}
              onChange={(v) => set({ reservations: { ...c.reservations, enabled: v } })}
            />
            <Toggle
              label="Demander un acompte"
              checked={c.reservations.requireDeposit}
              onChange={(v) => set({ reservations: { ...c.reservations, requireDeposit: v } })}
            />
            {c.reservations.requireDeposit && (
              <div>
                <label className={labelCls}>Montant par couvert (CHF)</label>
                <input
                  type="number"
                  min={0}
                  value={c.reservations.depositPerCover}
                  onChange={(e) => set({ reservations: { ...c.reservations, depositPerCover: Number(e.target.value) } })}
                  className={inputCls}
                />
              </div>
            )}
            <div>
              <label className={labelCls}>Délai d&apos;annulation</label>
              <select
                value={c.reservations.cancellationWindow}
                onChange={(e) => set({ reservations: { ...c.reservations, cancellationWindow: e.target.value } })}
                className={cn(inputCls, "appearance-none")}
              >
                {["24h", "48h", "72h"].map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>
          </div>
        </Section>

        {/* Barre sticky de sauvegarde */}
        <div className="sticky bottom-0 -mx-1 border-t border-hair bg-creme/85 px-1 py-3 backdrop-blur-md">
          <button
            onClick={() => {
              setSaved(true);
              toast.success("Modifications enregistrées");
              setTimeout(() => setSaved(false), 2000);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-jaune-vif py-3.5 text-sm font-bold text-noir shadow-lift-sm transition-transform hover:-translate-y-0.5"
          >
            {saved ? <Check className="h-4 w-4" strokeWidth={2.5} /> : null}
            {saved ? "Modifications enregistrées" : "Sauvegarder les modifications"}
          </button>
        </div>
      </div>

      {/* ============================ APERÇU DROITE ============================ */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              href={PUBLIC_ROUTE}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-hair bg-blanc px-3 py-1.5 font-mono text-xs text-noir transition-colors hover:border-noir"
            >
              {PUBLIC_URL}
            </a>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(`https://${PUBLIC_URL}`).then(() => {
                  setCopied(true);
                  toast.success("Lien copié");
                  setTimeout(() => setCopied(false), 2000);
                });
              }}
              aria-label="Copier le lien"
              className="inline-flex items-center gap-1.5 rounded-lg border border-hair bg-blanc px-3 py-1.5 text-xs font-medium text-noir transition-colors hover:border-noir"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copié" : "Copier"}
            </button>
          </div>

          <div className="inline-flex rounded-full border border-hair bg-blanc p-1">
            {([
              ["mobile", Smartphone],
              ["desktop", Monitor],
            ] as const).map(([v, Icon]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                aria-label={v}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors",
                  view === v ? "bg-noir text-creme" : "text-gris-fonce hover:text-noir",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {v === "mobile" ? "Mobile" : "Desktop"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center rounded-3xl border border-hair bg-creme/40 p-6">
          <PhoneFrame variant={view} url={PUBLIC_URL}>
            <LinktreePreview customization={c} />
          </PhoneFrame>
        </div>
      </div>
    </div>
  );
}
