'use client';

import React from 'react';
import { MenuGrid } from '@/components/menu/MenuGrid';
import { Coffee } from 'lucide-react';

export default function MenuPage() {
  return (
    <div className="pt-28 pb-16 min-h-screen bg-haven-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-haven-gold/15 border border-haven-gold/30 text-xs text-haven-gold">
            <Coffee className="w-3.5 h-3.5" />
            <span>Artisanal Craft Menu</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight">
            The Haven Selection
          </h1>
          <p className="text-sm sm:text-base text-haven-muted font-light leading-relaxed">
            Hand-crafted espresso micro-lots, 24-hour slow ice tower cold drips, rare Geisha pour-overs, and freshly laminated French pastries.
          </p>
        </div>

        {/* Menu Grid */}
        <MenuGrid />

      </div>
    </div>
  );
}
