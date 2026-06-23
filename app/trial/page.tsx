import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  X,
  Sparkles,
  Infinity as InfinityIcon,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import { Wordmark } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { MiniAccordion } from "@/components/marketing/mini-accordion";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Essai gratuit 30 jours",
  description:
    "30 jours pour transformer votre gestion de réservations. Toutes les fonctionnalités Pro, sans carte bancaire.",
};

const INCLUDED = [
  { icon: Sparkles, title: "Toutes les fonctionnalités Pro", desc: "Aucune bridée pendant l'essai — vous testez le vrai produit." },
  { icon: InfinityIcon, title: "Réservations illimitées", desc: "Aucun plafond, aucun compteur. Remplissez votre salle." },
  { icon: MessageSquareText, title: "SMS automatiques inclus", desc: "Rappels J-1 et H-2 envoyés pour vous, sans surcoût." },
  { icon: ShieldCheck, title: "Acomptes Stripe activables", desc: "Responsabilisez les grandes tables en un toggle." },
];

const WITHOUT = [
  "Tables vides sans prévenir",
  "Rappels manuels chronophages",
  "Aucune garantie de présence",
  "Du CA perdu chaque week-end",
];
const WITH = [
  "Rappels SMS automatiques",
  "Acompte qui responsabilise",
  "Présence garantie ou compensée",
  "+18% de couverts honorés",
];

const STEPS = [
  { day: "Jour 1", title: "Installation", desc: "10 minutes pour configurer horaires, SMS et page de réservation." },
  { day: "Jour 7", title: "Premiers résultats", desc: "Vos premiers rappels partent, les confirmations tombent." },
  { day: "Jour 15", title: "ROI mesurable", desc: "No-shows en chute, premiers acomptes récupérés." },
  { day: "Jour 30", title: "Décision", desc: "Vous gardez, ou vous partez avec vos données. Sans friction." },
];

const FAQ = [
  { q: "Que se passe-t-il après 30 jours ?", a: "Vous choisissez un plan pour continuer, ou vous arrêtez. Aucune reconduction surprise, aucune CB débitée sans votre accord." },
  { q: "Une carte bancaire est-elle requise ?", a: "Non. L'essai démarre sans carte bancaire. Vous ne renseignez un moyen de paiement que si vous décidez de continuer." },
  { q: "Puis-je migrer mes anciennes réservations ?", a: "Oui, par import CSV en quelques clics. Tably est un outil autonome : il ne dépend d'aucun autre système de réservation pour fonctionner." },
];

