"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    author: "Elena Rossi",
    role: "Food Critic",
    content: "The Truffle Takoyaki is a revelation. KAISEKI has managed to elevate street food into a high-art dining experience that feels both familiar and futuristic.",
    stars: 5,
  },
  {
    author: "James Chen",
    role: "Lifestyle Architect",
    content: "Minimalist aesthetic paired with maximalist flavor. The attention to detail in the matcha ritual is unlike anything I've seen outside of Kyoto.",
    stars: 5,
  },
  {
    author: "Sarah Jenkins",
    role: "Premium Member",
    content: "The golden Har Gow is literally the best dumpling I've ever had. It melts in your mouth and the plating is absolutely Awwwards-worthy.",
    stars: 5,
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 bg-brand-black overflow-hidden" ref={containerRef} suppressHydrationWarning>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="max-w-2xl">
            <span className="text-sm font-bold tracking-[0.3em] uppercase text-brand-gold mb-4 block">
              Voices of Experience
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-brand-cream leading-tight">
              GUEST <span className="italic text-brand-gold">JOURNEYS</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-4">
             <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />
                ))}
             </div>
             <span className="font-serif italic text-brand-cream/60 text-xl">4.9 / 5.0 Average</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="testimonial-card relative p-12 glass rounded-[2rem] border-white/5"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-brand-gold/10" />
              
              <div className="flex gap-1 mb-8">
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                ))}
              </div>

              <p className="text-lg text-brand-cream/80 italic font-serif leading-relaxed mb-12">
                &quot;{t.content}&quot;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-brand-gold/30 bg-brand-gold/10 flex items-center justify-center font-bold text-brand-gold">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-brand-cream">{t.author}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
