import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getStripeServer } from "@/lib/stripe/server";
import { priceIdFor, type BillingInterval } from "@/lib/stripe/prices";
import type { PlanKey } from "@/lib/plans";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { plan, interval } = (await req.json().catch(() => ({}))) as {
    plan?: PlanKey;
    interval?: BillingInterval;
  };
  if (!plan || !interval) {
    return NextResponse.json({ error: "Plan ou intervalle manquant." }, { status: 400 });
  }

  const priceId = priceIdFor(plan, interval);
  if (!priceId) {
    return NextResponse.json({ error: "Tarif Stripe non configuré." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { restaurant: true },
  });
  if (!user?.restaurant) {
    return NextResponse.json({ error: "Restaurant introuvable" }, { status: 404 });
  }

  const stripe = getStripeServer();
  const back = `${APP_URL}/dashboard/parametres/abonnement`;

  try {
    const checkout = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer: user.restaurant.stripeCustomerId ?? undefined,
      customer_email: user.restaurant.stripeCustomerId ? undefined : session.user.email,
      client_reference_id: user.restaurant.id,
      metadata: { restaurantId: user.restaurant.id, plan, interval },
      subscription_data: { metadata: { restaurantId: user.restaurant.id, plan, interval } },
      success_url: `${back}?checkout=success`,
      cancel_url: `${back}?checkout=cancel`,
      allow_promotion_codes: true,
    });
    return NextResponse.json({ url: checkout.url });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erreur Stripe";
    console.error("Stripe checkout error:", msg);
    return NextResponse.json({ error: `Stripe : ${msg}` }, { status: 400 });
  }
}
