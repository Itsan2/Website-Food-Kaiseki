"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Coffee, Flame, Leaf, Utensils, ArrowRight, Droplet, Wind } from "lucide-react";
import { cn } from "@/lib/utils";
import GlassSplash from "@/components/ui/GlassSplash";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: "Imperial Siomay",
    category: "Dim Sum",
    description: "Hand-crafted pork and shrimp dumplings with a touch of truffle and flying fish roe.",
    price: "$18",
    color: "bg-brand-amber",
    image: "/assets/images/menu/food/siomay.png",
    icon: <Utensils className="w-6 h-6" />,
    stats: { heat: 1, texture: "Juicy", flavor: "Savory" },
  },
  {
    id: 2,
    name: "Truffle Takoyaki",
    category: "Signature",
    description: "Crispy octopus balls elevated with black truffle oil and artisanal katsuobushi flakes.",
    price: "$22",
    color: "bg-brand-gold",
    image: "/assets/images/menu/food/takoyaki.png",
    icon: <Flame className="w-6 h-6" />,
    stats: { heat: 2, texture: "Crispy", flavor: "Rich" },
  },
  {
    id: 3,
    name: "Golden Har Gow",
    category: "Dim Sum",
    description: "Translucent shrimp dumplings with a golden leaf finish and bamboo shoot crunch.",
    price: "$19",
    color: "bg-brand-matcha",
    image: "/assets/images/menu/food/dimsum.png",
    icon: <Leaf className="w-6 h-6" />,
    stats: { coolness: 1, texture: "Delicate", flavor: "Sweet" },
  },
  {
    id: 4,
    name: "Yuzu Sparkling",
    category: "Refreshing",
    description: "High-mountain citrus infusion with sparkling botanical water and fresh mint.",
    price: "$12",
    color: "bg-brand-citrus",
    image: "/assets/images/menu/drink/lemon-tea.png",
    icon: <Coffee className="w-6 h-6" />,
    stats: { coolness: 10, texture: "Bubbly", flavor: "Zesty" },
  },
  {
    id: 5,
    name: "Lychee Mist",
    category: "Signature Drink",
    description: "Exotic lychee fruit muddled with wild flower honey and a cooling mint mist.",
    price: "$10",
    color: "bg-brand-chili",
    image: "/assets/images/menu/drink/Lychee Mist.png",
    icon: <Droplet className="w-6 h-6" />,
    stats: { sweetness: 8, texture: "Smooth", flavor: "Floral" },
  },
  {
    id: 6,
    name: "Ceremonial Matcha",
    category: "Ancient Ritual",
    description: "Stone-ground Uji matcha whisked to a velvety froth with a hint of natural sweetness.",
    price: "$12",
    color: "bg-brand-matcha",
    image: "/assets/images/menu/drink/matcha.png",
    icon: <Wind className="w-6 h-6" />,
    stats: { intensity: 9, texture: "Velvety", flavor: "Umami" },
  },
];

export default function SignatureMenu() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".product-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".section-title", {
        x: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="menu" ref={sectionRef} className="py-24 bg-brand-black overflow-hidden relative" suppressHydrationWarning>
      {/* Background Sprinkles */}
      <GlassSplash color="bg-brand-gold" className="w-[400px] h-[400px] -top-20 -left-20 opacity-5" />
      <GlassSplash color="bg-brand-amber" className="w-[300px] h-[300px] bottom-0 right-0 opacity-5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="section-title">
            <span className="text-sm font-bold tracking-[0.3em] uppercase text-brand-gold mb-4 block">
              The Collection
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-brand-cream tracking-tight">
              SIGNATURE <span className="italic text-brand-gold">DISHES</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-brand-cream/50 text-lg leading-relaxed mb-8">
              Curated by our master chefs, these selections represent the pinnacle of modern Asian gastronomy.
            </p>
            <Link 
              href="/menu"
              className="inline-flex items-center gap-2 px-6 py-3 border border-brand-gold text-brand-gold text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-brand-gold hover:text-brand-black transition-all"
            >
              Explore Full Menu <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -10 }}
              className="product-card group relative h-[500px] rounded-3xl overflow-hidden glass border-white/5"
            >
              {/* Product Image */}
              <div className="absolute inset-0 z-0">
                <Image 
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-black/20 to-brand-black" />
                <div className={cn("absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20", product.color)} />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                <div className="mb-4">
                  <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full border border-brand-gold/30 text-brand-gold bg-brand-gold/5">
                    {product.category}
                  </span>
                </div>
                <h3 className="text-3xl font-serif font-bold text-brand-cream mb-2 group-hover:text-brand-gold transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-brand-cream/60 leading-relaxed mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                  {product.description}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-brand-cream/10">
                  <span className="text-2xl font-serif font-bold text-brand-gold">{product.price}</span>
                  <button 
                    onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
                    className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-brand-cream hover:text-brand-gold transition-colors"
                  >
                    Add to order <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Hover Effect Reveal */}
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex flex-col gap-2 text-right">
                  {Object.entries(product.stats).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-[8px] uppercase tracking-tighter text-brand-cream/40 block">{key}</span>
                      <span className="text-xs font-bold text-brand-gold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
