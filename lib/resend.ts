import { Resend } from "resend";

/**
 * Init paresseuse : pas de throw au niveau module (sinon toute route qui
 * importe ce fichier crashe). En l'absence de clé, les envois sont ignorés
 * (mode démo) au lieu de faire planter le serveur.
 */
function getResend(): { client: Resend; from: string } | null {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) return null;
  return { client: new Resend(apiKey), from };
}

export async function sendWelcomeEmail(to: string, name: string, restaurantName: string) {
  const r = getResend();
  if (!r) {
    console.warn("Resend non configuré — email de bienvenue ignoré (mode démo).");
    return null;
  }
  return r.client.emails.send({
    from: r.from,
    to,
    subject: `Bienvenue sur Tably, ${name}`,
    html: `<p>Bonjour ${name},</p><p>Votre restaurant <strong>${restaurantName}</strong> est désormais configuré dans Tably.</p><p>Vous pouvez maintenant gérer vos réservations, encaisser des acomptes via Stripe et envoyer des rappels SMS à vos clients.</p><p>À bientôt,</p><p>L'équipe Tably</p>`,
  });
}

export async function sendReservationEmail(to: string, customerName: string, restaurantName: string, date: string, time: string, party: number) {
  const r = getResend();
  if (!r) {
    console.warn("Resend non configuré — email de réservation ignoré (mode démo).");
    return null;
  }
  return r.client.emails.send({
    from: r.from,
    to,
    subject: `Votre réservation chez ${restaurantName} est confirmée`,
    html: `<p>Bonjour ${customerName},</p><p>Votre table pour <strong>${party} personne(s)</strong> chez <strong>${restaurantName}</strong> est confirmée le <strong>${date}</strong> à <strong>${time}</strong>.</p><p>Merci de votre confiance,</p><p>L'équipe ${restaurantName}</p>`,
  });
}