export default function TrialPage() {
  return (
    <div className="bg-creme">
      {/* Header léger */}
      <header className="sticky top-0 z-50 border-b border-hair bg-creme/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Wordmark />
          <Button asChild size="sm" variant="primary">
            <a href="/signup">Démarrer</a>
          </Button>
        </div>
      </header>

      {/* 1 — Hero centré */}
      <section className="relative overflow-hidden px-5 pb-20 pt-20 text-center sm:px-8 lg:pt-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(188,188,188,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(188,188,188,0.22) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 60% 60% at 50% 30%, #000 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 30%, #000 40%, transparent 100%)",
          }}
        />
        <RevealGroup className="relative mx-auto max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-hair bg-blanc/70 px-3.5 py-1.5 text-xs font-medium text-gris-fonce">
              <span className="h-2 w-2 rounded-full bg-[#2f8f4e]" />
              Essai gratuit · 30 jours
            </span>
          </Reveal>
          <Reveal>
            <h1 className="mt-6 text-5xl font-bold leading-[0.95] tracking-tight text-noir md:text-7xl">
              30 jours pour transformer votre gestion de{" "}
              <span className="stabilo">réservations.</span>
            </h1>
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-6 max-w-xl text-lg text-gris-fonce">
              Le vrai produit, sans bridage, sans carte bancaire. Mesurez vous-même
              la chute des no-shows avant de décider.
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-9 flex flex-col items-center gap-3">
              <Button asChild size="lg" variant="primary">
                <a href="/signup">Démarrer maintenant<ArrowRight className="h-4 w-4" strokeWidth={2} /></a>
              </Button>
              <p className="text-sm text-gris-fonce">Sans CB · Installation en 10 minutes</p>
            </div>
          </Reveal>
        </RevealGroup>
      </section>

      {/* 2 — Inclus dans l'essai (bento asymétrique) */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <RevealGroup className="max-w-xl">
            <Reveal><p className="kicker">Ce qui est inclus</p></Reveal>
            <Reveal>
              <h2 className="mt-4 text-4xl tracking-tight md:text-5xl">
                Tout le plan Pro, <span className="stabilo">débloqué.</span>
              </h2>
            </Reveal>
          </RevealGroup>

          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-2">
            {/* Carte large */}
            <Reveal className="md:col-span-2 md:row-span-2">
              <article className="flex h-full flex-col justify-between rounded-3xl border border-noir bg-jaune-vif p-8 shadow-card lg:p-10">
                <Sparkles className="h-8 w-8 text-noir" strokeWidth={1.5} />
                <div className="mt-8">
                  <h3 className="text-2xl font-bold tracking-tight text-noir md:text-3xl">
                    {INCLUDED[0].title}
                  </h3>
                  <p className="mt-3 max-w-sm text-noir/70">{INCLUDED[0].desc}</p>
                </div>
              </article>
            </Reveal>
            {INCLUDED.slice(1).map((it) => (
              <Reveal key={it.title}>
                <article className="flex h-full flex-col rounded-3xl border border-hair bg-blanc p-7 shadow-card">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border-[1.5px] border-noir bg-jaune-vif">
                    <it.icon className="h-5 w-5 text-noir" strokeWidth={2} />
                  </span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-noir">{it.title}</h3>
                  <p className="mt-1.5 text-sm text-gris-fonce">{it.desc}</p>
                </article>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 3 — Avec / Sans */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <RevealGroup className="text-center">
            <Reveal><p className="kicker">La différence</p></Reveal>
            <Reveal>
              <h2 className="mt-4 text-4xl tracking-tight md:text-5xl">
                Avant / <span className="stabilo">après.</span>
              </h2>
            </Reveal>
          </RevealGroup>

          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-hair bg-blanc/60 p-8">
                <p className="text-sm font-bold uppercase tracking-label text-gris-fonce">Sans Tably</p>
                <ul className="mt-6 space-y-4">
                  {WITHOUT.map((t) => (
                    <li key={t} className="flex items-center gap-3 text-gris-fonce">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d64541]/12 text-[#d64541]">
                        <X className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal>
              <div className="h-full rounded-3xl border-[1.5px] border-noir bg-jaune-vif p-8 shadow-card">
                <p className="text-sm font-bold uppercase tracking-label text-noir">Avec Tably</p>
                <ul className="mt-6 space-y-4">
                  {WITH.map((t) => (
                    <li key={t} className="flex items-center gap-3 font-medium text-noir">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-noir text-jaune-vif">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </RevealGroup>
        </div>
      </section>

      {/* 4 — Timeline */}
      <section className="bg-blanc px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <RevealGroup className="max-w-xl">
            <Reveal><p className="kicker">Votre essai</p></Reveal>
            <Reveal>
              <h2 className="mt-4 text-4xl tracking-tight md:text-5xl">
                Vos 30 jours en <span className="stabilo">4 étapes.</span>
              </h2>
            </Reveal>
          </RevealGroup>

          <RevealGroup className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.day}>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-noir bg-jaune-vif text-sm font-bold text-noir">
                      {i + 1}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-label text-gris-fonce">{s.day}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-noir">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-gris-fonce">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 5 — FAQ courte */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <RevealGroup>
            <Reveal><p className="kicker">Questions</p></Reveal>
            <Reveal>
              <h2 className="mt-4 text-3xl tracking-tight md:text-4xl">
                Avant de <span className="stabilo">vous lancer.</span>
              </h2>
            </Reveal>
          </RevealGroup>
          <div>
            <MiniAccordion items={FAQ} />
          </div>
        </div>
      </section>

      {/* 6 — CTA final (identique à la landing) */}
      <FinalCTA />
    </div>
  );
}
