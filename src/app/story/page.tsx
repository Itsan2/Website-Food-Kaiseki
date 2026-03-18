"use client";

import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LenisProvider from "@/components/common/LenisProvider";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Award, Sparkles, Globe, Heart } from "lucide-react";
import Link from "next/link";

export default function StoryPage() {
  return (
    <LenisProvider>
      <main className="bg-brand-black min-h-screen">
        <Navbar />
        
        <div className="pt-32 pb-24 container mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-cream transition-colors mb-12 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold tracking-widest uppercase">Back to Experience</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="text-sm font-bold tracking-[0.4em] uppercase text-brand-gold mb-6 block">
                The Heritage
              </span>
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-brand-cream leading-none mb-8">
                WHERE <span className="italic text-brand-gold">TRADITION</span> <br />
                MEETS ART
              </h1>
              <div className="space-y-6 text-brand-cream/60 text-xl leading-relaxed font-light italic">
                <p>
                  KAISEKI wasn&apos;t born from a recipe book, but from a relentless obsession with the perfect bite. 
                  We believe that modern Asian cuisine should be a multisensory journey—one that honors 
                  centuries of technique while embracing the boldness of today.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden glass border-white/5 group"
            >
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
              >
                <source src="/assets/videos/story-hero.mp4" type="video/mp4" />
                {/* Fallback image */}
                <Image 
                  src="/assets/images/layout.png"
                  alt="Craftsmanship"
                  fill
                  className="object-cover opacity-60 mix-blend-luminosity"
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent pointer-events-none" />
              
              {/* Subtle Label */}
              <div className="absolute bottom-8 left-8">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-gold/60">Digital Heritage</span>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
             {[
               { icon: <Award className="text-brand-gold w-8 h-8" />, title: "Obsessive Craft", desc: "Every fold of our dim sum is a testament to precision and patience." },
               { icon: <Globe className="text-brand-gold w-8 h-8" />, title: "Global Sourcing", desc: "We source the finest ingredients from sustainable farms worldwide." },
               { icon: <Heart className="text-brand-gold w-8 h-8" />, title: "Soulful Spirit", desc: "More than just food, we serve a piece of our heritage in every plate." }
             ].map((feature, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.2 }}
                 className="p-8 glass rounded-3xl border-white/5 hover:border-brand-gold/20 transition-colors"
               >
                 <div className="mb-6">{feature.icon}</div>
                 <h3 className="text-2xl font-serif font-bold text-brand-cream mb-4">{feature.title}</h3>
                 <p className="text-brand-cream/50 leading-relaxed">{feature.desc}</p>
               </motion.div>
             ))}
          </div>

          {/* Stats Section */}
          <div className="max-w-4xl mx-auto text-center mb-32">
            <Sparkles className="text-brand-gold w-12 h-12 mx-auto mb-8" />
            <p className="text-2xl md:text-3xl font-serif text-brand-cream italic leading-relaxed mb-12">
              &quot;This is not just food. This is an invitation to pause, to taste, and to experience the soul of modern Asia.&quot;
            </p>
            <div className="flex flex-wrap justify-center gap-12">
               <div>
                 <span className="text-6xl font-serif font-bold text-brand-gold block mb-2">100%</span>
                 <span className="text-xs font-bold tracking-[0.3em] uppercase text-brand-cream/40">Handcrafted</span>
               </div>
               <div>
                 <span className="text-6xl font-serif font-bold text-brand-gold block mb-2">08</span>
                 <span className="text-xs font-bold tracking-[0.3em] uppercase text-brand-cream/40">Signature Sauces</span>
               </div>
            </div>
          </div>

          {/* Cinematic Video Reveal Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative h-[70vh] rounded-[40px] overflow-hidden glass border-white/5 mb-32 group"
          >
            {/* 
                PLACE YOUR 10-SECOND CINEMATIC VIDEO HERE 
                Path: /public/assets/videos/heritage.mp4
            */}
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-1000"
            >
              <source src="/assets/videos/heritage.mp4" type="video/mp4" />
              {/* Optional: Fallback Image if video fails to load */}
              <Image 
                src="/assets/images/layout.png"
                alt="Heritage Visual"
                fill
                className="object-cover"
              />
            </video>
            
            {/* Video Overlay Text */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-transparent to-brand-black/60 flex items-center justify-center">
              <div className="text-center">
                <span className="text-xs font-bold tracking-[0.6em] uppercase text-brand-gold mb-4 block">Cinematic Journey</span>
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-cream">THE SOUL OF KAISEKI</h2>
              </div>
            </div>
            
            {/* Decorative Corner Lines */}
            <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-brand-gold/30 rounded-tl-3xl" />
            <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-brand-gold/30 rounded-br-3xl" />
          </motion.div>

        </div>

        <Footer />
      </main>
    </LenisProvider>
  );
}
