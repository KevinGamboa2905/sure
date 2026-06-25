import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/** Récupère le restaurant de l'utilisateur connecté (redirige sinon). */
export async function requireRestaurant() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { restaurant: true },
  });
  if (!user?.restaurant) redirect("/onboarding");
  return { user, restaurant: user.restaurant };
}
