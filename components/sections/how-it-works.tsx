"use client";

import { motion } from "framer-motion";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

const STEPS = [
  {
    n: "1",
    title: "Le client réserve",
    desc: "Le client réserve en ligne avec votre lien unique. Exemple : tably.ch/votrerestaurant",
  },
  {
    n: "2",
    title: "Tably prend le relais",
    desc: "SMS de confirmation à J-1, puis rappel à H-2. Entièrement automatique.",
  },
  {
    n: "3",
    title: "Le client confirme",
    desc: "Une réponse OUI ou un acompte déposé, et la table est garantie.",
  },
  {
    n: "4",
    title: "Vous remplissez la salle",
    desc: "Les annulations libèrent la table à temps. Plus de couverts perdus.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-blanc py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealGroup className="max-w-2xl">
          <Reveal>
            <p className="kicker">Comment ça marche</p>
          </Reveal>
          <Reveal>
            <h2 className="mt-4 text-4xl tracking-tight md:text-6xl">
              Quatre étapes, <span className="stabilo">puis le silence.</span>
            </h2>
          </Reveal>
        </RevealGroup>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Ligne pointillée horizontale (desktop) qui se trace au scroll */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute left-0 right-0 top-7 hidden origin-left border-t-2 border-dashed border-gris-clair lg:block"
          />
          {/* Ligne verticale (mobile) */}
          <motion.div
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute bottom-0 left-7 top-7 origin-top border-l-2 border-dashed border-gris-clair lg:hidden"
          />

          <RevealGroup className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((s) => (
              <Reveal key={s.n}>
                <div className="relative flex gap-5 lg:block">
                  {/* Cercle jaune + gros chiffre */}
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[1.5px] border-noir bg-jaune-vif text-2xl font-bold text-noir">
                    {s.n}
                  </div>
                  <div className="lg:mt-6">
                    <h3 className="text-xl font-bold tracking-tight text-noir">{s.title}</h3>
                    <p className="mt-2 max-w-xs text-gris-fonce">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
