import { PrismaClient } from "@prisma/client";

/**
 * Construit l'URL de connexion en garantissant `pgbouncer=true` sur le pooler
 * transaction Supabase (port 6543). Sans ça, Prisma 5 réutilise des prepared
 * statements → erreur "prepared statement already exists" (500 en prod).
 * On l'ajoute ici pour que ça marche même si la variable Vercel ne l'a pas.
 */
function resolveDatabaseUrl(): string {
  let url = process.env.DATABASE_URL ?? "";
  if (url.includes(":6543") && !/pgbouncer=true/.test(url)) {
    url += (url.includes("?") ? "&" : "?") + "pgbouncer=true&connection_limit=1";
  }
  return url;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: resolveDatabaseUrl() } },
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
