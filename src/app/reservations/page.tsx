"use client";

import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LenisProvider from "@/components/common/LenisProvider";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Utensils, Sparkles } from "lucide-react";
import Link from "next/link";
import ReservationForm from "@/components/sections/ReservationForm";

export default function ReservationsPage() {
  return (
    <LenisProvider>
      <main className="bg-brand-black min-h-screen" suppressHydrationWarning>
        <Navbar />
        
        <div className="pt-32 pb-24 container mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-cream transition-colors mb-12 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold tracking-widest uppercase">Back to Experience</span>
          </Link>

          <header className="max-w-4xl mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-sm font-bold tracking-[0.4em] uppercase text-brand-gold mb-6 block">
                Secure Your Seat
              </span>
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-brand-cream leading-none mb-8">
                BOOK YOUR <br />
                <span className="italic text-brand-gold">EXPERIENCE</span>
              </h1>
              <p className="text-brand-cream/60 text-xl leading-relaxed font-light max-w-2xl">
                Join us for an evening of modern Asian mastery. Whether it&apos;s a private celebration or an intimate dinner, we ensure every detail is choreographed perfectly.
              </p>
            </motion.div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Info Side */}
            <div className="lg:col-span-4 space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass p-8 rounded-3xl border-white/5 space-y-8"
              >
                <div>
                  <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4 flex items-center gap-2">
                    <Clock size={14} /> Opening Hours
                  </h3>
                  <div className="space-y-2 text-brand-cream/60 text-sm">
                    <p className="flex justify-between"><span>Mon - Thu</span> <span>17:00 - 22:00</span></p>
                    <p className="flex justify-between"><span>Fri - Sat</span> <span>17:00 - 23:30</span></p>
                    <p className="flex justify-between"><span>Sunday</span> <span>12:00 - 21:00</span></p>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                  <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4 flex items-center gap-2">
                    <Utensils size={14} /> Dining Policy
                  </h3>
                  <p className="text-brand-cream/50 text-xs leading-relaxed">
                    Reservations are held for 15 minutes. For parties larger than 8, please contact our events team directly.
                  </p>
                </div>

                <div className="pt-8 border-t border-white/5">
                   <div className="flex items-center gap-4 text-brand-gold">
                      <Sparkles size={24} />
                      <div>
                        <p className="text-[10px] font-bold tracking-widest uppercase">Michelin Guide</p>
                        <p className="text-brand-cream font-serif italic text-lg">Recommended 2024</p>
                      </div>
                   </div>
                </div>
              </motion.div>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {/* Reusing existing ReservationForm component logic but styled for full page */}
                <div className="glass rounded-[40px] border-white/5 overflow-hidden">
                   <ReservationForm />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </LenisProvider>
  );
}
