/**
 * Données mockées de la partie applicative (démo, pas de backend).
 * Restaurant fictif : « Le Cerf Genevois ».
 */

export type ResaStatus = "Confirmé" | "En attente" | "No-show";

export type DashReservation = {
  id: string;
  time: string;
  name: string;
  party: number;
  info: string; // ligne d'info acompte / rappel
  status: ResaStatus;
};

export const DEMO_RESTAURANT = {
  slug: "lecerf-genevois",
  name: "Le Cerf Genevois",
  tagline: "Cuisine de terroir au cœur de Genève",
  address: "Rue de Rive 12, 1204 Genève",
  phone: "+41 22 000 00 00",
  email: "contact@lecerf-geneve.ch",
  website: "www.lecerf-geneve.ch",
  plan: "Plan Pro",
  monogram: "CG",
};

/* ------------------------------- KPIs ------------------------------- */

export type Kpi = {
  key: string;
  label: string;
  value: string;
  unit?: string; // ex : "CHF" affiché plus petit
  sub: string;
  subCheck?: boolean; // affiche une coche devant le sub
  bar: string; // couleur de la barre top
};

export const KPIS: Kpi[] = [
  {
    key: "reservations",
    label: "Réservations du mois",
    value: "87",
    sub: "+12% vs mois dernier",
    bar: "#fcf376",
  },
  {
    key: "confirmation",
    label: "Taux de confirmation",
    value: "94%",
    sub: "82 confirmées sur 87",
    bar: "#27ae60",
  },
  {
    key: "noshows",
    label: "No-shows du mois",
    value: "2",
    sub: "Acomptes récupérés",
    subCheck: true,
    bar: "#c0392b",
  },
  {
    key: "deposits",
    label: "Acomptes encaissés",
    value: "340",
    unit: "CHF",
    sub: "Sur no-shows & annulations",
    bar: "#000000",
  },
];

/* --------------------- Graphique 7 derniers jours --------------------- */

export const WEEK_CHART = [
  { day: "Lun", confirmed: 8, noshow: 1 },
  { day: "Mar", confirmed: 6, noshow: 0 },
  { day: "Mer", confirmed: 9, noshow: 0 },
  { day: "Jeu", confirmed: 11, noshow: 1 },
  { day: "Ven", confirmed: 14, noshow: 1 },
  { day: "Sam", confirmed: 18, noshow: 0 },
  { day: "Dim", confirmed: 7, noshow: 0 },
];

/* ----------------------- Réservations du jour ----------------------- */

export const TODAY_LABEL = "Vendredi 30 mai";

export const TODAY_RESERVATIONS: DashReservation[] = [
  { id: "r1", time: "19:30", name: "Famille Marchetti", party: 4, info: "Acompte 40 CHF encaissé", status: "Confirmé" },
  { id: "r2", time: "20:00", name: "M. Dubois", party: 2, info: "Rappel envoyé J-1", status: "En attente" },
  { id: "r3", time: "20:30", name: "Table Müller", party: 6, info: "Acompte 60 CHF encaissé", status: "Confirmé" },
  { id: "r4", time: "21:00", name: "Mme Chen", party: 3, info: "Pas d'acompte", status: "Confirmé" },
  { id: "r5", time: "21:30", name: "Groupe Rossi", party: 3, info: "Acompte 30 CHF encaissé", status: "No-show" },
];

/* --------------------------- Liens sociaux --------------------------- */

export type SocialKey =
  | "instagram"
  | "facebook"
  | "maps"
  | "tripadvisor"
  | "website"
  | "tiktok";

export type SocialLink = {
  key: SocialKey;
  label: string;
  url: string;
  enabled: boolean;
};

export const DEFAULT_SOCIALS: SocialLink[] = [
  { key: "instagram", label: "Instagram", url: "instagram.com/lecerf", enabled: true },
  { key: "maps", label: "Google Maps", url: "maps.google.com/lecerf", enabled: true },
  { key: "website", label: "Site web", url: "www.lecerf-geneve.ch", enabled: true },
  { key: "tripadvisor", label: "TripAdvisor", url: "tripadvisor.com/lecerf", enabled: true },
  { key: "facebook", label: "Facebook", url: "facebook.com/lecerf", enabled: false },
  { key: "tiktok", label: "TikTok", url: "tiktok.com/@lecerf", enabled: false },
];

/* ----------------------- Presets de branding ----------------------- */

