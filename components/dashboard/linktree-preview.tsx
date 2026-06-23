"use client";

import {
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Globe,
  Star,
  Music2,
  CalendarCheck,
} from "lucide-react";
import type { SocialKey } from "@/lib/mock-data";
import { FONT_STACKS } from "@/lib/mock-data";

export type Customization = {
  restaurantName: string;
  tagline: string;
  logoUrl: string | null;
  colors: { primary: string; background: string; text: string };
  font: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  socialLinks: { key: SocialKey; label: string; url: string; enabled: boolean }[];
  reservations: {
    enabled: boolean;
    requireDeposit: boolean;
    depositPerCover: number;
    cancellationWindow: string;
  };
};

const SOCIAL_ICONS: Record<SocialKey, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
  maps: MapPin,
  tripadvisor: Star,
  website: Globe,
  tiktok: Music2,
};

const SOCIAL_PREVIEW_LABEL: Record<SocialKey, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  maps: "Google Maps",
  tripadvisor: "TripAdvisor",
  website: "Site web",
  tiktok: "TikTok",
};

/* ----------------------------- helpers couleur ----------------------------- */

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgba(hex: string, a: number) {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
/** Noir ou blanc selon la luminance, pour rester lisible sur la couleur primaire. */
function readableOn(hex: string) {
  const [r, g, b] = hexToRgb(hex);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? "#000000" : "#ffffff";
}

function LinkButton({
  icon: Icon,
  label,
  primary,
  text,
}: {
  icon: typeof MapPin;
  label: string;
  primary: string;
  text: string;
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-transform duration-200 hover:scale-[1.02]"
      style={{
        backgroundColor: rgba(primary, 0.12),
        border: `1px solid ${rgba(primary, 0.3)}`,
        color: text,
      }}
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={2} style={{ color: primary }} />
      <span className="flex-1 text-center">{label}</span>
      <span className="w-4" />
    </div>
  );
}

export function LinktreePreview({ customization: c }: { customization: Customization }) {
  const { primary, background, text } = c.colors;
  const fontFamily = FONT_STACKS[c.font] ?? FONT_STACKS["Helvetica Now Display"];
  const initial = c.restaurantName.trim().charAt(0).toUpperCase() || "T";

  return (
    <div
      className="h-full overflow-y-auto transition-colors duration-300"
      style={{ backgroundColor: background, color: text, fontFamily }}
    >
     <div className="mx-auto flex min-h-full w-full max-w-[280px] flex-col items-center px-6 py-8">
      {/* Logo */}
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold transition-colors duration-300"
        style={{ backgroundColor: primary, color: readableOn(primary) }}
      >
        {c.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={c.logoUrl} alt="" className="h-full w-full rounded-full object-cover" />
        ) : (
          initial
        )}
      </div>

      <h1 className="mt-4 text-center text-xl font-bold tracking-tight">{c.restaurantName}</h1>
      <p className="mt-1 text-center text-sm" style={{ opacity: 0.7 }}>
        {c.tagline}
      </p>

      {/* CTA réservation */}
      {c.reservations.enabled && (
        <button
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-transform duration-200 hover:scale-[1.02]"
          style={{ backgroundColor: primary, color: readableOn(primary) }}
        >
          <CalendarCheck className="h-4 w-4" strokeWidth={2.2} />
          Réserver une table
        </button>
      )}

      {/* Liens */}
      <div className="mt-4 w-full space-y-2.5">
        <LinkButton icon={MapPin} label="Notre adresse" primary={primary} text={text} />
        <LinkButton icon={Phone} label="Nous appeler" primary={primary} text={text} />
        {c.socialLinks
          .filter((l) => l.enabled)
          .map((l) => (
            <LinkButton
              key={l.key}
              icon={SOCIAL_ICONS[l.key]}
              label={SOCIAL_PREVIEW_LABEL[l.key]}
              primary={primary}
              text={text}
            />
          ))}
      </div>

      {/* Horaires */}
      <p className="mt-6 text-center text-xs" style={{ opacity: 0.6 }}>
        Ouvert mar–sam · 12h–14h · 19h–23h
      </p>

      {/* Footer */}
      <p className="mt-auto pt-6 text-center text-[11px]" style={{ opacity: 0.4 }}>
        Propulsé par Tably
      </p>
     </div>
    </div>
  );
}
