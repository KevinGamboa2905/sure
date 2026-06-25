import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import type { Kpi } from "@/lib/mock-data";

const WD = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

function greetingFor(name: string): string {
  const h = new Date().getHours();
  if (h < 12) return "Bonjour, voici votre service du midi";
  if (h < 17) return `Bon après-midi, ${name}`;
  return "Bonsoir, voici votre service";
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { restaurant: true },
  });
  if (!user?.restaurant) redirect("/onboarding");
  const restaurant = user.restaurant;

  const now = new Date();
  const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endToday = new Date(startToday.getTime() + 24 * 3600 * 1000);
  const startWeek = new Date(startToday.getTime() - 6 * 24 * 3600 * 1000);

  const [allCount, monthResas, weekResas, todayResas] = await Promise.all([
    prisma.reservation.count({ where: { restaurantId: restaurant.id } }),
    prisma.reservation.findMany({ where: { restaurantId: restaurant.id, date: { gte: startMonth } } }),
    prisma.reservation.findMany({ where: { restaurantId: restaurant.id, date: { gte: startWeek, lt: endToday } } }),
    prisma.reservation.findMany({ where: { restaurantId: restaurant.id, date: { gte: startToday, lt: endToday } }, orderBy: { time: "asc" } }),
  ]);

  const total = monthResas.length;
  const confirmed = monthResas.filter((r) => r.status === "confirmed").length;
  const noShows = monthResas.filter((r) => r.status === "noshow").length;
  const deposits = monthResas
    .filter((r) => r.paymentStatus === "paid" && (r.status === "noshow" || r.status === "cancelled"))
    .reduce((s, r) => s + (r.depositAmount ?? 0), 0);
  const confirmationRate = total > 0 ? Math.round((confirmed / total) * 100) : 0;

  const kpis: Kpi[] = [
    { key: "reservations", label: "Réservations du mois", value: String(total), sub: "Ce mois-ci", bar: "#fcf376" },
    { key: "confirmation", label: "Taux de confirmation", value: `${confirmationRate}%`, sub: `${confirmed} confirmées sur ${total}`, bar: "#27ae60" },
    { key: "noshows", label: "No-shows du mois", value: String(noShows), sub: noShows > 0 ? "Acomptes récupérés" : "Aucun no-show", subCheck: noShows > 0, bar: "#c0392b" },
    { key: "deposits", label: "Acomptes encaissés", value: String(deposits), unit: "CHF", sub: "Sur no-shows & annulations", bar: "#000000" },
  ];

  // Bucket des 7 derniers jours
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startWeek.getTime() + i * 24 * 3600 * 1000);
    const dayResas = weekResas.filter((r) => {
      const rd = new Date(r.date);
      return rd.getFullYear() === d.getFullYear() && rd.getMonth() === d.getMonth() && rd.getDate() === d.getDate();
    });
    return {
      day: WD[d.getDay()],
      confirmed: dayResas.filter((r) => r.status === "confirmed").length,
      noshow: dayResas.filter((r) => r.status === "noshow").length,
    };
  });

  const today = todayResas.map((r) => ({
    id: r.id,
    time: r.time,
    name: r.clientName,
    party: r.covers,
    info: r.depositAmount ? `Acompte ${r.depositAmount} CHF` : "Pas d'acompte",
    status: r.status,
  }));

  const todayLabel = now.toLocaleDateString("fr-CH", { weekday: "long", day: "numeric", month: "long" });

  return (
    <DashboardContent
      restaurant={{ name: restaurant.name, slug: restaurant.slug }}
      greeting={greetingFor(restaurant.name)}
      kpis={kpis}
      week={week}
      today={today}
      todayLabel={todayLabel}
      isEmpty={allCount === 0}
    />
  );
}
