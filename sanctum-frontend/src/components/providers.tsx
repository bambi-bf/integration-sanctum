"use client";
import React, { ReactNode } from "react";
import { SolanaWalletProvider } from "@/contexts/SolanaWalletProvider";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";
import Header from "./pageLayout/Header";
import { ModalProvider } from "@/contexts/ModalContext";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SolanaWalletProvider>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <main className={`lg:min-h-screen backdrop-blur-lg`}>
            <div className="flex">
              <div className="w-full lg:w-[calc(100%-80px)]">
                <Header />
                {children}
              </div>
            </div>
          </main>
        </ModalProvider>
        <ToastContainer pauseOnFocusLoss={false} theme="colored" />
      </QueryClientProvider>
    </SolanaWalletProvider>
  );
}
