"use client";

import { Check, Download } from "lucide-react";
import { toast } from "sonner";
import { SettingCard } from "@/components/dashboard/setting-card";
import { Button } from "@/components/ui/button";

const INVOICES = [
  { id: "2026-05", date: "1 mai 2026", amount: "89,00 CHF", status: "Payée" },
  { id: "2026-04", date: "1 avril 2026", amount: "89,00 CHF", status: "Payée" },
  { id: "2026-03", date: "1 mars 2026", amount: "89,00 CHF", status: "Payée" },
];

export default function AbonnementPage() {
  return (
    <>
      <SettingCard title="Plan actuel">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-hair bg-creme/40 p-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-jaune-vif px-2.5 py-0.5 text-xs font-bold text-noir">
              <Check className="h-3 w-3" strokeWidth={3} /> Plan Pro
            </span>
            <p className="mt-2 text-sm text-noir"><span className="font-bold">CHF 89</span> / mois · renouvellement le 30 juin 2026</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => toast("Gestion du paiement — démo")}>Gérer le paiement</Button>
            <Button size="sm" variant="primary" onClick={() => toast("Changement de plan — démo")}>Changer de plan</Button>
          </div>
        </div>
      </SettingCard>

      <SettingCard title="Factures">
        <ul className="divide-y divide-[rgba(188,188,188,0.35)]">
          {INVOICES.map((inv) => (
            <li key={inv.id} className="flex items-center gap-4 py-3 text-sm">
              <span className="font-medium text-noir">{inv.date}</span>
              <span className="text-gris-fonce">{inv.amount}</span>
              <span className="rounded-full bg-[#27ae60]/12 px-2 py-0.5 text-xs font-medium text-[#1e7e43]">{inv.status}</span>
              <button onClick={() => toast.success("Facture téléchargée")} className="ml-auto inline-flex items-center gap-1.5 text-sm text-noir hover:underline">
                <Download className="h-4 w-4" /> PDF
              </button>
            </li>
          ))}
        </ul>
      </SettingCard>
    </>
  );
}
