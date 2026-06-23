import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/marketing/legal-layout";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsLegalesPage() {
  return (
    <LegalLayout title="Mentions légales" intro="Informations légales relatives à l'éditeur du service Tably.">
      <LegalSection title="Éditeur">
        Tably Sàrl (fictif), Rue du Marché 1, 1003 Lausanne, Suisse. Inscrite au
        registre du commerce sous le numéro CHE-000.000.000.
      </LegalSection>
      <LegalSection title="Directeur de la publication">
        L&apos;équipe Tably. Contact : bonjour@tably.ch.
      </LegalSection>
      <LegalSection title="Hébergement">
        Application hébergée sur une infrastructure cloud avec données localisées en
        Suisse. (Démonstration — aucune donnée réelle.)
      </LegalSection>
      <LegalSection title="Propriété intellectuelle">
        L&apos;ensemble des éléments de ce site (textes, visuels, logo) est présenté à
        titre de démonstration et ne constitue pas un service commercial actif.
      </LegalSection>
    </LegalLayout>
  );
}
