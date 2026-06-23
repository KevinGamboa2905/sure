"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Palette, ExternalLink, Smartphone, Monitor, Copy, QrCode } from "lucide-react";
import { toast } from "sonner";
import {
  DEMO_RESTAURANT,
  DEFAULT_SOCIALS,
  DEFAULT_BRANDING,
} from "@/lib/mock-data";
import { PhoneFrame } from "@/components/dashboard/phone-frame";
import { LinktreePreview, type Customization } from "@/components/dashboard/linktree-preview";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PREVIEW: Customization = {
  restaurantName: DEMO_RESTAURANT.name,
  tagline: DEMO_RESTAURANT.tagline,
  logoUrl: null,
  colors: { ...DEFAULT_BRANDING },
  font: "Helvetica Now Display",
  address: DEMO_RESTAURANT.address,
  phone: DEMO_RESTAURANT.phone,
  email: DEMO_RESTAURANT.email,
  website: DEMO_RESTAURANT.website,
  socialLinks: DEFAULT_SOCIALS.map((s) => ({ ...s })),
  reservations: { enabled: true, requireDeposit: true, depositPerCover: 10, cancellationWindow: "48h" },
};

export default function PageClientPage() {
  const router = useRouter();
  const [view, setView] = useState<"mobile" | "desktop">("mobile");

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-noir sm:text-3xl">Ma page client</h1>
          <p className="mt-1 text-gris-fonce">L&apos;aperçu de votre page de réservation publique.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-full border border-hair bg-blanc p-1">
            {([["mobile", Smartphone], ["desktop", Monitor]] as const).map(([v, Icon]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                aria-label={v}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors",
                  view === v ? "bg-noir text-creme" : "text-gris-fonce hover:text-noir",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {v === "mobile" ? "Mobile" : "Desktop"}
              </button>
            ))}
          </div>
          <Button size="sm" variant="outline" onClick={() => { navigator.clipboard?.writeText(`https://tably.ch/${DEMO_RESTAURANT.slug}`); toast.success("Lien copié"); }}>
            <Copy className="h-4 w-4" /> Copier le lien
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a href={`/r/${DEMO_RESTAURANT.slug}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" /> Voir la page publique
            </a>
          </Button>
          <Button size="sm" variant="primary" onClick={() => router.push("/dashboard#ma-page-client")}>
            <Palette className="h-4 w-4" /> Personnaliser
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto]">
        <div className="flex justify-center rounded-3xl border border-hair bg-creme/40 p-6 sm:p-10">
          <PhoneFrame variant={view} url={`tably.ch/${DEMO_RESTAURANT.slug}`}>
            <LinktreePreview customization={PREVIEW} />
          </PhoneFrame>
        </div>

        {/* QR code (placeholder visuel) */}
        <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-hair bg-blanc p-6 lg:w-56">
          <div
            className="h-32 w-32 rounded-xl border border-hair"
            style={{
              backgroundImage:
                "repeating-conic-gradient(#000 0% 25%, #fff 0% 50%)",
              backgroundSize: "16px 16px",
            }}
            aria-hidden
          />
          <p className="flex items-center gap-1.5 text-xs text-gris-fonce"><QrCode className="h-3.5 w-3.5" /> À afficher en salle</p>
        </div>
      </div>
    </div>
  );
}
