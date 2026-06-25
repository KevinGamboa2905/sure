"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { PLANS, type PlanKey } from "@/lib/plans";
import type { BillingInterval } from "@/lib/stripe/prices";
import { SettingCard } from "./setting-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AbonnementView({
  effectivePlan,
  isInTrial,
  daysLeft,
  paid,
  checkoutStatus,
}: {
  effectivePlan: PlanKey;
  isInTrial: boolean;
  daysLeft: number;
  paid: boolean;
  checkoutStatus?: "success" | "cancel";
}) {
  const router = useRouter();
  const [interval, setInterval] = useState<BillingInterval>("monthly");
  const [loading, setLoading] = useState<PlanKey | null>(null);
  const current = PLANS[effectivePlan];

  useEffect(() => {
    if (checkoutStatus === "success") {
      toast.success("Abonnement activé · merci !");
      router.refresh();
    } else if (checkoutStatus === "cancel") {
      toast("Paiement annulé");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkoutStatus]);

  async function go(plan: PlanKey) {
    if (loading) return;
    setLoading(plan);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, interval }),
      });
      const data = await res.json().catch(() => null);
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      toast.error(data?.error ?? "Impossible de démarrer le paiement.");
    } catch {
      toast.error("Erreur réseau.");
    }
    setLoading(null);
  }

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
            ) : paid ? (
              <p className="mt-2 text-sm text-noir"><span className="font-bold">Abonné</span> · CHF {current.monthlyPrice} / mois</p>
            ) : (
              <p className="mt-2 text-sm text-noir">Plan gratuit Essentiel</p>
            )}
          </div>
        </div>
        {isInTrial && (
          <p className="mt-3 text-xs text-gris-fonce">
            À la fin de l&apos;essai, sans souscription, votre compte passera automatiquement au plan Essentiel.
          </p>
        )}
      </SettingCard>

      <SettingCard title="Choisir un plan">
        {/* Toggle intervalle */}
        <div className="mb-4 inline-flex rounded-full border border-hair bg-creme/40 p-1">
          {(["monthly", "yearly"] as const).map((iv) => (
            <button
              key={iv}
              onClick={() => setInterval(iv)}
              className={cn("rounded-full px-4 py-1.5 text-sm font-medium transition-colors", interval === iv ? "bg-noir text-creme" : "text-gris-fonce hover:text-noir")}
            >
              {iv === "monthly" ? "Mensuel" : "Annuel"}
              {iv === "yearly" && <span className="ml-1.5 rounded-full bg-jaune-vif px-1.5 py-0.5 text-[10px] font-bold text-noir">-2 mois</span>}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(Object.keys(PLANS) as PlanKey[]).map((k) => {
            const p = PLANS[k];
            const isCurrent = paid && k === effectivePlan;
            const price = interval === "yearly" ? Math.round(p.yearlyPrice / 12) : p.monthlyPrice;
            return (
              <div key={k} className={cn("flex flex-col rounded-2xl border p-4", p.highlighted ? "border-noir bg-jaune-vif" : "border-hair bg-blanc")}>
                <p className="text-sm font-bold tracking-tight text-noir">{p.name}</p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-noir">CHF {price}<span className="text-xs font-medium text-noir/60"> /mois</span></p>
                <p className={cn("mt-1 text-xs", p.highlighted ? "text-noir/70" : "text-gris-fonce")}>
                  {interval === "yearly" ? `CHF ${p.yearlyPrice} / an` : p.description}
                </p>
                <Button
                  variant={isCurrent ? "outline" : p.highlighted ? "invert" : "primary"}
                  size="sm"
                  className="mt-4 w-full justify-center"
                  disabled={isCurrent || loading === k}
                  onClick={() => go(k)}
                >
                  {isCurrent ? "Plan actuel" : loading === k ? "Redirection…" : `Choisir ${p.name}`}
                </Button>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-gris-clair">Paiement sécurisé par Stripe · résiliable à tout moment.</p>
      </SettingCard>
    </>
  );
}
