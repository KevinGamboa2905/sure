import { Text } from "@react-email/components";
import { getResend, FROM, REPLY_TO, APP_URL } from "../client";
import { EmailLayout, styles } from "./_layout";

export function WelcomeEmail({ name }: { name: string }) {
  return (
    <EmailLayout preview={`Bienvenue sur Tably, ${name}`}>
      <Text style={styles.heading}>Bienvenue, {name} !</Text>
      <Text style={styles.text}>
        Votre compte Tably est prêt. Vous avez <strong>30 jours d&apos;essai du plan Pro</strong>,
        sans carte bancaire. Configurez votre restaurant et votre page de réservation en quelques minutes.
      </Text>
      <Text style={styles.text}>Pour commencer, accédez à votre espace :</Text>
      <a href={`${APP_URL}/dashboard`} style={styles.button}>Accéder à mon dashboard</a>
      <Text style={{ ...styles.text, marginTop: "20px" }}>
        Une question ? Répondez simplement à cet e-mail, on vous lit.
      </Text>
    </EmailLayout>
  );
}

export async function sendWelcomeEmail({ to, name }: { to: string; name: string }) {
  const resend = getResend();
  if (!resend) {
    console.warn("Resend non configuré — email de bienvenue ignoré.");
    return;
  }
  await resend.emails.send({
    from: FROM.hello,
    to,
    replyTo: REPLY_TO,
    subject: `Bienvenue sur Tably, ${name} 🎉`,
    react: WelcomeEmail({ name }),
  });
}
