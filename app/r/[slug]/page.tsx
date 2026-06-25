import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { SocialKey } from "@/lib/mock-data";
import { PublicClientPage } from "@/components/public/public-client-page";

const SOCIAL_LABEL: Record<string, string> = {
  instagram: "Instagram", facebook: "Facebook", maps: "Google Maps",
  tripadvisor: "TripAdvisor", website: "Site web", tiktok: "TikTok",
};

async function getRestaurant(slug: string) {
  return prisma.restaurant.findUnique({
    where: { slug },
    include: { socialLinks: { orderBy: { order: "asc" } } },
  });
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const r = await getRestaurant(params.slug);
  if (!r) return { title: "Introuvable" };
  return { title: `${r.name} — Réserver`, description: r.tagline ?? undefined, robots: { index: false } };
}

export default async function PublicPage({ params }: { params: { slug: string } }) {
  const r = await getRestaurant(params.slug);
  if (!r) notFound();

  const socials = r.socialLinks.map((l) => ({
    key: l.type as SocialKey,
    label: SOCIAL_LABEL[l.type] ?? l.type,
    url: l.url,
    enabled: l.enabled,
  }));

  return (
    <PublicClientPage
      restaurant={{
        name: r.name,
        slug: r.slug,
        tagline: r.tagline ?? "",
        logoUrl: r.logoUrl,
        address: r.address,
        phone: r.phone,
        primaryColor: r.primaryColor,
        backgroundColor: r.backgroundColor,
        textColor: r.textColor,
        font: r.font,
      }}
      socials={socials}
    />
  );
}
