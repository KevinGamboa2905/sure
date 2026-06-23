import { Check } from "lucide-react";
import type { Kpi } from "@/lib/mock-data";

export function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-hair bg-blanc p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift-sm">
      {/* Barre top fine en couleur d'accent */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ backgroundColor: kpi.bar }}
      />
      <p className="text-xs font-medium uppercase tracking-label text-gris-fonce">
        {kpi.label}
      </p>
      <p className="mt-3 text-5xl font-bold leading-none tracking-tight text-noir">
        {kpi.value}
        {kpi.unit && <span className="ml-1 text-xl font-bold align-baseline">{kpi.unit}</span>}
      </p>
      <p className="mt-2 flex items-center gap-1 text-sm text-gris-fonce">
        {kpi.subCheck && (
          <Check className="h-3.5 w-3.5 text-[#27ae60]" strokeWidth={3} />
        )}
        {kpi.sub}
      </p>
    </article>
  );
}
