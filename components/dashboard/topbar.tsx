"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Plus, User, CreditCard, LifeBuoy, LogOut, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { DEMO_RESTAURANT } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { NewReservationModal } from "./new-reservation-modal";

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const router = useRouter();
  const { logout } = useAuth();
  const [modal, setModal] = useState(false);
  const [menu, setMenu] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-hair bg-creme/85 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between gap-3 px-5 sm:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenu}
            aria-label="Ouvrir le menu"
            className="-ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-noir lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold tracking-tight text-noir">{DEMO_RESTAURANT.name}</p>
            <p className="hidden text-xs text-gris-fonce sm:block">{DEMO_RESTAURANT.address}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" variant="primary" className="gap-1.5" onClick={() => setModal(true)}>
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            <span className="hidden sm:inline">Nouvelle réservation</span>
            <span className="sm:hidden">Réserver</span>
          </Button>

          {/* Avatar + dropdown */}
          <div className="relative">
            <button
              onClick={() => setMenu((v) => !v)}
              aria-label="Menu du compte"
              aria-expanded={menu}
              className="flex items-center gap-1 rounded-full"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-noir text-xs font-bold text-jaune-vif">
                {DEMO_RESTAURANT.monogram}
              </span>
              <ChevronDown className="hidden h-4 w-4 text-gris-fonce sm:block" />
            </button>

            {menu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenu(false)} />
                <div className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-2xl border border-hair bg-blanc py-1.5 shadow-lift">
                  <div className="border-b border-hair px-4 py-2.5">
                    <p className="text-sm font-bold text-noir">{DEMO_RESTAURANT.name}</p>
                    <p className="text-xs text-gris-fonce">{DEMO_RESTAURANT.plan}</p>
                  </div>
                  {[
                    { label: "Mon profil", icon: User, action: () => router.push("/dashboard/parametres") },
                    { label: "Mon abonnement", icon: CreditCard, action: () => router.push("/dashboard/parametres") },
                    { label: "Aide", icon: LifeBuoy, action: () => toast("Centre d'aide — démo") },
                    { label: "Déconnexion", icon: LogOut, action: () => { logout(); toast.success("Déconnecté"); router.push("/login"); } },
                  ].map((it) => (
                    <button
                      key={it.label}
                      onClick={() => { setMenu(false); it.action(); }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-noir transition-colors hover:bg-noir/[0.04]"
                    >
                      <it.icon className="h-4 w-4 text-gris-fonce" strokeWidth={2} />
                      {it.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <NewReservationModal open={modal} onClose={() => setModal(false)} />
    </header>
  );
}
