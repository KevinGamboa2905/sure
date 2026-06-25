"use client";

import { useState } from "react";
import {
  MapPin, Phone, Instagram, Facebook, Globe, Star, Music2, CalendarCheck,
} from "lucide-react";
import { toast } from "sonner";
import { FONT_STACKS, type SocialKey } from "@/lib/mock-data";
import { ReservationModal } from "./reservation-modal";

const SOCIAL_ICONS: Record<SocialKey, typeof Instagram> = {
  instagram: Instagram, facebook: Facebook, maps: MapPin,
  tripadvisor: Star, website: Globe, tiktok: Music2,
};

export type PublicRestaurant = {
  name: string; slug: string; tagline: string; logoUrl: string | null;
  address: string; phone: string;
  primaryColor: string; backgroundColor: string; textColor: string; font: string;
};
type Social = { key: SocialKey; label: string; url: string; enabled: boolean };

function hexToRgb(hex: string) {
  const c = hex.replace("#", "");
  const v = c.length === 3 ? c.split("").map((x) => x + x).join("") : c;
  return { r: parseInt(v.slice(0, 2), 16), g: parseInt(v.slice(2, 4), 16), b: parseInt(v.slice(4, 6), 16) };
}
function readableOn(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6 ? "#000000" : "#ffffff";
}
function rgba(hex: string, a: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function getInitials(name: string) {
  const w = name.trim().split(/[\s'’-]+/).filter(Boolean);
  return w.length ? w.map((x) => x[0]).join("").slice(0, 2).toUpperCase() : "?";
}

export function PublicClientPage({ restaurant: r, socials }: { restaurant: PublicRestaurant; socials: Social[] }) {
  const [open, setOpen] = useState(false);
  const onPrimary = readableOn(r.primaryColor);
  const enabledSocials = socials.filter((s) => s.enabled);

  const rowStyle = {
    border: `1px solid ${rgba(r.textColor, 0.15)}`,
    backgroundColor: rgba(r.textColor, 0.04),
    color: r.textColor,
  };

  function LinkRow({ icon: Icon, label, onClick, href }: { icon: typeof MapPin; label: string; onClick?: () => void; href?: string }) {
    const cls = "flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-transform duration-200 hover:scale-[1.02]";
    const inner = (
      <>
        <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
        <span className="flex-1 text-center">{label}</span>
        <span className="w-4" />
      </>
    );
    if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={rowStyle}>{inner}</a>;
    return <button onClick={onClick} className={cls} style={rowStyle}>{inner}</button>;
  }

  return (
    <div
      className="min-h-[100dvh]"
      style={{ backgroundColor: r.backgroundColor, color: r.textColor, fontFamily: FONT_STACKS[r.font] ?? FONT_STACKS["Helvetica Now Display"] }}
    >
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col items-center px-6 py-12">
        {/* Logo */}
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full text-2xl font-bold shadow-lift-sm" style={{ backgroundColor: r.primaryColor, color: onPrimary }}>
          {r.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={r.logoUrl} alt={r.name} className="h-full w-full object-cover" />
          ) : (
            getInitials(r.name)
          )}
        </div>
        <h1 className="mt-4 text-center text-2xl font-bold tracking-tight">{r.name}</h1>
        {r.tagline && <p className="mt-1 text-center text-sm" style={{ color: rgba(r.textColor, 0.65) }}>{r.tagline}</p>}

        {/* CTA */}
        <button
          onClick={() => setOpen(true)}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold shadow-lift-sm transition-transform duration-200 hover:-translate-y-0.5"
          style={{ backgroundColor: r.primaryColor, color: onPrimary }}
        >
          <CalendarCheck className="h-4 w-4" strokeWidth={2.2} />
          Réserver une table
        </button>

        {/* Liens */}
        <div className="mt-4 w-full space-y-2.5">
          <LinkRow icon={MapPin} label="Notre adresse" href={`https://maps.google.com/?q=${encodeURIComponent(r.address)}`} />
          <LinkRow icon={Phone} label="Nous appeler" href={`tel:${r.phone.replace(/\s/g, "")}`} />
          {enabledSocials.map((s) => (
            <LinkRow
              key={s.key}
              icon={SOCIAL_ICONS[s.key] ?? Globe}
              label={s.label}
              onClick={() => {
                if (s.url) window.open(s.url.startsWith("http") ? s.url : `https://${s.url}`, "_blank", "noopener");
                else toast("Lien non renseigné");
              }}
            />
          ))}
        </div>

        <a href="/" className="mt-auto pt-8 text-[11px]" style={{ color: rgba(r.textColor, 0.5) }}>
          Propulsé par <span className="font-bold" style={{ color: r.textColor }}>Tably</span>
        </a>
      </div>

      <ReservationModal open={open} onClose={() => setOpen(false)} slug={r.slug} />
    </div>
  );
}
