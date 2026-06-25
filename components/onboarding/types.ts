export const CUISINES = [
  "Suisse", "Française", "Italienne", "Asiatique", "Méditerranéenne", "Japonaise",
  "Indienne", "Mexicaine", "Burger", "Pizzeria", "Brasserie", "Gastronomique",
  "Végétarien/Vegan", "Café", "Autre",
];

export const ONBOARDING_CITIES = [
  "Genève", "Lausanne", "Fribourg", "Neuchâtel", "Sion", "Sierre", "Autre",
];

export type Service = { enabled: boolean; from: string; to: string };
export type DayHours = { day: string; lunch: Service; dinner: Service };

export type OnboardingSocial = { key: string; label: string; url: string; enabled: boolean };

export type OnboardingData = {
  // Étape 1
  name: string;
  tagline: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  email: string;
  cuisines: string[];
  avgCovers: number;
  // Étape 2
  hours: DayHours[];
  // Étape 3
  logoUrl: string | null;
  colors: { primary: string; background: string; text: string };
  font: string;
  depositEnabled: boolean;
  depositPerCover: number;
  cancellationWindow: number;
  socials: OnboardingSocial[];
};

const lunch = (enabled: boolean): Service => ({ enabled, from: "12:00", to: "14:00" });
const dinner = (enabled: boolean, to = "22:00"): Service => ({ enabled, from: "19:00", to });

export const DEFAULT_ONBOARDING: OnboardingData = {
  name: "",
  tagline: "",
  address: "",
  postalCode: "",
  city: "",
  phone: "",
  email: "",
  cuisines: [],
  avgCovers: 50,
  hours: [
    { day: "Lundi", lunch: lunch(false), dinner: dinner(false) },
    { day: "Mardi", lunch: lunch(true), dinner: dinner(true) },
    { day: "Mercredi", lunch: lunch(true), dinner: dinner(true) },
    { day: "Jeudi", lunch: lunch(true), dinner: dinner(true) },
    { day: "Vendredi", lunch: lunch(true), dinner: dinner(true, "22:30") },
    { day: "Samedi", lunch: lunch(false), dinner: dinner(true, "23:00") },
    { day: "Dimanche", lunch: { enabled: true, from: "12:00", to: "15:00" }, dinner: dinner(false) },
  ],
  logoUrl: null,
  colors: { primary: "#fcf376", background: "#fffee7", text: "#000000" },
  font: "Helvetica Now Display",
  depositEnabled: false,
  depositPerCover: 10,
  cancellationWindow: 48,
  socials: [
    { key: "instagram", label: "Instagram", url: "", enabled: false },
    { key: "facebook", label: "Facebook", url: "", enabled: false },
    { key: "maps", label: "Google Maps", url: "", enabled: false },
    { key: "tripadvisor", label: "TripAdvisor", url: "", enabled: false },
    { key: "tiktok", label: "TikTok", url: "", enabled: false },
    { key: "website", label: "Site web", url: "", enabled: false },
  ],
};

export function validateStep1(d: OnboardingData): boolean {
  return (
    d.name.trim().length >= 2 &&
    d.address.trim().length >= 5 &&
    /^\d{4}$/.test(d.postalCode.trim()) &&
    d.city.trim().length > 0 &&
    d.phone.trim().length >= 6 &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email.trim()) &&
    d.cuisines.length >= 1 &&
    d.avgCovers >= 1
  );
}
