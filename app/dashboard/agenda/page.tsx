import { CalendarDays } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireRestaurant } from "@/lib/session-restaurant";
import { EmptyState } from "@/components/dashboard/empty-state";

export default async function AgendaPage() {
  const { restaurant } = await requireRestaurant();

  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1); // lundi
  const end = new Date(start.getTime() + 7 * 24 * 3600 * 1000);

  const reservations = await prisma.reservation.findMany({
    where: { restaurantId: restaurant.id, date: { gte: start, lt: end } },
    orderBy: [{ date: "asc" }, { time: "asc" }],
  });

  // Regroupe par jour
  const byDay = new Map<string, typeof reservations>();
  for (const r of reservations) {
    const key = new Date(r.date).toLocaleDateString("fr-CH", { weekday: "long", day: "numeric", month: "long" });
    (byDay.get(key) ?? byDay.set(key, []).get(key)!).push(r);
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-noir sm:text-3xl">Agenda</h1>
        <p className="mt-1 text-gris-fonce">Vos réservations de la semaine.</p>
      </div>

      {reservations.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="Aucune réservation cette semaine"
          description="Les réservations à venir s'afficheront ici, jour par jour, dès que vos clients réserveront."
          action={{ label: "Voir ma page de réservation", href: `/r/${restaurant.slug}`, external: true }}
        />
      ) : (
        <div className="space-y-5">
          {Array.from(byDay.entries()).map(([day, list]) => (
            <div key={day} className="rounded-2xl border border-hair bg-blanc p-5">
              <h3 className="text-sm font-bold capitalize tracking-tight text-noir">{day}</h3>
              <ul className="mt-3 divide-y divide-[rgba(188,188,188,0.35)]">
                {list.map((r) => (
                  <li key={r.id} className="flex items-center gap-4 py-2.5">
                    <span className="w-14 shrink-0 font-mono text-sm font-bold text-noir">{r.time}</span>
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-jaune-vif text-xs font-bold text-noir">{r.covers}</span>
                    <span className="text-sm text-noir">{r.clientName}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
