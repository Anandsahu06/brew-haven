'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Plus, Star, MapPin, Check } from 'lucide-react';
import { MenuItem } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useSoundscape } from '@/context/SoundscapeContext';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { playSteamSound } = useSoundscape();
  const [added, setAdded] = React.useState(false);

  if (!item) return null;

  const isFavorite = isInWishlist(item.id);

  const handleAddToCart = () => {
    playSteamSound();
    addToCart(item, 'menu', 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-bg-card border border-border-subtle rounded-3xl shadow-2xl overflow-hidden text-txt-primary z-10 font-sans"
        >
          {/* Close & Favorite buttons with enhanced hover scale & gold glow */}
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <button
              onClick={() => toggleWishlist(item)}
              aria-label="Toggle Wishlist Favorite"
              className={`p-2.5 rounded-full border backdrop-blur-md transition-all duration-300 active:scale-95 ${
                isFavorite
                  ? 'bg-red-500/20 border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                  : 'bg-bg-primary/80 border-border-subtle text-txt-muted hover:text-red-500 hover:border-gold hover:bg-gold/15 hover:scale-110 hover:shadow-[0_0_15px_rgba(197,155,39,0.3)]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500' : ''}`} />
            </button>

            <button
              onClick={onClose}
              aria-label="Close Modal"
              className="p-2.5 rounded-full bg-bg-primary/80 border border-border-subtle text-txt-muted hover:text-gold hover:border-gold hover:bg-gold/15 hover:scale-110 hover:shadow-[0_0_15px_rgba(197,155,39,0.3)] backdrop-blur-md transition-all duration-300 active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Header */}
            <div className="relative h-64 md:h-full w-full bg-bg-surface">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent md:hidden" />
            </div>

            {/* Content Details */}
            <div className="p-6 md:p-8 space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30 text-[10px] font-bold uppercase tracking-wider font-display">
                    {item.category}
                  </span>
                  {item.isBestseller && (
                    <span className="px-2.5 py-0.5 rounded-full bg-coffee text-gold border border-gold/40 text-[10px] font-bold uppercase tracking-wider">
                      Bestseller
                    </span>
                  )}
                </div>

                <h3 className="font-display text-2xl font-bold text-txt-primary leading-tight">
                  {item.name}
                </h3>

                {item.subtitle && (
                  <p className="text-xs font-semibold text-gold font-sans">{item.subtitle}</p>
                )}

                <p className="text-xs text-txt-muted font-light leading-relaxed">
                  {item.description}
                </p>

                {/* Metrics Pill Grid */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-bg-surface border border-border-subtle">
                    <span className="text-[10px] text-txt-muted block uppercase">Calories</span>
                    <span className="font-bold text-txt-primary">{item.calories || 15} kcal</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-bg-surface border border-border-subtle">
                    <span className="text-[10px] text-txt-muted block uppercase">Prep Time</span>
                    <span className="font-bold text-txt-primary">{item.prepTime || '4 mins'}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-bg-surface border border-border-subtle">
                    <span className="text-[10px] text-txt-muted block uppercase">SCA Rating</span>
                    <span className="font-bold text-gold flex items-center justify-center gap-1">
                      <Star className="w-3 h-3 fill-gold" /> {item.rating}
                    </span>
                  </div>
                </div>

                {/* Origin & Tags */}
                {item.origin && (
                  <div className="p-3 rounded-xl bg-bg-surface border border-border-subtle text-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-gold tracking-widest font-display">
                      Micro-Lot Origin
                    </span>
                    <p className="text-txt-primary font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gold shrink-0" /> {item.origin} ({item.roastLevel || 'Medium Roast'})
                    </p>
                  </div>
                )}
              </div>

              {/* Price & Add CTA with enhanced hover lift & 25px gold shadow */}
              <div className="pt-4 border-t border-border-subtle flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-txt-muted uppercase font-bold tracking-widest block">Price</span>
                  <span className="font-display text-2xl font-bold text-gold">
                    {formatCurrency(item.price)}
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 ${
                    added
                      ? 'bg-gold text-soft-black border-gold shadow-[0_4px_25px_rgba(197,155,39,0.4)]'
                      : 'bg-bg-surface text-txt-primary border-border-subtle hover:bg-gold hover:text-soft-black hover:border-gold hover:shadow-[0_4px_25px_rgba(197,155,39,0.4)] hover:-translate-y-0.5'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added!
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add to Order
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
