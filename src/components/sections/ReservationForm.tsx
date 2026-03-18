"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  guests: z.string().min(1, "Please select number of guests"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function ReservationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log("Form Data:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="visit" className="py-24 bg-brand-charcoal relative" suppressHydrationWarning>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto glass rounded-[3rem] overflow-hidden border-white/5 flex flex-col lg:flex-row">
          {/* Info Side */}
          <div className="w-full lg:w-2/5 p-12 lg:p-16 bg-brand-gold flex flex-col justify-between">
            <div>
              <span className="text-brand-black text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
                Reservations
              </span>
              <h2 className="text-brand-black text-4xl md:text-5xl font-serif font-bold leading-tight mb-8">
                SECURE <br />
                YOUR <span className="italic">MOMENT</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 text-brand-black/70">
                  <Clock className="w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-brand-black uppercase text-xs tracking-widest mb-1">Hours</h4>
                    <p className="text-sm">Tue – Sun: 12:00 PM – 10:00 PM</p>
                    <p className="text-sm italic">Closed on Mondays</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-brand-black/70">
                  <Calendar className="w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-brand-black uppercase text-xs tracking-widest mb-1">Peak Times</h4>
                    <p className="text-sm">We recommend booking at least 48 hours in advance for weekends.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-brand-black/10">
              <p className="text-brand-black/60 text-xs font-bold tracking-widest uppercase">Direct Contact</p>
              <h3 className="text-brand-black text-2xl font-serif font-bold mt-2">+1 (888) KAISEKI</h3>
            </div>
          </div>

          {/* Form Side */}
          <div className="w-full lg:w-3/5 p-12 lg:p-16 relative">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-20 h-20 bg-brand-gold/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-brand-gold" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-brand-cream mb-4">Reservation Received</h3>
                  <p className="text-brand-cream/60 max-w-xs mx-auto mb-8">
                    We have received your request. Our team will contact you shortly to confirm your booking.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-brand-gold font-bold tracking-widest uppercase text-xs hover:underline"
                  >
                    Make another booking
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-gold ml-2">Full Name</label>
                      <input
                        {...register("name")}
                        className={cn(
                          "w-full bg-brand-black/50 border rounded-2xl px-6 py-4 text-brand-cream focus:outline-none transition-colors",
                          errors.name ? "border-brand-chili" : "border-white/10 focus:border-brand-gold"
                        )}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-[10px] text-brand-chili ml-2">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-gold ml-2">Email Address</label>
                      <input
                        {...register("email")}
                        className={cn(
                          "w-full bg-brand-black/50 border rounded-2xl px-6 py-4 text-brand-cream focus:outline-none transition-colors",
                          errors.email ? "border-brand-chili" : "border-white/10 focus:border-brand-gold"
                        )}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-[10px] text-brand-chili ml-2">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-gold ml-2">Number of Guests</label>
                      <select
                        {...register("guests")}
                        className="w-full bg-brand-black/50 border border-white/10 focus:border-brand-gold rounded-2xl px-6 py-4 text-brand-cream focus:outline-none transition-colors appearance-none"
                      >
                        <option value="">Select Guests</option>
                        {[1, 2, 3, 4, 5, 6, "7+"].map((num) => (
                          <option key={num} value={num} className="bg-brand-charcoal">{num} {num === 1 ? "Guest" : "Guests"}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2 relative">
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-gold ml-2">Preferred Date</label>
                      <input
                        type="date"
                        {...register("date")}
                        className="w-full bg-brand-black/50 border border-white/10 focus:border-brand-gold rounded-2xl px-6 py-4 text-brand-cream focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-gold ml-2">Preferred Time</label>
                      <input
                        type="time"
                        {...register("time")}
                        className="w-full bg-brand-black/50 border border-white/10 focus:border-brand-gold rounded-2xl px-6 py-4 text-brand-cream focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-gold ml-2">Special Requests (Optional)</label>
                    <textarea
                      {...register("message")}
                      rows={3}
                      className="w-full bg-brand-black/50 border border-white/10 focus:border-brand-gold rounded-2xl px-6 py-4 text-brand-cream focus:outline-none transition-colors"
                      placeholder="Dietary restrictions, special occasions, etc."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group relative overflow-hidden py-5 bg-brand-cream text-brand-black font-bold tracking-[0.3em] uppercase rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? "Processing..." : "Confirm Request"}
                      {!isSubmitting && <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                    </span>
                    <div className="absolute inset-0 bg-brand-gold translate-x-full transition-transform group-hover:translate-x-0" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
