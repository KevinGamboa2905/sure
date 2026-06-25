export type PlanKey = "essential" | "pro" | "premium";

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
    multipleLocations: number;
    googleCalendarSync: boolean;
    prioritySupport: boolean;
    customDomain: boolean;
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
    yearlyPrice: 490, // -2 mois
    description: "Pour les cafés et petits restaurants",
    features: {
      maxReservationsPerMonth: 100,
      smsReminders: true,
      depositSystem: false,
      customBranding: false,
      analytics: "basic",
      multipleLocations: 1,
      googleCalendarSync: false,
      prioritySupport: false,
      customDomain: false,
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
      multipleLocations: 1,
      googleCalendarSync: false,
      prioritySupport: false,
      customDomain: false,
      smsCustomTemplates: true,
      stripeConnect: true,
    },
  },
  premium: {
    key: "premium",
    name: "Premium",
    monthlyPrice: 179,
    yearlyPrice: 1790,
    description: "Pour les multi-établissements",
    features: {
      maxReservationsPerMonth: "unlimited",
      smsReminders: true,
      depositSystem: true,
      customBranding: true,
      analytics: "advanced",
      multipleLocations: 3,
      googleCalendarSync: true,
      prioritySupport: true,
      customDomain: true,
      smsCustomTemplates: true,
      stripeConnect: true,
    },
  },
};

export function getPlan(key: PlanKey): Plan {
  return PLANS[key];
}

export function planLabel(key: string): string {
  return PLANS[key as PlanKey]?.name ?? "Essentiel";
}

export function hasFeature(planKey: PlanKey, feature: keyof Plan["features"]): boolean {
  const value = PLANS[planKey].features[feature];
  return (
    value === true ||
    value === "advanced" ||
    value === "unlimited" ||
    (typeof value === "number" && value > 1)
  );
}

export function canAccess(currentPlan: PlanKey, requiredPlan: PlanKey): boolean {
  const order: PlanKey[] = ["essential", "pro", "premium"];
  return order.indexOf(currentPlan) >= order.indexOf(requiredPlan);
}
