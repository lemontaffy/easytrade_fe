// components/layouts/AuthLayout.tsx
'use client';

import { ReactNode } from "react";

import GlobalLoader from "@/components/modals/globalLoader";
import AuthInitializer from "@/context/AuthInitializer";

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthInitializer>
      <GlobalLoader />
      {children}
    </AuthInitializer>
  );
};
