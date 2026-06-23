"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

const FAQS = [
  {
    q: "Mes clients doivent-ils installer une application ?",
    a: "Non, jamais. Tout passe par SMS : ils reçoivent un message, répondent OUI, c'est confirmé. Aucune app, aucun compte, aucune friction.",
  },
  {
    q: "Est-ce compatible avec mon logiciel de réservation actuel ?",
    a: "Oui. Tably s'intègre avec TheFork, Zenchef et la plupart des outils du marché. Et si vous prenez les réservations à la main, la saisie manuelle fonctionne tout aussi bien.",
  },
  {
    q: "L'acompte ne va-t-il pas faire fuir mes clients ?",
    a: "Vous fixez le montant (dès CHF 10) et décidez à partir de combien de couverts il s'applique. La plupart des clients le trouvent normal, surtout pour les grandes tables. Il est déduit de l'addition ou remboursé.",
  },
  {
    q: "Combien de temps pour l'installation ?",
    a: "Environ 10 minutes. Vous configurez vos horaires, le texte de vos SMS et votre acompte. Aucun technicien, aucun matériel à installer.",
  },
  {
    q: "Les SMS sont-ils en français et à mon image ?",
    a: "Oui. Les messages sont en français (romand) et entièrement personnalisables : nom de la maison, ton, signature. Vos clients reconnaissent votre établissement.",
  },
  {
    q: "Et si je veux arrêter ?",
    a: "Sans engagement. Vous résiliez en un clic depuis le dashboard, et vous repartez avec un export complet de vos données. Aucune question posée.",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-hair">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
        aria-expanded={open}
      >
        <span className="text-lg font-bold tracking-tight text-noir md:text-xl">{q}</span>
        <motion.span
          animate={{ rotate: open ? 135 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hair text-noir"
        >
          <Plus className="h-5 w-5" strokeWidth={2} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 text-gris-fonce">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="bg-creme py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <RevealGroup>
          <Reveal>
            <p className="kicker">FAQ</p>
          </Reveal>
          <Reveal>
            <h2 className="mt-4 text-4xl tracking-tight md:text-5xl">
              Vous vous demandez <span className="stabilo">sûrement…</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-5 text-gris-fonce">
              Une autre question ? Écrivez-nous à{" "}
              <a
                href="mailto:bonjour@tably.ch"
                className="font-medium text-noir underline decoration-jaune-vif decoration-2 underline-offset-4"
              >
                bonjour@tably.ch
              </a>
              .
            </p>
          </Reveal>
        </RevealGroup>

        <div>
          {FAQS.map((f) => (
            <Item key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
