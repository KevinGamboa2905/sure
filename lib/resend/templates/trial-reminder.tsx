import { Text } from "@react-email/components";
import { getResend, FROM, REPLY_TO, APP_URL } from "../client";
import { EmailLayout, styles } from "./_layout";

export function TrialReminderEmail({ daysLeft, restaurantName }: { daysLeft: number; restaurantName: string }) {
  const last = daysLeft <= 1;
  return (
    <EmailLayout preview={last ? "Dernier jour d'essai Pro" : `Plus que ${daysLeft} jours d'essai Pro`}>
      <Text style={styles.heading}>
        {last ? "Dernier jour de votre essai Pro" : `Plus que ${daysLeft} jours d'essai Pro`}
      </Text>
      <Text style={styles.text}>
        Bonjour, l&apos;essai Pro de <strong>{restaurantName}</strong> se termine{last ? " aujourd'hui" : ` dans ${daysLeft} jours`}.
        Pour garder vos rappels SMS, vos acomptes et votre page personnalisée, choisissez votre plan dès maintenant.
      </Text>
      <a href={`${APP_URL}/dashboard/parametres/abonnement`} style={styles.button}>Choisir mon plan</a>
      <Text style={{ ...styles.text, marginTop: "20px" }}>
        Sans action de votre part, votre compte passera automatiquement au plan Essentiel à la fin de l&apos;essai.
      </Text>
    </EmailLayout>
  );
}

export async function sendTrialReminder({
  to,
  daysLeft,
  restaurantName,
}: {
  to: string;
  daysLeft: number;
  restaurantName: string;
}) {
  const resend = getResend();
  if (!resend) {
    console.warn("Resend non configuré — rappel d'essai ignoré.");
    return;
  }
  await resend.emails.send({
    from: FROM.hello,
    to,
    replyTo: REPLY_TO,
    subject: daysLeft === 1
      ? "Dernier jour d'essai Pro chez Tably ⏰"
      : `Plus que ${daysLeft} jours d'essai Pro — choisissez votre plan`,
    react: TrialReminderEmail({ daysLeft, restaurantName }),
  });
}
