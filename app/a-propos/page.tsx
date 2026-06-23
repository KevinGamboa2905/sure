import type { Metadata } from "next";
import { Heart, ShieldCheck, Zap } from "lucide-react";
import { PublicHeader } from "@/components/marketing/public-header";
import { Footer } from "@/components/sections/footer";
import { FinalCTA } from "@/components/sections/final-cta";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "À propos",
  description: "Tably aide les restaurants de Suisse romande à éliminer les no-shows. Notre mission, notre histoire, notre équipe.",
};

const TEAM = [
  { name: "Sophie Reymond", role: "CEO & cofondatrice", initials: "SR" },
  { name: "Julien Aebischer", role: "CTO & cofondateur", initials: "JA" },
  { name: "Camille Berset", role: "Head of Product", initials: "CB" },
  { name: "Marco Esposito", role: "Lead Customer Success", initials: "ME" },
];

const VALUES = [
  { icon: ShieldCheck, title: "Fiabilité suisse", desc: "Données hébergées en Suisse, disponibilité maximale, zéro compromis." },
  { icon: Heart, title: "Proche des restaurateurs", desc: "On passe nos journées en salle et en cuisine, pas seulement devant un écran." },
  { icon: Zap, title: "Simple, vraiment", desc: "Un outil qu'on configure en 10 minutes, pas un ERP de plus à apprendre." },
];

export default function AProposPage() {
  return (
    <div className="bg-creme">
      <PublicHeader />

      {/* Hero mission */}
      <section className="px-5 pb-16 pt-16 sm:px-8 lg:pt-24">
        <RevealGroup className="mx-auto max-w-3xl text-center">
          <Reveal><p className="kicker">Notre mission</p></Reveal>
          <Reveal>
            <h1 className="mt-4 text-5xl font-bold leading-[0.95] tracking-tight text-noir md:text-7xl">
              Rendre chaque table <span className="stabilo">rentable.</span>
            </h1>
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-6 max-w-xl text-lg text-gris-fonce">
              Chaque no-show, c&apos;est une table vide, un plat jeté, du CA perdu.
              Tably existe pour que ça n&apos;arrive plus aux restaurants de Suisse romande.
            </p>
          </Reveal>
        </RevealGroup>
      </section>

      {/* Histoire */}
      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <Reveal><p className="kicker lg:sticky lg:top-24">Notre histoire</p></Reveal>
          <RevealGroup className="space-y-5 text-lg text-gris-fonce">
            <Reveal><p>Tout a commencé dans un bistrot lausannois, un vendredi soir de 2023 : trois tables réservées, personne. Le chef, excédé, lance « il doit bien exister un moyen d&apos;empêcher ça ».</p></Reveal>
            <Reveal><p>Quelques mois plus tard, Tably envoyait ses premiers rappels SMS. Aujourd&apos;hui, des dizaines de restaurants romands ont divisé leurs no-shows par trois — et récupéré le CA qui partait en fumée chaque semaine.</p></Reveal>
            <Reveal><p className="font-medium text-noir">On reste obsédés par une seule métrique : la salle pleine, chaque service.</p></Reveal>
          </RevealGroup>
        </div>
      </section>

      {/* Équipe */}
      <section className="bg-blanc px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <RevealGroup className="max-w-xl">
            <Reveal><p className="kicker">L&apos;équipe</p></Reveal>
            <Reveal><h2 className="mt-4 text-4xl font-bold tracking-tight text-noir md:text-5xl">Des gens du métier.</h2></Reveal>
          </RevealGroup>
          <RevealGroup className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {TEAM.map((m) => (
              <Reveal key={m.name}>
                <article className="rounded-3xl border border-hair bg-creme/40 p-6 text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-jaune-vif text-lg font-bold text-noir">{m.initials}</span>
                  <h3 className="mt-4 text-base font-bold tracking-tight text-noir">{m.name}</h3>
                  <p className="mt-0.5 text-sm text-gris-fonce">{m.role}</p>
                </article>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Valeurs */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <RevealGroup className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map((v) => (
              <Reveal key={v.title}>
                <article className="h-full rounded-3xl border border-hair bg-blanc p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border-[1.5px] border-noir bg-jaune-vif">
                    <v.icon className="h-5 w-5 text-noir" strokeWidth={2} />
                  </span>
                  <h3 className="mt-4 text-xl font-bold tracking-tight text-noir">{v.title}</h3>
                  <p className="mt-2 text-gris-fonce">{v.desc}</p>
                </article>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </div>
  );
}
