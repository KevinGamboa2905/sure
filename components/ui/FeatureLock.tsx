"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import type { PlanKey } from "@/lib/plans";

interface FeatureLockProps {
  requiredPlan?: "pro";
  currentPlan: PlanKey;
  isInTrial: boolean;
  children: ReactNode;
  featureName?: string;
}

/** Verrouille visuellement une fonctionnalité réservée à un plan supérieur.
 *  Pendant l'essai (isInTrial), tout est débloqué. */
export function FeatureLock({
  currentPlan,
  isInTrial,
  children,
  featureName = "cette fonctionnalité",
}: FeatureLockProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Pendant l'essai, ou en plan Pro → débloqué.
  const hasAccess = isInTrial || currentPlan === "pro";

  if (hasAccess) return <>{children}</>;

  return (
    <div className="relative">
      <div className="pointer-events-none select-none opacity-50">{children}</div>

      <button
        type="button"
        onClick={() => setShowTooltip((v) => !v)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="absolute inset-0 flex cursor-not-allowed items-center justify-center rounded-lg bg-noir/5 transition hover:bg-noir/10"
        aria-label={`${featureName} — plan Pro requis`}
      >
        <Lock className="h-5 w-5 text-noir/60" />
      </button>

      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 top-full z-50 mt-2 w-72 -translate-x-1/2 rounded-xl bg-noir px-4 py-3 text-center text-creme shadow-lift"
        >
          <p className="mb-2 text-sm font-medium">
            Passez en plan Pro pour accéder à {featureName}.
          </p>
          <a href="/dashboard/parametres/abonnement" className="text-xs font-bold text-jaune-vif underline">
            Voir les plans →
          </a>
        </motion.div>
      )}
    </div>
  );
}
