"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { LogoMark } from "@/components/brand/logo-mark";

/**
 * Protège les routes connectées. Si aucun user (localStorage) après hydratation,
 * redirige vers /login. Affiche un écran de chargement pendant la vérification.
 */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.replace("/login");
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-creme">
        <div className="flex flex-col items-center gap-3">
          <LogoMark className="h-10 w-10 animate-pulse" />
          <p className="text-sm text-gris-fonce">Chargement de votre espace…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
