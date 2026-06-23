import { getStripeServer } from "./server";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const RETURN = "/dashboard/parametres/integrations";

/** Crée un compte Connect Standard + lien d'onboarding. */
export async function createConnectAccountLink(restaurantId: string) {
  const stripe = getStripeServer();
  const account = await stripe.accounts.create({
    type: "standard",
    country: "CH",
  });
  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${APP_URL}${RETURN}?refresh=true&restaurantId=${encodeURIComponent(restaurantId)}`,
    return_url: `${APP_URL}${RETURN}?success=true&restaurantId=${encodeURIComponent(restaurantId)}`,
    type: "account_onboarding",
  });
  return { url: accountLink.url ?? "", accountId: account.id };
}

/** Statut d'un compte connecté (charges/payouts activés ?). */
export async function getConnectStatus(accountId: string) {
  const stripe = getStripeServer();
  const acct = await stripe.accounts.retrieve(accountId);
  return {
    id: acct.id,
    chargesEnabled: acct.charges_enabled,
    payoutsEnabled: acct.payouts_enabled,
    email: acct.email ?? undefined,
  };
}

/** Déconnecte (supprime) un compte connecté. */
export async function disconnectAccount(accountId: string) {
  const stripe = getStripeServer();
  await stripe.accounts.del(accountId);
  return { disconnected: true };
}
