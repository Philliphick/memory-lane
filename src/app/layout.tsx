import React from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import "./globals.css";
import {  SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
// Define the expected props for the layout
interface LayoutProps {
  children: React.ReactNode;
  session: any; // You can type this based on your session shape, or use `any` for simplicity
}

// Fetch session on the server side using `getServerSession`
export async function generateMetadata() {
  const session = await getServerSession(authOptions);
  return {
    props: {
      session,
    },
  };
}

const Layout: React.FC = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className=" bg-gray-100 text-gray-900">
          <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow">{children}</main>

            <Footer />
          </div>
        </body>
      </html>
    </SessionProvider>
  );
};

export default Layout;
