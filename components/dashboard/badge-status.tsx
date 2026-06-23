import type { ResaStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const STYLES: Record<ResaStatus, string> = {
  "Confirmé": "bg-[#27ae60]/12 text-[#1e7e43]",
  "En attente": "bg-amber-100 text-amber-700",
  "No-show": "bg-[#c0392b]/12 text-[#c0392b]",
};

export function BadgeStatus({ status }: { status: ResaStatus }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium",
        STYLES[status],
      )}
    >
      {status}
    </span>
  );
}
