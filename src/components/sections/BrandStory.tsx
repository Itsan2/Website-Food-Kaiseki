"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function BrandStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={sectionRef} className="py-24 bg-brand-charcoal relative overflow-hidden" suppressHydrationWarning>
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              ref={imageRef}
              style={{ y: imgY }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden glass border-brand-gold/10"
            >
              <Image 
                src="/assets/images/layout.png"
                alt="Brand Heritage"
                fill
                className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-brand-gold/5 flex items-center justify-center">
                 <div className="text-center p-12">
                   <h4 className="text-2xl font-serif text-brand-gold/50 mb-4 tracking-widest italic">Craftsmanship</h4>
                   <div className="w-16 h-[1px] bg-brand-gold/20 mx-auto" />
                 </div>
              </div>
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-brand-gold mb-2">Since 2024</span>
                <p className="text-sm text-brand-cream/40 italic font-serif">&quot;Every fold tells a story of tradition meeting the modern soul.&quot;</p>
              </div>
            </motion.div>
            
            {/* Decal */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full glass border-brand-gold/20 flex items-center justify-center p-4">
              <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
                <path id="textPath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                <text fill="#D4A373" className="text-[10px] uppercase tracking-widest font-bold">
                  <textPath xlinkHref="#textPath">Artisanal • Modern • Premium • Heritage •</textPath>
                </text>
              </svg>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <span className="reveal-text text-sm font-bold tracking-[0.3em] uppercase text-brand-gold mb-6 block">
              The Heritage
            </span>
            <h2 className="reveal-text text-5xl md:text-6xl font-serif font-bold text-brand-cream leading-tight mb-8">
              WHERE TRADITION <br />
              <span className="italic text-brand-gold">MEETS ART</span>
            </h2>
            <div className="space-y-6 text-brand-cream/70 text-lg leading-relaxed font-light">
              <p className="reveal-text">
                KAISEKI wasn&apos;t born from a recipe book, but from a relentless obsession with the perfect bite. We believe that modern Asian cuisine should be a multisensory journey—one that honors centuries of technique while embracing the boldness of today.
              </p>
              <p className="reveal-text">
                From the way the steam rises from our bamboo baskets to the precise splash of our signature citrus tea, every detail is choreographed. Our ingredients are sourced globally, refined locally, and served for the discerning palate.
              </p>
              <p className="reveal-text">
                This is not just food. This is an invitation to pause, to taste, and to experience the soul of modern Asia.
              </p>
            </div>
            
            <div className="reveal-text mt-12 pt-12 border-t border-brand-cream/10 flex flex-col sm:flex-row items-center gap-12">
              <div className="flex gap-12">
                <div>
                  <span className="block text-4xl font-serif font-bold text-brand-gold mb-1">100%</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-cream/40">Handcrafted</span>
                </div>
                <div>
                  <span className="block text-4xl font-serif font-bold text-brand-gold mb-1">08</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-cream/40">Signature Sauces</span>
                </div>
              </div>
              <Link 
                href="/story"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-brand-gold/10 text-brand-gold text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-brand-gold hover:text-brand-black transition-all"
              >
                Read Our Story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
