"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Droplet, Wind, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { useCart } from "@/context/CartContext";

gsap.registerPlugin(ScrollTrigger);

interface Drink {
  id: number;
  name: string;
  note: string;
  price: string;
  image: string;
  icon: React.ReactNode;
  color: string;
  displayTitle: string[];
}

const drinks: Drink[] = [
  {
    id: 101,
    name: "Ceremonial Matcha",
    note: "Earthy & Silky",
    price: "$12",
    image: "/assets/images/menu/drink/matcha.png",
    icon: <Wind className="w-5 h-5" />,
    color: "from-brand-matcha/20",
    displayTitle: ["COLD", "WHISKED"],
  },
  {
    id: 102,
    name: "Yuzu Sparkling",
    note: "Citrus & Sharp",
    price: "$10",
    image: "/assets/images/menu/drink/lemon-tea.png",
    icon: <Zap className="w-5 h-5" />,
    color: "from-brand-citrus/20",
    displayTitle: ["CITRUS", "SPARK"],
  },
  {
    id: 103,
    name: "Lychee Mist",
    note: "Sweet & Cool",
    price: "$10",
    image: "/assets/images/menu/drink/Lychee Mist.png",
    icon: <Droplet className="w-5 h-5" />,
    color: "from-brand-chili/20",
    displayTitle: ["FLORAL", "MIST"],
  },
];

export default function DrinksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const [activeDrink, setActiveDrink] = useState<Drink>(drinks[0]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".drink-item", {
        opacity: 0,
        y: 30,
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
    <section className="py-24 bg-brand-black overflow-hidden relative" ref={containerRef} suppressHydrationWarning>
      {/* Moving Text Background */}
      <div className="absolute top-0 left-0 w-full overflow-hidden opacity-[0.03] pointer-events-none select-none">
        <motion.div style={{ x: x1 }} className="whitespace-nowrap text-[15rem] font-serif font-black leading-none">
          REFRESHING REFRESHING REFRESHING
        </motion.div>
        <motion.div style={{ x: x2 }} className="whitespace-nowrap text-[15rem] font-serif font-black leading-none italic text-brand-gold">
          INFUSIONS INFUSIONS INFUSIONS
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-sm font-bold tracking-[0.3em] uppercase text-brand-gold mb-4 block">
              Liquid Harmony
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-brand-cream mb-8">
              THE ART OF <br />
              <span className="italic text-brand-gold">PAIRING</span>
            </h2>
            <p className="text-brand-cream/60 text-lg leading-relaxed mb-8 max-w-lg">
              Our beverages are designed to cleanse the palate and enhance the complex flavors of our signature dishes. 
              <span className="block mt-2 text-brand-gold/60 text-sm italic font-serif italic">Select a drink to explore its pairing.</span>
            </p>
            <Link 
              href="/menu"
              className="inline-flex items-center gap-2 px-6 py-3 border border-brand-gold/30 text-brand-gold text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-brand-gold hover:text-brand-black transition-all mb-12"
            >
              View Full Selection <ArrowRight size={14} />
            </Link>
            
            <div className="space-y-6">
              {drinks.map((drink) => (
                <motion.div
                  key={drink.id}
                  onClick={() => setActiveDrink(drink)}
                  initial={{ opacity: 0.3 }}
                  animate={{ 
                    opacity: activeDrink.id === drink.id ? 1 : 0.4,
                    x: activeDrink.id === drink.id ? 10 : 0
                  }}
                  whileHover={{ opacity: 0.8, x: 5 }}
                  className={cn(
                    "drink-item group flex items-center justify-between p-6 glass rounded-2xl border-white/5 transition-all cursor-pointer relative overflow-hidden",
                    activeDrink.id === drink.id ? "border-brand-gold/40 bg-brand-gold/5" : ""
                  )}
                >
                  {/* Selection Indicator */}
                  {activeDrink.id === drink.id && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-brand-gold"
                    />
                  )}

                  <div className="flex items-center gap-6 relative z-10">
                    <div className={cn(
                      "p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent shrink-0 transition-colors",
                      activeDrink.id === drink.id ? "text-brand-gold" : "text-brand-cream/40"
                    )}>
                      {drink.icon}
                    </div>
                    <div>
                      <h4 className={cn(
                        "text-xl font-serif font-bold transition-colors",
                        activeDrink.id === drink.id ? "text-brand-gold" : "text-brand-cream"
                      )}>
                        {drink.name}
                      </h4>
                      <p className="text-xs uppercase tracking-widest text-brand-cream/60 font-bold">{drink.note}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 relative z-10">
                    <span className="text-brand-gold font-serif font-bold text-lg">{drink.price}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({ id: drink.id, name: drink.name, price: drink.price, image: drink.image });
                      }}
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-cream hover:bg-brand-gold hover:text-brand-black transition-all active:scale-95 shadow-lg"
                    >
                      +
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
             <div className="aspect-square rounded-full border border-brand-gold/10 flex items-center justify-center p-12">
               <div className="aspect-square w-full rounded-full border border-brand-gold/20 flex items-center justify-center p-8 animate-spin-slow">
                 <div className="aspect-square w-full rounded-full glass border-brand-gold/30 flex items-center justify-center overflow-hidden relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeDrink.id}
                        initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 1.1, rotate: 10 }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="absolute inset-0"
                      >
                        <Image 
                          src={activeDrink.image}
                          alt={activeDrink.name}
                          fill
                          className="object-cover opacity-80"
                        />
                      </motion.div>
                    </AnimatePresence>

                    <div className="absolute inset-0 bg-brand-black/20" />
                    
                    <div className="relative z-10 text-center p-8">
                       <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-brand-gold mb-2 block">Premium</span>
                       <AnimatePresence mode="wait">
                         <motion.h3 
                           key={activeDrink.id}
                           initial={{ y: 20, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           exit={{ y: -20, opacity: 0 }}
                           className="text-4xl font-serif font-bold text-brand-cream tracking-tighter shadow-xl"
                         >
                           {activeDrink.displayTitle[0]} <br /> {activeDrink.displayTitle[1]}
                         </motion.h3>
                       </AnimatePresence>
                    </div>
                 </div>
               </div>
             </div>
             
             {/* Splash accents */}
             <div className={cn("absolute top-0 right-0 w-24 h-24 blur-3xl animate-pulse transition-colors duration-1000", activeDrink.id === 101 ? "bg-brand-matcha/20" : "bg-brand-citrus/20")} />
             <div className={cn("absolute bottom-0 left-0 w-32 h-32 blur-3xl animate-pulse transition-colors duration-1000", activeDrink.id === 101 ? "bg-brand-matcha/20" : "bg-brand-citrus/20")} />
          </div>
        </div>
      </div>
    </section>
  );
}
