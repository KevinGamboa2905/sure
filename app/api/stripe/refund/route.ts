import { NextResponse } from "next/server";
import { getStripeServer } from "@/lib/stripe/server";

export async function POST(req: Request) {
  const { paymentIntentId, restaurateurAccountId } = await req.json();
  if (!paymentIntentId || !restaurateurAccountId) {
    return NextResponse.json({ error: "paymentIntentId et restaurateurAccountId requis" }, { status: 400 });
  }

  try {
    const stripe = getStripeServer();
    const refund = await stripe.refunds.create(
      { payment_intent: paymentIntentId },
      { stripeAccount: restaurateurAccountId },
    );
    return NextResponse.json({ success: true, refundId: refund.id });
  } catch (error) {
    console.error("Stripe refund error", error);
    return NextResponse.json({ error: "Refund failed" }, { status: 500 });
  }
}
