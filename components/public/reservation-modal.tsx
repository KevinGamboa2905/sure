"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check, Users, CalendarDays, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const inputCls =
  "h-11 w-full rounded-xl border border-hair bg-creme/40 px-3.5 text-sm text-noir outline-none transition-colors placeholder:text-gris-clair focus:border-noir";
const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-gris-fonce";

const STEPS = ["Date", "Coordonnées", "Acompte"];

export function ReservationModal({
  open,
  onClose,
  slug,
}: {
  open: boolean;
  onClose: () => void;
  slug: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ date: "", time: "19:30", party: 2, name: "", phone: "", email: "" });

  const deposit = form.party * 10;

  function confirm() {
    toast.success("Réservation confirmée · SMS envoyé");
    const q = new URLSearchParams({
      name: form.name || "Client",
      date: form.date || "à venir",
      time: form.time,
      party: String(form.party),
      phone: form.phone || "+41 79 000 00 00",
      deposit: String(deposit),
    });
    onClose();
    setStep(0);
    router.push(`/r/${slug}/confirmation?${q.toString()}`);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-noir/50" onClick={onClose} />
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            className="relative w-full max-w-md rounded-t-3xl border border-hair bg-blanc p-6 shadow-lift sm:rounded-3xl"
            role="dialog"
            aria-modal="true"
          >
            <button onClick={onClose} aria-label="Fermer" className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-gris-fonce hover:bg-noir/[0.05]">
              <X className="h-5 w-5" />
            </button>

            {/* Stepper */}
            <div className="mb-6 flex items-center gap-2">
              {STEPS.map((s, i) => (
                <div key={s} className="flex flex-1 items-center gap-2">
                  <span className={cn("inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold", i <= step ? "bg-jaune-vif text-noir" : "bg-noir/[0.06] text-gris-fonce")}>
                    {i < step ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                  </span>
                  {i < STEPS.length - 1 && <span className={cn("h-0.5 flex-1 rounded", i < step ? "bg-jaune-vif" : "bg-hair")} />}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
              >
                {step === 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-bold tracking-tight text-noir">
                      <CalendarDays className="h-5 w-5" /> Quand venez-vous ?
                    </h3>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>Date</label>
                        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Heure</label>
                        <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={inputCls} />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className={labelCls}><Users className="mr-1 inline h-3.5 w-3.5" />Couverts</label>
                      <div className="flex flex-wrap gap-1.5">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <button key={n} onClick={() => setForm({ ...form, party: n })} className={cn("h-9 min-w-9 rounded-full border px-3 text-sm transition-colors", form.party === n ? "border-jaune-vif bg-jaune-vif font-bold text-noir" : "border-hair text-noir hover:border-noir")}>{n}{n === 8 ? "+" : ""}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-noir">Vos coordonnées</h3>
                    <div className="mt-4 space-y-3">
                      <div><label className={labelCls}>Nom</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Votre nom" className={inputCls} /></div>
                      <div><label className={labelCls}>Téléphone</label><input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+41 79 ..." className={inputCls} /></div>
                      <div><label className={labelCls}>Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="vous@email.ch" className={inputCls} /></div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-bold tracking-tight text-noir">
                      <ShieldCheck className="h-5 w-5" /> Acompte
                    </h3>
                    <div className="mt-4 space-y-2 rounded-2xl border border-hair bg-creme/50 p-4 text-sm">
                      <div className="flex justify-between"><span className="text-gris-fonce">Table</span><span className="font-medium text-noir">{form.party} couv. · {form.time}</span></div>
                      <div className="flex justify-between"><span className="text-gris-fonce">Acompte (10 CHF / couvert)</span><span className="font-medium text-noir">{deposit} CHF</span></div>
                      <div className="flex justify-between border-t border-hair pt-2"><span className="font-bold text-noir">À régler maintenant</span><span className="font-bold text-noir">{deposit} CHF</span></div>
                    </div>
                    <p className="mt-2 text-xs text-gris-fonce">Déduit de votre addition. Démo : aucun paiement réel.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Actions */}
            <div className="mt-6 flex gap-2">
              {step > 0 && (
                <button onClick={() => setStep((s) => s - 1)} className="rounded-full border border-hair px-5 py-3 text-sm font-medium text-noir transition-colors hover:border-noir">Retour</button>
              )}
              {step < 2 ? (
                <button onClick={() => setStep((s) => s + 1)} className="flex-1 rounded-full bg-jaune-vif py-3 text-sm font-bold text-noir transition-transform hover:-translate-y-0.5">Continuer</button>
              ) : (
                <button onClick={confirm} className="flex-1 rounded-full bg-noir py-3 text-sm font-bold text-jaune-vif transition-transform hover:-translate-y-0.5">Confirmer le paiement</button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
