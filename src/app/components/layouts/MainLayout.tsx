// components/layouts/MainLayout.tsx
import { ReactNode } from "react";

import Navbar from "@/components/layouts/navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;