export type PlanKey = "essential" | "pro";

export interface Plan {
  key: PlanKey;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: {
    maxReservationsPerMonth: number | "unlimited";
    smsReminders: boolean;
    depositSystem: boolean;
    customBranding: boolean;
    analytics: "basic" | "advanced";
    googleCalendarSync: boolean;
    prioritySupport: boolean;
    smsCustomTemplates: boolean;
    stripeConnect: boolean;
  };
  highlighted?: boolean;
}

export const PLANS: Record<PlanKey, Plan> = {
  essential: {
    key: "essential",
    name: "Essentiel",
    monthlyPrice: 49,
    yearlyPrice: 490,
    description: "Pour les cafés et petits restaurants",
    features: {
      maxReservationsPerMonth: 100,
      smsReminders: true,
      depositSystem: false,
      customBranding: false,
      analytics: "basic",
      googleCalendarSync: false,
      prioritySupport: false,
      smsCustomTemplates: false,
      stripeConnect: false,
    },
  },
  pro: {
    key: "pro",
    name: "Pro",
    monthlyPrice: 99,
    yearlyPrice: 990,
    description: "Pour les restaurants 30-80 couverts",
    highlighted: true,
    features: {
      maxReservationsPerMonth: "unlimited",
      smsReminders: true,
      depositSystem: true,
      customBranding: true,
      analytics: "advanced",
      googleCalendarSync: true,
      prioritySupport: true,
      smsCustomTemplates: true,
      stripeConnect: true,
    },
  },
};

export function getPlan(key: PlanKey): Plan {
  return PLANS[key];
}

/** Libellé d'affichage, robuste si une valeur inconnue traîne en DB. */
export function planLabel(key: string): string {
  return PLANS[key as PlanKey]?.name ?? "Essentiel";
}

export function hasFeature(planKey: PlanKey, feature: keyof Plan["features"]): boolean {
  const value = PLANS[planKey].features[feature];
  return value === true || value === "advanced" || value === "unlimited";
}

export function canAccess(currentPlan: PlanKey, requiredPlan: PlanKey): boolean {
  const order: PlanKey[] = ["essential", "pro"];
  return order.indexOf(currentPlan) >= order.indexOf(requiredPlan);
}
