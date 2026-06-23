import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/marketing/legal-layout";

export const metadata: Metadata = { title: "Confidentialité" };

export default function ConfidentialitePage() {
  return (
    <LegalLayout
      title="Confidentialité"
      intro="Comment Tably traiterait les données dans un cadre de production."
    >
      <LegalSection title="Données collectées">
        Coordonnées des restaurateurs et de leurs clients (nom, téléphone, email)
        strictement nécessaires à la gestion des réservations et à l&apos;envoi des
        rappels SMS.
      </LegalSection>
      <LegalSection title="Finalité">
        Les données servent uniquement à confirmer, rappeler et gérer les
        réservations. Aucune revente à des tiers.
      </LegalSection>
      <LegalSection title="Localisation & sécurité">
        Hébergement en Suisse, chiffrement en transit et au repos, accès restreint.
      </LegalSection>
      <LegalSection title="Vos droits">
        Accès, rectification et suppression sur simple demande à privacy@tably.ch.
      </LegalSection>
    </LegalLayout>
  );
}
