"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CITIES } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import { SocialButtons, AuthDivider } from "./social-buttons";
import { PasswordField } from "./password-field";

const inputCls =
  "h-11 w-full rounded-xl border border-hair bg-blanc px-3.5 text-sm text-noir outline-none transition-colors placeholder:text-gris-clair focus:border-noir";
const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-gris-fonce";

export function SignupForm() {
  const router = useRouter();
  const { signup } = useAuth();
  const [agree, setAgree] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="mt-8">
      <SocialButtons mode="signup" />
      <AuthDivider />

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          const els = e.currentTarget.elements;
          const restaurantName = (els.namedItem("su-resto") as HTMLInputElement)?.value;
          const result = await signup({
            name: restaurantName,
            restaurant: restaurantName,
            email: (els.namedItem("su-email") as HTMLInputElement)?.value,
            phone: (els.namedItem("su-phone") as HTMLInputElement)?.value,
            city: (els.namedItem("su-city") as HTMLSelectElement)?.value,
            password: (els.namedItem("su-pw") as HTMLInputElement)?.value,
          });
          if (!result.success) {
            setError(result.error ?? "Impossible de créer le compte.");
            return;
          }
          router.push("/onboarding");
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="su-resto" className={labelCls}>Nom du restaurant</label>
          <input id="su-resto" name="su-resto" required placeholder="Le Cerf Genevois" autoComplete="organization" className={inputCls} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="su-email" className={labelCls}>Email pro</label>
            <input id="su-email" name="su-email" type="email" required placeholder="vous@restaurant.ch" autoComplete="email" className={inputCls} />
          </div>
          <div>
            <label htmlFor="su-phone" className={labelCls}>Téléphone</label>
            <div className="flex items-stretch overflow-hidden rounded-xl border border-hair bg-blanc focus-within:border-noir">
              <span className="flex items-center border-r border-hair bg-creme/60 px-3 text-sm font-medium text-gris-fonce">+41</span>
              <input id="su-phone" type="tel" required placeholder="79 000 00 00" autoComplete="tel" className="h-11 w-full bg-transparent px-3 text-sm text-noir outline-none placeholder:text-gris-clair" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="su-city" className={labelCls}>Ville</label>
            <select id="su-city" required className={cn(inputCls, "appearance-none")} defaultValue="Genève">
              {CITIES.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
          </div>
          <PasswordField id="su-pw" showStrength />
        </div>

        <label className="flex items-start gap-2.5 pt-1 text-sm text-gris-fonce">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 accent-noir" />
          <span>
            J&apos;accepte les{" "}
            <a href="/cgu" className="font-medium text-noir underline decoration-jaune-vif decoration-2 underline-offset-2">conditions générales</a>{" "}
            et la politique de confidentialité.
          </span>
        </label>

        <button
          type="submit"
          disabled={!agree}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-bold transition-all duration-200",
            agree ? "bg-jaune-vif text-noir hover:-translate-y-0.5 hover:bg-noir hover:text-jaune-vif" : "cursor-not-allowed bg-noir/10 text-gris-fonce",
          )}
        >
          Créer mon compte
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </button>
        {error ? <p className="text-center text-sm text-rouge">{error}</p> : null}

        <p className="text-center text-sm text-gris-fonce">
          Déjà un compte ?{" "}
          <a href="/login" className="font-medium text-noir underline decoration-jaune-vif decoration-2 underline-offset-4">Se connecter</a>
        </p>
      </form>
    </div>
  );
}
