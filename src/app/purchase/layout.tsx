// app/purchase/layout.tsx
'use client';

import { AuthLayout } from "@/components/layouts/AuthLayout";
import { ReactNode } from "react";

export default function PurchaseLayout({ children }: { children: ReactNode }) {
  return (
    <AuthLayout>
      {children}
    </AuthLayout>
  );
}
