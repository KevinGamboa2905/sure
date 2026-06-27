import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/resend";
import { sendSms } from "@/lib/twilio";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const { name, email, restaurant, password, phone } = body as {
    name?: string;
    email?: string;
    restaurant?: string;
    password?: string;
    phone?: string;
  };

  if (!name || !email || !restaurant || !password) {
    return NextResponse.json({ error: "Nom, email, restaurant et mot de passe sont requis." }, { status: 400 });
  }

  const lowerEmail = email.toLowerCase();
  const existingUser = await prisma.user.findUnique({ where: { email: lowerEmail } });
  if (existingUser) {
    return NextResponse.json({ error: "Un compte avec cet email existe déjà." }, { status: 400 });
  }

  const hashedPassword = await hash(password, 12);

  // On crée uniquement le User. Le restaurant est créé ensuite à l'onboarding
  // (parcours identique aux connexions Google).
  const user = await prisma.user.create({
    data: {
      name,
      email: lowerEmail,
      hashedPassword,
    },
  });

  try {
    await sendWelcomeEmail({ to: lowerEmail, name });
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