export type BrandPreset = {
  name: string;
  primary: string; // CTA / boutons
  bg: string; // fond de la page client
  text: string; // texte
  isDefault?: boolean;
};

export const BRAND_PRESETS: BrandPreset[] = [
  { name: "Tably (par défaut)", primary: "#fcf376", bg: "#fffee7", text: "#000000", isDefault: true },
  { name: "Bordeaux & Crème", primary: "#7c2d12", bg: "#fef3c7", text: "#1c1917" },
  { name: "Vert Forêt & Blanc", primary: "#14532d", bg: "#f9fafb", text: "#111827" },
  { name: "Bleu Marine & Or", primary: "#fbbf24", bg: "#1e3a8a", text: "#f8fafc" },
  { name: "Minimal Noir & Blanc", primary: "#000000", bg: "#ffffff", text: "#000000" },
  { name: "Terracotta & Beige", primary: "#c2410c", bg: "#fef3c7", text: "#1c1917" },
];

/** Branding par défaut = identité Tably. */
export const DEFAULT_BRANDING = {
  primary: "#fcf376",
  background: "#fffee7",
  text: "#000000",
} as const;

export const FONT_OPTIONS = [
  "Helvetica Now Display",
  "Inter",
  "Playfair Display",
  "DM Sans",
  "Cormorant Garamond",
];

/** Pile de fallback pour appliquer la police choisie au preview. */
export const FONT_STACKS: Record<string, string> = {
  "Helvetica Now Display": "var(--font-display), Inter, system-ui, sans-serif",
  Inter: "Inter, system-ui, sans-serif",
  "Playfair Display": "'Playfair Display', Georgia, serif",
  "DM Sans": "'DM Sans', system-ui, sans-serif",
  "Cormorant Garamond": "'Cormorant Garamond', Georgia, serif",
};

export const CITIES = ["Genève", "Lausanne", "Fribourg", "Neuchâtel", "Sion", "Autre"];

export const OPENING_HOURS = [
  { day: "Lundi", midi: "12:00–14:00", soir: "19:00–22:00" },
  { day: "Mardi", midi: "12:00–14:00", soir: "19:00–22:00" },
  { day: "Mercredi", midi: "12:00–14:00", soir: "19:00–22:00" },
  { day: "Jeudi", midi: "12:00–14:00", soir: "19:00–22:30" },
  { day: "Vendredi", midi: "12:00–14:00", soir: "19:00–22:30" },
  { day: "Samedi", midi: "—", soir: "18:30–23:00" },
  { day: "Dimanche", midi: "Fermé", soir: "Fermé" },
];

/* --------------------- Toutes les réservations (table) --------------------- */

export type FullReservation = {
  id: string;
  date: string; // "30 mai"
  time: string;
  client: string;
  party: number;
  deposit: string; // "40 CHF" | "—"
  status: ResaStatus;
};

export const ALL_RESERVATIONS: FullReservation[] = [
  { id: "a1", date: "30 mai", time: "19:30", client: "Famille Marchetti", party: 4, deposit: "40 CHF", status: "Confirmé" },
  { id: "a2", date: "30 mai", time: "20:00", client: "M. Dubois", party: 2, deposit: "—", status: "En attente" },
  { id: "a3", date: "30 mai", time: "20:30", client: "Table Müller", party: 6, deposit: "60 CHF", status: "Confirmé" },
  { id: "a4", date: "30 mai", time: "21:00", client: "Mme Chen", party: 3, deposit: "—", status: "Confirmé" },
  { id: "a5", date: "30 mai", time: "21:30", client: "Groupe Rossi", party: 3, deposit: "30 CHF", status: "No-show" },
  { id: "a6", date: "31 mai", time: "12:30", client: "M. Favre", party: 2, deposit: "—", status: "Confirmé" },
  { id: "a7", date: "31 mai", time: "19:00", client: "Famille Weber", party: 5, deposit: "50 CHF", status: "Confirmé" },
  { id: "a8", date: "31 mai", time: "20:00", client: "Mme Leclerc", party: 2, deposit: "—", status: "En attente" },
  { id: "a9", date: "1 juin", time: "19:30", client: "Table Rey", party: 4, deposit: "40 CHF", status: "Confirmé" },
  { id: "a10", date: "1 juin", time: "20:30", client: "Groupe Esposito", party: 8, deposit: "80 CHF", status: "Confirmé" },
  { id: "a11", date: "2 juin", time: "12:00", client: "M. Oberson", party: 2, deposit: "—", status: "No-show" },
  { id: "a12", date: "2 juin", time: "20:00", client: "Mme Délèze", party: 3, deposit: "30 CHF", status: "Confirmé" },
];

