// app/layout.tsx (Next.js)
import { AppProviders } from "@/components/layouts/AppProviders";
import MainLayout from "@/components/layouts/MainLayout";
import "./globals.css";
import "./utils/fontawesome";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <AppProviders>
            <MainLayout>
              {children}
            </MainLayout>
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
