"use client";

import type { ReactNode } from "react";

/**
 * Frame d'appareil en CSS pur (pas d'image).
 * `variant="mobile"` -> iPhone ; `variant="desktop"` -> fenêtre navigateur.
 */
export function PhoneFrame({
  variant,
  url,
  children,
}: {
  variant: "mobile" | "desktop";
  url: string;
  children: ReactNode;
}) {
  if (variant === "desktop") {
    return (
      <div className="mx-auto w-full max-w-2xl">
        <div className="overflow-hidden rounded-2xl border border-hair bg-blanc shadow-card">
          {/* Barre navigateur */}
          <div className="flex items-center gap-2 border-b border-hair px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 flex-1 truncate rounded-md bg-creme px-3 py-1 text-center font-mono text-[11px] text-gris-fonce">
              {url}
            </span>
          </div>
          <div className="h-[560px]">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto" style={{ width: 320 }}>
      <div
        className="relative rounded-[44px] border-[10px] border-noir bg-noir shadow-lift"
        style={{ height: 660 }}
      >
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-noir" />
        {/* Écran */}
        <div className="h-full w-full overflow-hidden rounded-[34px] bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}
