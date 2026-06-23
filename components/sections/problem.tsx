import { TrendingDown } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/* Numéro géant en filigrane derrière chaque carte. */
function GhostNumber({ n, className }: { n: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute select-none font-bold leading-none tracking-tighter text-noir/[0.05]",
        className,
      )}
    >
      {n}
    </span>
  );
}

export function Problem() {
  return (
    <section className="relative bg-creme py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealGroup className="max-w-2xl">
          <Reveal>
            <p className="kicker">Le problème</p>
          </Reveal>
          <Reveal>
            <h2 className="mt-4 text-4xl tracking-tight md:text-6xl">
              Chaque table vide est{" "}
              <span className="stabilo">un soir qui saigne.</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-5 max-w-lg text-lg text-gris-fonce">
              Un restaurant de Suisse romande perd en moyenne 12 à 18% de ses
              couverts à cause des no-shows. Sur une marge déjà fine, c&apos;est
              la différence entre une bonne et une mauvaise semaine.
            </p>
          </Reveal>
        </RevealGroup>

        {/* Bento asymétrique : 1 grande carte + 2 carrées */}
        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:grid-rows-2">
          {/* Grande carte */}
          <Reveal className="lg:col-span-2 lg:row-span-2">
            <article className="relative h-full overflow-hidden rounded-3xl border border-hair bg-blanc p-8 shadow-card lg:p-10">
              <GhostNumber n="01" className="-right-2 top-2 text-[9rem] lg:text-[13rem]" />
              <p className="kicker">No-show</p>
              <h3 className="mt-3 max-w-sm text-2xl font-bold tracking-tight text-noir md:text-3xl">
                « Une table de 6 réservée. Personne n&apos;est venu. »
              </h3>
              <p className="mt-4 max-w-md text-gris-fonce">
                Pas d&apos;appel, pas d&apos;annulation. La table reste dressée,
                la cuisine a prévu, et le service tourne à vide pendant que
                d&apos;autres clients ont été refusés.
              </p>

              {/* Mini-illustration CSS : créneaux de réservation, un absent */}
              <div className="mt-8 space-y-2.5">
                {[
                  { label: "19:00 · Müller · 2 couv.", state: "ok" },
                  { label: "19:30 · Favre · 4 couv.", state: "ok" },
                  { label: "20:00 · ? · 6 couv.", state: "ghost" },
                  { label: "20:30 · Rey · 3 couv.", state: "ok" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className={cn(
                      "flex items-center justify-between rounded-xl border px-4 py-3 text-sm",
                      row.state === "ghost"
                        ? "border-dashed border-[#d64541]/60 bg-[#d64541]/[0.06] text-[#d64541]"
                        : "border-hair bg-creme/50 text-noir",
                    )}
                  >
                    <span className={row.state === "ghost" ? "font-medium line-through decoration-[#d64541]" : ""}>
                      {row.label}
                    </span>
                    <span className="font-mono text-xs">
                      {row.state === "ghost" ? "absent" : "présent"}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>

          {/* Carrée 1 */}
          <Reveal className="lg:col-start-3 lg:row-start-1">
            <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-hair bg-noir p-8 text-creme shadow-card">
              <GhostNumber n="02" className="-right-1 -top-3 text-[8rem] text-creme/[0.07]" />
              <div>
                <p className="text-xs uppercase tracking-label text-creme/60">
                  Manque à gagner
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight">
                  <span className="font-mono">−CHF 2&apos;400</span>
                </h3>
                <p className="mt-2 text-sm text-creme/70">
                  perdus sur un seul vendredi soir moyen à 60 couverts.
                </p>
              </div>
              <TrendingDown className="mt-6 h-8 w-8 text-jaune-vif" strokeWidth={1.5} />
            </article>
          </Reveal>

          {/* Carrée 2 */}
          <Reveal className="lg:col-start-3 lg:row-start-2">
            <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-hair bg-jaune-vif p-8 shadow-card">
              <GhostNumber n="03" className="-right-1 -top-3 text-[8rem] text-noir/[0.08]" />
              <div>
                <p className="text-xs uppercase tracking-label text-noir/60">
                  Heures de pointe
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-noir">
                  Refuser puis rester vide
                </h3>
                <p className="mt-2 text-sm text-noir/70">
                  Le pire scénario : dire non à des clients, puis voir la table
                  réservée ne jamais arriver.
                </p>
              </div>
              {/* Mini grille de tables (CSS) */}
              <div className="mt-6 grid grid-cols-6 gap-1.5">
                {Array.from({ length: 18 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "aspect-square rounded-[3px]",
                      i % 5 === 0 ? "bg-noir/15" : "bg-noir/70",
                    )}
                  />
                ))}
              </div>
            </article>
          </Reveal>
        </RevealGroup>
      </div>
    </section>
  );
}
