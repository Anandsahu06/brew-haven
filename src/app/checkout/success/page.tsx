'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, Coffee, Clock, Printer, ArrowRight, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderSuccessPage() {
  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C59B27', '#EFE9E1', '#3B281C'],
    });
  }, []);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-bg-primary font-sans text-txt-primary">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <div className="w-20 h-20 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto border-2 border-gold shadow-lg">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-bold text-gold tracking-widest font-display">Payment Confirmed</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-txt-primary">Order Received!</h1>
          <p className="text-xs sm:text-sm text-txt-muted max-w-md mx-auto font-light">
            Our master baristas have begun extracting your micro-lot order at Flagship Roastery.
          </p>
        </div>

        {/* Digital Receipt Pass */}
        <div className="p-8 rounded-3xl surface-card border-gold/40 space-y-6 text-left shadow-2xl">
          <div className="flex items-center justify-between border-b border-border-subtle pb-4 font-mono">
            <div>
              <span className="text-[10px] text-txt-muted uppercase font-sans">Order Pass Code</span>
              <p className="text-xl font-bold text-gold">BH-ORD-9021</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 text-xs font-bold">
              In Kitchen Queue
            </span>
          </div>

          {/* Timeline */}
          <div className="space-y-3 font-sans text-xs">
            <span className="text-[10px] uppercase font-bold text-gold tracking-widest font-display">Live Order Status</span>
            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-2.5 rounded-xl bg-gold/15 border border-gold text-gold font-bold">
                ✓ Confirmed
              </div>
              <div className="p-2.5 rounded-xl bg-bg-surface border border-gold/40 text-gold animate-pulse font-bold">
                ⚡ Brewing
              </div>
              <div className="p-2.5 rounded-xl bg-bg-surface border border-border-subtle text-txt-muted opacity-50">
                ☕ Ready Bar
              </div>
            </div>
          </div>

          {/* Location & Instructions */}
          <div className="p-4 rounded-2xl bg-bg-surface border border-border-subtle text-xs space-y-1">
            <span className="text-[10px] text-gold uppercase font-bold font-display">Pickup Location</span>
            <p className="font-medium text-txt-primary flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gold" /> Flagship Sanctuary — 742 Obsidian Ave, Downtown
            </p>
            <p className="text-[11px] text-txt-muted">Show your digital order pass code code at the express bar counter.</p>
          </div>

          <button
            onClick={() => window.print()}
            className="w-full py-3 rounded-xl bg-bg-surface border border-border-subtle hover:border-gold text-txt-primary text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4 text-gold" /> Print Digital Receipt Invoice
          </button>
        </div>

        <Link
          href="/menu"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-soft-black font-bold uppercase tracking-wider text-xs hover:bg-gold-light"
        >
          Return to Menu <ArrowRight className="w-4 h-4" />
        </Link>

      </div>
    </div>
  );
}
