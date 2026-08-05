'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import { CartItem } from '@/types';

export const CartSheet: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    total,
    couponCode: appliedCoupon,
    applyCoupon,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!inputCode.trim()) return;

    const success = applyCoupon(inputCode.trim());
    if (success) {
      setInputCode('');
    } else {
      setCouponError('Invalid coupon. Try BREWHAVEN10 for 15% off.');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden font-sans">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-screen max-w-md bg-bg-card border-l border-border-subtle shadow-2xl flex flex-col justify-between text-txt-primary"
          >
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gold/10 border border-gold/30 text-gold">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-txt-primary">Your Craft Cart</h3>
                  <span className="text-xs text-txt-muted">{cart.length} items selected</span>
                </div>
              </div>

              {/* Close Drawer Button with Hover Scale & Gold Glow */}
              <button
                onClick={() => setIsCartOpen(false)}
                aria-label="Close Cart Sheet"
                className="p-2.5 rounded-full bg-bg-surface border border-border-subtle text-txt-muted hover:text-gold hover:border-gold hover:bg-gold/15 hover:scale-110 hover:shadow-[0_0_15px_rgba(197,155,39,0.3)] transition-all duration-300 active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <ShoppingBag className="w-12 h-12 text-txt-muted mx-auto opacity-50" />
                  <p className="text-sm text-txt-muted font-light">Your craft cart is empty.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2.5 rounded-xl bg-gold text-soft-black text-xs font-bold uppercase tracking-wider hover:bg-gold-light hover:shadow-[0_4px_20px_rgba(197,155,39,0.35)] transition-all duration-300 active:scale-95"
                  >
                    Explore Artisanal Menu
                  </button>
                </div>
              ) : (
                cart.map((cartItem: CartItem) => {
                  const isMenu = cartItem.itemType === 'menu';
                  const item = cartItem.item;

                  return (
                    <div
                      key={cartItem.cartId}
                      className="p-4 rounded-2xl bg-bg-surface border border-border-subtle flex items-start gap-3 relative group hover:border-gold/50 transition-colors"
                    >
                      {isMenu && (item as any).image && (
                        <div className="relative h-16 w-16 rounded-xl overflow-hidden shrink-0 bg-bg-card">
                          <Image src={(item as any).image} alt={item.name} fill className="object-cover" />
                        </div>
                      )}

                      <div className="flex-1 space-y-1 pr-6">
                        <h4 className="font-display font-bold text-sm text-txt-primary leading-tight">{item.name}</h4>
                        <span className="font-display text-xs text-gold font-bold block">
                          {formatCurrency(cartItem.price * cartItem.quantity)}
                        </span>

                        {/* Quantity Controls with Hover Highlights */}
                        <div className="flex items-center gap-2 pt-1">
                          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-bg-card border border-border-subtle">
                            <button
                              onClick={() => updateQuantity(cartItem.cartId, cartItem.quantity - 1)}
                              className="p-1 rounded text-txt-muted hover:text-gold hover:bg-gold/15 transition-all"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs font-bold px-1">{cartItem.quantity}</span>
                            <button
                              onClick={() => updateQuantity(cartItem.cartId, cartItem.quantity + 1)}
                              className="p-1 rounded text-txt-muted hover:text-gold hover:bg-gold/15 transition-all"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove Trash Button with Hover Scale */}
                      <button
                        onClick={() => removeFromCart(cartItem.cartId)}
                        className="absolute top-3 right-3 p-1.5 rounded-lg text-txt-muted hover:text-red-500 hover:bg-red-500/15 hover:scale-110 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Order Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-border-subtle bg-bg-surface space-y-4">
                
                {/* Coupon Code Input */}
                {appliedCoupon ? (
                  <div className="p-3 rounded-xl bg-gold/10 border border-gold/40 flex items-center justify-between text-xs text-gold font-mono">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Tag className="w-3.5 h-3.5" /> Coupon Applied ({appliedCoupon})
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-1 font-sans">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo Code (e.g. BREWHAVEN10)"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        className="flex-1 px-3.5 py-2 rounded-xl bg-bg-card border border-border-subtle text-txt-primary text-xs font-mono uppercase focus:outline-none focus:border-gold"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-bg-card border border-border-subtle hover:border-gold hover:text-gold text-xs font-bold uppercase transition-all duration-300 active:scale-95"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-[10px] text-red-400">{couponError}</p>}
                  </form>
                )}

                {/* Subtotal Calculation */}
                <div className="space-y-1.5 text-xs text-txt-muted border-t border-border-subtle pt-3 font-sans">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-txt-primary">{formatCurrency(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-gold">
                      <span>Discount</span>
                      <span className="font-mono">-{formatCurrency(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold font-display text-txt-primary pt-2 border-t border-border-subtle">
                    <span>Total Amount</span>
                    <span className="text-gold">{formatCurrency(total)}</span>
                  </div>
                </div>

                {/* Proceed to Checkout Button with Hover Lift & 25px Glow */}
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-4 rounded-xl bg-gold text-soft-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-gold-light hover:shadow-[0_4px_25px_rgba(197,155,39,0.4)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                >
                  Proceed to Checkout ({formatCurrency(total)})
                  <ArrowRight className="w-4 h-4" />
                </Link>

              </div>
            )}

          </motion.div>
        </div>

      </div>
    </AnimatePresence>
  );
};
