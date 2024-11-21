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
  session: Object; // You can type this based on your session shape, or use `any` for simplicity
}


const Layout: React.FC = ({ children, session }) => {

  let theme = '-a'


  return (
    // <SessionProvider session={session}>
      <html lang="en">
        {/* <body className=" bg-gray-100 text-gray-900 "> */}
        <body className={`sm:min-w-md md:min-w-xl${theme}`}>

          <main className="flex flex-col min-h-screen max-w-full">
            <Navbar />

            <main className="flex-grow">{children}</main>

            <Footer />
          </main>
        </body>
      </html>
  
  );
};

export default Layout;
