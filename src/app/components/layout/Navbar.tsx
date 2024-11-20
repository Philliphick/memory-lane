import React from "react";
import Link from "next/link"; // If you're using Next.js for routing

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Memory Lane
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-400">
            Learn more
          </Link>
          <Link href="/auth/register" className="hover:text-gray-400">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
