import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRestaurant, getAllRestaurantSlugs } from "@/lib/restaurants";
import { Dashboard } from "@/components/dashboard/dashboard";

export function generateStaticParams() {
  return getAllRestaurantSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = getRestaurant(params.slug);
  return {
    title: r ? `Tableau de bord — ${r.name}` : "Tableau de bord",
    robots: { index: false },
  };
}

export default function DashboardPage({ params }: { params: { slug: string } }) {
  const r = getRestaurant(params.slug);
  if (!r) notFound();
  return <Dashboard restaurant={r} />;
}
