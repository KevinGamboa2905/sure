"use client";

import { motion } from "framer-motion";
import { Check, CalendarDays, Clock, Users, ShieldCheck, MessageSquareText, CalendarPlus, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export function ConfirmationView({
  slug,
  restaurantName,
  name,
  date,
  time,
  party,
  phone,
  deposit,
}: {
  slug: string;
  restaurantName: string;
  name: string;
  date: string;
  time: string;
  party: string;
  phone: string;
  deposit: string;
}) {
  const rows = [
    { icon: CalendarDays, label: "Date", value: date },
    { icon: Clock, label: "Heure", value: time },
    { icon: Users, label: "Couverts", value: party },
    { icon: ShieldCheck, label: "Acompte réglé", value: `${deposit} CHF` },
  ];

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-creme px-6 py-12 text-center">
      {/* Checkmark animé */}
      <motion.span
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-jaune-vif text-noir shadow-lift-sm"
      >
        <motion.span
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-jaune-vif"
        />
        <Check className="relative h-10 w-10" strokeWidth={2.5} />
      </motion.span>

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-noir sm:text-4xl">Réservation confirmée</h1>
      <p className="mt-2 max-w-sm text-gris-fonce">
        Merci {name.split(" ")[0]} ! On a hâte de vous accueillir au {restaurantName}.
      </p>

      {/* Mention SMS */}
      <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-hair bg-blanc px-4 py-2 text-sm text-noir">
        <MessageSquareText className="h-4 w-4 text-[#1e7e43]" />
        SMS envoyé au {phone} <Check className="h-3.5 w-3.5 text-[#1e7e43]" strokeWidth={3} />
      </p>

      {/* Récap */}
      <div className="mt-8 w-full max-w-sm space-y-3 rounded-3xl border border-hair bg-blanc p-6 text-left text-sm">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-3">
            <r.icon className="h-4 w-4 text-gris-fonce" />
            <span className="text-gris-fonce">{r.label}</span>
            <span className="ml-auto font-medium text-noir">{r.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <button
          onClick={() => toast.success("Ajouté à votre calendrier")}
          className="inline-flex items-center gap-2 rounded-full bg-jaune-vif px-6 py-3 text-sm font-bold text-noir transition-transform hover:-translate-y-0.5"
        >
          <CalendarPlus className="h-4 w-4" /> Ajouter à mon calendrier
        </button>
        <a href={`/r/${slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-gris-fonce hover:text-noir">
          <ArrowLeft className="h-4 w-4" /> Retour à la page
        </a>
      </div>
    </div>
  );
}
