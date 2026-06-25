import { prisma } from "@/lib/prisma";
import { requireRestaurant } from "@/lib/session-restaurant";
import { getEffectivePlan, isInTrial } from "@/lib/subscription";
import type { PlanKey } from "@/lib/plans";
import type { SocialKey } from "@/lib/mock-data";
import { BrandingStudio } from "@/components/dashboard/branding-studio";

const SOCIAL_LABEL: Record<string, string> = {
  instagram: "Instagram", facebook: "Facebook", maps: "Google Maps",
  tripadvisor: "TripAdvisor", website: "Site web", tiktok: "TikTok",
};

export default async function PageClientPage() {
  const { restaurant } = await requireRestaurant();
  const links = await prisma.socialLink.findMany({
    where: { restaurantId: restaurant.id },
    orderBy: { order: "asc" },
  });

  const socials = links.map((l) => ({
    key: l.type as SocialKey,
    label: SOCIAL_LABEL[l.type] ?? l.type,
    url: l.url,
    enabled: l.enabled,
  }));

  const plan = restaurant.plan as PlanKey;

  return (
    <BrandingStudio
      restaurant={{
        name: restaurant.name,
        slug: restaurant.slug,
        tagline: restaurant.tagline ?? "",
        logoUrl: restaurant.logoUrl,
        primaryColor: restaurant.primaryColor,
        backgroundColor: restaurant.backgroundColor,
        textColor: restaurant.textColor,
        font: restaurant.font,
        address: restaurant.address,
        phone: restaurant.phone,
        email: restaurant.email,
        depositEnabled: restaurant.depositEnabled,
        depositPerCover: restaurant.depositPerCover,
        cancellationWindow: restaurant.cancellationWindow,
      }}
      socials={socials}
      effectivePlan={getEffectivePlan(plan, restaurant.trialEndsAt, restaurant.hasPaid)}
      inTrial={isInTrial(restaurant.trialEndsAt, restaurant.hasPaid)}
    />
  );
}
