import type { ReactNode } from "react";

export function SettingCard({ title, desc, children }: { title: string; desc?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-hair bg-blanc p-6">
      <h2 className="text-base font-bold tracking-tight text-noir">{title}</h2>
      {desc && <p className="mt-1 text-sm text-gris-fonce">{desc}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export const settingInputCls =
  "h-11 w-full rounded-xl border border-hair bg-creme/40 px-3.5 text-sm text-noir outline-none transition-colors placeholder:text-gris-clair focus:border-noir";
export const settingLabelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-gris-fonce";
