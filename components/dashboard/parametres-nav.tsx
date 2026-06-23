"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Restaurant", href: "/dashboard/parametres" },
  { label: "Abonnement", href: "/dashboard/parametres/abonnement" },
  { label: "Équipe", href: "/dashboard/parametres/equipe" },
  { label: "Intégrations", href: "/dashboard/parametres/integrations" },
  { label: "Notifications", href: "/dashboard/parametres/notifications" },
];

export function ParametresNav() {
  const pathname = usePathname();
  return (
    <div className="mb-6 flex gap-1 overflow-x-auto border-b border-hair">
      {TABS.map((t) => {
        const active = t.href === pathname;
        return (
          <a
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
              active ? "border-jaune-vif text-noir" : "border-transparent text-gris-fonce hover:text-noir",
            )}
          >
            {t.label}
          </a>
        );
      })}
    </div>
  );
}
