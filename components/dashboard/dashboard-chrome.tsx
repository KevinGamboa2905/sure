"use client";

import { useState, type ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

/** Châssis du dashboard : sidebar (fixe desktop / drawer mobile) + topbar + zone main. */
export function DashboardChrome({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-creme">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="flex min-h-[100dvh] flex-col lg:pl-[220px]">
        <Topbar onMenu={() => setMenuOpen(true)} />
        <main className="flex-1 px-5 py-6 sm:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
