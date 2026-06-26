"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const inputCls =
  "h-11 w-full rounded-xl border border-hair bg-creme/40 px-3.5 text-sm text-noir outline-none transition-colors placeholder:text-gris-clair focus:border-noir";
const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-gris-fonce";

export function NewReservationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [deposit, setDeposit] = useState(true);
  const [busy, setBusy] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const el = e.currentTarget.elements;
    const get = (id: string) => (el.namedItem(id) as HTMLInputElement | HTMLTextAreaElement | null)?.value ?? "";
    setBusy(true);
    try {
      const res = await fetch("/api/reservation/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: get("nr-name"),
          clientPhone: get("nr-tel"),
          party: Number(get("nr-cov")) || 2,
          date: get("nr-date"),
          time: get("nr-time"),
          note: get("nr-note"),
          deposit,
        }),
      });
      if (!res.ok) {
        const p = await res.json().catch(() => null);
        toast.error(p?.error ?? "La création a échoué.");
        setBusy(false);
        return;
      }
      toast.success("Réservation créée · SMS envoyé");
      onClose();
      router.refresh();
    } catch {
      toast.error("Erreur réseau. Réessayez.");
    } finally {
      setBusy(false);
    }
  }

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-noir/40" onClick={onClose} />
          <motion.form
            onSubmit={submit}
            initial={{ y: 30, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            className="relative my-auto max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-hair bg-blanc p-6 shadow-lift sm:rounded-3xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-gris-fonce hover:bg-noir/[0.05]"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-bold tracking-tight text-noir">Nouvelle réservation</h3>
            <p className="mt-1 text-sm text-gris-fonce">Le client recevra un SMS de confirmation.</p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="nr-name" className={labelCls}>Nom du client</label>
                <input id="nr-name" required placeholder="Nom" className={inputCls} />
              </div>
              <div>
                <label htmlFor="nr-tel" className={labelCls}>Téléphone</label>
                <input id="nr-tel" type="tel" required placeholder="+41 79 ..." className={inputCls} />
              </div>
              <div>
                <label htmlFor="nr-cov" className={labelCls}>Couverts</label>
                <input id="nr-cov" type="number" min={1} defaultValue={2} className={inputCls} />
              </div>
              <div>
                <label htmlFor="nr-date" className={labelCls}>Date</label>
                <input id="nr-date" type="date" required className={inputCls} />
              </div>
              <div>
                <label htmlFor="nr-time" className={labelCls}>Heure</label>
                <input id="nr-time" type="time" required defaultValue="19:30" className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="nr-note" className={labelCls}>Note (optionnel)</label>
                <textarea id="nr-note" rows={2} placeholder="Allergies, occasion…" className={cn(inputCls, "h-auto resize-none py-2.5")} />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setDeposit((v) => !v)}
              role="switch"
              aria-checked={deposit}
              className="mt-4 flex w-full items-center justify-between gap-3 text-sm text-noir"
            >
              <span>Demander un acompte (10 CHF / couvert)</span>
              <span className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", deposit ? "bg-jaune-vif" : "bg-gris-clair/50")}>
                <span
                  className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-blanc shadow-sm transition-transform", deposit ? "translate-x-[22px]" : "translate-x-0.5")}
                  style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                />
              </span>
            </button>

            <div className="mt-6 flex gap-2">
              <button type="submit" disabled={busy} className="flex-1 rounded-full bg-jaune-vif py-3 text-sm font-bold text-noir transition-transform hover:-translate-y-0.5 disabled:opacity-60">
                {busy ? "Création…" : "Créer la réservation"}
              </button>
              <button type="button" onClick={onClose} className="rounded-full border border-hair px-5 py-3 text-sm font-medium text-noir transition-colors hover:border-noir">
                Annuler
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
