import { Text } from "@react-email/components";
import { getResend, FROM, REPLY_TO } from "../client";
import { EmailLayout, styles } from "./_layout";

export type ReservationInfo = {
  clientName?: string;
  date: string;
  time: string;
  covers: number;
  depositAmount?: number | null;
};
export type RestaurantInfo = { name: string; address?: string; phone?: string };

export function ReservationConfirmationEmail({
  reservation,
  restaurant,
}: {
  reservation: ReservationInfo;
  restaurant: RestaurantInfo;
}) {
  return (
    <EmailLayout preview={`Réservation confirmée chez ${restaurant.name}`}>
      <Text style={styles.heading}>Réservation confirmée</Text>
      <Text style={styles.text}>
        Bonjour{reservation.clientName ? ` ${reservation.clientName.split(" ")[0]}` : ""}, votre table chez{" "}
        <strong>{restaurant.name}</strong> est confirmée. On a hâte de vous accueillir !
      </Text>

      <div style={styles.card}>
        <Text style={styles.row}>📅 Date · <strong>{reservation.date}</strong></Text>
        <Text style={styles.row}>🕘 Heure · <strong>{reservation.time}</strong></Text>
        <Text style={styles.row}>👥 Couverts · <strong>{reservation.covers}</strong></Text>
        {reservation.depositAmount ? (
          <Text style={styles.row}>💳 Acompte · <strong>{reservation.depositAmount} CHF</strong></Text>
        ) : null}
      </div>

      {restaurant.address && <Text style={styles.text}>📍 {restaurant.address}</Text>}
      {restaurant.phone && <Text style={styles.text}>Un imprévu ? Prévenez le restaurant au {restaurant.phone}.</Text>}
    </EmailLayout>
  );
}

export async function sendReservationConfirmation({
  to,
  reservation,
  restaurant,
}: {
  to: string;
  reservation: ReservationInfo;
  restaurant: RestaurantInfo;
}) {
  const resend = getResend();
  if (!resend) {
    console.warn("Resend non configuré — email de confirmation ignoré.");
    return;
  }
  await resend.emails.send({
    from: FROM.noreply,
    to,
    replyTo: REPLY_TO,
    subject: `Votre réservation chez ${restaurant.name} est confirmée`,
    react: ReservationConfirmationEmail({ reservation, restaurant }),
  });
}
