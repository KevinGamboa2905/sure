"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const COLUMNS = [
  {
    title: "Produit",
    links: [
      { label: "Solution", href: "/#solution" },
      { label: "Tarifs", href: "/#tarifs" },
      { label: "Essai gratuit", href: "/trial" },
      { label: "Espace restaurateur (démo)", href: "/dashboard" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "À propos", href: "/#solution" },
      { label: "Avis", href: "/#avis" },
      { label: "Contact", href: "/contact" },
      { label: "Se connecter", href: "/login" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Conditions générales", href: "/cgu" },
      { label: "Confidentialité", href: "/confidentialite" },
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

function Logo() {
  return (
    <span className="text-2xl font-bold tracking-tight text-noir">
      Tably
    </span>
  );
}

export function Footer() {
  const [done, setDone] = useState(false);

  return (
    <footer className="border-t border-hair bg-creme">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-6">
          {/* Marque */}
          <div className="col-span-2 lg:col-span-3">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-gris-fonce">
              L&apos;anti no-show des restaurants. Rappels SMS,
              acompte sécurisé, salle pleine.
            </p>
          </div>

          {/* Colonnes de liens */}
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-xs uppercase tracking-label text-noir">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-gris-fonce transition-colors hover:text-noir"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-14 flex flex-col gap-4 border-t border-hair pt-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold text-noir">Le brief du restaurateur</p>
            <p className="text-sm text-gris-fonce">
              Une fois par mois : remplir sa salle, sans le jargon.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
            className="flex w-full max-w-sm items-center gap-2"
          >
            <label htmlFor="newsletter" className="sr-only">
              Adresse e-mail
            </label>
            <input
              id="newsletter"
              type="email"
              required
              placeholder="vous@restaurant.ch"
              className="h-11 w-full rounded-full border border-hair bg-blanc px-4 text-sm text-noir outline-none transition-colors placeholder:text-gris-clair focus:border-noir"
            />
            <button
              type="submit"
              aria-label="S'inscrire à la newsletter"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-jaune-vif text-noir transition-transform hover:-translate-y-0.5"
            >
              {done ? <Check className="h-4 w-4" strokeWidth={2.5} /> : <ArrowRight className="h-4 w-4" strokeWidth={2} />}
            </button>
          </form>
        </div>

        {/* Bas de page */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-hair pt-8 text-xs text-gris-fonce sm:flex-row">
          <p>© {new Date().getFullYear()} Tably. Conçu en Suisse romande.</p>
          <p>TVA CHE-000.000.000 · Lausanne</p>
        </div>
      </div>
    </footer>
  );
}
