"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

type QA = { q: string; a: string };

function Item({ q, a }: QA) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-hair">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-base font-bold tracking-tight text-noir md:text-lg">{q}</span>
        <motion.span
          animate={{ rotate: open ? 135 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hair text-noir"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-5 text-sm text-gris-fonce">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MiniAccordion({ items }: { items: QA[] }) {
  return (
    <div>
      {items.map((it) => (
        <Item key={it.q} {...it} />
      ))}
    </div>
  );
}
