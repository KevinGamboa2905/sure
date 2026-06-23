import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  UtensilsCrossed,
  Instagram,
  MapPin,
  Phone,
  Globe,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import {
  getRestaurant,
  getAllRestaurantSlugs,
  weekdayLabel,
  type QuickLinkIcon,
} from "@/lib/restaurants";
import { BookingWidget } from "@/components/booking/booking-widget";

export function generateStaticParams() {
  return getAllRestaurantSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = getRestaurant(params.slug);
  if (!r) return { title: "Restaurant introuvable" };
  return {
    title: `${r.name} — Réserver une table`,
    description: `${r.tagline}. Réservez votre table en ligne, confirmation par SMS.`,
    robots: { index: false }, // pages clients : pas d'indexation
  };
}

const ICONS: Record<QuickLinkIcon, typeof Phone> = {
  menu: UtensilsCrossed,
  instagram: Instagram,
  map: MapPin,
  phone: Phone,
  globe: Globe,
};

export default function RestaurantPage({ params }: { params: { slug: string } }) {
  const r = getRestaurant(params.slug);
  if (!r) notFound();

  // Branding par lien : injecté en variables CSS.
  const brandVars = {
    "--brand-page": r.brand.page,
    "--brand-surface": r.brand.surface,
    "--brand-ink": r.brand.ink,
    "--brand-sub": r.brand.sub,
    "--brand-border": r.brand.border,
    "--brand-accent": r.brand.accent,
    "--brand-accent-ink": r.brand.accentInk,
  } as React.CSSProperties;

  return (
    <div
      style={brandVars}
      className="min-h-[100dvh] bg-[var(--brand-page)] text-[var(--brand-ink)]"
    >
      {/* Bandeau d'accent en fond du header */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-40 bg-[var(--brand-accent)]" />
        <div className="relative mx-auto max-w-xl px-5 pt-16 text-center">
          {/* Logo monogramme */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border-4 border-[var(--brand-page)] bg-[var(--brand-surface)] text-2xl font-bold text-[var(--brand-ink)] shadow-lg">
            {r.monogram}
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">{r.name}</h1>
          <p className="mt-1 text-[var(--brand-sub)]">{r.tagline}</p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-[var(--brand-sub)]">
            <MapPin className="h-3.5 w-3.5" /> {r.address}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-xl px-5 pb-20 pt-8">
        {/* Liens rapides (style Linktree) */}
        <nav aria-label="Liens" className="space-y-3">
          {r.links.map((l) => {
            const Icon = ICONS[l.icon];
            return (
              <a
                key={l.label}
                href={l.href}
                className="group flex items-center gap-3 rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] px-5 py-4 text-sm font-medium transition-transform hover:-translate-y-0.5"
              >
                <Icon className="h-5 w-5 text-[var(--brand-accent)]" strokeWidth={2} />
                <span className="flex-1">{l.label}</span>
                <ArrowUpRight className="h-4 w-4 text-[var(--brand-sub)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            );
          })}
        </nav>

        {/* Widget de réservation */}
        <div className="mt-8">
          <BookingWidget restaurant={r} />
        </div>

        {/* Horaires */}
        <div className="mt-8 rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6">
          <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-[var(--brand-sub)]">
            <Clock className="h-3.5 w-3.5" /> Horaires
          </p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {[1, 2, 3, 4, 5, 6, 0].map((wd) => {
              const day = r.hours[wd];
              const closed = !day || day.services.length === 0;
              return (
                <li key={wd} className="flex justify-between">
                  <span className="text-[var(--brand-ink)]">{weekdayLabel(wd)}</span>
                  <span className={closed ? "text-[var(--brand-sub)]/60" : "text-[var(--brand-sub)]"}>
                    {closed
                      ? "Fermé"
                      : day.services.map((s) => `${s.from}–${s.to}`).join("  ·  ")}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Pied : propulsé par + espace restaurateur */}
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <a
            href={`/${r.slug}/dashboard`}
            className="text-xs font-medium text-[var(--brand-sub)] underline decoration-[var(--brand-accent)] decoration-2 underline-offset-4"
          >
            Espace restaurateur
          </a>
          <a href="/" className="text-xs text-[var(--brand-sub)]/70">
            Propulsé par <span className="font-bold text-[var(--brand-ink)]">Tably</span>
          </a>
        </div>
      </div>
    </div>
  );
}
