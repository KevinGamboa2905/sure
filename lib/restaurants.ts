/**
 * Données mock multi-restaurants (pas de base de données).
 * Chaque restaurant a son slug (= son lien unique style Linktree), son branding,
 * ses horaires d'ouverture et ses paramètres de réservation.
 */

export type QuickLinkIcon = "menu" | "instagram" | "map" | "phone" | "globe";

export type QuickLink = {
  label: string;
  href: string;
  icon: QuickLinkIcon;
};

/** Une plage de service dans une journée (ex: midi 12:00–14:00). */
export type Service = { label: string; from: string; to: string };

/** Horaires d'un jour de la semaine. `services` vide = fermé. */
export type DayHours = { services: Service[] };

/** Palette de marque appliquée via variables CSS sur la page du restaurant. */
export type Brand = {
  page: string; // fond de page
  surface: string; // cartes / surfaces
  ink: string; // texte principal
  sub: string; // texte secondaire
  border: string; // bordures
  accent: string; // couleur d'accent du restaurant
  accentInk: string; // texte posé sur l'accent
};

export type Restaurant = {
  slug: string;
  name: string;
  monogram: string; // logo de repli (initiales)
  tagline: string;
  city: string;
  address: string;
  phone: string;
  brand: Brand;
  links: QuickLink[];
  /** Index 0 = dimanche … 6 = samedi (cf. Date.getDay()). */
  hours: DayHours[];
  slotIntervalMin: number; // pas entre deux créneaux
  slotCapacity: number; // nombre de tables disponibles par créneau
  maxParty: number; // taille de groupe max réservable en ligne
};

const WEEKDAYS_FR = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

