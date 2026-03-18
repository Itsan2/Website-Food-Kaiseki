"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animations
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-line span", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
      })
      .from(".hero-sub", {
        y: 20,
        opacity: 0,
        duration: 0.8,
      }, "-=0.6")
      .from(".hero-cta", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
      }, "-=0.4")
      .from(".floating-element", {
        opacity: 0,
        scale: 0.5,
        duration: 1.5,
        stagger: 0.2,
      }, "-=1.2")
      .from(".hero-image", {
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px)",
        duration: 2,
      }, "-=2");

      // Floating Animation
      gsap.to(".floating-element", {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-10, 10)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-black"
      suppressHydrationWarning
    >
      {/* Background Image/Visual */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/assets/images/layout.png"
          alt="Premium Food visual"
          fill
          priority
          className="hero-image object-cover opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div style={{ y: y2, opacity }}>
          <div className="mb-8 overflow-hidden inline-block">
            <span className="hero-sub text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-brand-gold">
              Established 2024 • Modern Asian Mastery
            </span>
          </div>

          <h1
            ref={headlineRef}
            className="text-6xl md:text-9xl font-serif font-bold text-brand-cream leading-none tracking-tighter mb-8"
          >
            <div className="hero-line overflow-hidden py-2 inline-block">
              <span className="inline-block">EXQUISITE</span>
            </div>
            <br />
            <div className="hero-line overflow-hidden py-2 inline-block">
              <span className="inline-block text-brand-gold italic">FLAVOR</span>
            </div>
            <br />
            <div className="hero-line overflow-hidden py-2 inline-block">
              <span className="inline-block">CRAFTED</span>
            </div>
          </h1>

          <div ref={sublineRef} className="hero-sub max-w-2xl mx-auto mb-12">
            <p className="text-lg md:text-xl text-brand-cream/60 leading-relaxed font-light">
              A curated celebration of texture, aroma, and warmth. Experience the art of hand-crafted dim sum and signature fusion drinks.
            </p>
          </div>

          <div className="hero-cta flex flex-col md:flex-row items-center justify-center gap-6">
            <Link href="/menu" className="group relative px-10 py-5 bg-brand-gold text-brand-black font-bold tracking-widest uppercase rounded-full overflow-hidden transition-all hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                Explore Menu <ArrowRight size={18} />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full transition-transform group-hover:translate-y-0" />
            </Link>
            <Link href="/story" className="px-10 py-5 border border-brand-cream/20 text-brand-cream font-bold tracking-widest uppercase rounded-full hover:bg-brand-cream/5 transition-all text-center">
              Visit Brand
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements / Decoration (Abstract representations of ingredients) */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[20%] left-[10%] w-24 h-24 floating-element hidden md:block"
      >
        <div className="w-full h-full rounded-2xl border border-brand-gold/20 rotate-12 flex items-center justify-center p-4">
          <div className="w-full h-full rounded-full bg-brand-gold/10 blur-sm" />
        </div>
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-[20%] right-[12%] w-32 h-32 floating-element hidden md:block"
      >
        <div className="w-full h-full rounded-full border border-brand-matcha/20 -rotate-12 flex items-center justify-center p-6">
          <div className="w-full h-full rounded-full bg-brand-matcha/10 blur-md" />
        </div>
      </motion.div>

      <motion.div
        style={{ y: y1 }}
        className="absolute top-[30%] right-[15%] w-12 h-12 floating-element hidden md:block"
      >
        <div className="w-full h-full rounded-full bg-brand-amber/20 animate-pulse" />
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-gold">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-brand-gold" />
        </motion.div>
      </div>
    </section>
  );
}
