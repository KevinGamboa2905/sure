"use client";

import { motion } from "framer-motion";
import {
  MessageSquareText,
  ShieldCheck,
  MousePointerClick,
  LayoutDashboard,
  Check,
} from "lucide-react";
import { Reveal, RevealGroup, fadeUp } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";

const FEATURES = [
  {
    icon: MessageSquareText,
    title: "Rappels SMS automatiques",
    desc: "Un message à J-1 et un autre à H-2. Le client confirme ou libère la table à temps.",
  },
  {
    icon: ShieldCheck,
    title: "Acompte sécurisé via Stripe",
    desc: "Une empreinte ou un acompte (dès CHF 10) qui responsabilise sans froisser.",
  },
  {
    icon: MousePointerClick,
    title: "Confirmation en un tap",
    desc: "Le client répond OUI au SMS. Aucune app à installer, aucune friction.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard temps réel",
    desc: "Toutes vos réservations, leur statut et le CA sécurisé, en un coup d'œil.",
  },
];

/* Mockup dashboard à droite, avec badge flottant + chiffres au scroll. */
function SolutionMock() {
  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-2xl border border-hair bg-blanc shadow-card">
        <div className="flex items-center gap-2 border-b border-hair px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs text-gris-fonce">Performance · 30 derniers jours</span>
        </div>

        <div className="space-y-5 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-hair bg-creme/50 p-4">
              <p className="kicker">Taux de présence</p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-noir">
                <CountUp to={96} suffix="%" />
              </p>
            </div>
            <div className="rounded-xl border border-hair bg-creme/50 p-4">
              <p className="kicker">No-shows</p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-[#2f8f4e]">
                <CountUp to={72} prefix="−" suffix="%" />
              </p>
            </div>
          </div>

          {/* Mini bar chart hebdo (CSS) */}
          <div className="rounded-xl border border-hair p-4">
            <p className="kicker mb-3">Couverts honorés / semaine</p>
            <div className="flex h-28 items-end gap-2">
              {[52, 61, 48, 70, 84, 96, 88].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 80, damping: 16 }}
                  className="flex-1 rounded-t-md bg-jaune-vif"
                  style={{ minHeight: 6 }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10px] text-gris-clair">
              {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
                <span key={i} className="flex-1 text-center">{d}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Badge flottant qui « apparaît » */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 14 }}
        className="absolute -bottom-5 -left-4 flex items-center gap-2 rounded-full border border-hair bg-blanc px-4 py-2.5 shadow-lift"
      >
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#2f8f4e]/12 text-[#2f8f4e]">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
        <span className="text-xs font-bold text-noir">Réservation confirmée</span>
      </motion.div>
    </div>
  );
}

export function Solution() {
  return (
    <section id="solution" className="bg-creme py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-[3fr_2fr] lg:gap-16">
        {/* Gauche : texte + features */}
        <RevealGroup>
          <Reveal>
            <p className="kicker">La solution</p>
          </Reveal>
          <Reveal>
            <h2 className="mt-4 max-w-lg text-4xl tracking-tight md:text-6xl">
              Trois leviers, <span className="stabilo">zéro friction.</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-5 max-w-md text-lg text-gris-fonce">
              Tably s&apos;installe en 10 minutes et travaille en silence.
              Vos clients reçoivent, confirment, viennent.
            </p>
          </Reveal>

          <div className="mt-10 divide-y divide-[rgba(188,188,188,0.4)] border-t border-hair">
            {FEATURES.map((f) => (
              <Reveal key={f.title}>
                <div className="flex gap-4 py-5">
                  {/* Icône carrée custom : fond jaune, bordure noire fine */}
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-[1.5px] border-noir bg-jaune-vif">
                    <f.icon className="h-5 w-5 text-noir" strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-noir">{f.title}</h3>
                    <p className="mt-1 text-sm text-gris-fonce">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </RevealGroup>

        {/* Droite : mockup */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SolutionMock />
        </motion.div>
      </div>
    </section>
  );
}
