"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

type Plan = {
  name: string;
  monthly: number;
  tagline: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Essentiel",
    monthly: 49,
    tagline: "Pour les cafés et petits restaurants.",
    features: [
      "Rappels SMS J-1 et H-2",
      "Jusqu'à 100 réservations / mois",
      "Confirmation par SMS",
      "Dashboard de base",
      "Support par e-mail",
    ],
    cta: "Choisir Essentiel",
  },
  {
    name: "Pro",
    monthly: 99,
    tagline: "Pour les restaurants 30–80 couverts.",
    features: [
      "Réservations illimitées",
      "Acompte sécurisé Stripe",
      "SMS illimités + modèles",
      "Personnalisation complète",
      "Analytics avancées",
      "Synchro Google Calendar",
      "Support prioritaire",
    ],
    cta: "Choisir Pro",
    featured: true,
  },
];

const CUSTOM_FEATURES = [
  "Plusieurs établissements",
  "Domaine personnalisé (tably.votre-resto.ch)",
  "Intégrations API sur mesure",
  "Onboarding dédié avec notre équipe",
  "Support prioritaire 7j/7",
  "SLA garanti",
];

function priceFor(plan: Plan, annual: boolean) {
  // Annuel = 2 mois offerts (10 mois facturés).
  return annual ? Math.round((plan.monthly * 10) / 12) : plan.monthly;
}

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="tarifs" className="bg-creme py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealGroup className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="kicker">Tarifs</p>
          </Reveal>
          <Reveal>
            <h2 className="mt-4 text-4xl tracking-tight md:text-6xl">
              Un acompte récupéré <span className="stabilo">paie l&apos;abonnement.</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-5 max-w-md text-lg text-gris-fonce">
              Sans engagement, résiliable à tout moment. Le prix d&apos;une table
              honorée par semaine.
            </p>
          </Reveal>

          {/* Toggle */}
          <Reveal>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-hair bg-blanc p-1.5">
              <button
                onClick={() => setAnnual(false)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  !annual ? "bg-noir text-creme" : "text-gris-fonce hover:text-noir",
                )}
              >
                Mensuel
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  annual ? "bg-noir text-creme" : "text-gris-fonce hover:text-noir",
                )}
              >
                Annuel
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-bold",
                    annual ? "bg-jaune-vif text-noir" : "bg-jaune-vif/60 text-noir",
                  )}
                >
                  −2 mois
                </span>
              </button>
            </div>
          </Reveal>
        </RevealGroup>

        {/* Grille de plans */}
        <RevealGroup className="mt-14 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <Reveal key={plan.name}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className={cn(
                  "flex h-full flex-col rounded-3xl border p-8 shadow-card",
                  plan.featured
                    ? "border-noir bg-jaune-vif lg:scale-[1.05]"
                    : "border-hair bg-blanc",
                )}
              >
                {plan.featured && (
                  <span className="mb-4 inline-flex w-fit items-center rounded-full bg-noir px-3 py-1 text-xs font-bold uppercase tracking-label text-jaune-vif">
                    Le plus choisi
                  </span>
                )}
                <h3 className="text-xl font-bold tracking-tight text-noir">{plan.name}</h3>
                <p className="mt-1 text-sm text-noir/70">{plan.tagline}</p>

                <div className="mt-6 flex items-end gap-1.5">
                  <span className="text-5xl font-bold tracking-tight text-noir">
                    CHF&nbsp;{priceFor(plan, annual)}
                  </span>
                  <span className="mb-1.5 text-sm text-noir/60">/ mois</span>
                </div>
                <p className="mt-1 h-5 text-xs text-noir/55">
                  {annual ? "facturé annuellement, 2 mois offerts" : "facturé mensuellement"}
                </p>

                <Button
                  asChild
                  size="lg"
                  variant={plan.featured ? "invert" : "outline"}
                  className="mt-6 w-full"
                >
                  <a href="/signup">{plan.cta}</a>
                </Button>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-noir/80">
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          plan.featured ? "text-noir" : "text-[#2f8f4e]",
                        )}
                        strokeWidth={2.5}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </Reveal>
          ))}

          {/* Carte Sur mesure */}
          <Reveal>
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="flex h-full flex-col rounded-3xl border-2 border-noir bg-noir p-8 text-creme shadow-card"
            >
              <span className="mb-4 inline-flex w-fit items-center rounded-full bg-jaune-vif px-3 py-1 text-xs font-bold uppercase tracking-label text-noir">
                Sur mesure
              </span>
              <h3 className="text-xl font-bold tracking-tight">Une solution adaptée</h3>
              <p className="mt-1 text-sm text-creme/70">
                Multi-établissements, chaînes, intégrations spécifiques ? On vous accompagne.
              </p>
              <div className="mt-6 flex items-end gap-1.5">
                <span className="text-3xl font-bold tracking-tight">Sur devis</span>
              </div>
              <p className="mt-1 h-5 text-xs text-creme/50">Tarif selon vos besoins</p>

              <Button asChild size="lg" variant="primary" className="mt-6 w-full">
                <a href="/contact?subject=sur-mesure">Contacter l&apos;équipe</a>
              </Button>

              <ul className="mt-8 space-y-3">
                {CUSTOM_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-creme/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-jaune-vif" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.article>
          </Reveal>
        </RevealGroup>

        <Reveal standalone>
          <p className="mt-10 text-center text-sm text-gris-fonce">
            Prix hors TVA (7.7%) · Facturation en CHF · Sans engagement, résiliable en 1 clic
          </p>
        </Reveal>
      </div>
    </section>
  );
}
