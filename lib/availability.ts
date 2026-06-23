/**
 * Disponibilités & réservations — 100% déterministe (pas de Math.random au rendu)
 * pour éviter tout mismatch d'hydratation, + un petit store localStorage qui
 * relie les réservations faites sur la page publique au dashboard gérant.
 */

import {
  type Restaurant,
  slotsForDay,
} from "./restaurants";

export type ResaStatus = "confirmé" | "en attente" | "honoré" | "no-show";

export type Reservation = {
  id: string;
  dateISO: string;
  time: string;
  name: string;
  partySize: number;
  status: ResaStatus;
  phone?: string;
  source: "mock" | "client";
};

const NAMES = [
  "Camille Berset", "Thomas Aebischer", "Noémie Délèze", "Marina Pittet",
  "Jonas Brügger", "Sébastien Crausaz", "Laure Monnier", "Yannick Rey",
  "Aline Favre", "Pierre Magnin", "Sofia Esposito", "Marc Oberson",
  "Élodie Chappuis", "David Stettler", "Inès Marchand", "Loïc Python",
  "Valérie Henchoz", "Nicolas Roduit", "Chloé Vionnet", "Bastien Glauser",
  "Manon Délétroz", "Antoine Verdon", "Sarah Kâ", "Hugo Rappaz",
];

/* ------------------------------ seed / rng ------------------------------ */

function hashStr(str: string): number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------ dates ------------------------------ */

export function toISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export function fromISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function todayISO(): string {
  return toISO(new Date());
}

/* ------------------------- disponibilité créneaux ------------------------- */

/** Nombre de tables déjà réservées (mock déterministe) pour un créneau. */
function baseBooked(slug: string, iso: string, time: string, capacity: number): number {
  const rng = mulberry32(hashStr(`${slug}|${iso}|${time}`));
  // Distribution penchant vers "quelques tables prises".
  const r = rng();
  return Math.min(capacity + 1, Math.floor(r * (capacity + 2)));
}

/** Tables restantes pour un créneau (mock + réservations locales). */
export function remainingForSlot(
  r: Restaurant,
  iso: string,
  time: string,
  localCount = 0,
): number {
  const booked = baseBooked(r.slug, iso, time, r.slotCapacity);
  return Math.max(0, r.slotCapacity - booked - localCount);
}

/* ------------------------- store localStorage ------------------------- */

const key = (slug: string) => `tablesure:bookings:${slug}`;

export function getLocalBookings(slug: string): Reservation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key(slug));
    return raw ? (JSON.parse(raw) as Reservation[]) : [];
  } catch {
    return [];
  }
}

export function addLocalBooking(slug: string, resa: Reservation): void {
  if (typeof window === "undefined") return;
  const all = getLocalBookings(slug);
  all.push(resa);
  window.localStorage.setItem(key(slug), JSON.stringify(all));
}

/** Compte des réservations locales pour un créneau précis. */
export function localCountForSlot(slug: string, iso: string, time: string): number {
  return getLocalBookings(slug).filter((b) => b.dateISO === iso && b.time === time)
    .length;
}

/* ----------------------- réservations du dashboard ----------------------- */

function statusForDate(iso: string, rng: () => number): ResaStatus {
  const today = todayISO();
  if (iso < today) {
    return rng() < 0.12 ? "no-show" : "honoré";
  }
  if (iso === today) return "confirmé";
  return rng() < 0.2 ? "en attente" : "confirmé";
}

/** Réservations (mock déterministe + locales) pour une journée donnée. */
export function reservationsForDay(r: Restaurant, iso: string): Reservation[] {
  const date = fromISO(iso);
  const slots = slotsForDay(r, date.getDay());
  const out: Reservation[] = [];

  for (const { time } of slots) {
    const booked = Math.min(r.slotCapacity, baseBooked(r.slug, iso, time, r.slotCapacity));
    for (let i = 0; i < booked; i++) {
      const rng = mulberry32(hashStr(`${r.slug}|${iso}|${time}|${i}`));
      const name = NAMES[Math.floor(rng() * NAMES.length)];
      const partySize = 2 + Math.floor(rng() * Math.min(r.maxParty - 1, 6));
      out.push({
        id: `${iso}-${time}-${i}`,
        dateISO: iso,
        time,
        name,
        partySize,
        status: statusForDate(iso, rng),
        source: "mock",
      });
    }
  }

  // Ajoute les réservations locales (faites via la page publique).
  for (const b of getLocalBookings(r.slug)) {
    if (b.dateISO === iso) out.push(b);
  }

  return out.sort((a, b) => a.time.localeCompare(b.time));
}

export function dayCovers(resas: Reservation[]): number {
  return resas
    .filter((r) => r.status !== "no-show")
    .reduce((sum, r) => sum + r.partySize, 0);
}
