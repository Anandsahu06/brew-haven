'use client';

import React from 'react';
import Image from 'next/image';
import { Award, Compass, ShieldCheck, HeartHandshake, Leaf, Flame } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-bg-primary font-sans text-txt-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-semibold text-gold font-sans uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" />
            <span>Architectural Philosophy</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-txt-primary tracking-tight">
            About Brew Haven
          </h1>
          <p className="text-sm sm:text-base text-txt-muted font-light leading-relaxed">
            Founded in 2021 as a sanctuary from digital friction, Brew Haven bridges highland farm craftsmanship with architectural peace.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl surface-card space-y-4 border-border-subtle">
            <div className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center border border-gold/30">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-txt-primary">100% Direct-Trade</h3>
            <p className="text-xs text-txt-muted font-light leading-relaxed">
              We pay 45% above Fairtrade minimums directly to micro-lot farmers in Panama, Ethiopia, and Colombia.
            </p>
          </div>

          <div className="p-8 rounded-3xl surface-card space-y-4 border-border-subtle">
            <div className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center border border-gold/30">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-txt-primary">Cast-Iron Roasting</h3>
            <p className="text-xs text-txt-muted font-light leading-relaxed">
              Small 5kg batch drum roasting preserves volatile fruit aromatics while developing rich caramel sugars.
            </p>
          </div>

          <div className="p-8 rounded-3xl surface-card space-y-4 border-border-subtle">
            <div className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center border border-gold/30">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-txt-primary">Botanical Sanctuaries</h3>
            <p className="text-xs text-txt-muted font-light leading-relaxed">
              Our flagship cafes feature natural glasshouse greenery, soundproof acoustic geometry, and ergonomic seating.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
