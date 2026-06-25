"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Wordmark } from "@/components/brand/wordmark";
import { Stepper } from "@/components/onboarding/Stepper";
import { Step1Restaurant } from "@/components/onboarding/Step1Restaurant";
import { Step2Hours } from "@/components/onboarding/Step2Hours";
import { Step3Customization } from "@/components/onboarding/Step3Customization";
import { DEFAULT_ONBOARDING, validateStep1, type OnboardingData } from "@/components/onboarding/types";
import { cn } from "@/lib/utils";

const STEPS = ["Votre restaurant", "Vos horaires", "Personnalisation"];

const STEP_META = [
  { title: "Parlez-nous de votre restaurant", subtitle: "Quelques infos pour configurer votre espace Tably." },
  { title: "Vos horaires d'ouverture", subtitle: "Vous pourrez les modifier à tout moment." },
  { title: "Personnalisez votre page client", subtitle: "Pendant votre essai, vous avez accès à toutes les fonctionnalités Pro." },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState<OnboardingData>(DEFAULT_ONBOARDING);
  const set = (patch: Partial<OnboardingData>) => setData((p) => ({ ...p, ...patch }));

  const last = STEPS.length - 1;
  const meta = STEP_META[step];
  const stepValid = step === 0 ? validateStep1(data) : true;

  async function finish() {
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/restaurant/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok) {
        toast.error(payload?.error ?? "Impossible de créer le restaurant.");
        setSubmitting(false);
        return;
      }
      toast.success("Bienvenue sur Tably");
      router.push("/dashboard");
    } catch {
      toast.error("Erreur réseau. Réessayez.");
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-[100dvh] bg-creme">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5 sm:px-8">
        <Wordmark href={null} />
        <span className="inline-flex items-center gap-1.5 rounded-full bg-jaune-vif px-3.5 py-1.5 text-xs font-bold text-noir">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
          Essai 30 jours · Plan Pro inclus
        </span>
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-16 sm:px-8">
        <div className="px-2 pt-4">
          <Stepper steps={STEPS} current={step} />
        </div>

        <div className="mt-4 rounded-3xl border border-hair bg-blanc p-6 shadow-card sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-2xl font-bold tracking-tight text-noir sm:text-3xl">{meta.title}</h1>
              <p className="mt-1.5 text-gris-fonce">{meta.subtitle}</p>

              {step === 0 && <Step1Restaurant value={data} onChange={set} />}
              {step === 1 && <Step2Hours value={data} onChange={set} />}
              {step === 2 && <Step3Customization value={data} onChange={set} />}
            </motion.div>
          </AnimatePresence>

          <div className="mt-7 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className={step === 0 ? "invisible" : "inline-flex items-center gap-1.5 text-sm font-medium text-noir hover:underline"}
            >
              <ArrowLeft className="h-4 w-4" /> Précédent
            </button>

            {step < last ? (
              <button
                onClick={() => stepValid && setStep((s) => Math.min(last, s + 1))}
                disabled={!stepValid}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all",
                  stepValid
                    ? "bg-jaune-vif text-noir hover:-translate-y-0.5"
                    : "cursor-not-allowed bg-noir/10 text-gris-fonce",
                )}
              >
                Continuer <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </button>
            ) : (
              <button
                onClick={finish}
                disabled={submitting}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all",
                  submitting ? "cursor-wait bg-noir/10 text-gris-fonce" : "bg-jaune-vif text-noir hover:-translate-y-0.5",
                )}
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {submitting ? "Création…" : "Terminer & accéder à mon dashboard"}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
