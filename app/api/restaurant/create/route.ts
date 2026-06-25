import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json().catch(() => null);
  if (!data?.name || !data?.email || !data?.phone || !data?.address || !data?.city) {
    return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const existing = await prisma.restaurant.findUnique({ where: { userId: user.id } });
  if (existing) {
    return NextResponse.json({ error: "Restaurant already exists", slug: existing.slug }, { status: 400 });
  }

  // Slug unique
  const base = slugify(data.name) || "restaurant";
  let slug = base;
  let n = 1;
  while (await prisma.restaurant.findUnique({ where: { slug } })) {
    slug = `${base}-${++n}`;
  }

  const fullAddress = data.postalCode
    ? `${data.address}, ${data.postalCode} ${data.city}`
    : `${data.address}, ${data.city}`;

  // 30 jours d'essai gratuit, démarre en plan Pro.
  const trialEndsAt = new Date();
  trialEndsAt.setDate(trialEndsAt.getDate() + 30);

  // Liens sociaux activés (relation SocialLink).
  type Social = { key: string; url: string; enabled: boolean };
  const socialLinks = Array.isArray(data.socials)
    ? (data.socials as Social[])
        .filter((s) => s.enabled && s.url?.trim())
        .map((s, i) => ({ type: s.key, url: s.url.trim(), enabled: true, order: i }))
    : [];

  const restaurant = await prisma.restaurant.create({
    data: {
      slug,
      name: data.name,
      tagline: data.tagline ?? null,
      logoUrl: data.logoUrl ?? null,
      email: data.email,
      phone: data.phone,
      address: fullAddress,
      city: data.city,
      primaryColor: data.colors?.primary ?? "#fcf376",
      backgroundColor: data.colors?.background ?? "#fffee7",
      textColor: data.colors?.text ?? "#000000",
      font: data.font ?? "Helvetica Now Display",
      plan: "pro",
      trialEndsAt,
      hasPaid: false,
      depositEnabled: data.depositEnabled ?? false,
      depositPerCover: data.depositPerCover ?? 10,
      cancellationWindow: data.cancellationWindow ?? 48,
      userId: user.id,
      ...(socialLinks.length ? { socialLinks: { create: socialLinks } } : {}),
    },
  });

  return NextResponse.json({ success: true, slug: restaurant.slug, restaurantId: restaurant.id });
}
