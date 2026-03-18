"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import Hero from "@/components/sections/hero";
import SignatureMenu from "@/components/sections/SignatureMenu";
import BrandStory from "@/components/sections/BrandStory";
import GallerySection from "@/components/sections/GallerySection";
import ReservationForm from "@/components/sections/ReservationForm";
import Testimonials from "@/components/sections/Testimonials";
import DrinksSection from "@/components/sections/DrinksSection";
import Footer from "@/components/common/Footer";
import LenisProvider from "@/components/common/LenisProvider";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 1 }}
      className="fixed inset-0 z-[100] bg-brand-black flex items-center justify-center pointer-events-none"
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-48 h-20 md:w-64 md:h-24 mx-auto mb-4"
        >
          <Image 
            src="/assets/images/logo.png"
            alt="KAISEKI Logo"
            fill
            unoptimized
            className="object-contain"
            priority
          />
        </motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="h-[1px] bg-brand-gold mt-4 origin-left"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-[10px] font-bold tracking-[0.5em] uppercase text-brand-gold"
        >
          Modern Asian Luxury
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LenisProvider>
      <main className="relative bg-brand-black" suppressHydrationWarning>
        <AnimatePresence>
          {loading && <Preloader />}
        </AnimatePresence>
        
        <Navbar />
        
        <div className={loading ? "opacity-0" : "opacity-100 transition-opacity duration-1000"} suppressHydrationWarning>
          <Hero />
          
          <div className="relative z-10" suppressHydrationWarning>
            <SignatureMenu />
            <BrandStory />
            <GallerySection />
            <DrinksSection />
            <Testimonials />
            <ReservationForm />
          </div>
          
          <Footer />
        </div>
      </main>
    </LenisProvider>
  );
}
