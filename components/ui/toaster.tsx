"use client";

import { Toaster as SonnerToaster } from "sonner";

/** Toaster global Tably : fond blanc, bordure fine, ombre douce. */
export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#ffffff",
          border: "1px solid rgba(188,188,188,0.5)",
          color: "#000000",
          borderRadius: "14px",
          boxShadow: "0 18px 40px -22px rgba(85, 85, 83, 0.45)",
          fontFamily: "var(--font-display), Inter, sans-serif",
        },
      }}
      icons={undefined}
    />
  );
}
