"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, MessageSquareText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerParent } from "@/components/motion/reveal";

/* ------------------------------------------------------------------ */
/*  Visuel droite : fenêtre dashboard macOS + SMS flottant + badge    */
/* ------------------------------------------------------------------ */

function DashboardMock() {
  return (
    <div className="relative w-full max-w-md">
      {/* Fenêtre style macOS */}
      <motion.div
        variants={fadeUp}
        className="overflow-hidden rounded-2xl border border-hair bg-blanc shadow-card"
      >
        {/* Barre de titre */}
        <div className="flex items-center gap-2 border-b border-hair px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs text-gris-fonce">
            Tably · Tableau de bord
          </span>
        </div>

        {/* Corps */}
        <div className="space-y-4 p-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="kicker">Vendredi soir</p>
              <p className="mt-1 text-sm text-gris-fonce">12 réservations</p>
            </div>
            <div className="rounded-full bg-jaune-vif px-3 py-1 text-xs font-bold text-noir">
              0 no-show
            </div>
          </div>

          {/* CA récupéré */}
          <div className="rounded-xl border border-hair bg-creme/60 p-4">
            <p className="kicker">CA sécurisé ce soir</p>
            <p className="mt-1 font-bold tracking-tight text-noir">
              <span className="text-3xl">CHF&nbsp;1&apos;840</span>
              <span className="ml-2 text-sm font-medium text-[#2f8f4e]">
                +18% vs. la semaine passée
              </span>
            </p>
          </div>

          {/* Lignes de réservation */}
          <ul className="divide-y divide-[rgba(188,188,188,0.35)]">
            {[
              { name: "Camille Berset", t: "19:30", c: 4 },
              { name: "Thomas Aebischer", t: "20:00", c: 2 },
              { name: "Noémie Délèze", t: "20:30", c: 6 },
            ].map((r) => (
              <li key={r.name} className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#2f8f4e]/12 text-[#2f8f4e]">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-noir">{r.name}</span>
                </div>
                <span className="font-mono text-xs text-gris-fonce">
                  {r.t} · {r.c} couv.
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* SMS flottant (overlap haut-gauche) */}
      <motion.div
        variants={fadeUp}
        animate={{ y: [0, -9, 0] }}
        transition={{
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -left-6 -top-8 w-60 rounded-2xl border border-hair bg-blanc p-3.5 shadow-lift sm:-left-10"
      >
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-jaune-vif text-noir">
            <MessageSquareText className="h-3.5 w-3.5" strokeWidth={2.2} />
          </span>
          <p className="text-xs font-bold text-noir">SMS · Tably</p>
          <span className="ml-auto text-[10px] text-gris-clair">H-2</span>
        </div>
        <p className="mt-2 text-[13px] leading-snug text-gris-fonce">
          Bonjour Camille, on vous attend ce soir à 19h30 (table de 4). Répondez{' '}
          <span className="font-bold text-noir">OUI</span> pour confirmer.
        </p>
        <div className="mt-2.5 flex justify-end">
          <span className="rounded-full bg-noir px-3 py-1 text-xs font-bold text-jaune-vif">
            OUI
          </span>
        </div>
      </motion.div>

      {/* Badge acompte flottant (overlap bas-droite) */}
      <motion.div
        variants={fadeUp}
        animate={{ y: [0, 8, 0] }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
        }}
        className="absolute -bottom-6 -right-3 flex items-center gap-2 rounded-full border border-hair bg-blanc px-4 py-2.5 shadow-lift sm:-right-8"
      >
        <ShieldCheck className="h-4 w-4 text-noir" strokeWidth={2} />
        <span className="text-xs font-bold text-noir">Acompte CHF 20 sécurisé</span>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-noir pt-14 sm:pt-20"
    >
      {/* Motif grille très léger, estompé sur les bords */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(188,188,188,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(188,188,188,0.25) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, #000 40%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 pb-24 pt-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-32 lg:pt-16">
        {/* ----- Colonne gauche : texte ----- */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerParent}
          className="max-w-xl mx-auto text-center lg:text-left"
        >
          {/* Badge avec dot pulsant */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-hair bg-blanc/70 px-3.5 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-[#2f8f4e]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2f8f4e]" />
            </span>
            <span className="text-xs font-medium tracking-tight text-blanc">
              Pour les restaurants
            </span>
          </motion.div>

          {/* Titre */}
          <motion.h1
            variants={fadeUp}
            className="mt-6 text-6xl leading-[0.92] tracking-tight text-blanc sm:text-7xl lg:text-8xl"
          >
            <span className="relative inline-block text-blanc/70">
              No-shows.
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
                className="absolute left-0 top-1/2 h-[3px] w-full origin-left rounded-full bg-[#d64541]"
                style={{ rotate: "-2deg" }}
              />
            </span>
            <br />
            <span className="stabilo">Plus jamais.</span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-md text-lg leading-relaxed text-blanc/80 sm:text-xl"
          >
            Rappels SMS automatiques, acompte sécurisé et dashboard clair.
            Tably réduit vos no-shows de{' '}
            <span className="font-bold text-blanc">70%</span> et récupère le CA
            perdu chaque soir.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Button asChild size="lg" variant="primary">
              <a href="/signup">
                Démarrer l&apos;essai gratuit
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-blanc decoration-blanc hover:decoration-jaune-vif"
            >
              <a href="#solution">Voir comment ça marche</a>
            </Button>
          </motion.div>

          {/* Réassurance */}
          <motion.p
            variants={fadeUp}
            className="mt-5 text-sm text-blanc/70"
          >
            30 jours gratuits · Sans carte bancaire · Installation en 10 minutes
          </motion.p>
        </motion.div>

        {/* ----- Colonne droite : visuel ----- */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerParent}
          className="flex justify-center lg:justify-end"
        >
          <DashboardMock />
        </motion.div>
      </div>
    </section>
  );
}
