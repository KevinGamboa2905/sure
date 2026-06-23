import { NextResponse } from "next/server";
import { getConnectStatus } from "@/lib/stripe/connect";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const accountId = searchParams.get("accountId");
  if (!accountId) {
    return NextResponse.json({ error: "accountId requis" }, { status: 400 });
  }
  try {
    return NextResponse.json(await getConnectStatus(accountId));
  } catch (error) {
    console.error("Stripe connect status error", error);
    return NextResponse.json({ error: "Status check failed" }, { status: 500 });
  }
}
