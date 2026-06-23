import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Wordmark } from "@/components/brand/wordmark";

export function LegalLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] bg-creme">
      <header className="border-b border-hair">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5 sm:px-8">
          <Wordmark />
          <a href="/" className="inline-flex items-center gap-1.5 text-sm text-gris-fonce hover:text-noir">
            <ArrowLeft className="h-4 w-4" /> Accueil
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 lg:py-20">
        <h1 className="text-4xl font-bold tracking-tight text-noir sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 text-lg text-gris-fonce">{intro}</p>}
        <div className="mt-10 space-y-6 text-gris-fonce">{children}</div>
        <p className="mt-12 border-t border-hair pt-6 text-xs text-gris-clair">
          Contenu en démo · Tably (fictif).
        </p>
      </main>
    </div>
  );
}

/** Bloc de section légale réutilisable. */
export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold tracking-tight text-noir">{title}</h2>
      <p className="mt-2 leading-relaxed">{children}</p>
    </section>
  );
}
