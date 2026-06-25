import { requireRestaurant } from "@/lib/session-restaurant";
import { getEffectivePlan, isInTrial, daysLeftInTrial } from "@/lib/subscription";
import type { PlanKey } from "@/lib/plans";
import { AbonnementView } from "@/components/dashboard/abonnement-view";

export default async function AbonnementPage({
  searchParams,
}: {
  searchParams: { checkout?: string };
}) {
  const { restaurant } = await requireRestaurant();
  const plan = restaurant.plan as PlanKey;
  const trial = restaurant.trialEndsAt;
  const paid = restaurant.hasPaid;

  const checkoutStatus =
    searchParams.checkout === "success" ? "success" : searchParams.checkout === "cancel" ? "cancel" : undefined;

  return (
    <AbonnementView
      effectivePlan={getEffectivePlan(plan, trial, paid)}
      isInTrial={isInTrial(trial, paid)}
      daysLeft={daysLeftInTrial(trial)}
      paid={paid}
      checkoutStatus={checkoutStatus}
    />
  );
}
