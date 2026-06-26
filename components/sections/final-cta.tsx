import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-noir py-28 lg:py-36">
      {/* Pattern de lignes diagonales très subtil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fffee7 0, #fffee7 1px, transparent 1px, transparent 22px)",
        }}
      />
      {/* Halo jaune diffus (teinté, pas de glow néon) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-jaune-vif/10 blur-3xl"
      />

      <RevealGroup className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-label text-creme/50">
            Prêt à remplir votre salle
          </p>
        </Reveal>
        <Reveal>
          <h2 className="mt-5 text-5xl font-bold leading-[0.95] tracking-tight text-creme md:text-7xl">
            Ce soir, chaque table réservée sera une table{" "}
            <span className="text-jaune-vif">honorée.</span>
          </h2>
        </Reveal>
        <Reveal>
          <p className="mx-auto mt-6 max-w-md text-lg text-creme/70">
            Rejoignez les restaurateurs de Suisse romande qui ne comptent plus
            les couverts perdus.
          </p>
        </Reveal>
        <Reveal>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Button asChild size="lg" variant="invert" className="px-10 text-base">
              <a href="/signup">
                Démarrer l&apos;essai gratuit
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </a>
            </Button>
            <p className="text-sm text-creme/50">
              30 jours gratuits · Sans carte bancaire
            </p>
          </div>
        </Reveal>
      </RevealGroup>
    </section>
  );
}
