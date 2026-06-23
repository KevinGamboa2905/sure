import { cn } from "@/lib/utils";

/**
 * Logomark Tably : carré noir arrondi + check jaune-vif.
 * Symbolise la réservation confirmée / honorée (cœur du produit anti no-show).
 * Le carré prend `currentColor` -> mettre `text-noir` (ou autre) sur l'élément.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("h-7 w-7 text-noir", className)}
      role="img"
      aria-label="Tably"
    >
      <rect width="32" height="32" rx="9" fill="currentColor" />
      <path
        d="M9 16.4l4.3 4.3L23 10.9"
        fill="none"
        stroke="#fcf376"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
