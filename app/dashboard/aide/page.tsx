"use client";

import { Search, Rocket, CalendarCheck, ShieldCheck, MessageSquareText, CreditCard, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  { icon: Rocket, title: "Démarrage", desc: "Configurer votre compte et votre page." },
  { icon: CalendarCheck, title: "Réservations", desc: "Gérer, modifier, annuler les réservations." },
  { icon: ShieldCheck, title: "Acomptes", desc: "Activer et encaisser les acomptes Stripe." },
  { icon: MessageSquareText, title: "Rappels SMS", desc: "Workflows, modèles et crédits SMS." },
  { icon: CreditCard, title: "Facturation", desc: "Plans, factures et moyens de paiement." },
];

export default function AidePage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-noir sm:text-3xl">Centre d&apos;aide</h1>
        <p className="mt-1 text-gris-fonce">Comment pouvons-nous vous aider ?</p>
        <form onSubmit={(e) => { e.preventDefault(); toast("Recherche — démo"); }} className="relative mx-auto mt-5 max-w-lg">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gris-fonce" />
          <input placeholder="Rechercher dans l'aide…" className="h-12 w-full rounded-full border border-hair bg-blanc pl-11 pr-4 text-sm text-noir outline-none transition-colors placeholder:text-gris-clair focus:border-noir" />
        </form>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c) => (
          <button key={c.title} onClick={() => toast(`${c.title} — démo`)} className="group rounded-2xl border border-hair bg-blanc p-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift-sm">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border-[1.5px] border-noir bg-jaune-vif"><c.icon className="h-5 w-5 text-noir" strokeWidth={2} /></span>
            <h3 className="mt-4 text-base font-bold tracking-tight text-noir">{c.title}</h3>
            <p className="mt-1 text-sm text-gris-fonce">{c.desc}</p>
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-hair bg-creme/40 p-6 sm:flex-row">
        <div>
          <p className="font-bold text-noir">Vous ne trouvez pas ?</p>
          <p className="text-sm text-gris-fonce">Notre équipe répond en français sous 24h.</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => toast.success("Demande envoyée au support")}>Contacter le support</Button>
      </div>

      {/* Chat widget (visuel) */}
      <button
        onClick={() => toast("Chat en direct — démo")}
        aria-label="Ouvrir le chat"
        className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-noir text-jaune-vif shadow-lift transition-transform hover:-translate-y-0.5"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
}
