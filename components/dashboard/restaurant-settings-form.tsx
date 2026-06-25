"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SettingCard, settingInputCls, settingLabelCls } from "./setting-card";
import { Button } from "@/components/ui/button";

type Values = { name: string; tagline: string; phone: string; email: string; address: string; city: string };

export function RestaurantSettingsForm({ restaurant }: { restaurant: Values }) {
  const router = useRouter();
  const [v, setV] = useState<Values>(restaurant);
  const [saving, setSaving] = useState(false);
  const set = (patch: Partial<Values>) => setV((p) => ({ ...p, ...patch }));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/restaurant/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      });
      if (!res.ok) {
        toast.error("Échec de l'enregistrement.");
      } else {
        toast.success("Informations enregistrées");
        router.refresh();
      }
    } catch {
      toast.error("Erreur réseau.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <SettingCard title="Informations du restaurant">
      <form onSubmit={save} className="space-y-3">
        <div>
          <label className={settingLabelCls}>Nom</label>
          <input value={v.name} onChange={(e) => set({ name: e.target.value })} className={settingInputCls} />
        </div>
        <div>
          <label className={settingLabelCls}>Tagline</label>
          <input value={v.tagline} onChange={(e) => set({ tagline: e.target.value })} placeholder="Cuisine de terroir" className={settingInputCls} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className={settingLabelCls}>Téléphone</label>
            <input value={v.phone} onChange={(e) => set({ phone: e.target.value })} className={settingInputCls} />
          </div>
          <div>
            <label className={settingLabelCls}>Email</label>
            <input value={v.email} onChange={(e) => set({ email: e.target.value })} className={settingInputCls} />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
          <div>
            <label className={settingLabelCls}>Adresse</label>
            <input value={v.address} onChange={(e) => set({ address: e.target.value })} className={settingInputCls} />
          </div>
          <div>
            <label className={settingLabelCls}>Ville</label>
            <input value={v.city} onChange={(e) => set({ city: e.target.value })} className={settingInputCls} />
          </div>
        </div>
        <Button type="submit" size="sm" variant="primary" disabled={saving}>
          {saving ? "Enregistrement…" : "Enregistrer"}
        </Button>
      </form>
    </SettingCard>
  );
}
