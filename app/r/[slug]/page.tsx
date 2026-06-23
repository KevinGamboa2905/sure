import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DEMO_RESTAURANT } from "@/lib/mock-data";
import { PublicClientPage } from "@/components/public/public-client-page";

export function generateStaticParams() {
  return [{ slug: DEMO_RESTAURANT.slug }];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  if (params.slug !== DEMO_RESTAURANT.slug) return { title: "Introuvable" };
  return {
    title: `${DEMO_RESTAURANT.name} — Réserver`,
    description: DEMO_RESTAURANT.tagline,
    robots: { index: false },
  };
}

export default function PublicPage({ params }: { params: { slug: string } }) {
  if (params.slug !== DEMO_RESTAURANT.slug) notFound();
  return <PublicClientPage />;
}
