"use client";

import React, { useState } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LenisProvider from "@/components/common/LenisProvider";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingBag, Trash2, Plus, Minus, CreditCard, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function OrderPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Cart, 2: Checkout, 3: Success
  const [paymentMethod, setPaymentMethod] = useState<"card" | "wallet" | "bank">("card");

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    setTimeout(() => {
        clearCart();
    }, 1000);
  };

  const paymentMethods = [
    { id: "card", name: "Credit Card", icon: <CreditCard size={18} /> },
    { id: "wallet", name: "Digital Wallet", icon: <ShoppingBag size={18} /> },
    { id: "bank", name: "Bank Transfer", icon: <ChevronRight size={18} /> },
  ] as const;

  return (
    <LenisProvider>
      <main className="bg-brand-black min-h-screen" suppressHydrationWarning>
        <Navbar />
        
        <div className="pt-32 pb-24 container mx-auto px-6">
          <Link href="/menu" className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-cream transition-colors mb-12 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold tracking-widest uppercase">Back to Menu</span>
          </Link>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="cart"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-16"
              >
                <div className="lg:col-span-8">
                  <header className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-cream mb-4">
                      My <span className="italic text-brand-gold">Order</span>
                    </h1>
                    <p className="text-brand-cream/50 uppercase tracking-[0.2em] text-xs font-bold">Review Your Selection</p>
                  </header>

                  {cart.length === 0 ? (
                    <div className="glass p-12 rounded-[40px] text-center">
                      <ShoppingBag size={48} className="mx-auto text-brand-gold/20 mb-6" />
                      <p className="text-brand-cream/40 text-lg mb-8">Your bag is currently empty.</p>
                      <Link href="/menu" className="inline-block px-8 py-4 bg-brand-gold text-brand-black font-bold tracking-widest uppercase rounded-full">Explore Menu</Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {cart.map((item) => (
                        <motion.div 
                          key={item.id}
                          layout
                          className="glass p-6 rounded-3xl flex items-center gap-6 group border-white/5"
                        >
                          <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-xl font-serif font-bold text-brand-cream">{item.name}</h3>
                            <p className="text-brand-gold font-bold">{item.price}</p>
                          </div>
                          <div className="flex items-center gap-4 glass bg-white/5 rounded-full px-4 py-2 border-white/10 text-brand-cream">
                            <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-brand-gold transition-colors">
                              <Minus size={16} />
                            </button>
                            <span className="w-8 text-center font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-brand-gold transition-colors">
                              <Plus size={16} />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="p-3 text-brand-cream/20 hover:text-red-500 transition-all"
                          >
                            <Trash2 size={20} />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="lg:col-span-4">
                    <div className="glass p-8 rounded-[40px] sticky top-32 border-white/5">
                      <h3 className="text-xl font-serif font-bold text-brand-cream mb-8 border-b border-white/5 pb-4">Order Summary</h3>
                      <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-brand-cream/60">
                          <span>Subtotal</span>
                          <span className="text-brand-cream font-bold">${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-brand-cream/60">
                          <span>Delivery</span>
                          <span className="text-brand-gold font-bold">FREE</span>
                        </div>
                        <div className="pt-4 border-t border-white/10 flex justify-between">
                          <span className="text-brand-cream uppercase font-bold tracking-widest text-sm">Total</span>
                          <span className="text-2xl font-serif font-bold text-brand-gold">${totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setStep(2)}
                        className="w-full py-5 bg-brand-gold text-brand-black font-bold tracking-widest uppercase rounded-full flex items-center justify-center gap-2 group hover:scale-[1.02] transition-transform"
                      >
                        Checkout <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="checkout"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl mx-auto"
              >
                <header className="mb-12 text-center">
                  <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-cream mb-4">
                    Final <span className="italic text-brand-gold">Details</span>
                  </h1>
                  <p className="text-brand-cream/50 uppercase tracking-[0.2em] text-xs font-bold">Secure Checkout</p>
                </header>

                <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {/* Payment Method Selection */}
                    <div className="glass p-8 rounded-[40px] border-white/5 space-y-6">
                      <h3 className="text-lg font-serif font-bold text-brand-cream mb-4">Select Payment</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {paymentMethods.map((method) => (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setPaymentMethod(method.id)}
                            className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                              paymentMethod === method.id 
                                ? "bg-brand-gold/10 border-brand-gold text-brand-gold" 
                                : "bg-white/5 border-white/10 text-brand-cream/60 hover:border-white/20"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {method.icon}
                              <span className="text-sm font-bold uppercase tracking-widest">{method.name}</span>
                            </div>
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              paymentMethod === method.id 
                                ? "bg-brand-gold border-brand-gold" 
                                : "border-white/20"
                            }`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Conditional Payment Forms */}
                    <div className="glass p-8 rounded-[40px] border-white/5 space-y-6">
                      <AnimatePresence mode="wait">
                        {paymentMethod === "card" && (
                          <motion.div
                            key="card-form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-6"
                          >
                            <h3 className="text-lg font-serif font-bold text-brand-cream mb-2 flex items-center gap-2">
                              <CreditCard size={18} className="text-brand-gold" /> Card Details
                            </h3>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-brand-gold/60 ml-2">Card Number</label>
                                <input required type="text" placeholder="•••• •••• •••• ••••" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors" />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-brand-gold/60 ml-2">Expiry</label>
                                    <input required type="text" placeholder="MM/YY" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors" />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-brand-gold/60 ml-2">CVV</label>
                                    <input required type="text" placeholder="•••" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors" />
                                  </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {paymentMethod === "wallet" && (
                          <motion.div
                            key="wallet-form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="text-center py-8"
                          >
                            <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                               <ShoppingBag size={32} className="text-brand-gold" />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-brand-cream mb-4">Express Checkout</h3>
                            <p className="text-brand-cream/50 text-sm mb-8">Pay securely using your preferred digital wallet.</p>
                            <div className="grid grid-cols-2 gap-4">
                               <button type="button" className="py-4 bg-white/5 rounded-2xl border border-white/10 font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">Apple Pay</button>
                               <button type="button" className="py-4 bg-white/5 rounded-2xl border border-white/10 font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">Google Pay</button>
                            </div>
                          </motion.div>
                        )}

                        {paymentMethod === "bank" && (
                          <motion.div
                            key="bank-form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-4"
                          >
                            <h3 className="text-lg font-serif font-bold text-brand-cream mb-2">Direct Bank Transfer</h3>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                               <div className="flex justify-between text-xs">
                                  <span className="text-brand-cream/40 uppercase tracking-widest">Bank Name</span>
                                  <span className="text-brand-gold font-bold">KAISEKI GLOBAL BANK</span>
                               </div>
                               <div className="flex justify-between text-xs">
                                  <span className="text-brand-cream/40 uppercase tracking-widest">Account Number</span>
                                  <span className="text-brand-gold font-bold">8888-0000-1234</span>
                               </div>
                            </div>
                            <p className="text-[10px] text-brand-cream/30 italic">Please use your order number as payment reference.</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="glass p-8 rounded-[40px] border-white/5 space-y-6">
                       <h3 className="text-lg font-serif font-bold text-brand-cream mb-2">Delivery Address</h3>
                       <div className="space-y-4">
                          <input required type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors" />
                          <input required type="text" placeholder="Street Address" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors" />
                          <div className="grid grid-cols-2 gap-4">
                              <input required type="text" placeholder="City" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors" />
                              <input required type="text" placeholder="Zip" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors" />
                          </div>
                       </div>
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-6 bg-brand-gold text-brand-black font-bold tracking-widest uppercase rounded-full flex items-center justify-center gap-2 group shadow-lg shadow-brand-gold/20"
                    >
                      Complete Order (${totalPrice.toFixed(2)})
                    </button>
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full text-brand-cream/40 text-xs font-bold uppercase tracking-widest hover:text-brand-gold transition-colors"
                    >
                      Back to Bag
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="glass p-16 rounded-[60px] border-brand-gold/20 relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-brand-gold/10 blur-[80px] rounded-full" />
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10, delay: 0.2 }}
                    className="relative z-10 w-24 h-24 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-gold/30"
                  >
                    <CheckCircle2 size={48} className="text-brand-black" />
                  </motion.div>
                  <h1 className="text-5xl font-serif font-bold text-brand-cream mb-6">Order <span className="italic text-brand-gold">Confirmed</span></h1>
                  <p className="text-brand-cream/60 text-lg leading-relaxed mb-12">
                    Your exquisite selection has been received. Our masters are now preparing your sensory experience. 
                    Expect fulfillment in approximately 30-45 minutes.
                  </p>
                  <Link href="/" className="inline-block px-12 py-5 border border-brand-gold text-brand-gold font-bold tracking-[0.2em] uppercase rounded-full hover:bg-brand-gold hover:text-brand-black transition-all">
                    Return to Experience
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Footer />
      </main>
    </LenisProvider>
  );
}
