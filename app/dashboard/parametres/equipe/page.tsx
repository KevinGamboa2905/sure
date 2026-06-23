"use client";

import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { SettingCard } from "@/components/dashboard/setting-card";

const TEAM = [
  { name: "Sophie Reymond", role: "Admin", initials: "SR" },
  { name: "Marc Oberson", role: "Manager", initials: "MO" },
  { name: "Inès Marchand", role: "Staff", initials: "IM" },
];

export default function EquipePage() {
  return (
    <SettingCard title="Membres de l'équipe" desc="Gérez les accès et les rôles.">
      <ul className="space-y-2">
        {TEAM.map((m) => (
          <li key={m.name} className="flex items-center gap-3 rounded-xl border border-hair p-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-noir text-xs font-bold text-jaune-vif">{m.initials}</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-noir">{m.name}</p>
            </div>
            <span className="rounded-full border border-hair px-2.5 py-1 text-xs font-medium text-gris-fonce">{m.role}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Invitation envoyée"); (e.target as HTMLFormElement).reset(); }} className="mt-4 flex gap-2">
        <input type="email" required placeholder="email@restaurant.ch" className="h-10 flex-1 rounded-full border border-hair bg-creme/40 px-4 text-sm text-noir outline-none focus:border-noir" />
        <button type="submit" className="inline-flex items-center gap-1.5 rounded-full bg-jaune-vif px-4 text-sm font-bold text-noir transition-transform hover:-translate-y-0.5">
          <UserPlus className="h-4 w-4" /> Inviter
        </button>
      </form>
    </SettingCard>
  );
}
