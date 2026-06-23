import type { Metadata } from "next";
import { DashboardChrome } from "@/components/dashboard/dashboard-chrome";
import { ProtectedRoute } from "@/components/auth/protected-route";

export const metadata: Metadata = {
  title: "Espace restaurateur",
  robots: { index: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <DashboardChrome>{children}</DashboardChrome>
    </ProtectedRoute>
  );
}
