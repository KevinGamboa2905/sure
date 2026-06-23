import { ClientPageStudio } from "@/components/dashboard/client-page-studio";

export default function CustomizationPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-noir sm:text-3xl">
          Ma page client
        </h1>
        <p className="mt-1 text-gris-fonce">
          Personnalisez l&apos;apparence de votre page de réservation. Les
          modifications s&apos;affichent en temps réel à droite.
        </p>
      </header>
      <ClientPageStudio />
    </div>
  );
}
