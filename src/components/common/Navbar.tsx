"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const NavLinks = [
  { name: "Menu", href: "/menu" },
  { name: "Our Story", href: "/story" },
  { name: "Gallery", href: "/gallery" },
  { name: "Locations", href: "/locations" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      suppressHydrationWarning
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        isScrolled ? "py-4 glass border-b border-brand-gold/10" : "py-8"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center space-x-2">
          <div className="relative w-32 h-12 md:w-40 md:h-16">
            <Image 
              src="/assets/images/logo.png"
              alt="KAISEKI Logo"
              fill
              unoptimized
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-12">
          {NavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium tracking-widest uppercase text-brand-cream/80 hover:text-brand-gold transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-6">
          <Link 
            href="/order"
            className="hidden md:flex items-center space-x-2 text-brand-cream/80 hover:text-brand-gold transition-colors relative"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-gold text-brand-black text-[10px] flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
            <span className="text-xs font-bold tracking-widest uppercase ml-1">Order</span>
          </Link>
          
          <Link
            href="/reservations"
            className="px-6 py-2 border border-brand-gold/30 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-brand-gold hover:text-brand-black transition-all duration-300"
          >
            Reservations
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-brand-cream"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass border-t border-brand-gold/10 p-8 md:hidden"
          >
            <div className="flex flex-col space-y-6">
              {NavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-serif text-brand-cream hover:text-brand-gold transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-brand-gold/10 flex flex-col space-y-4">
                <Link 
                  href="/order" 
                  className="flex items-center space-x-4 text-brand-cream"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingBag size={24} />
                  <span className="text-lg font-serif">Order Online</span>
                </Link>
                <Link 
                  href="/reservations" 
                  className="w-full py-4 bg-brand-gold text-brand-black font-bold tracking-widest uppercase rounded text-center block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book A Table
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
