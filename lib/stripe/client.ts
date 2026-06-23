import { loadStripe, type Stripe } from "@stripe/stripe-js";

/** Stripe.js côté client (clé publique), chargé une seule fois. */
let _promise: Promise<Stripe | null> | null = null;

export function getStripeClient() {
  if (!_promise) {
    _promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");
  }
  return _promise;
}
