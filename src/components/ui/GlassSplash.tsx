"use client";

import React from "react";
import { motion } from "framer-motion";

export default function GlassSplash({ color = "bg-brand-gold", className = "" }: { color?: string, className?: string }) {
  return (
    <motion.div
      suppressHydrationWarning
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 0.1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className={`absolute pointer-events-none blur-3xl rounded-full ${color} ${className}`}
    />
  );
}
