import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json().catch(() => null);
  if (!data) return NextResponse.json({ error: "Requête invalide" }, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { restaurant: true },
  });
  if (!user?.restaurant) {
    return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
  }

  // On ne met à jour que les champs fournis (évite d'écraser avec undefined).
  const fields: Record<string, unknown> = {};
  const allow = (k: string, v: unknown) => { if (v !== undefined) fields[k] = v; };
  allow("name", data.name);
  allow("tagline", data.tagline);
  allow("phone", data.phone);
  allow("email", data.email);
  allow("address", data.address);
  allow("city", data.city);
  allow("logoUrl", data.logoUrl);
  allow("primaryColor", data.colors?.primary);
  allow("backgroundColor", data.colors?.background);
  allow("textColor", data.colors?.text);
  allow("font", data.font);
  allow("depositEnabled", data.depositEnabled);
  allow("depositPerCover", data.depositPerCover);
  allow("cancellationWindow", data.cancellationWindow);

  const updated = await prisma.restaurant.update({
    where: { id: user.restaurant.id },
    data: fields,
  });

  return NextResponse.json({ success: true, restaurant: { id: updated.id, slug: updated.slug, name: updated.name } });
}
