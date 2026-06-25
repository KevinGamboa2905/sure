"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/** Banner d'essai affiché en haut du dashboard pendant la période d'essai. */
export function TrialBanner({ daysLeft }: { daysLeft: number }) {
  if (daysLeft <= 0) return null;
  const isUrgent = daysLeft <= 7;

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "flex items-center justify-between gap-3 px-5 py-2.5 sm:px-8",
        isUrgent ? "bg-noir text-creme" : "bg-jaune-vif text-noir",
      )}
    >
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4" strokeWidth={2} />
        <p className="text-sm font-medium">
          {daysLeft === 1 ? "Dernier jour de votre essai Pro" : `${daysLeft} jours restants sur votre essai Pro`}
        </p>
      </div>
      <a
        href="/dashboard/parametres/abonnement"
        className={cn(
          "shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-transform hover:-translate-y-0.5",
          isUrgent ? "bg-jaune-vif text-noir" : "bg-noir text-creme",
        )}
      >
        Choisir mon plan →
      </a>
    </motion.div>
  );
}
