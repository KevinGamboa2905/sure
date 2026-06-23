import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette Tably (cf. direction artistique)
        "jaune-vif": "#fcf376", // accent principal, CTA, highlights
        "gris-clair": "#bcbcbc", // bordures, texte secondaire
        noir: "#000000", // texte principal, headlines
        creme: "#fffee7", // fond principal, off-white chaleureux
        blanc: "#ffffff", // cartes, surfaces élevées
        "gris-fonce": "#555553", // texte courant, sub-headlines
      },
      fontFamily: {
        // La famille `display` couvre titres ET body : on bascule le poids
        // via font-weight. Helvetica Now Display d'abord, Inter en fallback dev.
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.18em",
      },
      borderColor: {
        // Bordure structurante par défaut : gris-clair à 40%.
        hair: "rgba(188, 188, 188, 0.4)",
      },
      boxShadow: {
        // Ombres teintées sur le créme (jamais du noir pur translucide générique).
        lift: "0 18px 40px -22px rgba(85, 85, 83, 0.45)",
        "lift-sm": "0 8px 24px -16px rgba(85, 85, 83, 0.4)",
        card: "0 1px 0 0 rgba(0,0,0,0.02), 0 12px 32px -24px rgba(85,85,83,0.5)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.7)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
        "accordion-down": "accordion-down 0.25s ease-out",
        "accordion-up": "accordion-up 0.25s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
