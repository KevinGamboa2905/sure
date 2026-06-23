import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/auth-context";

/**
 * TYPOGRAPHIE — Helvetica Now Display
 * ------------------------------------------------------------------
 * En production, la police de marque est Helvetica Now Display (Bold + Regular).
 * Elle n'est pas sur Google Fonts : déposez les .woff2 dans /public/fonts/ puis
 * remplacez le bloc Inter ci-dessous par `next/font/local` (voir README).
 *
 *   import localFont from "next/font/local";
 *   const display = localFont({
 *     src: [
 *       { path: "../public/fonts/HelveticaNowDisplay-Regular.woff2", weight: "400", style: "normal" },
 *       { path: "../public/fonts/HelveticaNowDisplay-Bold.woff2",    weight: "700", style: "normal" },
 *     ],
 *     variable: "--font-display",
 *     display: "swap",
 *   });
 *
 * En attendant les fichiers, on utilise Inter (400 + 700) comme fallback dev :
 * `npm run dev` fonctionne immédiatement, sans asset manquant.
 */
const display = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-display",
  display: "swap",
});

const SITE_URL = "https://tably.ch";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tably — Plus jamais de no-shows pour votre restaurant",
    template: "%s · Tably",
  },
  description:
    "Rappels SMS automatiques, acompte sécurisé et dashboard de réservations. Tably réduit les no-shows de 70% dans les restaurants de Suisse romande.",
  keywords: [
    "no-show restaurant",
    "réservation restaurant Suisse",
    "rappel SMS restaurant",
    "acompte réservation",
    "anti no-show",
    "restaurant Genève Lausanne",
  ],
  authors: [{ name: "Tably" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_CH",
    url: SITE_URL,
    siteName: "Tably",
    title: "Tably — Plus jamais de no-shows",
    description:
      "Réduisez les no-shows de 70% et récupérez le CA perdu chaque soir. Rappels SMS, acompte sécurisé, dashboard de réservations.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Tably" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tably — Plus jamais de no-shows",
    description:
      "Réduisez les no-shows de 70% dans votre restaurant. Rappels SMS, acompte sécurisé, dashboard.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fffee7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={display.variable}>
      <body className="relative min-h-[100dvh] overflow-x-hidden">
        {/* Grain global subtil, fixe et non interactif (perf : pas de repaint au scroll). */}
        <div
          aria-hidden
          className="grain-overlay pointer-events-none fixed inset-0 z-[60]"
        />
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
