import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/marketing/legal-layout";

export const metadata: Metadata = { title: "Politique cookies" };

export default function CookiesPage() {
  return (
    <LegalLayout title="Politique cookies" intro="Comment Tably utiliserait les cookies en production.">
      <LegalSection title="Cookies essentiels">
        Nécessaires au fonctionnement (session, sécurité). Ils ne peuvent pas être
        désactivés.
      </LegalSection>
      <LegalSection title="Cookies de mesure">
        Statistiques d&apos;usage anonymisées pour améliorer le produit. Soumis à votre
        consentement.
      </LegalSection>
      <LegalSection title="Gestion">
        Vous pouvez modifier vos préférences à tout moment depuis votre navigateur ou
        le bandeau de consentement.
      </LegalSection>
    </LegalLayout>
  );
}
