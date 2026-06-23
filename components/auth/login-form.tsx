"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { SocialButtons, AuthDivider } from "./social-buttons";
import { PasswordField } from "./password-field";

const inputCls =
  "h-11 w-full rounded-xl border border-hair bg-blanc px-3.5 text-sm text-noir outline-none transition-colors placeholder:text-gris-clair focus:border-noir";
const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-gris-fonce";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="mt-8">
      <SocialButtons mode="login" />
      <AuthDivider />

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          const email = (e.currentTarget.elements.namedItem("lg-email") as HTMLInputElement)?.value;
          const password = (e.currentTarget.elements.namedItem("lg-pw") as HTMLInputElement)?.value;
          const result = await login(email, password);
          if (result?.error) {
            setError(result.error);
            return;
          }
          router.push("/dashboard");
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="lg-email" className={labelCls}>Email</label>
          <input id="lg-email" name="lg-email" type="email" required placeholder="vous@restaurant.ch" autoComplete="email" className={inputCls} />
        </div>

        <PasswordField id="lg-pw" autoComplete="current-password" />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gris-fonce">
            <input type="checkbox" defaultChecked className="h-4 w-4 accent-noir" />
            Se souvenir de moi
          </label>
          <a href="/mot-de-passe-oublie" className="text-sm text-gris-fonce underline decoration-gris-clair underline-offset-2 hover:text-noir">
            Mot de passe oublié ?
          </a>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-jaune-vif py-4 text-sm font-bold text-noir transition-all duration-200 hover:-translate-y-0.5 hover:bg-noir hover:text-jaune-vif"
        >
          Se connecter
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </button>
        {error ? <p className="text-center text-sm text-rouge">{error}</p> : null}

        <p className="text-center text-sm text-gris-fonce">
          Pas encore de compte ?{" "}
          <a href="/signup" className="font-medium text-noir underline decoration-jaune-vif decoration-2 underline-offset-4">S&apos;inscrire</a>
        </p>
      </form>
    </div>
  );
}
