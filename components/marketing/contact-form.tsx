"use client";

import { toast } from "sonner";

const inputCls =
  "h-11 w-full rounded-xl border border-hair bg-blanc px-3.5 text-sm text-noir outline-none transition-colors placeholder:text-gris-clair focus:border-noir";
const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-gris-fonce";

export function ContactForm({ defaultSubject = "" }: { defaultSubject?: string }) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); toast.success("Message envoyé · nous revenons vers vous"); (e.target as HTMLFormElement).reset(); }}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ct-name" className={labelCls}>Nom</label>
          <input id="ct-name" required placeholder="Votre nom" className={inputCls} />
        </div>
        <div>
          <label htmlFor="ct-email" className={labelCls}>Email</label>
          <input id="ct-email" type="email" required placeholder="vous@restaurant.ch" className={inputCls} />
        </div>
      </div>
      <div>
        <label htmlFor="ct-subject" className={labelCls}>Sujet</label>
        <input id="ct-subject" required defaultValue={defaultSubject} placeholder="Démo, tarifs, support…" className={inputCls} />
      </div>
      <div>
        <label htmlFor="ct-msg" className={labelCls}>Message</label>
        <textarea id="ct-msg" required rows={4} placeholder="Comment pouvons-nous aider ?" className="w-full resize-none rounded-xl border border-hair bg-blanc px-3.5 py-2.5 text-sm text-noir outline-none transition-colors placeholder:text-gris-clair focus:border-noir" />
      </div>
      <button type="submit" className="rounded-full bg-jaune-vif px-6 py-3 text-sm font-bold text-noir transition-transform hover:-translate-y-0.5 hover:bg-noir hover:text-jaune-vif">
        Envoyer le message
      </button>
    </form>
  );
}
