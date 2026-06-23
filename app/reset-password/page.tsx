"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Wordmark } from "@/components/brand/wordmark";
import { PasswordField } from "@/components/auth/password-field";

export default function ResetPasswordPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-creme px-6 py-12">
      <Wordmark />
      <div className="mt-8 w-full max-w-md rounded-3xl border border-hair bg-blanc p-8 shadow-card">
        <h1 className="text-2xl font-bold tracking-tight text-noir">Nouveau mot de passe</h1>
        <p className="mt-2 text-sm text-gris-fonce">Choisissez un mot de passe solide pour votre compte.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Mot de passe mis à jour");
            setTimeout(() => router.push("/login"), 1500);
          }}
          className="mt-6 space-y-4"
        >
          <PasswordField id="rp-pw" label="Nouveau mot de passe" showStrength />
          <PasswordField id="rp-pw2" label="Confirmer le mot de passe" />
          <button type="submit" className="w-full rounded-full bg-jaune-vif py-3.5 text-sm font-bold text-noir transition-transform hover:-translate-y-0.5">
            Mettre à jour
          </button>
        </form>
      </div>
    </div>
  );
}
