import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendReservationConfirmation } from "@/lib/resend";

/**
 * Crée une réservation.
 * - Public (client) : fournir `slug` → résout le restaurant.
 * - Restaurateur (manuel) : pas de slug → utilise le restaurant du compte connecté.
 */
export async function POST(req: Request) {
  const data = await req.json().catch(() => null);
  if (!data) return NextResponse.json({ error: "Requête invalide" }, { status: 400 });

  // Résolution du restaurant
  let restaurant = null;
  if (data.slug) {
    restaurant = await prisma.restaurant.findUnique({ where: { slug: data.slug } });
  } else {
    const session = await auth();
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { restaurant: true },
    });
    restaurant = user?.restaurant ?? null;
  }
  if (!restaurant) return NextResponse.json({ error: "Restaurant introuvable" }, { status: 404 });

  const { date, time, party, clientName, clientPhone, clientEmail, note, deposit } = data;
  if (!date || !party || !clientName || !clientPhone) {
    return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
  }

  const covers = Math.max(1, Number(party) || 1);
  const when = new Date(`${date}T${(time || "00:00")}:00`);
  const wantsDeposit = (deposit ?? restaurant.depositEnabled) && restaurant.depositEnabled;
  const depositAmount = wantsDeposit ? restaurant.depositPerCover * covers : null;

  const reservation = await prisma.reservation.create({
    data: {
      restaurantId: restaurant.id,
      clientName,
      clientPhone,
      clientEmail: clientEmail || null,
      date: isNaN(when.getTime()) ? new Date() : when,
      time: time || "—",
      covers,
      note: note || null,
      status: "confirmed",
      depositAmount,
      paymentStatus: depositAmount ? "paid" : null,
    },
  });

  // E-mail de confirmation au client (best-effort, ne bloque pas la réponse).
  if (reservation.clientEmail) {
    try {
      await sendReservationConfirmation({
        to: reservation.clientEmail,
        reservation: {
          clientName: reservation.clientName,
          date: new Date(reservation.date).toLocaleDateString("fr-CH", { weekday: "long", day: "numeric", month: "long" }),
          time: reservation.time,
          covers: reservation.covers,
          depositAmount: reservation.depositAmount,
        },
        restaurant: { name: restaurant.name, address: restaurant.address, phone: restaurant.phone },
      });
    } catch (e) {
      console.warn("Email de confirmation non envoyé :", e);
    }
  }

  return NextResponse.json({ success: true, id: reservation.id, depositAmount });
}

