import React from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import "./globals.css";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      {/* Ensure the <html> and <body> tags are included in your layout */}
      <html lang="en">
        <body className=" bg-gray-100 text-gray-900">
          <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Main content */}
            <main className="flex-grow">{children}</main>

            {/* Footer */}
            <Footer />
          </div>
        </body>
      </html>
    </>
  );
};

export default Layout;
