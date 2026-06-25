"use client";

import { Check } from "lucide-react";
import { toast } from "sonner";
import { PLANS, type PlanKey } from "@/lib/plans";
import { SettingCard } from "./setting-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AbonnementView({
  plan,
  effectivePlan,
  isInTrial,
  daysLeft,
}: {
  plan: PlanKey;
  effectivePlan: PlanKey;
  isInTrial: boolean;
  daysLeft: number;
}) {
  const current = PLANS[effectivePlan];

  return (
    <>
      <SettingCard title="Plan actuel">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-hair bg-creme/40 p-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-jaune-vif px-2.5 py-0.5 text-xs font-bold text-noir">
              <Check className="h-3 w-3" strokeWidth={3} /> Plan {current.name}
            </span>
            {isInTrial ? (
              <p className="mt-2 text-sm text-noir">
                Essai gratuit · <span className="font-bold">{daysLeft} jour{daysLeft > 1 ? "s" : ""} restant{daysLeft > 1 ? "s" : ""}</span> sur le plan Pro
              </p>
            ) : (
              <p className="mt-2 text-sm text-noir">
                <span className="font-bold">CHF {current.monthlyPrice}</span> / mois
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => toast("Gestion du paiement — démo")}>Gérer le paiement</Button>
            <Button size="sm" variant="primary" onClick={() => toast("Changement de plan — démo")}>Changer de plan</Button>
          </div>
        </div>
        {isInTrial && (
          <p className="mt-3 text-xs text-gris-fonce">
            À la fin de l&apos;essai, sans souscription, votre compte passera automatiquement au plan Essentiel.
          </p>
        )}
      </SettingCard>

      <SettingCard title="Choisir un plan">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {(Object.keys(PLANS) as PlanKey[]).map((k) => {
            const p = PLANS[k];
            const isCurrent = k === effectivePlan;
            return (
              <div
                key={k}
                className={cn(
                  "rounded-2xl border p-4",
                  isCurrent ? "border-noir bg-jaune-vif" : "border-hair bg-blanc",
                )}
              >
                <p className="text-sm font-bold tracking-tight text-noir">{p.name}</p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-noir">CHF {p.monthlyPrice}<span className="text-xs font-medium text-noir/60"> /mois</span></p>
                <p className={cn("mt-1 text-xs", isCurrent ? "text-noir/70" : "text-gris-fonce")}>{p.description}</p>
                <button
                  onClick={() => toast(isCurrent ? "C'est votre plan actuel" : `Passer en ${p.name} — démo`)}
                  className={cn(
                    "mt-3 w-full rounded-full py-2 text-xs font-bold transition-colors",
                    isCurrent ? "bg-noir text-jaune-vif" : "border border-hair text-noir hover:border-noir",
                  )}
                >
                  {isCurrent ? "Plan actuel" : "Choisir"}
                </button>
              </div>
            );
          })}
        </div>
      </SettingCard>
    </>
  );
}
