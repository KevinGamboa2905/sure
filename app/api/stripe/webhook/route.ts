import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getStripeServer } from "@/lib/stripe/server";

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

  switch (event.type) {
    case "payment_intent.succeeded":
      break;
    case "payment_intent.payment_failed":
      break;
    case "charge.refunded":
      break;
    case "account.updated":
      break;
    case "payout.paid":
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
