import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/resend";
import { sendSms } from "@/lib/twilio";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const { name, email, restaurant, password, phone, city } = body as {
    name?: string;
    email?: string;
    restaurant?: string;
    password?: string;
    phone?: string;
    city?: string;
  };

  if (!name || !email || !restaurant || !password) {
    return NextResponse.json({ error: "Nom, email, restaurant et mot de passe sont requis." }, { status: 400 });
  }

  const lowerEmail = email.toLowerCase();
  const existingUser = await prisma.user.findUnique({ where: { email: lowerEmail } });
  if (existingUser) {
    return NextResponse.json({ error: "Un compte avec cet email existe déjà." }, { status: 400 });
  }

  const restaurantSlug = slugify(restaurant) || `restaurant-${Date.now()}`;
  const uniqueSlug = `${restaurantSlug}-${Date.now().toString().slice(-4)}`;
  const hashedPassword = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email: lowerEmail,
      hashedPassword,
      restaurant: {
        create: {
          name: restaurant,
          slug: uniqueSlug,
          address: "",
          city: city ?? "",
          phone: phone ?? "",
          email: lowerEmail,
          plan: "Pro",
        },
      },
    },
    include: { restaurant: true },
  });

  try {
    await sendWelcomeEmail(lowerEmail, name, restaurant);
  } catch (error) {
    console.warn("Erreur d'envoi d'email de bienvenue :", error);
  }

  if (phone) {
    try {
      await sendSms(phone, `Bonjour ${name}, votre compte Tably pour ${restaurant} est créé.`);
    } catch (error) {
      console.warn("Erreur d'envoi SMS de bienvenue :", error);
    }
  }

  return NextResponse.json({ ok: true, user: { id: user.id, email: user.email } });
}
