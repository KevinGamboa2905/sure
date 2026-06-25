import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; href: string; external?: boolean };
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-hair bg-blanc px-6 py-16 text-center">
      <Icon className="h-9 w-9 text-gris-clair" strokeWidth={1.5} />
      <p className="mt-4 text-base font-bold tracking-tight text-noir">{title}</p>
      <p className="mt-1.5 max-w-md text-sm text-gris-fonce">{description}</p>
      {action && (
        <a
          href={action.href}
          {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-jaune-vif px-5 py-2.5 text-sm font-bold text-noir transition-transform hover:-translate-y-0.5"
        >
          {action.label}
        </a>
      )}
    </div>
  );
}
