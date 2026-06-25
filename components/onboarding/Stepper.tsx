"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  const last = steps.length - 1;

  return (
    <div className="flex items-start pb-7">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <Fragment key={label}>
            <div className="relative flex flex-col items-center">
              <motion.span
                initial={false}
                animate={{ scale: active ? 1.08 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-full border-[1.5px] text-sm font-bold transition-colors",
                  done && "border-[#27ae60] bg-[#27ae60] text-white",
                  active && "border-noir bg-jaune-vif text-noir",
                  !done && !active && "border-hair bg-transparent text-gris-fonce",
                )}
              >
                {done ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
              </motion.span>
              <span
                className={cn(
                  "absolute top-10 whitespace-nowrap text-xs",
                  active ? "font-bold text-noir" : "text-gris-fonce",
                )}
              >
                <span className="mr-1 text-gris-clair">{i + 1}.</span>
                {label}
              </span>
            </div>

            {i < last && (
              <div className="mt-4 h-0.5 flex-1 overflow-hidden rounded-full bg-hair">
                <motion.div
                  initial={false}
                  animate={{ scaleX: done ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 0 }}
                  className="h-full w-full bg-jaune-vif"
                />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
