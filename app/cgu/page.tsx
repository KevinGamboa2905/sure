import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/marketing/legal-layout";

export const metadata: Metadata = { title: "Conditions générales" };

export default function CguPage() {
  return (
    <LegalLayout title="Conditions générales" intro="Conditions d'utilisation du service Tably (démonstration).">
      <LegalSection title="Objet">
        Les présentes conditions régissent l&apos;accès et l&apos;utilisation de la
        plateforme Tably par les restaurateurs.
      </LegalSection>
      <LegalSection title="Compte & essai">
        L&apos;essai gratuit de 30 jours est sans engagement ni carte bancaire. À son
        terme, la souscription à un plan payant est requise pour continuer.
      </LegalSection>
      <LegalSection title="Acomptes">
        Les acomptes éventuels sont collectés via Stripe au nom du restaurateur.
        Tably n&apos;encaisse pas les fonds des réservations.
      </LegalSection>
      <LegalSection title="Résiliation">
        L&apos;abonnement est résiliable à tout moment en un clic. Les données restent
        exportables pendant 30 jours après résiliation.
      </LegalSection>
    </LegalLayout>
  );
}
