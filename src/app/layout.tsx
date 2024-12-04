'use client'

/******************************************************************
 * Component
 ******************************************************************/

import "./globals.css";
import "./utils/fontawesome";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import { CustomContextProvider } from "./context/CustomContext";
import Navbar from "./components/layouts/navbar";
import { Provider } from "react-redux";
import store from "./store/store";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Provider store={store}>
          <CustomContextProvider>
            <QueryClientProvider client={queryClient}>
              {/* Navbar */}
              <Navbar />

              {/* Main Content */}
              <main className="flex-1">{children}</main>

              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </CustomContextProvider>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;