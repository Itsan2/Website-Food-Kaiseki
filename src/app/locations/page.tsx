"use client";

import React, { useState } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LenisProvider from "@/components/common/LenisProvider";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Globe, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const locations = [
  {
    id: "sf",
    city: "San Francisco",
    status: "Open Now",
    address: "650 Mission St, San Francisco, CA 94105",
    phone: "+1 (415) 555-0123",
    email: "sf@kaiseki.com",
    hours: "Daily 17:00 - 22:00",
    description: "The birthplace of our brand. Nestled in the heart of SoMa, our SF flagship offers an industrial-lux atmosphere with floor-to-ceiling city views.",
    image: "/assets/locations/Francisco.png"
  },
  {
    id: "tokyo",
    city: "Tokyo",
    status: "Opening 2025",
    address: "1-1-1 Yurakucho, Chiyoda City, Tokyo 100-0006",
    phone: "+81 3-5555-0000",
    email: "tokyo@kaiseki.com",
    hours: "Opening Soon",
    description: "Returning to our roots. Our upcoming Tokyo residency in Chiyoda will redefine omakase with a modern Kaiseki twist.",
    image: "/assets/locations/Tokyo.png"
  },
  {
    id: "london",
    city: "London",
    status: "Open Now",
    address: "100 Liverpool St, London EC2M 2AU, UK",
    phone: "+44 20 7946 0000",
    email: "london@kaiseki.com",
    hours: "Daily 18:00 - 23:00",
    description: "Elegance meets the Thames. Our London location brings Asian fusion to the historic financial district in a Grade II listed building.",
    image: "/assets/locations/London.png"
  },
  {
    id: "hk",
    city: "Hong Kong",
    status: "Open Now",
    address: "8 Finance St, Central, Hong Kong",
    phone: "+852 2555 0123",
    email: "hk@kaiseki.com",
    hours: "Daily 17:30 - 22:30",
    description: "The pinnacle of skyscraper dining. Located in the IFC, our Hong Kong space offers an unparalleled view of Victoria Harbour.",
    image: "/assets/locations/HongKong.png"
  }
];

export default function LocationsPage() {
  const [activeLocation, setActiveLocation] = useState(locations[0]);

  return (
    <LenisProvider>
      <main className="bg-brand-black min-h-screen" suppressHydrationWarning>
        <Navbar />
        
        <div className="pt-32 pb-24 container mx-auto px-6">
          <header className="max-w-4xl mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-sm font-bold tracking-[0.4em] uppercase text-brand-gold mb-6 block flex items-center gap-3">
                <Globe size={16} /> Global Presence
              </span>
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-brand-cream leading-none mb-8">
                FIND YOUR <br />
                <span className="italic text-brand-gold">MOMENT</span>
              </h1>
              <p className="text-brand-cream/60 text-xl leading-relaxed font-light max-w-2xl">
                From the foggy streets of San Francisco to the neon lights of Tokyo, KAISEKI brings the art of modern Asian cuisine to the world&apos;s most iconic cities.
              </p>
            </motion.div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Selection Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              <div className="glass p-4 rounded-[32px] border-white/5">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-gold/40 mb-4 ml-4">Select City</p>
                <div className="space-y-2">
                  {locations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => setActiveLocation(loc)}
                      className={`w-full flex items-center justify-between p-6 rounded-2xl transition-all group ${
                        activeLocation.id === loc.id 
                          ? "bg-brand-gold text-brand-black shadow-lg shadow-brand-gold/20" 
                          : "bg-white/5 text-brand-cream hover:bg-white/10"
                      }`}
                    >
                      <div className="text-left">
                        <h3 className="text-xl font-serif font-bold">{loc.city}</h3>
                        <p className={`text-[10px] uppercase font-bold tracking-widest ${
                          activeLocation.id === loc.id ? "text-brand-black/60" : "text-brand-gold"
                        }`}>{loc.status}</p>
                      </div>
                      <ChevronRight size={20} className={`transition-transform ${
                        activeLocation.id === loc.id ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Content Area */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLocation.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-12"
                >
                  {/* Visual Reveal */}
                  <div className="relative h-[400px] rounded-[40px] overflow-hidden glass border-white/5">
                    <Image 
                      src={activeLocation.image}
                      alt={activeLocation.city}
                      fill
                      className="object-cover opacity-60 mix-blend-luminosity hover:scale-105 transition-transform duration-[2s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent" />
                    <div className="absolute bottom-10 left-10">
                       <h2 className="text-5xl md:text-7xl font-serif font-bold text-brand-cream">{activeLocation.city}</h2>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="glass p-10 rounded-[40px] border-white/5 space-y-8">
                        <div>
                           <h3 className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
                              <MapPin size={16} /> Address
                           </h3>
                           <p className="text-brand-cream text-xl font-light italic leading-relaxed">
                              {activeLocation.address}
                           </p>
                        </div>
                        <div className="pt-8 border-t border-white/5 space-y-4">
                           <div className="flex items-center gap-4 text-brand-cream/60 hover:text-brand-gold transition-colors">
                              <Phone size={18} />
                              <span className="text-sm font-bold tracking-widest uppercase">{activeLocation.phone}</span>
                           </div>
                           <div className="flex items-center gap-4 text-brand-cream/60 hover:text-brand-gold transition-colors">
                              <Mail size={18} />
                              <span className="text-sm font-bold tracking-widest uppercase">{activeLocation.email}</span>
                           </div>
                        </div>
                     </div>

                     <div className="glass p-10 rounded-[40px] border-white/5 flex flex-col justify-between">
                        <div>
                           <h3 className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
                              <Clock size={16} /> Service Hours
                           </h3>
                           <p className="text-brand-cream text-2xl font-serif font-bold leading-relaxed mb-6">
                              {activeLocation.hours}
                           </p>
                        </div>
                        <p className="text-brand-cream/50 text-base leading-relaxed font-light italic">
                           &quot;{activeLocation.description}&quot;
                        </p>
                     </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-6 pt-4">
                     <Link href="/reservations" className="px-10 py-5 bg-brand-gold text-brand-black font-bold tracking-widest uppercase rounded-full hover:scale-105 transition-transform shadow-lg shadow-brand-gold/10">
                        Book a Table
                     </Link>
                     <Link href="/menu" className="px-10 py-5 border border-white/20 text-brand-cream font-bold tracking-widest uppercase rounded-full hover:bg-white/5 transition-all">
                        View Menu
                     </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </LenisProvider>
  );
}
