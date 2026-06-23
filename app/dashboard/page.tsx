import { KpiCard } from "@/components/dashboard/kpi-card";
import { WeekChart } from "@/components/dashboard/week-chart";
import { TodayList } from "@/components/dashboard/today-list";
import { ClientPageStudio } from "@/components/dashboard/client-page-studio";
import { KPIS } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-noir sm:text-3xl">
          Bonsoir, voici votre service
        </h1>
        <p className="mt-1 text-gris-fonce">Vue d&apos;ensemble de votre activité ce mois-ci.</p>
      </div>

      {/* Section 1 — KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {KPIS.map((kpi) => (
          <KpiCard key={kpi.key} kpi={kpi} />
        ))}
      </div>

      {/* Sections 2 & 3 — Graphique + réservations du jour (layout asymétrique) */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
        <WeekChart />
        <TodayList />
      </div>

      {/* Section 4 — Ma page client */}
      <section id="ma-page-client" className="mt-12 scroll-mt-24">
        <div className="mb-6 border-t border-hair pt-10">
          <h2 className="text-2xl font-bold tracking-tight text-noir sm:text-3xl">
            Ma page client
          </h2>
          <p className="mt-1 max-w-2xl text-gris-fonce">
            Personnalisez l&apos;apparence de votre page de réservation. Les
            modifications s&apos;affichent en temps réel à droite.
          </p>
        </div>
        <ClientPageStudio />
      </section>
    </div>
  );
}
