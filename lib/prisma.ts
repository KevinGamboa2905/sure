import { PrismaClient } from "@prisma/client";

// Prisma 5 : client standard. La connexion est lue depuis le schéma
// (datasource url = env("DATABASE_URL")), pas besoin de driver adapter.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
