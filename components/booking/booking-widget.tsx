"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Users, Clock, CalendarDays } from "lucide-react";
import {
  type Restaurant,
  slotsForDay,
  isOpenOn,
  timeToMinutes,
  weekdayLabel,
} from "@/lib/restaurants";
import {
  type Reservation,
  toISO,
  fromISO,
  todayISO,
  remainingForSlot,
  localCountForSlot,
  addLocalBooking,
} from "@/lib/availability";
import { Calendar } from "./calendar";
import { cn } from "@/lib/utils";

function nextOpenISO(r: Restaurant): string {
  const d = new Date();
  for (let i = 0; i < 60; i++) {
    if (isOpenOn(r, d.getDay())) return toISO(d);
    d.setDate(d.getDate() + 1);
  }
  return toISO(new Date());
}

function formatLongDate(iso: string): string {
  const d = fromISO(iso);
  return `${weekdayLabel(d.getDay())} ${d.getDate()} ${[
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre",
  ][d.getMonth()]}`;
}

export function BookingWidget({ restaurant }: { restaurant: Restaurant }) {
  const [mounted, setMounted] = useState(false);
  const [dateISO, setDateISO] = useState("");
  const [party, setParty] = useState(2);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState<Reservation | null>(null);
  const [bump, setBump] = useState(0); // force recalcul après réservation locale

  useEffect(() => {
    setMounted(true);
    setDateISO(nextOpenISO(restaurant));
  }, [restaurant]);

  const weekday = dateISO ? fromISO(dateISO).getDay() : 0;
  const open = dateISO ? isOpenOn(restaurant, weekday) : false;

  // Créneaux groupés par service, avec disponibilité.
  const grouped = useMemo(() => {
    if (!dateISO || !open) return [] as { service: string; slots: { time: string; remaining: number; past: boolean }[] }[];
    const nowMin = dateISO === todayISO() ? new Date().getHours() * 60 + new Date().getMinutes() : -1;
    const map = new Map<string, { time: string; remaining: number; past: boolean }[]>();
    for (const { service, time: t } of slotsForDay(restaurant, weekday)) {
      const localCount = localCountForSlot(restaurant.slug, dateISO, t);
      const remaining = remainingForSlot(restaurant, dateISO, t, localCount);
      const past = timeToMinutes(t) <= nowMin;
      if (!map.has(service)) map.set(service, []);
      map.get(service)!.push({ time: t, remaining, past });
    }
    return Array.from(map.entries()).map(([service, slots]) => ({ service, slots }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateISO, open, weekday, restaurant, bump, party]);

  const canSubmit = !!dateISO && !!time && name.trim().length > 1 && phone.trim().length >= 6;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || !time) return;
    const resa: Reservation = {
      id: `${restaurant.slug}-${dateISO}-${time}-${Date.now()}`,
      dateISO,
      time,
      name: name.trim(),
      phone: phone.trim(),
      partySize: party,
      status: "en attente",
      source: "client",
    };
    addLocalBooking(restaurant.slug, resa);
    setConfirmed(resa);
  }

  function reset() {
    setConfirmed(null);
    setTime(null);
    setName("");
    setPhone("");
    setBump((b) => b + 1);
    setDateISO(nextOpenISO(restaurant));
  }

  /* ---- Skeleton SSR (évite tout mismatch d'hydratation lié aux dates) ---- */
  if (!mounted) {
    return (
      <div className="rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6">
        <div className="h-6 w-40 rounded bg-[var(--brand-ink)]/10" />
        <div className="mt-6 h-64 rounded-2xl bg-[var(--brand-ink)]/5" />
      </div>
    );
  }

  /* ---- Confirmation ---- */
  if (confirmed) {
    return (
      <div className="rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-7 text-center">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-accent)] text-[var(--brand-accent-ink)]">
          <Check className="h-7 w-7" strokeWidth={2.5} />
        </span>
        <h3 className="mt-5 text-2xl font-bold tracking-tight text-[var(--brand-ink)]">
          C&apos;est noté, {confirmed.name.split(" ")[0]} !
        </h3>
        <p className="mt-2 text-[var(--brand-sub)]">
          Table pour {confirmed.partySize}{" "}
          {confirmed.partySize > 1 ? "personnes" : "personne"} le{" "}
          {formatLongDate(confirmed.dateISO)} à {confirmed.time}.
        </p>
        <div className="mt-5 rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-page)] p-4 text-left text-sm text-[var(--brand-sub)]">
          <p>
            Un <span className="font-medium text-[var(--brand-ink)]">SMS de confirmation</span>{" "}
            vient de partir au {confirmed.phone}. Vous recevrez un rappel à J-1
            puis à H-2.
          </p>
        </div>
        <button
          onClick={reset}
          className="mt-6 text-sm font-medium text-[var(--brand-ink)] underline decoration-[var(--brand-accent)] decoration-2 underline-offset-4"
        >
          Faire une autre réservation
        </button>
      </div>
    );
  }

  /* ---- Formulaire ---- */
  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 sm:p-7"
    >
      <div className="flex items-center gap-2">
        <CalendarDays className="h-5 w-5 text-[var(--brand-accent)]" strokeWidth={2} />
        <h3 className="text-lg font-bold tracking-tight text-[var(--brand-ink)]">
          Réserver une table
        </h3>
      </div>

      {/* Nombre de personnes */}
      <div className="mt-6">
        <label className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-[var(--brand-sub)]">
          <Users className="h-3.5 w-3.5" /> Personnes
        </label>
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: restaurant.maxParty }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setParty(n)}
              className={cn(
                "h-9 min-w-9 rounded-full border px-3 text-sm transition-colors",
                party === n
                  ? "border-[var(--brand-accent)] bg-[var(--brand-accent)] font-bold text-[var(--brand-accent-ink)]"
                  : "border-[var(--brand-border)] text-[var(--brand-ink)] hover:border-[var(--brand-accent)]",
              )}
            >
              {n}
              {n === restaurant.maxParty ? "+" : ""}
            </button>
          ))}
        </div>
      </div>

      {/* Calendrier */}
      <div className="mt-6 rounded-2xl border border-[var(--brand-border)] p-4">
        <Calendar
          value={dateISO}
          onSelect={(iso) => {
            setDateISO(iso);
            setTime(null);
          }}
          isDisabled={(d) =>
            toISO(d) < todayISO() || !isOpenOn(restaurant, d.getDay())
          }
        />
      </div>

      {/* Créneaux */}
      <div className="mt-6">
        <label className="mb-3 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-[var(--brand-sub)]">
          <Clock className="h-3.5 w-3.5" /> Horaire — {formatLongDate(dateISO)}
        </label>

        {!open ? (
          <p className="rounded-xl border border-dashed border-[var(--brand-border)] p-4 text-sm text-[var(--brand-sub)]">
            Fermé ce jour-là. Choisissez une autre date.
          </p>
        ) : (
          <div className="space-y-4">
            {grouped.map(({ service, slots }) => (
              <div key={service}>
                <p className="mb-2 text-xs font-medium text-[var(--brand-sub)]">{service}</p>
                <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-5">
                  {slots.map(({ time: t, remaining, past }) => {
                    const dead = past || remaining <= 0;
                    return (
                      <button
                        key={t}
                        type="button"
                        disabled={dead}
                        onClick={() => setTime(t)}
                        title={remaining <= 0 ? "Complet" : `${remaining} table(s)`}
                        className={cn(
                          "rounded-lg border py-2 text-sm transition-colors",
                          dead &&
                            "cursor-not-allowed border-[var(--brand-border)] text-[var(--brand-sub)]/35 line-through",
                          !dead &&
                            time === t &&
                            "border-[var(--brand-accent)] bg-[var(--brand-accent)] font-bold text-[var(--brand-accent-ink)]",
                          !dead &&
                            time !== t &&
                            "border-[var(--brand-border)] text-[var(--brand-ink)] hover:border-[var(--brand-accent)]",
                        )}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Coordonnées */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-name" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--brand-sub)]">
            Nom
          </label>
          <input
            id="bk-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom"
            autoComplete="name"
            className="h-11 w-full rounded-xl border border-[var(--brand-border)] bg-[var(--brand-page)] px-3.5 text-sm text-[var(--brand-ink)] outline-none transition-colors placeholder:text-[var(--brand-sub)]/60 focus:border-[var(--brand-accent)]"
          />
        </div>
        <div>
          <label htmlFor="bk-phone" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--brand-sub)]">
            Téléphone
          </label>
          <input
            id="bk-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+41 79 ..."
            autoComplete="tel"
            className="h-11 w-full rounded-xl border border-[var(--brand-border)] bg-[var(--brand-page)] px-3.5 text-sm text-[var(--brand-ink)] outline-none transition-colors placeholder:text-[var(--brand-sub)]/60 focus:border-[var(--brand-accent)]"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className={cn(
          "mt-6 flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-bold transition-all",
          canSubmit
            ? "bg-[var(--brand-accent)] text-[var(--brand-accent-ink)] hover:-translate-y-0.5"
            : "cursor-not-allowed bg-[var(--brand-ink)]/10 text-[var(--brand-sub)]",
        )}
      >
        {time
          ? `Confirmer pour le ${formatLongDate(dateISO)} à ${time}`
          : "Choisissez un horaire"}
      </button>
      <p className="mt-3 text-center text-xs text-[var(--brand-sub)]">
        Confirmation par SMS · Aucune carte requise pour cette démo
      </p>
    </form>
  );
}
