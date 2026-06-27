import { Resend } from "resend";

/** Adresses d'expédition (le domaine gettably.io doit être vérifié dans Resend). */
export const FROM = {
  hello: "Tably <hello@gettably.io>",
  noreply: "Tably <noreply@gettably.io>",
} as const;

export const REPLY_TO = "hello@gettably.io";

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://gettably.io";

/**
 * Client Resend en init paresseuse : sans clé, on renvoie null et les envois
 * sont ignorés (pas de crash). Permet de tourner en local/démo sans Resend.
 */
export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}
