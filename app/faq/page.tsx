import type { Metadata } from "next";
import { PublicHeader } from "@/components/marketing/public-header";
import { Footer } from "@/components/sections/footer";
import { FinalCTA } from "@/components/sections/final-cta";
import { MiniAccordion } from "@/components/marketing/mini-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Toutes les réponses sur Tably : démarrage, tarifs, fonctionnalités, technique et facturation.",
};

const CATEGORIES = [
  {
    title: "Démarrage",
    items: [
      { q: "Combien de temps pour installer Tably ?", a: "Environ 10 minutes : vous renseignez vos horaires, activez les rappels SMS et votre page de réservation est en ligne." },
      { q: "Dois-je remplacer mon système actuel ?", a: "Tably est autonome et se suffit à lui-même. Il ne dépend d'aucun autre logiciel de réservation pour fonctionner." },
      { q: "Puis-je importer mes réservations existantes ?", a: "Oui, par import CSV en quelques clics." },
    ],
  },
  {
    title: "Tarifs",
    items: [
      { q: "L'essai gratuit nécessite-t-il une carte ?", a: "Non. 30 jours sans carte bancaire, sans engagement." },
      { q: "Puis-je changer de plan ?", a: "À tout moment, le changement est calculé au prorata." },
    ],
  },
  {
    title: "Fonctionnalités",
    items: [
      { q: "Comment fonctionnent les rappels SMS ?", a: "Un rappel automatique part la veille (J-1) et deux heures avant (H-2). Le client confirme ou annule en répondant." },
      { q: "Qu'est-ce qu'un acompte sécurisé ?", a: "Un montant par couvert, encaissé via Stripe à la réservation et déduit de l'addition. Il responsabilise les grandes tables." },
      { q: "Ma page de réservation est-elle personnalisable ?", a: "Entièrement : logo, couleurs, police, liens — façon Linktree, à votre image." },
    ],
  },
  {
    title: "Technique",
    items: [
      { q: "Où sont hébergées les données ?", a: "En Suisse, chiffrées en transit et au repos." },
      { q: "Y a-t-il une application mobile ?", a: "Tably fonctionne dans le navigateur, optimisé mobile. Vos clients réservent sans rien installer." },
    ],
  },
  {
    title: "Facturation",
    items: [
      { q: "La TVA est-elle incluse ?", a: "Les prix sont affichés hors TVA (7,7%). La facture détaille le montant." },
      { q: "Comment résilier ?", a: "En un clic depuis vos paramètres, sans frais, à tout moment." },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="bg-creme">
      <PublicHeader />

      <section className="px-5 pb-12 pt-16 text-center sm:px-8 lg:pt-24">
        <p className="kicker">FAQ</p>
        <h1 className="mt-4 text-5xl font-bold leading-[0.95] tracking-tight text-noir md:text-7xl">
          Tout ce qu&apos;il faut <span className="stabilo">savoir.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-gris-fonce">
          Une question sans réponse ? <a href="/contact" className="font-medium text-noir underline decoration-jaune-vif decoration-2 underline-offset-4">Écrivez-nous</a>.
        </p>
      </section>

      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-3xl space-y-12">
          {CATEGORIES.map((cat) => (
            <div key={cat.title}>
              <h2 className="mb-2 text-sm font-bold uppercase tracking-label text-gris-fonce">{cat.title}</h2>
              <MiniAccordion items={cat.items} />
            </div>
          ))}
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </div>
  );
}
