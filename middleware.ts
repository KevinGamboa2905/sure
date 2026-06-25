import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

// Pages publiques (accessibles sans connexion).
const PUBLIC_EXACT = ["/"];
const PUBLIC_PREFIX = [
  "/login",
  "/signup",
  "/trial",
  "/mot-de-passe-oublie",
  "/reset-password",
  "/tarifs",
  "/a-propos",
  "/contact",
  "/faq",
  "/blog",
  "/mentions-legales",
  "/confidentialite",
  "/cgu",
  "/cookies",
  "/r", // pages publiques de réservation client
];

function isPublic(path: string) {
  if (PUBLIC_EXACT.includes(path)) return true;
  return PUBLIC_PREFIX.some((p) => path === p || path.startsWith(p + "/"));
}

export default auth(async (req) => {
  const { pathname } = req.nextUrl;

  // Les routes API gèrent elles-mêmes leur auth (et on évite une boucle de fetch).
  if (pathname.startsWith("/api")) return NextResponse.next();

  const loggedIn = !!req.auth?.user;

  // Non connecté : laisser passer le public, sinon → login.
  if (!loggedIn) {
    if (isPublic(pathname)) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Connecté : vérifier s'il a déjà un restaurant (via l'API Node, Prisma).
  let hasRestaurant = true;
  try {
    const res = await fetch(new URL("/api/user/has-restaurant", req.nextUrl), {
      headers: { cookie: req.headers.get("cookie") ?? "" },
    });
    hasRestaurant = (await res.json())?.exists ?? true;
  } catch {
    hasRestaurant = true; // en cas d'échec, on ne bloque pas l'utilisateur
  }

  if (!hasRestaurant && !pathname.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL("/onboarding", req.nextUrl));
  }
  if (hasRestaurant && pathname.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.png$|.*\\.svg$).*)"],
};
