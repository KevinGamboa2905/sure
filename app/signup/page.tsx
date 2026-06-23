import type { Metadata } from "next";
import { ShieldCheck, Headphones, CreditCard, MessageSquareText } from "lucide-react";
import { Wordmark } from "@/components/brand/wordmark";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Créer un compte",
  robots: { index: false },
};

const REASSURANCE = [
  { icon: ShieldCheck, label: "Données hébergées en Suisse" },
  { icon: Headphones, label: "Support en français" },
  { icon: CreditCard, label: "Aucune CB requise" },
];

export default function SignupPage() {
  return (
    <div className="grid min-h-[100dvh] grid-cols-1 lg:grid-cols-[3fr_2fr]">
      {/* ----- Gauche : formulaire ----- */}
      <div className="flex flex-col bg-creme px-6 py-10 sm:px-12 lg:px-16">
        <div className="flex items-center justify-between">
          <Wordmark />
          <a href="/" className="text-sm text-gris-fonce transition-colors hover:text-noir">← Retour à l&apos;accueil</a>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-noir sm:text-5xl">
            Créez votre compte en <span className="stabilo">2 minutes.</span>
          </h1>
          <p className="mt-4 text-gris-fonce">
            Essai gratuit 30 jours · Sans CB · Annulation 1 clic
          </p>

          <SignupForm />

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-hair pt-5">
            {REASSURANCE.map((r) => (
              <span key={r.label} className="inline-flex items-center gap-1.5 text-xs text-gris-fonce">
                <r.icon className="h-3.5 w-3.5 text-noir" strokeWidth={2} />
                {r.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ----- Droite : preuve sociale ----- */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-jaune-vif px-12 py-14 lg:flex">
        {/* Pattern diagonal subtil */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 22px)",
          }}
        />

        <div className="relative flex items-center gap-2 text-sm font-medium text-noir/70">
          <MessageSquareText className="h-4 w-4" strokeWidth={2} />
          L&apos;anti no-show des restaurants romands
        </div>

        {/* Citation */}
        <figure className="relative">
          <blockquote className="text-3xl font-bold leading-tight tracking-tight text-noir xl:text-4xl">
            « Avant Tably, je perdais 3 tables par week-end. Aujourd&apos;hui,
            c&apos;est <span className="relative whitespace-nowrap">zéro
              <span aria-hidden className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-noir" />
            </span>. »
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-noir text-sm font-bold text-jaune-vif">
              SR
            </span>
            <div className="text-sm">
              <p className="font-bold text-noir">Sophie R.</p>
              <p className="text-noir/60">Restauratrice à Genève</p>
            </div>
          </figcaption>
        </figure>

        <div className="relative border-t border-noir/15 pt-5 text-sm font-medium text-noir/70">
          Rejoint par 47+ restaurants en Suisse romande
        </div>
      </div>
    </div>
  );
}
