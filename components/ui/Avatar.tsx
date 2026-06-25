import { cn } from "@/lib/utils";

/** Initiales (max 2) à partir d'un nom : "Le Cerf Genevois" → "LC". */
export function getInitials(name: string): string {
  const words = name.trim().split(/[\s'’-]+/).filter(Boolean);
  if (words.length === 0) return "?";
  return words.map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

const SIZES = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
} as const;

export function Avatar({
  name,
  imageUrl,
  size = "md",
  className,
}: {
  name: string;
  imageUrl?: string | null;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  if (imageUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={imageUrl} alt={name} className={cn("rounded-full object-cover", SIZES[size], className)} />;
  }
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-noir font-bold text-jaune-vif",
        SIZES[size],
        className,
      )}
    >
      {getInitials(name)}
    </span>
  );
}
