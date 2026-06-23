"use client";

import { signIn, signOut, useSession, SessionProvider, type SignInResponse } from "next-auth/react";
import { createContext, useContext, type ReactNode } from "react";

export type AuthProvider = "google" | "apple" | "facebook" | "email";

export type User = {
  id: string;
  name?: string;
  email?: string;
  restaurant?: string;
  plan?: string;
  provider: AuthProvider;
};

export type SignupData = {
  name?: string;
  email?: string;
  restaurant?: string;
  password?: string;
  phone?: string;
  city?: string;
};

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<SignInResponse | undefined>;
  loginWithProvider: (provider: AuthProvider) => Promise<void>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function mapSessionUser(sessionUser: any): User | null {
  if (!sessionUser?.id) return null;
  return {
    id: sessionUser.id as string,
    name: sessionUser.name as string | undefined,
    email: sessionUser.email as string | undefined,
    restaurant: undefined,
    plan: undefined,
    provider: "email",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export function useAuth() {
  const { data: session, status } = useSession();
  const user = mapSessionUser(session?.user);
  const isLoading = status === "loading";

  const value: AuthContextValue = {
    user,
    isLoading,
    login: (email, password) => signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/dashboard",
    }),
    loginWithProvider: async (provider) => {
      await signIn(provider, {
        callbackUrl: "/dashboard",
      });
    },
    signup: async (data) => {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        return { success: false, error: payload?.error ?? "Impossible de créer le compte." };
      }
      return { success: true };
    },
    logout: async () => {
      await signOut({ callbackUrl: "/login" });
    },
  };

  return value;
}