/* ------------------------------- Agenda ------------------------------- */

export const AGENDA_DAYS = [
  { day: "Lun", date: "26" },
  { day: "Mar", date: "27" },
  { day: "Mer", date: "28" },
  { day: "Jeu", date: "29" },
  { day: "Ven", date: "30" },
  { day: "Sam", date: "31" },
  { day: "Dim", date: "1" },
];

export const AGENDA_HOURS = ["12:00", "13:00", "19:00", "20:00", "21:00", "22:00"];

// Réservations placées sur la grille [dayIndex][hour] -> couverts
export const AGENDA_SLOTS: { dayIndex: number; hour: string; party: number; name: string }[] = [
  { dayIndex: 1, hour: "20:00", party: 4, name: "Berset" },
  { dayIndex: 2, hour: "12:00", party: 2, name: "Favre" },
  { dayIndex: 2, hour: "21:00", party: 6, name: "Müller" },
  { dayIndex: 3, hour: "19:00", party: 3, name: "Chen" },
  { dayIndex: 4, hour: "20:00", party: 4, name: "Marchetti" },
  { dayIndex: 4, hour: "21:00", party: 3, name: "Rossi" },
  { dayIndex: 5, hour: "19:00", party: 5, name: "Weber" },
  { dayIndex: 5, hour: "20:00", party: 8, name: "Esposito" },
  { dayIndex: 5, hour: "22:00", party: 2, name: "Rey" },
  { dayIndex: 6, hour: "19:00", party: 4, name: "Délèze" },
];

/* -------------------------------- SMS -------------------------------- */

export const SMS_WORKFLOWS = [
  { id: "confirm", name: "Confirmation de réservation", desc: "Envoyé dès qu'une réservation est créée.", enabled: true },
  { id: "j1", name: "Rappel J-1", desc: "La veille à 18h00.", enabled: true },
  { id: "h2", name: "Rappel H-2", desc: "Deux heures avant l'arrivée.", enabled: true },
  { id: "noshow", name: "Relance no-show", desc: "Si le client ne se présente pas.", enabled: false },
];

export const SMS_TEMPLATES = [
  { id: "t1", title: "Confirmation", body: "Bonjour {prénom}, votre table pour {couverts} le {date} à {heure} est confirmée au Cerf Genevois. À très vite !" },
  { id: "t2", title: "Rappel J-1", body: "Rappel : on vous attend demain {heure} (table de {couverts}). Répondez OUI pour confirmer ou ANNULER." },
  { id: "t3", title: "Rappel H-2", body: "À tout à l'heure {prénom} ! Votre table est prête à {heure}. Un imprévu ? Prévenez-nous au {tel}." },
];

export const SMS_HISTORY = [
  { id: "s1", time: "Aujourd'hui 17:30", to: "+41 79 412 88 21", type: "Rappel H-2", status: "Livré" },
  { id: "s2", time: "Aujourd'hui 12:00", to: "+41 78 200 14 56", type: "Rappel J-1", status: "Livré" },
  { id: "s3", time: "Hier 18:00", to: "+41 76 555 39 07", type: "Confirmation", status: "Livré" },
  { id: "s4", time: "Hier 18:00", to: "+41 79 884 12 33", type: "Confirmation", status: "Livré" },
  { id: "s5", time: "Hier 11:20", to: "+41 77 318 65 90", type: "Rappel J-1", status: "Échec" },
  { id: "s6", time: "28 mai 19:10", to: "+41 79 220 47 11", type: "Rappel H-2", status: "Livré" },
  { id: "s7", time: "28 mai 12:00", to: "+41 78 991 03 28", type: "Confirmation", status: "Livré" },
  { id: "s8", time: "27 mai 18:00", to: "+41 76 410 77 65", type: "Rappel J-1", status: "Livré" },
  { id: "s9", time: "27 mai 09:45", to: "+41 79 002 55 19", type: "Confirmation", status: "Livré" },
  { id: "s10", time: "26 mai 20:30", to: "+41 77 845 12 90", type: "Rappel H-2", status: "Livré" },
];

export const SMS_STATS = [
  { label: "SMS envoyés ce mois", value: "312" },
  { label: "Taux de réponse", value: "68%" },
  { label: "Crédits restants", value: "688" },
];

/* ------------------------------- Clients ------------------------------- */

