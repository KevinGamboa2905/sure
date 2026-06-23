import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripeServer(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY manquante — ajoutez la clé dans votre environnement.");
  }
  if (!_stripe) {
    // Pas d'apiVersion figée : on laisse le SDK utiliser sa version par défaut
    // (évite les conflits de type entre versions du package `stripe`).
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return _stripe;
}
