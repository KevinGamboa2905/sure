"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "Solution", href: "#solution" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Avis", href: "#avis" },
  { label: "FAQ", href: "#faq" },
];

/** Logo « Tably » en Helvetica Now Display Bold. */
function Logo() {
  return (
    <a
      href="#accueil"
      className="group relative text-xl font-bold tracking-tight text-noir"
      aria-label="Tably — accueil"
    >
      Tably
    </a>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Bordure + ombre qui n'apparaissent qu'après un léger scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Verrouille le scroll du body quand le drawer mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <nav
        aria-label="Navigation principale"
        className={cn(
          "supports-[backdrop-filter]:bg-creme/70 bg-creme/90 backdrop-blur-md transition-colors duration-300",
          scrolled ? "border-b border-hair shadow-lift-sm" : "border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo />

          {/* Liens centrés (desktop) */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-gris-fonce transition-colors hover:text-noir"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA (desktop) */}
          <div className="hidden md:block">
            <Button asChild size="sm" variant="primary">
              <a href="/signup">Essai gratuit</a>
            </Button>
          </div>

          {/* Hamburger (mobile) */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-noir md:hidden"
            aria-label="Ouvrir le menu"
            aria-expanded={open}
          >
            <Menu className="h-6 w-6" strokeWidth={2} />
          </button>
        </div>
      </nav>

      {/* Drawer plein écran (mobile) */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-creme px-6 pt-6 transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-noir"
            aria-label="Fermer le menu"
          >
            <X className="h-6 w-6" strokeWidth={2} />
          </button>
        </div>

        <ul className="mt-10 flex flex-col gap-1">
          {LINKS.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-hair py-4 text-3xl font-bold tracking-tight text-noir"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-auto pb-10 pt-8">
          <Button asChild size="lg" variant="primary" className="w-full">
            <a href="/signup">Essai gratuit — 14 jours</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
