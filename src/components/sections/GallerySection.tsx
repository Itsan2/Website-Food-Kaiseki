"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { id: 1, title: "Artisanal Selection", size: "lg", image: "/assets/images/layout.png" },
  { id: 2, title: "Imperial Siomay", size: "sm", image: "/assets/images/menu/food/siomay.png" },
  { id: 3, title: "Truffle Takoyaki", size: "sm", image: "/assets/images/menu/food/takoyaki.png" },
  { id: 4, title: "Lychee Mist", size: "md", image: "/assets/images/menu/drink/Lychee Mist.png" },
  { id: 5, title: "Golden Har Gow", size: "sm", image: "/assets/images/menu/food/dimsum.png" },
  { id: 6, title: "Ceremonial Matcha", size: "lg", image: "/assets/images/menu/drink/matcha.png" },
  { id: 7, title: "Yuzu Sparkling", size: "sm", image: "/assets/images/menu/drink/lemon-tea.png" },
  { id: 8, title: "The Craft", size: "sm", image: "/assets/images/menu/food/siomay.png" },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-item", {
        scale: 0.9,
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: {
          each: 0.1,
          from: "random",
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="py-24 bg-brand-black" suppressHydrationWarning>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-[0.3em] uppercase text-brand-gold mb-4 block">
            Visual Senses
          </span>
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-brand-cream">
            THE GALLERY <span className="text-brand-gold italic">OF TASTE</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px]">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`gallery-item group relative overflow-hidden rounded-2xl glass border-brand-gold/10 ${
                item.size === "lg" ? "md:col-span-2 md:row-span-2" : 
                item.size === "md" ? "md:row-span-2" : ""
              }`}
            >
              <div className="absolute inset-0 z-0">
                <Image 
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-brand-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-gold mb-2 block">Visual Experience</span>
                  <h3 className="text-2xl font-serif font-bold text-brand-cream text-center">{item.title}</h3>
                </div>
              </div>

              {/* Decorative Lines */}
              <div className="absolute top-4 left-4 w-4 h-[1px] bg-brand-gold/30" />
              <div className="absolute top-4 left-4 w-[1px] h-4 bg-brand-gold/30" />
              <div className="absolute bottom-4 right-4 w-4 h-[1px] bg-brand-gold/30" />
              <div className="absolute bottom-4 right-4 w-[1px] h-4 bg-brand-gold/30" />
            </div>
          ))}
        </div>

        <div className="mt-24 text-center border-t border-white/5 pt-16">
          <p className="text-sm font-bold tracking-[0.4em] uppercase text-brand-gold mb-6 italic">Follow the Experience</p>
          <Link 
            href="https://itsanfolio.com/" 
            target="_blank"
            className="text-4xl md:text-5xl font-serif font-bold text-brand-cream hover:text-brand-gold transition-colors block"
          >
            itsanfolio.com
          </Link>
        </div>
      </div>
    </section>
  );
}
