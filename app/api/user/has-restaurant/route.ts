import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ exists: false });
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { restaurant: true },
  });
  return NextResponse.json({
    exists: !!user?.restaurant,
    restaurantId: user?.restaurant?.id ?? null,
    slug: user?.restaurant?.slug ?? null,
  });
}
