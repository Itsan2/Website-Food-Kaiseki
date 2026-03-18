"use client";

import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LenisProvider from "@/components/common/LenisProvider";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const fullMenu = {
  food: [
    {
      id: 1,
      name: "Imperial Siomay",
      category: "Dim Sum",
      description: "Hand-crafted pork and shrimp dumplings with a touch of truffle and flying fish roe.",
      price: "$18",
      image: "/assets/images/menu/food/siomay.png",
    },
    {
      id: 2,
      name: "Truffle Takoyaki",
      category: "Signature",
      description: "Crispy octopus balls elevated with black truffle oil and artisanal katsuobushi flakes.",
      price: "$22",
      image: "/assets/images/menu/food/takoyaki.png",
    },
    {
      id: 3,
      name: "Golden Har Gow",
      category: "Dim Sum",
      description: "Translucent shrimp dumplings with a golden leaf finish and bamboo shoot crunch.",
      price: "$19",
      image: "/assets/images/menu/food/dimsum.png",
    },
  ],
  drinks: [
    {
      id: 101,
      name: "Ceremonial Matcha",
      category: "Ancient Ritual",
      description: "Stone-ground Uji matcha whisked to a velvety froth with a hint of natural sweetness.",
      price: "$12",
      image: "/assets/images/menu/drink/matcha.png",
    },
    {
      id: 102,
      name: "Yuzu Sparkling",
      category: "Refreshing",
      description: "High-mountain citrus infusion with sparkling botanical water and fresh mint.",
      price: "$10",
      image: "/assets/images/menu/drink/lemon-tea.png",
    },
    {
      id: 103,
      name: "Lychee Mist",
      category: "Refreshing",
      description: "Exotic lychee fruit muddled with wild flower honey and a cooling mint mist.",
      price: "$10",
      image: "/assets/images/menu/drink/Lychee Mist.png",
    },
  ]
};

export default function MenuPage() {
  const { addToCart } = useCart();

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
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-brand-cream mb-6">
              Full <span className="italic text-brand-gold">Menu</span>
            </h1>
            <p className="text-brand-cream/50 text-xl max-w-2xl leading-relaxed">
               A comprehensive catalog of our artisanal creations. From hand-crafted delicacies to spiritual beverage pairings.
            </p>
          </header>

          {/* Food Section */}
          <section className="mb-24">
            <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-brand-gold mb-12 border-b border-brand-gold/20 pb-4">
              Artisanal Cuisine
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fullMenu.food.map((item, i) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-3xl overflow-hidden group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image 
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-brand-gold/60 mb-2 block">{item.category}</span>
                    <h3 className="text-2xl font-serif font-bold text-brand-cream mb-4">{item.name}</h3>
                    <p className="text-brand-cream/50 text-sm leading-relaxed mb-6">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-serif font-bold text-brand-gold">{item.price}</span>
                      <button 
                        onClick={() => addToCart({ ...item, image: item.image })}
                        className="p-3 bg-brand-gold/10 text-brand-gold rounded-full hover:bg-brand-gold hover:text-brand-black transition-all"
                      >
                        <ShoppingBag size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Drinks Section */}
          <section>
            <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-brand-gold mb-12 border-b border-brand-gold/20 pb-4">
              Liquid Harmony
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fullMenu.drinks.map((item, i) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-3xl overflow-hidden group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image 
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-brand-gold/60 mb-2 block">{item.category}</span>
                    <h3 className="text-2xl font-serif font-bold text-brand-cream mb-4">{item.name}</h3>
                    <p className="text-brand-cream/50 text-sm leading-relaxed mb-6">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-serif font-bold text-brand-gold">{item.price}</span>
                      <button 
                        onClick={() => addToCart({ ...item, image: item.image })}
                        className="p-3 bg-brand-gold/10 text-brand-gold rounded-full hover:bg-brand-gold hover:text-brand-black transition-all"
                      >
                        <ShoppingBag size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        <Footer />
      </main>
    </LenisProvider>
  );
}
