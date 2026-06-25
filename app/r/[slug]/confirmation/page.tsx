import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ConfirmationView } from "@/components/public/confirmation-view";

export const metadata: Metadata = {
  title: "Réservation confirmée",
  robots: { index: false },
};

export default async function ConfirmationPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { name?: string; date?: string; time?: string; party?: string; phone?: string; deposit?: string };
}) {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug: params.slug },
    select: { name: true },
  });

  return (
    <ConfirmationView
      slug={params.slug}
      restaurantName={restaurant?.name ?? "votre restaurant"}
      name={searchParams.name ?? "Client"}
      date={searchParams.date ?? "à venir"}
      time={searchParams.time ?? "—"}
      party={searchParams.party ?? "—"}
      phone={searchParams.phone ?? "+41 79 000 00 00"}
      deposit={searchParams.deposit ?? "0"}
    />
  );
}
