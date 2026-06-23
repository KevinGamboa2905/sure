import { NextResponse } from "next/server";
import { getStripeServer } from "@/lib/stripe/server";

export async function POST(req: Request) {
  const { amount, restaurateurAccountId, reservationData } = await req.json();
  const chf = Number(amount);
  if (!Number.isFinite(chf) || chf <= 0 || chf > 1000) {
    return NextResponse.json({ error: "Montant invalide" }, { status: 400 });
  }

  try {
    const stripe = getStripeServer();
    const pi = await stripe.paymentIntents.create({
      amount: Math.round(chf * 100),
      currency: "chf",
      transfer_data: { destination: restaurateurAccountId },
      metadata: {
        reservationId: reservationData?.id ?? "",
        restaurantName: reservationData?.restaurantName ?? "",
        clientName: reservationData?.clientName ?? "",
        clientPhone: reservationData?.clientPhone ?? "",
        date: reservationData?.date ?? "",
        time: reservationData?.time ?? "",
        covers: String(reservationData?.covers ?? ""),
      },
    });
    return NextResponse.json({ clientSecret: pi.client_secret, paymentIntentId: pi.id });
  } catch (error) {
    console.error("Stripe payment intent error", error);
    return NextResponse.json({ error: "Payment intent creation failed" }, { status: 500 });
  }
}
