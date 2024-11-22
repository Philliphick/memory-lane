// layout.tsx
"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import "./globals.css";

// Define the expected props for the layout
interface LayoutProps {
  children: React.ReactNode;
  session: any; // You can type this based on your session shape, or use `any` for simplicity
}

const Layout: React.FC<LayoutProps> = ({
  children,
  session
}: LayoutProps) => {
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className="sm:min-w-md md:min-w-xl">
          <main className="flex flex-col min-h-screen max-w-full">
            <Navbar />
            <main className="flex-grow place-content-center">{children}</main>
            <Footer />
          </main>
        </body>
      </html>
    </SessionProvider>
  );
};

export default Layout;
