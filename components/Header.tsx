import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "@/assistes/Icon/tide.png";

export default function Header({
  title = "Tidee Services",
}: {
  title?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Tidee Services Logo"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-lg font-semibold text-indigo-700 tracking-wide">
              Tidee Services Noida
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          <Link
            href="/services"
            className="text-gray-700 hover:text-indigo-600"
          >
            Services
          </Link>

          <Link href="/about" className="text-gray-700 hover:text-indigo-600">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-indigo-600">
            Contact
          </Link>
          <Link
            href="/delivery"
            className="text-indigo-600 border border-indigo-600 px-3 py-1.5 rounded-md hover:bg-indigo-600 hover:text-white transition"
          >
            Delevery
          </Link>
          <Link
            href="/admin"
            className="text-indigo-600 border border-indigo-600 px-3 py-1.5 rounded-md hover:bg-indigo-600 hover:text-white transition"
          >
            Admin
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="flex flex-col space-y-2 p-4 text-sm">
            <Link
              href="/"
              className="block py-2 text-gray-700 hover:text-indigo-600"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/services"
              className="block py-2 text-gray-700 hover:text-indigo-600"
              onClick={() => setMobileOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/pricing"
              className="block py-2 text-gray-700 hover:text-indigo-600"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="block py-2 text-gray-700 hover:text-indigo-600"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-gray-700 hover:text-indigo-600"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/admin"
              className="block py-2 text-indigo-600 border-t pt-3 mt-3 font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Admin Panel
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
