"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

/**
 * Variants partagés — révélation « fadeUp » avec ressort doux.
 * Réutilisés par toutes les sections (whileInView, once: true).
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 18 },
  },
};

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/** Conteneur qui orchestre un stagger de ses enfants `<Reveal>` au scroll. */
export function RevealGroup({
  children,
  className,
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

/** Élément individuel animé en fadeUp. Utilisable seul ou dans un RevealGroup. */
export function Reveal({
  children,
  className,
  as: Tag = motion.div,
  standalone = false,
}: {
  children: ReactNode;
  className?: string;
  as?: typeof motion.div;
  standalone?: boolean;
}) {
  const extra = standalone
    ? {
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, amount: 0.3 },
      }
    : {};
  return (
    <Tag className={className} variants={fadeUp} {...extra}>
      {children}
    </Tag>
  );
}
