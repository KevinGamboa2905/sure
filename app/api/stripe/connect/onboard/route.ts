import { NextResponse } from "next/server";
import { createConnectAccountLink } from "@/lib/stripe/connect";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const restaurantId = body?.restaurantId;
  if (!restaurantId) {
    return NextResponse.json({ error: "restaurantId requis" }, { status: 400 });
  }

  try {
    const { url, accountId } = await createConnectAccountLink(restaurantId);
    return NextResponse.json({ url, accountId });
  } catch (error) {
    console.error("Stripe onboarding error", error);
    return NextResponse.json({ error: "Failed to create onboarding link" }, { status: 500 });
  }
}
