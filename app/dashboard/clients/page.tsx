import { Users } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireRestaurant } from "@/lib/session-restaurant";
import { EmptyState } from "@/components/dashboard/empty-state";
import { getInitials } from "@/components/ui/Avatar";

type ClientRow = { name: string; phone: string; email: string; visits: number; last: Date };

export default async function ClientsPage() {
  const { restaurant } = await requireRestaurant();
  const reservations = await prisma.reservation.findMany({
    where: { restaurantId: restaurant.id },
    orderBy: { date: "desc" },
  });

  // Agrège les clients distincts par téléphone.
  const map = new Map<string, ClientRow>();
  for (const r of reservations) {
    const key = r.clientPhone || r.clientName;
    const existing = map.get(key);
    if (existing) {
      existing.visits += 1;
      if (r.date > existing.last) existing.last = r.date;
    } else {
      map.set(key, { name: r.clientName, phone: r.clientPhone, email: r.clientEmail ?? "", visits: 1, last: r.date });
    }
  }
  const clients = Array.from(map.values()).sort((a, b) => b.visits - a.visits);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-noir sm:text-3xl">Clients</h1>
        <p className="mt-1 text-gris-fonce">
          {clients.length > 0 ? `${clients.length} client${clients.length > 1 ? "s" : ""} dans votre base.` : "Votre base de clients."}
        </p>
      </div>

      {clients.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Aucun client pour le moment"
          description="Vos clients apparaîtront ici automatiquement après leur première réservation."
          action={{ label: "Voir ma page de réservation", href: `/r/${restaurant.slug}`, external: true }}
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-hair bg-blanc">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-hair text-xs uppercase tracking-wide text-gris-fonce">
                <th className="px-5 py-3 font-medium">Nom</th>
                <th className="px-5 py-3 font-medium">Téléphone</th>
                <th className="px-5 py-3 font-medium">Visites</th>
                <th className="px-5 py-3 font-medium">Dernière visite</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.phone + c.name} className="border-b border-hair last:border-0">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-noir text-xs font-bold text-jaune-vif">{getInitials(c.name)}</span>
                      <span className="font-medium text-noir">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gris-fonce">{c.phone}</td>
                  <td className="px-5 py-3 text-gris-fonce">{c.visits}</td>
                  <td className="px-5 py-3 text-gris-fonce">{c.last.toLocaleDateString("fr-CH", { day: "numeric", month: "short", year: "numeric" })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
