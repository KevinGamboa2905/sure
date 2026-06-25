import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { daysLeftInTrial } from "@/lib/subscription";
import { DashboardChrome } from "@/components/dashboard/dashboard-chrome";

export const metadata: Metadata = {
  title: "Espace restaurateur",
  robots: { index: false },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { restaurant: true },
  });
  if (!user?.restaurant) redirect("/onboarding");

  const r = user.restaurant;
  const daysLeft = r.hasPaid ? 0 : daysLeftInTrial(r.trialEndsAt);

  return (
    <DashboardChrome
      restaurant={{ name: r.name, address: r.address, plan: r.plan, slug: r.slug, logoUrl: r.logoUrl }}
      daysLeft={daysLeft}
    >
      {children}
    </DashboardChrome>
  );
}
