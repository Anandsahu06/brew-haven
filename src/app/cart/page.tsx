'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import { MenuItem } from '@/types';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal, tax, discount, total, couponCode, applyCoupon } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponError('');
    } else {
      setCouponError('Invalid promo code. Try BREWHAVEN10');
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-bg-primary font-sans text-txt-primary">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-subtle pb-6">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-txt-primary">Your Order Cart</h1>
            <p className="text-xs text-txt-muted mt-1">Review your selected micro-lots and artisanal pastries</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-mono font-bold">
            {cart.length} Items
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="p-12 rounded-3xl surface-card text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-bg-surface text-txt-muted flex items-center justify-center mx-auto border border-border-subtle">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-display text-xl font-bold text-txt-primary">Your Cart is Empty</h3>
            <p className="text-xs text-txt-muted font-light">Explore our rare micro-lot single origins and freshly baked croissants.</p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-soft-black font-bold uppercase tracking-wider text-xs hover:bg-gold-light"
            >
              Explore Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left: Cart Item List (Col 2) */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((cartItem) => {
                const menuItem = cartItem.item as MenuItem;
                const imageSrc = menuItem.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80';

                return (
                  <div
                    key={cartItem.cartId}
                    className="p-4 rounded-2xl surface-card border-border-subtle flex items-center gap-4"
                  >
                    <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-bg-surface shrink-0">
                      <Image src={imageSrc} alt={cartItem.item.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-txt-primary text-sm truncate">{cartItem.item.name}</h4>
                      {cartItem.formattedOptions && cartItem.formattedOptions.length > 0 && (
                        <p className="text-[10px] text-gold font-mono truncate">
                          {cartItem.formattedOptions.join(' • ')}
                        </p>
                      )}
                      <p className="font-display font-bold text-txt-primary text-sm mt-1">{formatCurrency(cartItem.price)}</p>
                    </div>

                    <div className="flex items-center gap-2 p-1 rounded-lg bg-bg-surface border border-border-subtle">
                      <button
                        onClick={() => updateQuantity(cartItem.cartId, cartItem.quantity - 1)}
                        className="p-1 text-txt-muted hover:text-txt-primary"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono text-xs font-bold w-5 text-center">{cartItem.quantity}</span>
                      <button
                        onClick={() => updateQuantity(cartItem.cartId, cartItem.quantity + 1)}
                        className="p-1 text-txt-muted hover:text-txt-primary"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(cartItem.cartId)}
                      className="p-2 text-txt-muted hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Right: Order Summary & Coupon (Col 1) */}
            <div className="p-6 rounded-3xl surface-card space-y-6 border-border-subtle h-fit">
              <h3 className="font-display text-lg font-bold text-txt-primary border-b border-border-subtle pb-3">
                Order Summary
              </h3>

              {/* Coupon Input */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="text-[10px] text-txt-muted uppercase font-bold tracking-widest block font-display">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. BREWHAVEN10"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary text-xs uppercase font-mono focus:outline-none focus:border-gold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-bg-surface border border-border-subtle hover:border-gold text-xs font-bold uppercase"
                  >
                    Apply
                  </button>
                </div>
                {couponCode && (
                  <p className="text-[10px] text-emerald-500 font-mono">✓ Code {couponCode} applied (15% off)</p>
                )}
                {couponError && (
                  <p className="text-[10px] text-red-500 font-mono">{couponError}</p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs font-sans border-t border-border-subtle pt-4">
                <div className="flex justify-between text-txt-muted">
                  <span>Subtotal</span>
                  <span className="font-mono text-txt-primary">{formatCurrency(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-500">
                    <span>Discount (15%)</span>
                    <span className="font-mono">-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-txt-muted">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-mono text-txt-primary">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between text-txt-primary text-base font-bold font-display pt-2 border-t border-border-subtle">
                  <span>Total</span>
                  <span className="text-gold font-mono">{formatCurrency(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full py-4 rounded-xl bg-gold text-soft-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-gold-light transition-all text-center block"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4 inline" />
              </Link>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
