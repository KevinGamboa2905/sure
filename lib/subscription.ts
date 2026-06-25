import type { PlanKey } from "./plans";

/** Plan réellement appliqué, en tenant compte de l'essai et du paiement. */
export function getEffectivePlan(
  plan: PlanKey,
  trialEndsAt: Date | null,
  hasPaid: boolean,
): PlanKey {
  // L'utilisateur a payé → on garde son plan.
  if (hasPaid) return plan;
  // Essai encore actif → Pro.
  if (trialEndsAt && new Date() < trialEndsAt) return "pro";
  // Sinon → bascule sur Essentiel.
  return "essential";
}

export function isInTrial(trialEndsAt: Date | null, hasPaid: boolean): boolean {
  if (hasPaid) return false;
  if (!trialEndsAt) return false;
  return new Date() < trialEndsAt;
}

export function daysLeftInTrial(trialEndsAt: Date | null): number {
  if (!trialEndsAt) return 0;
  const diff = trialEndsAt.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
