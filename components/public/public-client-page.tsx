"use client";

import { useState } from "react";
import {
  MapPin, Phone, Instagram, Facebook, Globe, Star, Music2, CalendarCheck,
} from "lucide-react";
import { toast } from "sonner";
import {
  DEMO_RESTAURANT, DEFAULT_SOCIALS, OPENING_HOURS, type SocialKey,
} from "@/lib/mock-data";
import { ReservationModal } from "./reservation-modal";

const SOCIAL_ICONS: Record<SocialKey, typeof Instagram> = {
  instagram: Instagram, facebook: Facebook, maps: MapPin,
  tripadvisor: Star, website: Globe, tiktok: Music2,
};
const SOCIAL_LABEL: Record<SocialKey, string> = {
  instagram: "Instagram", facebook: "Facebook", maps: "Google Maps",
  tripadvisor: "TripAdvisor", website: "Site web", tiktok: "TikTok",
};

function LinkRow({ icon: Icon, label, onClick, href }: { icon: typeof MapPin; label: string; onClick?: () => void; href?: string }) {
  const cls =
    "flex w-full items-center gap-3 rounded-xl border border-noir/15 bg-noir/[0.04] px-4 py-3.5 text-sm font-medium text-noir transition-transform duration-200 hover:scale-[1.02] hover:bg-noir/[0.07]";
  const inner = (
    <>
      <Icon className="h-4 w-4 shrink-0 text-noir" strokeWidth={2} />
      <span className="flex-1 text-center">{label}</span>
      <span className="w-4" />
    </>
  );
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
  return <button onClick={onClick} className={cls}>{inner}</button>;
}

export function PublicClientPage() {
  const [open, setOpen] = useState(false);
  const r = DEMO_RESTAURANT;
  const socials = DEFAULT_SOCIALS.filter((s) => s.enabled);

  return (
    <div className="min-h-[100dvh] bg-creme">
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col items-center px-6 py-12">
        {/* Logo */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-jaune-vif text-2xl font-bold text-noir shadow-lift-sm">
          {r.monogram}
        </div>
        <h1 className="mt-4 text-center text-2xl font-bold tracking-tight text-noir">{r.name}</h1>
        <p className="mt-1 text-center text-sm text-gris-fonce">{r.tagline}</p>

        {/* CTA */}
        <button
          onClick={() => setOpen(true)}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-jaune-vif py-4 text-sm font-bold text-noir shadow-lift-sm transition-transform duration-200 hover:-translate-y-0.5"
        >
          <CalendarCheck className="h-4 w-4" strokeWidth={2.2} />
          Réserver une table
        </button>

        {/* Liens */}
        <div className="mt-4 w-full space-y-2.5">
          <LinkRow
            icon={MapPin}
            label="Notre adresse"
            href={`https://maps.google.com/?q=${encodeURIComponent(r.address)}`}
          />
          <LinkRow icon={Phone} label="Nous appeler" href={`tel:${r.phone.replace(/\s/g, "")}`} />
          {socials.map((s) => (
            <LinkRow
              key={s.key}
              icon={SOCIAL_ICONS[s.key]}
              label={SOCIAL_LABEL[s.key]}
              onClick={() => {
                if (s.url) window.open(`https://${s.url}`, "_blank", "noopener");
                else toast("Lien démo");
              }}
            />
          ))}
        </div>

        {/* Horaires */}
        <div className="mt-7 w-full rounded-2xl border border-noir/10 bg-blanc/50 p-4">
          <p className="mb-2 text-center text-xs font-medium uppercase tracking-label text-gris-fonce">Horaires</p>
          <ul className="space-y-1 text-xs">
            {OPENING_HOURS.map((h) => (
              <li key={h.day} className="flex justify-between text-noir/80">
                <span>{h.day}</span>
                <span className="text-gris-fonce">{h.midi} · {h.soir}</span>
              </li>
            ))}
          </ul>
        </div>

        <a href="/" className="mt-auto pt-8 text-[11px] text-gris-fonce/70">
          Propulsé par <span className="font-bold text-noir">Tably</span>
        </a>
      </div>

      <ReservationModal open={open} onClose={() => setOpen(false)} slug={r.slug} />
    </div>
  );
}
