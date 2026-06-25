import { ClipboardList } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireRestaurant } from "@/lib/session-restaurant";
import { EmptyState } from "@/components/dashboard/empty-state";

const STATUS_FR: Record<string, { label: string; cls: string }> = {
  confirmed: { label: "Confirmé", cls: "bg-[#27ae60]/12 text-[#1e7e43]" },
  pending: { label: "En attente", cls: "bg-amber-100 text-amber-700" },
  noshow: { label: "No-show", cls: "bg-[#c0392b]/12 text-[#c0392b]" },
  cancelled: { label: "Annulée", cls: "bg-noir/[0.06] text-gris-fonce" },
};

export default async function ReservationsPage() {
  const { restaurant } = await requireRestaurant();
  const rows = await prisma.reservation.findMany({
    where: { restaurantId: restaurant.id },
    orderBy: { date: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-noir sm:text-3xl">Réservations</h1>
        <p className="mt-1 text-gris-fonce">Toutes vos réservations à venir et passées.</p>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="Aucune réservation pour le moment"
          description="Dès qu'un client réservera depuis votre page Tably, sa réservation apparaîtra ici."
          action={{ label: "Voir ma page de réservation", href: `/r/${restaurant.slug}`, external: true }}
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-hair bg-blanc">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-hair text-xs uppercase tracking-wide text-gris-fonce">
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Client</th>
                <th className="px-5 py-3 font-medium">Couverts</th>
                <th className="px-5 py-3 font-medium">Acompte</th>
                <th className="px-5 py-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const s = STATUS_FR[r.status] ?? STATUS_FR.pending;
                return (
                  <tr key={r.id} className="border-b border-hair last:border-0">
                    <td className="px-5 py-3 text-noir">
                      <span className="font-medium">{new Date(r.date).toLocaleDateString("fr-CH", { day: "numeric", month: "short" })}</span>
                      <span className="ml-2 font-mono text-xs text-gris-fonce">{r.time}</span>
                    </td>
                    <td className="px-5 py-3 font-medium text-noir">{r.clientName}</td>
                    <td className="px-5 py-3 text-gris-fonce">{r.covers}</td>
                    <td className="px-5 py-3 text-gris-fonce">{r.depositAmount ? `${r.depositAmount} CHF` : "—"}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${s.cls}`}>{s.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
