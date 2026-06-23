"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check, ImagePlus, ArrowRight, Instagram, Facebook, MapPin, Star, Globe, Music2,
} from "lucide-react";
import { toast } from "sonner";
import {
  BRAND_PRESETS, DEFAULT_SOCIALS, DEFAULT_BRANDING, DEMO_RESTAURANT, type SocialKey,
} from "@/lib/mock-data";
import { ColorPresetButton } from "@/components/dashboard/color-preset-button";
import { Wordmark } from "@/components/brand/wordmark";
import { cn } from "@/lib/utils";

const STEPS = ["Restaurant", "Couleurs", "Liens", "Fini"];
const CUISINES = ["Suisse", "Française", "Italienne", "Asiatique", "Méditerranéenne", "Végétarienne"];
const SOCIAL_ICONS: Record<SocialKey, typeof Instagram> = {
  instagram: Instagram, facebook: Facebook, maps: MapPin, tripadvisor: Star, website: Globe, tiktok: Music2,
};
const SOCIAL_LABEL: Record<SocialKey, string> = {
  instagram: "Instagram", facebook: "Facebook", maps: "Google Maps", tripadvisor: "TripAdvisor", website: "Site web", tiktok: "TikTok",
};

const inputCls =
  "h-11 w-full rounded-xl border border-hair bg-blanc px-3.5 text-sm text-noir outline-none transition-colors placeholder:text-gris-clair focus:border-noir";
