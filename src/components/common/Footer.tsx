"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Twitter, Facebook, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-black pt-24 pb-12 border-t border-white/5" suppressHydrationWarning>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24">
          {/* Brand Info */}
          <div className="max-w-md">
            <Link href="/" className="mb-8 block">
              <div className="relative w-40 h-16">
                <Image 
                  src="/assets/images/logo.png"
                  alt="KAISEKI Logo"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-brand-cream/50 text-lg leading-relaxed mb-12">
              Elevating the soul of modern Asian cuisine through obsessive craftsmanship and cinematic flavor experiences.
            </p>
            <div className="flex items-center gap-6">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/itsan2/" },
                { Icon: Twitter, href: "#" },
                { Icon: Facebook, href: "#" }
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  target={social.href !== "#" ? "_blank" : undefined}
                  className="w-12 h-12 rounded-full glass border-white/5 flex items-center justify-center text-brand-cream hover:text-brand-gold transition-colors"
                >
                  <social.Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-gold mb-8">Navigation</h4>
              <ul className="space-y-4">
                {[
                  { name: "Menu", href: "/menu" },
                  { name: "Our Story", href: "/story" },
                  { name: "Gallery", href: "/gallery" },
                  { name: "Reservations", href: "/reservations" }
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-brand-cream/60 hover:text-brand-gold transition-colors flex items-center gap-2 group">
                      {item.name} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-gold mb-8">Locations</h4>
              <ul className="space-y-4">
                {["San Francisco", "Tokyo (2025)", "London", "Hong Kong"].map((item) => (
                  <li key={item}>
                    <Link href="/locations" className="text-brand-cream/60 hover:text-brand-gold transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-gold mb-8">Newsletter</h4>
              <form className="relative max-w-[240px]" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Inhale flavor..."
                  className="w-full bg-transparent border-b border-brand-gold/30 py-2 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors italic"
                />
                <button type="submit" className="absolute right-0 bottom-2 text-brand-gold hover:text-brand-cream transition-colors">
                  <ArrowUpRight size={20} />
                </button>
              </form>
              <p className="text-[10px] text-brand-cream/30 mt-4 leading-relaxed tracking-wide uppercase">
                Join our Inner Circle for exclusive launches.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] text-brand-cream/30 font-bold tracking-[0.2em] uppercase">
            © 2024 KAISEKI BRAND EXPERIENCE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Service", "Accessibility"].map((item) => (
              <Link key={item} href="#" className="text-[10px] text-brand-cream/30 hover:text-brand-gold transition-colors font-bold tracking-[0.2em] uppercase">
                {item}
              </Link>
            ))}
          </div>
          <button
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-2 text-brand-gold"
          >
             <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Top</span>
             <div className="w-[1px] h-12 bg-brand-gold/30 group-hover:bg-brand-gold transition-colors relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-gold rounded-full" />
             </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
