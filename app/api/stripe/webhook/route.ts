import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getStripeServer } from "@/lib/stripe/server";
import { prisma } from "@/lib/prisma";
import { planForPriceId } from "@/lib/stripe/prices";
import type { PlanKey } from "@/lib/plans";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature");
  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const stripe = getStripeServer();
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.error("Stripe webhook signature error", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object as {
          metadata?: { restaurantId?: string; plan?: string; interval?: string };
          customer?: string | null;
          subscription?: string | null;
        };
        const restaurantId = s.metadata?.restaurantId;
        if (restaurantId) {
          await prisma.restaurant.update({
            where: { id: restaurantId },
            data: {
              hasPaid: true,
              plan: (s.metadata?.plan as PlanKey) ?? undefined,
              billingInterval: s.metadata?.interval ?? undefined,
              stripeCustomerId: typeof s.customer === "string" ? s.customer : undefined,
              stripeSubscriptionId: typeof s.subscription === "string" ? s.subscription : undefined,
            },
          });
        }
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as {
          metadata?: { restaurantId?: string };
          items?: { data?: { price?: { id?: string } }[] };
        };
        const priceId = sub.items?.data?.[0]?.price?.id;
        const match = priceId ? planForPriceId(priceId) : null;
        const restaurantId = sub.metadata?.restaurantId;
        if (restaurantId && match) {
          await prisma.restaurant.update({
            where: { id: restaurantId },
            data: { plan: match.plan, billingInterval: match.interval, hasPaid: true },
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as { metadata?: { restaurantId?: string } };
        const restaurantId = sub.metadata?.restaurantId;
        if (restaurantId) {
          await prisma.restaurant.update({
            where: { id: restaurantId },
            data: { hasPaid: false, stripeSubscriptionId: null },
          });
        }
        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.error("Stripe webhook handler error", error);
    // 200 quand même : évite les retries en boucle sur une erreur non récupérable.
  }

  return NextResponse.json({ received: true });
}
