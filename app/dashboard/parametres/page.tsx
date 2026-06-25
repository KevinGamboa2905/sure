import { requireRestaurant } from "@/lib/session-restaurant";
import { RestaurantSettingsForm } from "@/components/dashboard/restaurant-settings-form";

export default async function ParametresRestaurantPage() {
  const { restaurant } = await requireRestaurant();
  return (
    <RestaurantSettingsForm
      restaurant={{
        name: restaurant.name,
        tagline: restaurant.tagline ?? "",
        phone: restaurant.phone,
        email: restaurant.email,
        address: restaurant.address,
        city: restaurant.city,
      }}
    />
  );
}
