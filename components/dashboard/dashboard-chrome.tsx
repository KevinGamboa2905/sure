"use client";

import { useState, type ReactNode } from "react";
import { Sidebar, type DashRestaurant } from "./sidebar";
import { Topbar } from "./topbar";
import { TrialBanner } from "./TrialBanner";

/** Châssis du dashboard : sidebar + topbar + bannière d'essai + zone main. */
export function DashboardChrome({
  children,
  restaurant,
  daysLeft,
}: {
  children: ReactNode;
  restaurant: DashRestaurant;
  daysLeft: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-creme">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} restaurant={restaurant} />
      <div className="flex min-h-[100dvh] flex-col lg:pl-[220px]">
        <TrialBanner daysLeft={daysLeft} />
        <Topbar onMenu={() => setMenuOpen(true)} restaurant={restaurant} />
        <main className="flex-1 px-5 py-6 sm:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
