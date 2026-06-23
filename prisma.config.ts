import { defineConfig } from "prisma/config";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Charge .env manuellement (Prisma 7 ne le fait plus quand un prisma.config.ts existe).
const __dirname = dirname(fileURLToPath(import.meta.url));
try {
  const envFile = readFileSync(join(__dirname, ".env"), "utf8");
  for (const line of envFile.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (!process.env[key]) {
      process.env[key] = rest.join("=").replace(/^"(.*)"$/, "$1");
    }
  }
} catch {
  // .env absent — on continue avec l'environnement courant.
}

// Le CLI (db push / migrate) lit la connexion ici. On privilégie la connexion
// directe (port 5432) car les migrations passent mal par le pooler transaction (6543).
// Le client runtime, lui, utilise le driver adapter défini dans lib/prisma.ts.
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  },
});
