"use client";

import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LenisProvider from "@/components/common/LenisProvider";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Instagram, ZoomIn } from "lucide-react";
import Link from "next/link";

const galleryItems = [
  { id: 1, title: "Artisanal Selection", category: "Visual Experience", image: "/assets/images/layout.png", size: "lg" },
  { id: 2, title: "Imperial Siomay", category: "Visual Experience", image: "/assets/images/menu/food/siomay.png", size: "sm" },
  { id: 3, title: "Truffle Takoyaki", category: "Visual Experience", image: "/assets/images/menu/food/takoyaki.png", size: "sm" },
  { id: 4, title: "Lychee Mist", category: "Visual Experience", image: "/assets/images/menu/drink/Lychee Mist.png", size: "md" },
  { id: 5, title: "Golden Har Gow", category: "Visual Experience", image: "/assets/images/menu/food/dimsum.png", size: "sm" },
  { id: 6, title: "Ceremonial Matcha", category: "Visual Experience", image: "/assets/images/menu/drink/matcha.png", size: "lg" },
  { id: 7, title: "Yuzu Sparkling", category: "Visual Experience", image: "/assets/images/menu/drink/lemon-tea.png", size: "sm" },
  { id: 8, title: "The Craft", category: "Visual Experience", image: "/assets/images/menu/food/siomay.png", size: "sm" },
];

export default function GalleryPage() {
  return (
    <LenisProvider>
      <main className="bg-brand-black min-h-screen">
        <Navbar />
        
        <div className="pt-32 pb-24 container mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-cream transition-colors mb-12 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold tracking-widest uppercase">Back to Experience</span>
          </Link>

          <header className="mb-20">
            <h1 className="text-64 md:text-8xl font-serif font-bold text-brand-cream mb-6">
              Visual <span className="italic text-brand-gold">Senses</span>
            </h1>
            <p className="text-brand-cream/50 text-xl max-w-2xl leading-relaxed">
               A cinematic journey through our culinary craftsmanship. Witness the collision of texture, light, and flavor.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px]">
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "relative group cursor-pointer overflow-hidden rounded-2xl",
                  item.size === "lg" ? "md:col-span-2 md:row-span-2" : "",
                  item.size === "md" ? "md:col-span-2" : ""
                )}
              >
                <Image 
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-brand-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-gold mb-2 block">{item.category}</span>
                    <h3 className="text-2xl font-serif font-bold text-brand-cream">{item.title}</h3>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-500">
                    <ZoomIn className="text-brand-gold/50 w-12 h-12" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 text-center border-t border-white/5 pt-24">
            <Instagram className="w-12 h-12 text-brand-gold mx-auto mb-8" />
            <h2 className="text-4xl font-serif font-bold text-brand-cream mb-6 italic">Follow the Experience</h2>
            <Link 
              href="https://itsanfolio.com/" 
              target="_blank"
              className="text-brand-gold font-bold tracking-[0.4em] uppercase hover:text-brand-cream transition-colors"
            >
              itsanfolio.com
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    </LenisProvider>
  );
}

// Utility for classes (copy from lib/utils if available or just define here)
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
