"use client";

import { FcGoogle } from "react-icons/fc";
import { useAuth, type AuthProvider } from "@/lib/auth-context";

// Facebook et Apple masqués tant qu'ils ne sont pas configurés (pas de clés OAuth).
const PROVIDERS: { key: Exclude<AuthProvider, "email">; label: string; icon: React.ReactNode }[] = [
  { key: "google", label: "Google", icon: <FcGoogle className="h-5 w-5" /> },
];

export function SocialButtons({ mode }: { mode: "signup" | "login" }) {
  const { loginWithProvider } = useAuth();
  const verb = mode === "signup" ? "Continuer avec" : "Se connecter avec";

  return (
    <div className="space-y-2.5">
      {PROVIDERS.map((p) => (
        <button
          key={p.key}
          type="button"
          onClick={() => loginWithProvider(p.key)}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-hair bg-blanc py-3 text-sm font-medium text-noir transition-all duration-200 hover:-translate-y-0.5 hover:border-noir"
        >
          {p.icon}
          {verb} {p.label}
        </button>
      ))}
    </div>
  );
}

/** Séparateur « ou avec votre email ». */
export function AuthDivider({ label = "ou avec votre email" }: { label?: string }) {
  return (
    <div className="my-6 flex items-center gap-3">
      <span className="h-px flex-1 bg-hair" />
      <span className="text-xs text-gris-fonce">{label}</span>
      <span className="h-px flex-1 bg-hair" />
    </div>
  );
}
