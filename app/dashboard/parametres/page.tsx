"use client";

import { toast } from "sonner";
import { DEMO_RESTAURANT, OPENING_HOURS } from "@/lib/mock-data";
import { SettingCard, settingInputCls, settingLabelCls } from "@/components/dashboard/setting-card";
import { Button } from "@/components/ui/button";

export default function ParametresRestaurantPage() {
  return (
    <SettingCard title="Informations du restaurant">
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Informations enregistrées"); }} className="space-y-3">
        <div>
          <label className={settingLabelCls}>Nom</label>
          <input defaultValue={DEMO_RESTAURANT.name} className={settingInputCls} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div><label className={settingLabelCls}>Téléphone</label><input defaultValue={DEMO_RESTAURANT.phone} className={settingInputCls} /></div>
          <div><label className={settingLabelCls}>Email</label><input defaultValue={DEMO_RESTAURANT.email} className={settingInputCls} /></div>
        </div>
        <div><label className={settingLabelCls}>Adresse</label><input defaultValue={DEMO_RESTAURANT.address} className={settingInputCls} /></div>
        <div><label className={settingLabelCls}>Type de cuisine</label><input defaultValue="Cuisine de terroir" className={settingInputCls} /></div>

        <div>
          <p className={settingLabelCls}>Horaires</p>
          <div className="overflow-hidden rounded-xl border border-hair">
            {OPENING_HOURS.map((h, i) => (
              <div key={h.day} className={`grid grid-cols-[1fr_auto] gap-2 px-3 py-2 text-xs ${i % 2 === 0 ? "bg-creme/40" : "bg-blanc"}`}>
                <span className="text-noir">{h.day}</span>
                <span className="font-mono text-gris-fonce">{h.midi} · {h.soir}</span>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" size="sm" variant="primary">Enregistrer</Button>
      </form>
    </SettingCard>
  );
}
