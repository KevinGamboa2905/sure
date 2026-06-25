import type { PlanKey } from "@/lib/plans";

export type BillingInterval = "monthly" | "yearly";

/** Résout l'ID de prix Stripe depuis les variables d'environnement. */
export function priceIdFor(plan: PlanKey, interval: BillingInterval): string | undefined {
  const map: Record<PlanKey, Record<BillingInterval, string | undefined>> = {
    essential: {
      monthly: process.env.STRIPE_PRICE_ESSENTIAL_MONTHLY,
      yearly: process.env.STRIPE_PRICE_ESSENTIAL_YEARLY,
    },
    pro: {
      monthly: process.env.STRIPE_PRICE_PRO_MONTHLY,
      yearly: process.env.STRIPE_PRICE_PRO_YEARLY,
    },
  };
  return map[plan]?.[interval];
}

/** Plan correspondant à un price ID (pour le webhook). */
export function planForPriceId(priceId: string): { plan: PlanKey; interval: BillingInterval } | null {
  const entries: [PlanKey, BillingInterval, string | undefined][] = [
    ["essential", "monthly", process.env.STRIPE_PRICE_ESSENTIAL_MONTHLY],
    ["essential", "yearly", process.env.STRIPE_PRICE_ESSENTIAL_YEARLY],
    ["pro", "monthly", process.env.STRIPE_PRICE_PRO_MONTHLY],
    ["pro", "yearly", process.env.STRIPE_PRICE_PRO_YEARLY],
  ];
  for (const [plan, interval, id] of entries) {
    if (id && id === priceId) return { plan, interval };
  }
  return null;
}
