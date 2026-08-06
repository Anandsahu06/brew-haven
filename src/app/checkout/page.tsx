'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Store, Truck, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import { sanitizeInput } from '@/lib/security';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, total, clearCart } = useCart();

  const [fulfillmentType, setFulfillmentType] = useState<'pickup' | 'delivery'>('pickup');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = sanitizeInput(fullName);
    const cleanEmail = sanitizeInput(email);
    const cleanPhone = sanitizeInput(phone);
    const cleanAddress = sanitizeInput(address);

    if (!cleanName || !cleanEmail || !cleanPhone) return;

    clearCart();
    router.push('/checkout/success');
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-bg-primary font-sans text-txt-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold text-gold tracking-widest font-display">Secure Checkout</span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-txt-primary">Order Verification</h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Form Columns (Col 2) */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Fulfillment Type Selector */}
            <div className="p-6 rounded-3xl surface-card space-y-4 border-border-subtle shadow-lg">
              <label className="text-xs uppercase font-bold tracking-widest text-gold font-display">
                1. Select Fulfillment Method
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFulfillmentType('pickup')}
                  className={`relative p-5 rounded-2xl border text-left transition-all duration-300 ${
                    fulfillmentType === 'pickup'
                      ? 'bg-gold/10 border-gold shadow-[0_0_20px_rgba(197,155,39,0.25)] scale-[1.01]'
                      : 'bg-bg-card border-border-subtle hover:border-gold hover:bg-gold/5 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(197,155,39,0.15)] opacity-85 hover:opacity-100'
                  }`}
                >
                  <Store className="w-5 h-5 text-gold mb-2" />
                  <span className="font-display font-bold text-txt-primary text-sm block">Express Bar Pickup</span>
                  <span className="text-xs text-txt-muted block font-light mt-0.5">Ready in 10 mins at Flagship</span>

                  {fulfillmentType === 'pickup' && (
                    <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-gold text-soft-black flex items-center justify-center shadow-md">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setFulfillmentType('delivery')}
                  className={`relative p-5 rounded-2xl border text-left transition-all duration-300 ${
                    fulfillmentType === 'delivery'
                      ? 'bg-gold/10 border-gold shadow-[0_0_20px_rgba(197,155,39,0.25)] scale-[1.01]'
                      : 'bg-bg-card border-border-subtle hover:border-gold hover:bg-gold/5 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(197,155,39,0.15)] opacity-85 hover:opacity-100'
                  }`}
                >
                  <Truck className="w-5 h-5 text-gold mb-2" />
                  <span className="font-display font-bold text-txt-primary text-sm block">Local Artisan Courier</span>
                  <span className="text-xs text-txt-muted block font-light mt-0.5">Temperature controlled box</span>

                  {fulfillmentType === 'delivery' && (
                    <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-gold text-soft-black flex items-center justify-center shadow-md">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Customer Information (Blank by Default with Sanitization) */}
            <div className="p-6 rounded-3xl surface-card space-y-4 border-border-subtle shadow-lg">
              <label className="text-xs uppercase font-bold tracking-widest text-gold font-display">
                2. Contact & Delivery Details
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="px-4 py-3.5 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary hover:border-gold/60 focus:outline-none focus:border-gold focus:shadow-[0_0_15px_rgba(197,155,39,0.15)] transition-all duration-300"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3.5 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary hover:border-gold/60 focus:outline-none focus:border-gold focus:shadow-[0_0_15px_rgba(197,155,39,0.15)] transition-all duration-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <input
                  type="tel"
                  required
                  placeholder="Mobile Phone (e.g. +91 98765 43210) *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="px-4 py-3.5 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary hover:border-gold/60 focus:outline-none focus:border-gold focus:shadow-[0_0_15px_rgba(197,155,39,0.15)] transition-all duration-300"
                />
                {fulfillmentType === 'delivery' && (
                  <input
                    type="text"
                    required
                    placeholder="Delivery Address *"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="px-4 py-3.5 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary hover:border-gold/60 focus:outline-none focus:border-gold focus:shadow-[0_0_15px_rgba(197,155,39,0.15)] transition-all duration-300"
                  />
                )}
              </div>
            </div>

          </div>

          {/* Checkout Action Summary (Col 1) */}
          <div className="p-6 rounded-3xl surface-card space-y-6 border-border-subtle shadow-xl h-fit">
            <h3 className="font-display text-lg font-bold text-txt-primary border-b border-border-subtle pb-3">
              Payment Summary
            </h3>

            <div className="space-y-2.5 text-xs font-sans">
              <div className="flex justify-between text-txt-muted">
                <span>Items Count</span>
                <span className="font-mono text-txt-primary font-bold">{cart.length} crafts</span>
              </div>
              <div className="flex justify-between text-txt-muted">
                <span>Fulfillment</span>
                <span className="font-mono text-gold font-bold uppercase">{fulfillmentType}</span>
              </div>
              <div className="flex justify-between text-txt-primary text-lg font-bold font-display pt-3 border-t border-border-subtle">
                <span>Amount Due</span>
                <span className="text-gold font-mono">{formatCurrency(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gold text-soft-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-gold-light hover:shadow-[0_4px_25px_rgba(197,155,39,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300"
            >
              <ShieldCheck className="w-4 h-4" /> Place Order ({formatCurrency(total)})
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
