import type { Metadata } from "next";
import { DEMO_RESTAURANT } from "@/lib/mock-data";
import { ConfirmationView } from "@/components/public/confirmation-view";

export const metadata: Metadata = {
  title: "Réservation confirmée",
  robots: { index: false },
};

export default function ConfirmationPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { name?: string; date?: string; time?: string; party?: string; phone?: string; deposit?: string };
}) {
  return (
    <ConfirmationView
      slug={params.slug}
      restaurantName={DEMO_RESTAURANT.name}
      name={searchParams.name ?? "Client"}
      date={searchParams.date ?? "à venir"}
      time={searchParams.time ?? "—"}
      party={searchParams.party ?? "—"}
      phone={searchParams.phone ?? "+41 79 000 00 00"}
      deposit={searchParams.deposit ?? "0"}
    />
  );
}
