import { Wordmark } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";

const LINKS = [
  { label: "Tarifs", href: "/tarifs" },
  { label: "À propos", href: "/a-propos" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-hair bg-creme/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Wordmark />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Navigation principale">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-gris-fonce transition-colors hover:text-noir">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="/login" className="hidden text-sm font-medium text-noir hover:underline sm:block">Se connecter</a>
          <Button asChild size="sm" variant="primary">
            <a href="/signup">Essai gratuit</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
