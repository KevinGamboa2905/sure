import { ParametresNav } from "@/components/dashboard/parametres-nav";

export default function ParametresLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-noir sm:text-3xl">Paramètres</h1>
        <p className="mt-1 text-gris-fonce">Gérez votre compte, votre abonnement et votre équipe.</p>
      </div>
      <ParametresNav />
      <div className="space-y-6">{children}</div>
    </div>
  );
}
