"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Check, ImagePlus, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { BRAND_PRESETS, FONT_OPTIONS, type SocialKey } from "@/lib/mock-data";
import { ColorPresetButton } from "@/components/dashboard/color-preset-button";
import { PhoneFrame } from "@/components/dashboard/phone-frame";
import { LinktreePreview, type Customization } from "@/components/dashboard/linktree-preview";
import { FeatureLock } from "@/components/ui/FeatureLock";
import { getInitials } from "@/components/ui/Avatar";
import type { PlanKey } from "@/lib/plans";
import { cn } from "@/lib/utils";

const inputCls =
  "h-11 w-full rounded-xl border border-hair bg-creme/40 px-3.5 text-sm text-noir outline-none transition-colors placeholder:text-gris-clair focus:border-noir";
const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-gris-fonce";

type Props = {
  restaurant: {
    name: string; slug: string; tagline: string; logoUrl: string | null;
    primaryColor: string; backgroundColor: string; textColor: string; font: string;
    address: string; phone: string; email: string;
    depositEnabled: boolean; depositPerCover: number; cancellationWindow: number;
  };
  socials: { key: SocialKey; label: string; url: string; enabled: boolean }[];
  effectivePlan: PlanKey;
  inTrial: boolean;
};

export function BrandingStudio({ restaurant, socials, effectivePlan, inTrial }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [v, setV] = useState({
    name: restaurant.name,
    tagline: restaurant.tagline,
    logoUrl: restaurant.logoUrl,
    colors: { primary: restaurant.primaryColor, background: restaurant.backgroundColor, text: restaurant.textColor },
    font: restaurant.font,
    depositEnabled: restaurant.depositEnabled,
    depositPerCover: restaurant.depositPerCover,
    cancellationWindow: restaurant.cancellationWindow,
  });
  const set = (patch: Partial<typeof v>) => setV((p) => ({ ...p, ...patch }));

  const publicUrl = `tably.ch/${restaurant.slug}`;
  const activePreset = BRAND_PRESETS.find((p) => p.primary === v.colors.primary && p.bg === v.colors.background && p.text === v.colors.text);

  const custom: Customization = {
    restaurantName: v.name,
    tagline: v.tagline,
    logoUrl: v.logoUrl,
    colors: v.colors,
    font: v.font,
    address: restaurant.address,
    phone: restaurant.phone,
    email: restaurant.email,
    website: "",
    socialLinks: socials,
    reservations: { enabled: true, requireDeposit: v.depositEnabled, depositPerCover: v.depositPerCover, cancellationWindow: `${v.cancellationWindow}h` },
  };

  function onLogo(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => set({ logoUrl: reader.result as string });
    reader.readAsDataURL(file);
  }

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/restaurant/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: v.name, tagline: v.tagline, logoUrl: v.logoUrl, colors: v.colors, font: v.font,
          depositEnabled: v.depositEnabled, depositPerCover: v.depositPerCover, cancellationWindow: v.cancellationWindow,
        }),
      });
      if (!res.ok) toast.error("Échec de l'enregistrement.");
      else { toast.success("Page client mise à jour"); router.refresh(); }
    } catch { toast.error("Erreur réseau."); }
    finally { setSaving(false); }
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-noir sm:text-3xl">Ma page client</h1>
          <p className="mt-1 text-gris-fonce">Personnalisez votre page de réservation. L&apos;aperçu se met à jour en direct.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { navigator.clipboard?.writeText(`https://${publicUrl}`); setCopied(true); toast.success("Lien copié"); setTimeout(() => setCopied(false), 2000); }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-hair bg-blanc px-3 py-1.5 text-xs font-medium text-noir hover:border-noir"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {publicUrl}
          </button>
          <a href={`/r/${restaurant.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-hair bg-blanc px-3 py-1.5 text-xs font-medium text-noir hover:border-noir">
            <ExternalLink className="h-3.5 w-3.5" /> Voir
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Panneau */}
        <div className="space-y-5 pb-4">
          <section className="rounded-2xl border border-hair bg-blanc p-5">
            <h3 className="text-xs font-bold uppercase tracking-label text-noir">Identité</h3>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => onLogo(e.target.files?.[0])} />
            <div className="mt-4 flex items-center gap-4">
              <button type="button" onClick={() => fileRef.current?.click()} className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-hair hover:border-noir" aria-label="Logo">
                {v.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={v.logoUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-lg font-bold text-noir">{getInitials(v.name)}</span>
                )}
              </button>
              <span className="text-xs text-gris-fonce">PNG, JPG ou SVG. Sinon, vos initiales seront utilisées.</span>
            </div>
            <div className="mt-4 space-y-3">
              <div><label className={labelCls}>Nom</label><input value={v.name} onChange={(e) => set({ name: e.target.value })} className={inputCls} /></div>
              <div><label className={labelCls}>Tagline</label><input value={v.tagline} maxLength={100} onChange={(e) => set({ tagline: e.target.value })} className={inputCls} /></div>
            </div>
          </section>

          <section className="rounded-2xl border border-hair bg-blanc p-5">
            <h3 className="text-xs font-bold uppercase tracking-label text-noir">Couleurs</h3>
            <FeatureLock requiredPlan="pro" currentPlan={effectivePlan} isInTrial={inTrial} featureName="la personnalisation des couleurs">
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {BRAND_PRESETS.map((p) => (
                  <ColorPresetButton key={p.name} preset={p} active={activePreset?.name === p.name} onClick={() => set({ colors: { primary: p.primary, background: p.bg, text: p.text } })} />
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                {(["primary", "background", "text"] as const).map((k) => (
                  <input key={k} type="color" value={v.colors[k]} onChange={(e) => set({ colors: { ...v.colors, [k]: e.target.value } })} aria-label={k} className="h-8 w-10 cursor-pointer rounded-md border border-hair p-0.5" />
                ))}
              </div>
            </FeatureLock>
          </section>

          <section className="rounded-2xl border border-hair bg-blanc p-5">
            <h3 className="text-xs font-bold uppercase tracking-label text-noir">Police</h3>
            <FeatureLock requiredPlan="premium" currentPlan={effectivePlan} isInTrial={inTrial} featureName="les polices personnalisées">
              <select value={v.font} onChange={(e) => set({ font: e.target.value })} className={cn(inputCls, "mt-4 appearance-none")}>
                {FONT_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </FeatureLock>
          </section>

          <section className="rounded-2xl border border-hair bg-blanc p-5">
            <h3 className="text-xs font-bold uppercase tracking-label text-noir">Acompte</h3>
            <FeatureLock requiredPlan="pro" currentPlan={effectivePlan} isInTrial={inTrial} featureName="les acomptes">
              <button type="button" role="switch" aria-checked={v.depositEnabled} onClick={() => set({ depositEnabled: !v.depositEnabled })} className="mt-4 flex w-full items-center justify-between gap-3 text-sm text-noir">
                <span>Demander un acompte</span>
                <span className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", v.depositEnabled ? "bg-jaune-vif" : "bg-gris-clair/50")}>
                  <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-blanc shadow-sm transition-transform", v.depositEnabled ? "translate-x-[22px]" : "translate-x-0.5")} style={{ border: "1px solid rgba(0,0,0,0.1)" }} />
                </span>
              </button>
              {v.depositEnabled && (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div><label className={labelCls}>Montant / couvert (CHF)</label><input type="number" min={0} value={v.depositPerCover} onChange={(e) => set({ depositPerCover: Math.max(0, Number(e.target.value)) })} className={inputCls} /></div>
                  <div><label className={labelCls}>Délai d&apos;annulation</label>
                    <select value={v.cancellationWindow} onChange={(e) => set({ cancellationWindow: Number(e.target.value) })} className={cn(inputCls, "appearance-none")}>
                      {[24, 48, 72].map((h) => <option key={h} value={h}>{h}h</option>)}
                    </select>
                  </div>
                </div>
              )}
            </FeatureLock>
          </section>

          <div className="sticky bottom-0 -mx-1 border-t border-hair bg-creme/85 px-1 py-3 backdrop-blur-md">
            <button onClick={save} disabled={saving} className={cn("flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold transition-transform", saving ? "cursor-wait bg-noir/10 text-gris-fonce" : "bg-jaune-vif text-noir hover:-translate-y-0.5")}>
              {saving ? "Enregistrement…" : "Sauvegarder les modifications"}
            </button>
          </div>
        </div>

        {/* Aperçu */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex justify-center rounded-3xl border border-hair bg-creme/40 p-6">
            <PhoneFrame variant="mobile" url={publicUrl}>
              <LinktreePreview customization={custom} />
            </PhoneFrame>
          </div>
        </div>
      </div>
    </div>
  );
}
