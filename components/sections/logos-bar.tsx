"use client";

/**
 * LogosBar — bandeau de réassurance sous le hero.
 * Marquee infini (CSS, dupliqué pour boucle sans couture), logos en texte stylé.
 */

const LOGOS = [
  "Le Comptoir des Halles",
  "Brasserie Vaudoise",
  "L'Auberge du Lac",
  "Café Saint-Pierre",
  "Maison Délèze",
  "Le Sextant",
  "Osteria Vino",
];

function Track() {
  return (
    <ul
      className="flex shrink-0 items-center gap-12 pr-12"
      aria-hidden="true"
    >
      {LOGOS.map((name) => (
        <li
          key={name}
          className="whitespace-nowrap text-lg font-bold tracking-tight text-noir/45"
        >
          {name}
        </li>
      ))}
    </ul>
  );
}

export function LogosBar() {
  return (
    <section className="border-y border-hair bg-creme py-8">
      <p className="mb-6 text-center text-xs uppercase tracking-label text-gris-fonce">
        Ils servent l&apos;esprit tranquille
      </p>
      <div
        className="group relative flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          <Track />
          <Track />
        </div>
      </div>
    </section>
  );
}
