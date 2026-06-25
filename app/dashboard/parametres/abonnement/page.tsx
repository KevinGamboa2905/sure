import { requireRestaurant } from "@/lib/session-restaurant";
import { getEffectivePlan, isInTrial, daysLeftInTrial } from "@/lib/subscription";
import type { PlanKey } from "@/lib/plans";
import { AbonnementView } from "@/components/dashboard/abonnement-view";

export default async function AbonnementPage() {
  const { restaurant } = await requireRestaurant();
  const plan = restaurant.plan as PlanKey;
  const trial = restaurant.trialEndsAt;
  const paid = restaurant.hasPaid;

  return (
    <AbonnementView
      plan={plan}
      effectivePlan={getEffectivePlan(plan, trial, paid)}
      isInTrial={isInTrial(trial, paid)}
      daysLeft={daysLeftInTrial(trial)}
    />
  );
}
