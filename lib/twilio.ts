import Twilio from "twilio";

export type SendSmsResult = {
  sid: string;
  status: string;
};

/**
 * Init paresseuse : pas de throw au niveau module. En l'absence de config,
 * les SMS sont ignorés (mode démo) au lieu de faire planter le serveur.
 */
function getTwilio(): { client: ReturnType<typeof Twilio>; from: string } | null {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_PHONE_NUMBER;
  if (!accountSid || !authToken || !fromNumber) return null;
  return { client: Twilio(accountSid, authToken), from: fromNumber };
}

export async function sendSms(to: string, body: string): Promise<SendSmsResult | null> {
  const t = getTwilio();
  if (!t) {
    console.warn("Twilio non configuré — SMS ignoré (mode démo).");
    return null;
  }
  const message = await t.client.messages.create({ to, from: t.from, body });
  return { sid: message.sid, status: message.status ?? "unknown" };
}
