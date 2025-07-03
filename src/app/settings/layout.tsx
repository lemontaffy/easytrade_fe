import { AuthLayout } from "@/components/layouts/AuthLayout";
import MainLayout from "@/components/layouts/MainLayout";
import { ReactNode } from "react";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <MainLayout>
        <AuthLayout>
      {children}
      </AuthLayout>
    </MainLayout>
  );
}