const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-gris-fonce";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [cuisines, setCuisines] = useState<string[]>(["Suisse"]);
  const [colors, setColors] = useState<{ primary: string; background: string; text: string }>({ ...DEFAULT_BRANDING });
  const [name, setName] = useState(DEMO_RESTAURANT.name);
  const [socials, setSocials] = useState(DEFAULT_SOCIALS.map((s) => ({ ...s })));

  const activePreset = BRAND_PRESETS.find((p) => p.primary === colors.primary && p.bg === colors.background && p.text === colors.text);

  function next() { setStep((s) => Math.min(s + 1, STEPS.length - 1)); }
  function finish() { toast.success("Bienvenue sur Tably"); router.push("/dashboard"); }

  return (
    <div className="min-h-[100dvh] bg-creme">
      <header className="border-b border-hair">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5 sm:px-8">
          <Wordmark />
          {step < STEPS.length - 1 && (
            <button onClick={next} className="text-sm text-gris-fonce hover:text-noir">Passer cette étape</button>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-5 py-10 sm:px-8">
        {/* Stepper */}
        <div className="mb-10 flex items-center">
          {STEPS.map((label, i) => (
            <div key={label} className={cn("flex items-center", i < STEPS.length - 1 && "flex-1")}>
              <div className="flex items-center gap-2">
                <span className={cn("inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors", i < step ? "bg-noir text-jaune-vif" : i === step ? "bg-jaune-vif text-noir" : "bg-noir/[0.06] text-gris-fonce")}>
                  {i < step ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
                </span>
                <span className={cn("hidden text-sm sm:block", i === step ? "font-bold text-noir" : "text-gris-fonce")}>{label}</span>
              </div>
              {i < STEPS.length - 1 && <span className={cn("mx-2 h-0.5 flex-1 rounded", i < step ? "bg-jaune-vif" : "bg-hair")} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl border border-hair bg-blanc p-6 sm:p-8"
          >
            {step === 0 && (
              <div className="space-y-4">
                <h1 className="text-2xl font-bold tracking-tight text-noir">Parlez-nous de votre restaurant</h1>
                <div><label className={labelCls}>Nom du restaurant</label><input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} /></div>
                <div><label className={labelCls}>Adresse complète</label><input defaultValue={DEMO_RESTAURANT.address} className={inputCls} /></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><label className={labelCls}>Téléphone</label><input defaultValue={DEMO_RESTAURANT.phone} className={inputCls} /></div>
                  <div><label className={labelCls}>Couverts moyen / service</label>
                    <select className={cn(inputCls, "appearance-none")} defaultValue="30–50">
                      {["< 30", "30–50", "50–80", "> 80"].map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Type de cuisine</label>
                  <div className="flex flex-wrap gap-2">
                    {CUISINES.map((c) => {
                      const on = cuisines.includes(c);
                      return (
                        <button key={c} type="button" onClick={() => setCuisines((cs) => on ? cs.filter((x) => x !== c) : [...cs, c])}
                          className={cn("rounded-full border px-3 py-1.5 text-sm transition-colors", on ? "border-jaune-vif bg-jaune-vif font-medium text-noir" : "border-hair text-noir hover:border-noir")}>
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-6 sm:grid-cols-[1.4fr_1fr]">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-noir">Votre branding</h1>
                  <button type="button" className="mt-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-hair text-gris-fonce hover:border-noir" aria-label="Logo">
                    <ImagePlus className="h-5 w-5" />
                  </button>
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {BRAND_PRESETS.map((p) => (
                      <ColorPresetButton key={p.name} preset={p} active={activePreset?.name === p.name} onClick={() => setColors({ primary: p.primary, background: p.bg, text: p.text })} />
                    ))}
                  </div>
                  <div className="mt-4 flex gap-3">
                    {(["primary", "background", "text"] as const).map((k) => (
                      <label key={k} className="flex items-center gap-2 text-xs text-gris-fonce">
                        <input type="color" value={colors[k]} onChange={(e) => setColors({ ...colors, [k]: e.target.value })} className="h-8 w-9 cursor-pointer rounded-md border border-hair p-0.5" />
                      </label>
                    ))}
                  </div>
                </div>
                {/* Aperçu live mini */}
                <div className="rounded-2xl p-5 text-center transition-colors duration-300" style={{ backgroundColor: colors.background, color: colors.text }}>
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold" style={{ backgroundColor: colors.primary, color: colors.background }}>{DEMO_RESTAURANT.monogram}</div>
                  <p className="mt-3 text-sm font-bold">{name}</p>
                  <p className="mt-1 text-xs opacity-70">{DEMO_RESTAURANT.tagline}</p>
                  <div className="mt-4 rounded-lg py-2 text-xs font-bold" style={{ backgroundColor: colors.primary, color: colors.background }}>Réserver une table</div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-noir">Vos liens</h1>
                <p className="mt-1 text-sm text-gris-fonce">Activez ce que vos clients verront sur votre page.</p>
                <ul className="mt-4 space-y-2">
                  {socials.map((l) => {
                    const Icon = SOCIAL_ICONS[l.key];
                    return (
                      <li key={l.key} className="flex items-center gap-2 rounded-xl border border-hair p-2">
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-creme/60"><Icon className="h-4 w-4 text-noir" /></span>
                        <input defaultValue={l.url} placeholder={SOCIAL_LABEL[l.key]} className="h-8 min-w-0 flex-1 rounded-lg border border-transparent bg-transparent px-2 text-xs text-noir outline-none focus:border-hair" />
                        <button type="button" onClick={() => setSocials((ss) => ss.map((s) => s.key === l.key ? { ...s, enabled: !s.enabled } : s))}
                          className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", l.enabled ? "bg-jaune-vif" : "bg-gris-clair/50")} aria-label={SOCIAL_LABEL[l.key]} role="switch" aria-checked={l.enabled}>
                          <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-blanc shadow-sm transition-transform", l.enabled ? "translate-x-[22px]" : "translate-x-0.5")} style={{ border: "1px solid rgba(0,0,0,0.1)" }} />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {step === 3 && (
              <div className="text-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-jaune-vif text-noir"><Check className="h-7 w-7" strokeWidth={2.5} /></span>
                <h1 className="mt-5 text-2xl font-bold tracking-tight text-noir">Tout est prêt, {name} !</h1>
                <p className="mt-2 text-sm text-gris-fonce">Votre page de réservation est en ligne à l&apos;adresse :</p>
                <code className="mt-3 inline-block rounded-lg border border-hair bg-creme/60 px-3 py-1.5 font-mono text-sm text-noir">tably.ch/{DEMO_RESTAURANT.slug}</code>
                <button onClick={finish} className="mt-8 inline-flex items-center gap-2 rounded-full bg-jaune-vif px-8 py-4 text-sm font-bold text-noir transition-transform hover:-translate-y-0.5">
                  Accéder à mon dashboard <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {step < STEPS.length - 1 && (
          <div className="mt-6 flex items-center justify-between">
            <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}
              className={cn("text-sm font-medium", step === 0 ? "invisible" : "text-noir hover:underline")}>← Retour</button>
            <button onClick={next} className="inline-flex items-center gap-2 rounded-full bg-noir px-6 py-3 text-sm font-bold text-jaune-vif transition-transform hover:-translate-y-0.5">
              Continuer <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