export type Client = {
  id: string;
  name: string;
  phone: string;
  email: string;
  visits: number;
  lastVisit: string;
  rating: number; // 1..5
};

export const CLIENTS: Client[] = [
  { id: "c1", name: "Sophie Marchetti", phone: "+41 79 412 88 21", email: "s.marchetti@gmail.com", visits: 12, lastVisit: "28 mai 2026", rating: 5 },
  { id: "c2", name: "Élodie Dubois", phone: "+41 78 200 14 56", email: "elodie.dubois@bluewin.ch", visits: 8, lastVisit: "24 mai 2026", rating: 5 },
  { id: "c3", name: "Hans Müller", phone: "+41 76 555 39 07", email: "h.mueller@gmx.ch", visits: 6, lastVisit: "21 mai 2026", rating: 4 },
  { id: "c4", name: "Wei Chen", phone: "+41 79 884 12 33", email: "wei.chen@gmail.com", visits: 5, lastVisit: "19 mai 2026", rating: 5 },
  { id: "c5", name: "Giulia Rossi", phone: "+41 77 318 65 90", email: "giulia.rossi@icloud.com", visits: 3, lastVisit: "12 mai 2026", rating: 3 },
  { id: "c6", name: "Marc Favre", phone: "+41 79 220 47 11", email: "m.favre@protonmail.com", visits: 9, lastVisit: "27 mai 2026", rating: 5 },
  { id: "c7", name: "Anja Weber", phone: "+41 78 991 03 28", email: "anja.weber@gmail.com", visits: 4, lastVisit: "15 mai 2026", rating: 4 },
  { id: "c8", name: "Pauline Leclerc", phone: "+41 76 410 77 65", email: "p.leclerc@bluewin.ch", visits: 7, lastVisit: "23 mai 2026", rating: 5 },
  { id: "c9", name: "Luca Esposito", phone: "+41 79 002 55 19", email: "luca.esposito@gmail.com", visits: 2, lastVisit: "8 mai 2026", rating: 4 },
  { id: "c10", name: "Noémie Délèze", phone: "+41 77 845 12 90", email: "noemie.deleze@icloud.com", visits: 11, lastVisit: "26 mai 2026", rating: 5 },
];

/* ------------------------------ Analytics ------------------------------ */

export type AnalyticsRange = "30" | "90" | "365";

export const ANALYTICS: Record<AnalyticsRange, {
  kpis: { label: string; value: string; sub: string }[];
  series: number[];
}> = {
  "30": {
    kpis: [
      { label: "Réservations", value: "87", sub: "+12% vs période préc." },
      { label: "Taux de no-show", value: "2,3%", sub: "-1,4 pt" },
      { label: "Revenus acomptes", value: "340 CHF", sub: "+8%" },
      { label: "Couverts / service", value: "41", sub: "+3" },
    ],
    series: [9, 12, 8, 14, 19, 22, 11, 13, 17, 21, 24, 18],
  },
  "90": {
    kpis: [
      { label: "Réservations", value: "264", sub: "+9% vs période préc." },
      { label: "Taux de no-show", value: "2,8%", sub: "-0,9 pt" },
      { label: "Revenus acomptes", value: "1 020 CHF", sub: "+11%" },
      { label: "Couverts / service", value: "39", sub: "+2" },
    ],
    series: [120, 98, 140, 165, 190, 175, 210, 188, 205, 230, 218, 240].map((n) => Math.round(n / 8)),
  },
  "365": {
    kpis: [
      { label: "Réservations", value: "1 042", sub: "+18% vs an préc." },
      { label: "Taux de no-show", value: "3,1%", sub: "-2,2 pt" },
      { label: "Revenus acomptes", value: "4 180 CHF", sub: "+22%" },
      { label: "Couverts / service", value: "38", sub: "+4" },
    ],
    series: [62, 70, 58, 81, 90, 86, 102, 95, 108, 120, 112, 130],
  },
};

export const TOP_SLOTS = [
  { slot: "Samedi · 20:00", count: 142 },
  { slot: "Vendredi · 20:00", count: 128 },
  { slot: "Samedi · 19:30", count: 119 },
  { slot: "Vendredi · 21:00", count: 96 },
  { slot: "Jeudi · 20:00", count: 74 },
];

export const FUNNEL = [
  { stage: "Visites de la page", value: 1240 },
  { stage: "Réservations démarrées", value: 320 },
  { stage: "Réservations confirmées", value: 287 },
  { stage: "Présences honorées", value: 281 },
];
