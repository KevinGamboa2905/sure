import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { OnboardingClient } from "@/components/onboarding/OnboardingClient";

export default async function OnboardingPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { restaurant: true },
  });

  // Déjà un restaurant → directement au dashboard.
  if (user?.restaurant) redirect("/dashboard");

  return <OnboardingClient />;
}
