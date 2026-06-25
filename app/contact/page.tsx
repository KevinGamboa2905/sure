import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { PublicHeader } from "@/components/marketing/public-header";
import { Footer } from "@/components/sections/footer";
import { ContactForm } from "@/components/marketing/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Une question sur Tably ? Écrivez-nous, on répond en français sous 24h.",
};

export default function ContactPage({ searchParams }: { searchParams: { subject?: string } }) {
  const defaultSubject = searchParams?.subject === "sur-mesure" ? "Demande Plan Sur mesure" : "";
  return (
    <div className="bg-creme">
      <PublicHeader />

      <section className="px-5 pb-20 pt-16 sm:px-8 lg:pt-24">
        <div className="mx-auto max-w-6xl">
          <p className="kicker">Contact</p>
          <h1 className="mt-4 max-w-2xl text-5xl font-bold leading-[0.95] tracking-tight text-noir md:text-6xl">
            Parlons de votre <span className="stabilo">salle.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-gris-fonce">
            Une question, une démo, un devis ? On répond en français sous 24h.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            {/* Formulaire */}
            <div className="rounded-3xl border border-hair bg-blanc p-7 sm:p-8">
              <ContactForm defaultSubject={defaultSubject} />
            </div>

            {/* Coordonnées + carte */}
            <div className="space-y-6">
              <div className="space-y-3">
                <a href="mailto:bonjour@tably.ch" className="flex items-center gap-3 text-noir hover:underline">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-hair bg-blanc"><Mail className="h-4 w-4" /></span>
                  bonjour@tably.ch
                </a>
                <a href="tel:+41215550100" className="flex items-center gap-3 text-noir hover:underline">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-hair bg-blanc"><Phone className="h-4 w-4" /></span>
                  +41 21 555 01 00
                </a>
                <p className="flex items-center gap-3 text-noir">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-hair bg-blanc"><MapPin className="h-4 w-4" /></span>
                  Rue du Marché 1, 1003 Lausanne
                </p>
              </div>

              {/* Carte placeholder */}
              <div
                className="flex aspect-[4/3] items-center justify-center rounded-3xl border border-hair"
                style={{
                  backgroundColor: "#eef0ea",
                  backgroundImage:
                    "linear-gradient(rgba(188,188,188,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(188,188,188,0.35) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-blanc px-4 py-2 text-sm font-medium text-noir shadow-card">
                  <MapPin className="h-4 w-4 text-[#d8542a]" /> Genève · Lausanne, Suisse
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
