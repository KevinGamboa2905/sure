import { cn } from "@/lib/utils";
import { LogoMark } from "./logo-mark";

/** Logo Tably : logomark + mot, avec un style bold en Helvetica Now Display. */
export function Wordmark({
  className,
  href = "/",
  mark = true,
  markClassName,
}: {
  className?: string;
  href?: string | null;
  mark?: boolean;
  markClassName?: string;
}) {
  const inner = (
    <>
      {mark && <LogoMark className={cn("h-7 w-7", markClassName)} />}
      <span>Tably</span>
    </>
  );
  const cls = cn(
    "inline-flex items-center gap-2 text-xl font-bold tracking-tight text-noir",
    className,
  );
  if (href === null) return <span className={cls}>{inner}</span>;
  return (
    <a href={href} className={cls} aria-label="Tably">
      {inner}
    </a>
  );
}
