import { BarChart3 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireRestaurant } from "@/lib/session-restaurant";
import { EmptyState } from "@/components/dashboard/empty-state";

export default async function AnalyticsPage() {
  const { restaurant } = await requireRestaurant();
  const reservations = await prisma.reservation.findMany({ where: { restaurantId: restaurant.id } });

  const total = reservations.length;
  const noShows = reservations.filter((r) => r.status === "noshow").length;
  const honored = reservations.filter((r) => r.status === "confirmed").length;
  const noShowRate = total > 0 ? Math.round((noShows / total) * 1000) / 10 : 0;
  const deposits = reservations
    .filter((r) => r.paymentStatus === "paid")
    .reduce((s, r) => s + (r.depositAmount ?? 0), 0);

  const cards = [
    { label: "Réservations (total)", value: String(total) },
    { label: "Taux de no-show", value: `${noShowRate}%` },
    { label: "Présences honorées", value: String(honored) },
    { label: "Revenus acomptes", value: `${deposits} CHF` },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-noir sm:text-3xl">Statistiques</h1>
        <p className="mt-1 text-gris-fonce">Votre performance, en temps réel.</p>
      </div>

      {total === 0 ? (
        <EmptyState
          icon={BarChart3}
          title="Pas encore de statistiques"
          description="Vos indicateurs (réservations, no-shows, revenus d'acomptes) s'afficheront ici dès vos premières réservations."
          action={{ label: "Voir ma page de réservation", href: `/r/${restaurant.slug}`, external: true }}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.label} className="rounded-2xl border border-hair bg-blanc p-5">
              <p className="text-xs font-medium uppercase tracking-label text-gris-fonce">{c.label}</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-noir">{c.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