export const RESTAURANTS: Restaurant[] = [
  {
    slug: "le-comptoir",
    name: "Le Comptoir des Halles",
    monogram: "CH",
    tagline: "Cuisine du marché · Genève",
    city: "Genève",
    address: "Rue de la Coulouvrenière 12, 1204 Genève",
    phone: "+41 22 555 18 40",
    brand: {
      page: "#f7f4ee",
      surface: "#ffffff",
      ink: "#1c1a17",
      sub: "#6b665d",
      border: "rgba(28,26,23,0.12)",
      accent: "#d8542a", // terracotta
      accentInk: "#ffffff",
    },
    links: [
      { label: "Voir le menu", href: "#", icon: "menu" },
      { label: "Instagram", href: "#", icon: "instagram" },
      { label: "Itinéraire", href: "#", icon: "map" },
      { label: "Appeler", href: "tel:+41225551840", icon: "phone" },
    ],
    hours: [
      { services: [] }, // dim — fermé
      { services: [] }, // lun — fermé
      {
        services: [
          { label: "Midi", from: "12:00", to: "14:00" },
          { label: "Soir", from: "19:00", to: "22:00" },
        ],
      },
      {
        services: [
          { label: "Midi", from: "12:00", to: "14:00" },
          { label: "Soir", from: "19:00", to: "22:00" },
        ],
      },
      {
        services: [
          { label: "Midi", from: "12:00", to: "14:00" },
          { label: "Soir", from: "19:00", to: "22:30" },
        ],
      },
      {
        services: [
          { label: "Midi", from: "12:00", to: "14:00" },
          { label: "Soir", from: "19:00", to: "22:30" },
        ],
      },
      { services: [{ label: "Soir", from: "18:30", to: "23:00" }] }, // sam
    ],
    slotIntervalMin: 30,
    slotCapacity: 4,
    maxParty: 8,
  },
  {
    slug: "brasserie-vaudoise",
    name: "Brasserie Vaudoise",
    monogram: "BV",
    tagline: "Plats canailles & vins du coin · Lausanne",
    city: "Lausanne",
    address: "Place de la Riponne 4, 1005 Lausanne",
    phone: "+41 21 555 22 10",
    brand: {
      page: "#f3f6f2",
      surface: "#ffffff",
      ink: "#15211a",
      sub: "#5d6b62",
      border: "rgba(21,33,26,0.12)",
      accent: "#1f6f4a", // vert profond
      accentInk: "#ffffff",
    },
    links: [
      { label: "La carte", href: "#", icon: "menu" },
      { label: "Instagram", href: "#", icon: "instagram" },
      { label: "Nous trouver", href: "#", icon: "map" },
      { label: "Site web", href: "#", icon: "globe" },
    ],
    hours: [
      { services: [] },
      {
        services: [{ label: "Midi", from: "11:30", to: "14:00" }],
      },
      {
        services: [
          { label: "Midi", from: "11:30", to: "14:00" },
          { label: "Soir", from: "18:30", to: "22:00" },
        ],
      },
      {
        services: [
          { label: "Midi", from: "11:30", to: "14:00" },
          { label: "Soir", from: "18:30", to: "22:00" },
        ],
      },
      {
        services: [
          { label: "Midi", from: "11:30", to: "14:00" },
          { label: "Soir", from: "18:30", to: "23:00" },
        ],
      },
      {
        services: [
          { label: "Midi", from: "11:30", to: "14:00" },
          { label: "Soir", from: "18:30", to: "23:00" },
        ],
      },
      { services: [{ label: "Soir", from: "18:00", to: "23:00" }] },
    ],
    slotIntervalMin: 30,
    slotCapacity: 5,
    maxParty: 10,
  },
  {
    slug: "osteria-vino",
    name: "Osteria Vino",
    monogram: "OV",
    tagline: "Cucina italiana · Fribourg",
    city: "Fribourg",
    address: "Rue de Lausanne 28, 1700 Fribourg",
    phone: "+41 26 555 09 77",
    brand: {
      page: "#faf5f1",
      surface: "#ffffff",
      ink: "#241616",
      sub: "#6e5b58",
      border: "rgba(36,22,22,0.12)",
      accent: "#7a1f2b", // bordeaux
      accentInk: "#ffffff",
    },
    links: [
      { label: "Il menù", href: "#", icon: "menu" },
      { label: "Instagram", href: "#", icon: "instagram" },
      { label: "Itinéraire", href: "#", icon: "map" },
      { label: "Appeler", href: "tel:+41265550977", icon: "phone" },
    ],
    hours: [
      { services: [{ label: "Soir", from: "18:30", to: "22:30" }] },
      { services: [] },
      {
        services: [
          { label: "Midi", from: "12:00", to: "13:30" },
          { label: "Soir", from: "18:30", to: "22:30" },
        ],
      },
      {
        services: [
          { label: "Midi", from: "12:00", to: "13:30" },
          { label: "Soir", from: "18:30", to: "22:30" },
        ],
      },
      {
        services: [
          { label: "Midi", from: "12:00", to: "13:30" },
          { label: "Soir", from: "18:30", to: "23:00" },
        ],
      },
      {
        services: [
          { label: "Midi", from: "12:00", to: "13:30" },
          { label: "Soir", from: "18:30", to: "23:00" },
        ],
      },
      { services: [{ label: "Soir", from: "18:30", to: "23:00" }] },
    ],
    slotIntervalMin: 30,
    slotCapacity: 3,
    maxParty: 6,
  },
];

export function getRestaurant(slug: string): Restaurant | undefined {
  return RESTAURANTS.find((r) => r.slug === slug);
}

export function getAllRestaurantSlugs(): string[] {
  return RESTAURANTS.map((r) => r.slug);
}

/* ---------------------------- helpers temps ---------------------------- */

export function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToTime(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Génère les créneaux (heures de début) pour un jour donné. */
export function slotsForDay(
  r: Restaurant,
  weekday: number,
): { service: string; time: string }[] {
  const day = r.hours[weekday];
  if (!day || day.services.length === 0) return [];
  const out: { service: string; time: string }[] = [];
  for (const s of day.services) {
    const start = timeToMinutes(s.from);
    const end = timeToMinutes(s.to);
    for (let t = start; t < end; t += r.slotIntervalMin) {
      out.push({ service: s.label, time: minutesToTime(t) });
    }
  }
  return out;
}

export function isOpenOn(r: Restaurant, weekday: number): boolean {
  return (r.hours[weekday]?.services.length ?? 0) > 0;
}

export function weekdayLabel(weekday: number): string {
  return WEEKDAYS_FR[weekday];
}
