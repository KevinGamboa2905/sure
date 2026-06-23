"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Wordmark } from "@/components/brand/wordmark";

export default function ForgotPasswordPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-creme px-6 py-12">
      <Wordmark />
      <div className="mt-8 w-full max-w-md rounded-3xl border border-hair bg-blanc p-8 shadow-card">
        <h1 className="text-2xl font-bold tracking-tight text-noir">Mot de passe oublié ?</h1>
        <p className="mt-2 text-sm text-gris-fonce">
          Entrez votre email, on vous envoie un lien de réinitialisation.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Email envoyé · vérifiez votre boîte de réception");
            setTimeout(() => router.push("/login"), 2000);
          }}
          className="mt-6 space-y-4"
        >
          <div>
            <label htmlFor="fp-email" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gris-fonce">Email</label>
            <input
              id="fp-email"
              type="email"
              required
              placeholder="vous@restaurant.ch"
              className="h-11 w-full rounded-xl border border-hair bg-blanc px-3.5 text-sm text-noir outline-none transition-colors placeholder:text-gris-clair focus:border-noir"
            />
          </div>
          <button type="submit" className="w-full rounded-full bg-jaune-vif py-3.5 text-sm font-bold text-noir transition-transform hover:-translate-y-0.5">
            Envoyer le lien
          </button>
        </form>
        <a href="/login" className="mt-5 inline-block text-sm text-gris-fonce hover:text-noir">← Retour à la connexion</a>
      </div>
    </div>
  );
}
