/**
 * Configuration réutilisée par l'UI (presets de marque, polices, villes,
 * modèles SMS, etc.). Les anciennes données de démonstration (réservations,
 * clients, analytics fictifs) ont été retirées : tout vient désormais de la DB.
 */

/* -------------------------------- KPIs ----------------------------------- */
export type Kpi = {
  key: string;
  label: string;
  value: string;
  unit?: string;
  sub: string;
  subCheck?: boolean;
  bar: string;
};

/* ------------------------------- Villes ---------------------------------- */
export const CITIES = ["Genève", "Lausanne", "Fribourg", "Neuchâtel", "Sion", "Autre"];

/* ----------------------------- Liens sociaux ----------------------------- */
export type SocialKey = "instagram" | "facebook" | "maps" | "tripadvisor" | "website" | "tiktok";

export type SocialLink = { key: SocialKey; label: string; url: string; enabled: boolean };

export const DEFAULT_SOCIALS: SocialLink[] = [
  { key: "instagram", label: "Instagram", url: "instagram.com/lecerf", enabled: true },
  { key: "maps", label: "Google Maps", url: "maps.google.com/lecerf", enabled: true },
  { key: "website", label: "Site web", url: "www.lecerf-geneve.ch", enabled: true },
  { key: "tripadvisor", label: "TripAdvisor", url: "tripadvisor.com/lecerf", enabled: true },
  { key: "facebook", label: "Facebook", url: "facebook.com/lecerf", enabled: false },
  { key: "tiktok", label: "TikTok", url: "tiktok.com/@lecerf", enabled: false },
];

/* ---------------------------- Presets de marque -------------------------- */
export type BrandPreset = { name: string; primary: string; bg: string; text: string; isDefault?: boolean };

export const BRAND_PRESETS: BrandPreset[] = [
  { name: "Tably (par défaut)", primary: "#fcf376", bg: "#fffee7", text: "#000000", isDefault: true },
  { name: "Bordeaux & Crème", primary: "#7c2d12", bg: "#fef3c7", text: "#1c1917" },
  { name: "Vert Forêt & Blanc", primary: "#14532d", bg: "#f9fafb", text: "#111827" },
  { name: "Bleu Marine & Or", primary: "#fbbf24", bg: "#1e3a8a", text: "#f8fafc" },
  { name: "Minimal Noir & Blanc", primary: "#000000", bg: "#ffffff", text: "#000000" },
  { name: "Terracotta & Beige", primary: "#c2410c", bg: "#fef3c7", text: "#1c1917" },
];

/* -------------------------------- Polices -------------------------------- */
export const FONT_OPTIONS = [
  "Helvetica Now Display",
  "Inter",
  "Playfair Display",
  "DM Sans",
  "Cormorant Garamond",
];

export const FONT_STACKS: Record<string, string> = {
  "Helvetica Now Display": "var(--font-display), Inter, system-ui, sans-serif",
  Inter: "Inter, system-ui, sans-serif",
  "Playfair Display": "'Playfair Display', Georgia, serif",
  "DM Sans": "'DM Sans', system-ui, sans-serif",
  "Cormorant Garamond": "'Cormorant Garamond', Georgia, serif",
};

/* -------------------------------- Horaires ------------------------------- */
export const OPENING_HOURS = [
  { day: "Lundi", midi: "12:00–14:00", soir: "19:00–22:00" },
  { day: "Mardi", midi: "12:00–14:00", soir: "19:00–22:00" },
  { day: "Mercredi", midi: "12:00–14:00", soir: "19:00–22:00" },
  { day: "Jeudi", midi: "12:00–14:00", soir: "19:00–22:30" },
  { day: "Vendredi", midi: "12:00–14:00", soir: "19:00–22:30" },
  { day: "Samedi", midi: "—", soir: "18:30–23:00" },
  { day: "Dimanche", midi: "Fermé", soir: "Fermé" },
];

/* --------------------------- SMS (config produit) ------------------------ */
export const SMS_WORKFLOWS = [
  { id: "confirm", name: "Confirmation de réservation", desc: "Envoyé dès qu'une réservation est créée.", enabled: true },
  { id: "j1", name: "Rappel J-1", desc: "La veille à 18h00.", enabled: true },
  { id: "h2", name: "Rappel H-2", desc: "Deux heures avant l'arrivée.", enabled: true },
  { id: "noshow", name: "Relance no-show", desc: "Si le client ne se présente pas.", enabled: false },
];

export const SMS_TEMPLATES = [
  { id: "t1", title: "Confirmation", body: "Bonjour {prénom}, votre table pour {couverts} le {date} à {heure} est confirmée. À très vite !" },
  { id: "t2", title: "Rappel J-1", body: "Rappel : on vous attend demain {heure} (table de {couverts}). Répondez OUI pour confirmer ou ANNULER." },
  { id: "t3", title: "Rappel H-2", body: "À tout à l'heure {prénom} ! Votre table est prête à {heure}. Un imprévu ? Prévenez-nous au {tel}." },
];
