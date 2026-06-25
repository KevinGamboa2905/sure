"use client";

import { useState } from "react";
import { Check, X, ArrowRight } from "lucide-react";
import { PublicHeader } from "@/components/marketing/public-header";
import { Footer } from "@/components/sections/footer";
import { FinalCTA } from "@/components/sections/final-cta";
import { MiniAccordion } from "@/components/marketing/mini-accordion";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Essentiel", monthly: 49, annual: 41, tagline: "Pour les cafés et petits restaurants",
    features: ["Jusqu'à 100 réservations / mois", "Rappels SMS J-1 & H-2", "Page de réservation Tably", "Dashboard de base", "Support email"],
    featured: false,
  },
  {
    name: "Pro", monthly: 99, annual: 83, tagline: "Pour les restaurants 30–80 couverts",
    features: ["Réservations illimitées", "Acomptes Stripe", "SMS illimités + modèles", "Personnalisation complète", "Analytics avancées", "Synchro Google Calendar", "Support prioritaire"],
    featured: true,
  },
];

const MATRIX = [
  { label: "Rappels SMS J-1 & H-2", v: [true, true] },
  { label: "Réservations illimitées", v: [false, true] },
  { label: "Acomptes Stripe", v: [false, true] },
  { label: "Personnalisation complète", v: [false, true] },
  { label: "Modèles SMS personnalisés", v: [false, true] },
  { label: "Analytics avancées", v: [false, true] },
  { label: "Synchro Google Calendar", v: [false, true] },
  { label: "Support prioritaire", v: [false, true] },
];

const CUSTOM_FEATURES = [
  "Plusieurs établissements",
  "Domaine personnalisé (tably.votre-resto.ch)",
  "Intégrations API sur mesure",
  "Onboarding dédié avec notre équipe",
  "Support prioritaire 7j/7",
  "SLA garanti",
];

const FAQ = [
  { q: "Puis-je changer de plan à tout moment ?", a: "Oui, en un clic depuis votre espace. Le changement est calculé au prorata." },
  { q: "Les SMS sont-ils inclus ?", a: "Oui, un quota généreux est inclus dans chaque plan. Au-delà, les SMS sont facturés à prix coûtant." },
  { q: "La TVA est-elle incluse ?", a: "Les prix sont hors TVA (7,7% en Suisse). La facture détaille le montant." },
  { q: "Puis-je résilier facilement ?", a: "À tout moment, sans frais. Vous gardez l'accès jusqu'à la fin de la période payée." },
];

export default function TarifsPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="bg-creme">
      <PublicHeader />

      {/* Hero + toggle */}
      <section className="px-5 pb-10 pt-16 text-center sm:px-8 lg:pt-24">
        <RevealGroup className="mx-auto max-w-2xl">
          <Reveal><p className="kicker">Tarifs</p></Reveal>
          <Reveal>
            <h1 className="mt-4 text-5xl font-bold leading-[0.95] tracking-tight text-noir md:text-7xl">
              Un prix par <span className="stabilo">salle pleine.</span>
            </h1>
          </Reveal>
          <Reveal><p className="mx-auto mt-6 max-w-xl text-lg text-gris-fonce">Sans engagement. 30 jours d&apos;essai gratuit sur tous les plans.</p></Reveal>
          <Reveal>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-hair bg-blanc p-1">
              <button onClick={() => setAnnual(false)} className={cn("rounded-full px-4 py-1.5 text-sm font-medium transition-colors", !annual ? "bg-noir text-creme" : "text-gris-fonce")}>Mensuel</button>
              <button onClick={() => setAnnual(true)} className={cn("inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors", annual ? "bg-noir text-creme" : "text-gris-fonce")}>
                Annuel <span className="rounded-full bg-jaune-vif px-2 py-0.5 text-[11px] font-bold text-noir">-2 mois</span>
              </button>
            </div>
          </Reveal>
        </RevealGroup>
      </section>

      {/* Plans */}
      <section className="px-5 pb-20 sm:px-8">
        <RevealGroup className="mx-auto grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-3">
          {PLANS.map((p) => (
            <Reveal key={p.name}>
              <article className={cn("flex h-full flex-col rounded-3xl border p-7 shadow-card", p.featured ? "border-noir bg-jaune-vif lg:scale-[1.03]" : "border-hair bg-blanc")}>
                {p.featured && <span className="mb-3 inline-flex w-fit rounded-full bg-noir px-3 py-1 text-xs font-bold text-jaune-vif">Le plus choisi</span>}
                <h3 className="text-xl font-bold tracking-tight text-noir">{p.name}</h3>
                <p className={cn("mt-1 text-sm", p.featured ? "text-noir/70" : "text-gris-fonce")}>{p.tagline}</p>
                <p className="mt-5 flex items-end gap-1">
                  <span className="text-5xl font-bold tracking-tight text-noir">CHF {annual ? p.annual : p.monthly}</span>
                  <span className={cn("mb-1 text-sm", p.featured ? "text-noir/70" : "text-gris-fonce")}>/ mois</span>
                </p>
                <Button asChild variant={p.featured ? "invert" : "primary"} className="mt-5 w-full justify-center">
                  <a href="/signup">Démarrer l&apos;essai</a>
                </Button>
                <ul className="mt-6 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-noir">
                      <Check className={cn("mt-0.5 h-4 w-4 shrink-0", p.featured ? "text-noir" : "text-[#27ae60]")} strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}

          {/* Sur mesure */}
          <Reveal>
            <article className="flex h-full flex-col rounded-3xl border-2 border-noir bg-noir p-7 text-creme shadow-card">
              <span className="mb-3 inline-flex w-fit rounded-full bg-jaune-vif px-3 py-1 text-xs font-bold uppercase tracking-label text-noir">Sur mesure</span>
              <h3 className="text-xl font-bold tracking-tight">Une solution adaptée</h3>
              <p className="mt-1 text-sm text-creme/70">Multi-établissements, chaînes, intégrations spécifiques ?</p>
              <p className="mt-5 text-3xl font-bold tracking-tight">Sur devis</p>
              <Button asChild variant="primary" className="mt-5 w-full justify-center">
                <a href="/contact?subject=sur-mesure">Contacter l&apos;équipe</a>
              </Button>
              <ul className="mt-6 space-y-2.5">
                {CUSTOM_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-creme/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-jaune-vif" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </RevealGroup>
        <p className="mt-6 text-center text-sm text-gris-fonce">Prix hors TVA · facturation {annual ? "annuelle" : "mensuelle"} · résiliable en 1 clic</p>
      </section>

      {/* Comparatif */}
      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-noir md:text-4xl">Comparatif <span className="stabilo">plan par plan.</span></h2>
          <div className="overflow-x-auto rounded-2xl border border-hair bg-blanc">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-hair">
                  <th className="px-5 py-3 text-left font-medium text-gris-fonce">Fonctionnalité</th>
                  {PLANS.map((p) => <th key={p.name} className="px-5 py-3 text-center font-bold text-noir">{p.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((row) => (
                  <tr key={row.label} className="border-b border-hair last:border-0">
                    <td className="px-5 py-3 text-noir">{row.label}</td>
                    {row.v.map((ok, i) => (
                      <td key={i} className="px-5 py-3 text-center">
                        {ok ? <Check className="mx-auto h-4 w-4 text-[#27ae60]" strokeWidth={2.5} /> : <X className="mx-auto h-4 w-4 text-gris-clair" />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ pricing */}
      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p className="kicker">Questions</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-noir md:text-4xl">Sur les <span className="stabilo">tarifs.</span></h2>
          </div>
          <MiniAccordion items={FAQ} />
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </div>
  );
}
