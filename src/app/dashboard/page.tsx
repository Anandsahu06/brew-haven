'use client';

import React from 'react';
import Link from 'next/link';
import { Award, Coffee, Heart, ShoppingBag, Gift, Sparkles, CheckCircle2 } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { formatCurrency } from '@/lib/utils';

export default function CustomerDashboardPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="pt-28 pb-20 min-h-screen bg-bg-primary font-sans text-txt-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* User Profile Banner */}
        <div className="p-8 rounded-3xl surface-card border-border-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-coffee flex items-center justify-center text-gold border-2 border-gold font-display font-bold text-2xl">
              BH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold text-txt-primary">Aarav Sharma</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/40 text-[10px] font-bold uppercase font-mono">
                  Gold Member
                </span>
              </div>
              <p className="text-xs text-txt-muted mt-0.5">Member since Oct 2024 • aarav.sharma@coffee.in</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-bg-surface border border-border-subtle flex items-center gap-4">
            <div>
              <span className="text-[10px] text-txt-muted uppercase font-bold tracking-widest block">Roast Points Balance</span>
              <span className="font-display text-2xl font-bold text-gold">420 Pts</span>
            </div>
            <Link
              href="/gift-cards"
              className="px-4 py-2 rounded-xl bg-gold text-soft-black text-xs font-bold uppercase tracking-wider hover:bg-gold-light"
            >
              Redeem Rewards
            </Link>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Redeemable Vouchers & Points Progress (Col 2) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Rewards Vouchers */}
            <div className="p-6 rounded-3xl surface-card space-y-4">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                <h3 className="font-display text-lg font-bold text-txt-primary flex items-center gap-2">
                  <Gift className="w-5 h-5 text-gold" /> Available Reward Vouchers
                </h3>
                <span className="text-xs text-txt-muted">3 Unlocked</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-bg-surface border border-gold/40 space-y-2">
                  <span className="text-[10px] font-mono text-gold uppercase font-bold">150 Points</span>
                  <h4 className="font-display font-bold text-txt-primary text-sm">₹200 Off Any Craft Brew</h4>
                  <button className="w-full py-1.5 rounded-lg bg-gold text-soft-black font-bold text-xs">
                    Redeem Code
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-bg-surface border border-border-subtle space-y-2 opacity-80">
                  <span className="text-[10px] font-mono text-txt-muted uppercase font-bold">250 Points</span>
                  <h4 className="font-display font-bold text-txt-primary text-sm">Free Pistachio Saffron Croissant</h4>
                  <button className="w-full py-1.5 rounded-lg bg-bg-card border border-border-subtle text-txt-muted text-xs font-bold">
                    Need 250 Pts
                  </button>
                </div>
              </div>
            </div>

            {/* Saved Favorite Drinks */}
            <div className="p-6 rounded-3xl surface-card space-y-4">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                <h3 className="font-display text-lg font-bold text-txt-primary flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" /> Saved Favorite Drinks ({wishlist.length})
                </h3>
              </div>

              {wishlist.length === 0 ? (
                <p className="text-xs text-txt-muted text-center py-6">No favorite drinks saved yet. Click the heart icon on any menu item!</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {wishlist.map((item) => (
                    <div key={item.id} className="p-3 rounded-xl bg-bg-surface border border-border-subtle flex items-center justify-between">
                      <div>
                        <h4 className="font-display font-bold text-txt-primary text-xs">{item.name}</h4>
                        <span className="text-[10px] text-gold font-mono">{formatCurrency(item.price)}</span>
                      </div>
                      <Link href="/menu" className="text-[10px] text-gold font-bold uppercase hover:underline">
                        Order Now
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right: Recent Order History Timeline (Col 1) */}
          <div className="p-6 rounded-3xl surface-card space-y-4 h-fit">
            <h3 className="font-display text-lg font-bold text-txt-primary flex items-center gap-2 border-b border-border-subtle pb-3">
              <ShoppingBag className="w-5 h-5 text-gold" /> Order History
            </h3>

            <div className="space-y-4 text-xs font-sans">
              <div className="p-3.5 rounded-xl bg-bg-surface border border-border-subtle space-y-1">
                <div className="flex justify-between font-mono">
                  <span className="text-gold font-bold">ORD-88219</span>
                  <span className="text-txt-muted">Yesterday</span>
                </div>
                <p className="text-txt-primary font-medium">Obsidian Reserve Espresso (x2)</p>
                <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Delivered (₹480)
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-bg-surface border border-border-subtle space-y-1">
                <div className="flex justify-between font-mono">
                  <span className="text-gold font-bold">ORD-74012</span>
                  <span className="text-txt-muted">3 Days Ago</span>
                </div>
                <p className="text-txt-primary font-medium">Smoked Vanilla Cold Drip (x1)</p>
                <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Delivered (₹320)
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
