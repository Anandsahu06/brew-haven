'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Store, Truck, ArrowRight, Flame } from 'lucide-react';
import { MenuGrid } from '@/components/menu/MenuGrid';

export default function OnlineOrderPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-bg-primary font-sans text-txt-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-semibold text-gold font-sans uppercase tracking-widest">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Express Online Ordering</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-txt-primary tracking-tight">
            Order Ahead & Skip the Line
          </h1>
          <p className="text-sm sm:text-base text-txt-muted font-light leading-relaxed">
            Select express bar takeaway pickup or temperature-controlled local courier delivery.
          </p>
        </div>

        {/* Menu Grid Selector */}
        <MenuGrid />

      </div>
    </div>
  );
}
