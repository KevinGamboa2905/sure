import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

// Pages publiques (accessibles sans connexion).
const PUBLIC_EXACT = ["/"];
const PUBLIC_PREFIX = [
  "/login", "/signup", "/trial", "/mot-de-passe-oublie", "/reset-password",
  "/tarifs", "/a-propos", "/contact", "/faq", "/blog",
  "/mentions-legales", "/confidentialite", "/cgu", "/cookies",
  "/r", // pages publiques de réservation client
];

function isPublic(path: string) {
  if (PUBLIC_EXACT.includes(path)) return true;
  if (path.startsWith("/api/auth")) return true;
  return PUBLIC_PREFIX.some((p) => path === p || path.startsWith(p + "/"));
}

// Le middleware ne fait QUE vérifier l'auth. La redirection /dashboard vs
// /onboarding est gérée dans chaque page via Prisma (plus fiable qu'un fetch).
export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Les routes API gèrent elles-mêmes leur auth.
  if (pathname.startsWith("/api")) return NextResponse.next();

  if (!req.auth?.user && !isPublic(pathname)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.png$|.*\\.svg$).*)"],
};
