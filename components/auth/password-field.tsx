"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-gris-fonce";

function score(pw: string): number {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s; // 0..4
}

const LEVELS = [
  { label: "Trop court", color: "#c0392b" },
  { label: "Faible", color: "#c0392b" },
  { label: "Moyen", color: "#e0a020" },
  { label: "Bon", color: "#2f8f4e" },
  { label: "Excellent", color: "#27ae60" },
];

export function PasswordField({
  id,
  label = "Mot de passe",
  placeholder = "••••••••",
  autoComplete = "new-password",
  showStrength = false,
}: {
  id: string;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
  showStrength?: boolean;
}) {
  const [show, setShow] = useState(false);
  const [val, setVal] = useState("");
  const s = score(val);

  return (
    <div>
      <label htmlFor={id} className={labelCls}>{label}</label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={show ? "text" : "password"}
          required
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="h-11 w-full rounded-xl border border-hair bg-blanc px-3.5 pr-11 text-sm text-noir outline-none transition-colors placeholder:text-gris-clair focus:border-noir"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          className="absolute right-1.5 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-gris-fonce hover:text-noir"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      {showStrength && val.length > 0 && (
        <div className="mt-2">
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={cn("h-1 flex-1 rounded-full transition-colors")}
                style={{ backgroundColor: i < s ? LEVELS[s].color : "rgba(188,188,188,0.4)" }}
              />
            ))}
          </div>
          <p className="mt-1 text-xs" style={{ color: LEVELS[s].color }}>{LEVELS[s].label}</p>
        </div>
      )}
    </div>
  );
}
