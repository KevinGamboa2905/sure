import { NextResponse } from "next/server";
import { disconnectAccount } from "@/lib/stripe/connect";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const accountId = body?.accountId;
  if (!accountId) {
    return NextResponse.json({ error: "accountId requis" }, { status: 400 });
  }

  try {
    return NextResponse.json(await disconnectAccount(accountId));
  } catch (error) {
    console.error("Stripe disconnect error", error);
    return NextResponse.json({ error: "Disconnect failed" }, { status: 500 });
  }
}
