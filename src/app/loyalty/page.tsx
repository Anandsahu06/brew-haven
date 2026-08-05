'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Award, Gift, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function LoyaltyPage() {
  const [monthlySpend, setMonthlySpend] = useState<number>(60);
  const calculatedPoints = monthlySpend * 5;

  return (
    <div className="pt-28 pb-20 min-h-screen bg-bg-primary font-sans text-txt-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-semibold text-gold font-sans uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>Haven Club Loyalty</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-txt-primary tracking-tight">
            Earn Rewards with Every Cup
          </h1>
          <p className="text-sm sm:text-base text-txt-muted font-light leading-relaxed">
            Earn 5 Roast Points for every $1 spent. Unlock complimentary micro-lot pour-overs and VIP masterclass invites.
          </p>
        </div>

        {/* Points Calculator Widget */}
        <div className="p-8 rounded-3xl surface-card border-gold/40 max-w-xl mx-auto space-y-6 text-center shadow-xl">
          <h3 className="font-display text-xl font-bold text-txt-primary">Roast Points Calculator</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-txt-muted font-mono">
              <span>Monthly Coffee Spend</span>
              <span className="text-gold font-bold">{formatCurrency(monthlySpend)}</span>
            </div>
            <input
              type="range"
              min="10"
              max="300"
              step="5"
              value={monthlySpend}
              onChange={(e) => setMonthlySpend(parseInt(e.target.value))}
              className="w-full h-2 bg-bg-surface rounded-lg appearance-none cursor-pointer accent-gold"
            />
          </div>

          <div className="p-4 rounded-2xl bg-bg-surface border border-border-subtle font-mono text-center">
            <span className="text-[10px] text-txt-muted uppercase font-sans">You Will Earn</span>
            <p className="text-3xl font-bold text-gold">{calculatedPoints} Pts / month</p>
            <p className="text-xs text-txt-primary font-sans mt-1">
              Equivalent to <strong>{Math.floor(calculatedPoints / 150)} Free Craft Brews</strong>
            </p>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gold text-soft-black font-bold uppercase tracking-wider text-xs hover:bg-gold-light"
          >
            Join Haven Club & Claim 50 Bonus Points <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
