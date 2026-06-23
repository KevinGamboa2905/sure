"use client";

import { Star } from "lucide-react";
import type { BrandPreset } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function ColorPresetButton({
  preset,
  active,
  onClick,
}: {
  preset: BrandPreset;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl border p-3 text-left transition-all",
        active ? "border-noir ring-1 ring-noir" : "border-hair hover:border-gris-fonce",
      )}
    >
      {/* Aperçu des couleurs */}
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-hair"
        style={{ backgroundColor: preset.bg }}
      >
        <span
          className="h-4 w-4 rounded-full"
          style={{ backgroundColor: preset.primary, boxShadow: `0 0 0 1px ${preset.text}22` }}
        />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1.5">
          <span className="truncate text-sm font-medium text-noir">{preset.name}</span>
          {preset.isDefault && (
            <Star className="h-3 w-3 shrink-0 fill-jaune-vif text-jaune-vif" />
          )}
        </span>
        {preset.isDefault && (
          <span className="mt-0.5 inline-flex items-center rounded-full bg-noir px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-jaune-vif">
            Défaut
          </span>
        )}
      </span>
    </button>
  );
}
