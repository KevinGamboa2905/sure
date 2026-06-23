import Image from "next/image";
import { Star } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

function Stars({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-0.5", className)} aria-label="5 étoiles sur 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-jaune-vif text-jaune-vif" strokeWidth={1} />
      ))}
    </div>
  );
}

function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={48}
      height={48}
      className="h-12 w-12 rounded-full border border-hair object-cover"
    />
  );
}

export function Testimonials() {
  return (
    <section id="avis" className="bg-blanc py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealGroup className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Reveal>
              <p className="kicker">Avis</p>
            </Reveal>
            <Reveal>
              <h2 className="mt-4 text-4xl tracking-tight md:text-6xl">
                Des salles pleines, <span className="stabilo">des soirs sereins.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="text-5xl font-bold tracking-tight text-noir">4.9</span>
              <div>
                <Stars />
                <p className="mt-1 text-sm text-gris-fonce">sur 47 restaurateurs</p>
              </div>
            </div>
          </Reveal>
        </RevealGroup>

        {/* Mosaïque : 2 petits à gauche, 1 grand à droite */}
        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:grid-rows-2">
          {/* Petit 1 */}
          <Reveal className="lg:col-start-1 lg:row-start-1">
            <figure className="flex h-full flex-col rounded-3xl border border-hair bg-creme/50 p-7 shadow-card">
              <Stars />
              <blockquote className="mt-4 flex-1 text-lg leading-snug text-noir">
                « Les vendredis no-show, c&apos;est fini. On a récupéré deux
                services pleins par semaine. »
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar src="https://i.pravatar.cc/150?img=12" alt="Marina Pittet" />
                <div>
                  <p className="text-sm font-bold text-noir">Marina Pittet</p>
                  <p className="text-xs text-gris-fonce">Gérante · Brasserie Vaudoise, Lausanne</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>

          {/* Petit 2 */}
          <Reveal className="lg:col-start-1 lg:row-start-2">
            <figure className="flex h-full flex-col rounded-3xl border border-hair bg-creme/50 p-7 shadow-card">
              <Stars />
              <blockquote className="mt-4 flex-1 text-lg leading-snug text-noir">
                « L&apos;acompte change tout. Les clients viennent, ou ils
                préviennent. Simple et respectueux. »
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar src="https://i.pravatar.cc/150?img=33" alt="Jonas Brügger" />
                <div>
                  <p className="text-sm font-bold text-noir">Jonas Brügger</p>
                  <p className="text-xs text-gris-fonce">Propriétaire · L&apos;Auberge du Lac, Neuchâtel</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>

          {/* Grand */}
          <Reveal className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <figure className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-noir bg-noir p-9 text-creme shadow-card lg:p-12">
              <div>
                <Stars />
                <blockquote className="mt-6 text-2xl font-bold leading-tight tracking-tight md:text-4xl">
                  « En trois mois, nos no-shows sont passés de{" "}
                  <span className="text-jaune-vif">14% à moins de 4%</span>. C&apos;est
                  la première fois qu&apos;un outil tient vraiment sa promesse. »
                </blockquote>
              </div>
              <figcaption className="mt-10 flex items-center gap-4">
                <Avatar src="https://i.pravatar.cc/150?img=59" alt="Sébastien Crausaz" />
                <div>
                  <p className="font-bold text-creme">Sébastien Crausaz</p>
                  <p className="text-sm text-creme/60">
                    Chef-propriétaire · Le Comptoir des Halles, Genève
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        </RevealGroup>
      </div>
    </section>
  );
}
