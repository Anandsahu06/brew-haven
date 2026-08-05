'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Star, Plus, Minus, Heart, Check, ArrowLeft, MapPin } from 'lucide-react';
import { MENU_ITEMS } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useSoundscape } from '@/context/SoundscapeContext';

export default function ProductDetailsPage() {
  const params = useParams();
  const itemId = params.id as string;
  const item = MENU_ITEMS.find((i) => i.id === itemId) || MENU_ITEMS[0];

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { playSteamSound } = useSoundscape();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<'12oz' | '16oz'>('12oz');
  const [added, setAdded] = useState(false);

  const isFavorite = isInWishlist(item.id);

  const handleAddToCart = () => {
    playSteamSound();
    addToCart(item, 'menu', quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-bg-primary font-sans text-txt-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Back Link */}
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-txt-muted hover:text-gold transition-colors font-display"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Artisanal Menu
        </Link>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Product Image Stage */}
          <div className="relative h-96 md:h-[500px] w-full rounded-3xl overflow-hidden surface-card border-border-subtle">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-40" />

            <button
              onClick={() => toggleWishlist(item)}
              aria-label="Toggle Wishlist Favorite"
              className={`absolute top-6 right-6 p-3 rounded-full backdrop-blur-md border transition-all ${
                isFavorite
                  ? 'bg-red-500/20 border-red-500 text-red-500'
                  : 'bg-bg-primary/80 border-border-subtle text-txt-muted hover:text-txt-primary'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500' : ''}`} />
            </button>
          </div>

          {/* Product Details Column */}
          <div className="space-y-6">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-bold uppercase tracking-wider font-display">
                  {item.category}
                </span>
                {item.isBestseller && (
                  <span className="px-3 py-1 rounded-full bg-coffee text-gold border border-gold/40 text-xs font-bold uppercase tracking-wider">
                    Bestseller
                  </span>
                )}
              </div>

              <h1 className="font-display text-4xl sm:text-5xl font-bold text-txt-primary tracking-tight">
                {item.name}
              </h1>

              {item.subtitle && (
                <p className="text-sm font-semibold text-gold font-sans">{item.subtitle}</p>
              )}

              <div className="flex items-center gap-2 pt-1 text-xs">
                <Star className="w-4 h-4 text-gold fill-gold" />
                <span className="font-bold text-txt-primary">{item.rating}</span>
                <span className="text-txt-muted">({item.reviewsCount} verified reviews)</span>
              </div>
            </div>

            <p className="text-sm text-txt-muted font-light leading-relaxed">
              {item.description}
            </p>

            {/* Specifications Cards */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3.5 rounded-2xl bg-bg-surface border border-border-subtle">
                <span className="text-[10px] text-txt-muted uppercase font-bold block">Calories</span>
                <span className="font-bold text-txt-primary text-sm mt-0.5 block">{item.calories || 15} kcal</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-bg-surface border border-border-subtle">
                <span className="text-[10px] text-txt-muted uppercase font-bold block">Prep Time</span>
                <span className="font-bold text-txt-primary text-sm mt-0.5 block">{item.prepTime || '4 mins'}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-bg-surface border border-border-subtle">
                <span className="text-[10px] text-txt-muted uppercase font-bold block">SCA Score</span>
                <span className="font-bold text-gold text-sm mt-0.5 block">92.5 / 100</span>
              </div>
            </div>

            {/* Micro-lot Origin */}
            {item.origin && (
              <div className="p-4 rounded-2xl bg-bg-surface border border-border-subtle space-y-1 text-xs">
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider font-display">
                  Single-Origin Source
                </span>
                <p className="text-txt-primary font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold shrink-0" /> {item.origin} ({item.roastLevel || 'Medium Roast'})
                </p>
              </div>
            )}

            {/* Size Selector */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-bold tracking-widest text-gold font-display">
                Select Serving Size
              </label>
              <div className="flex gap-3">
                {(['12oz', '16oz'] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`flex-1 py-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                      selectedSize === sz
                        ? 'bg-gold text-soft-black border-gold shadow-[0_0_15px_rgba(197,155,39,0.3)]'
                        : 'bg-bg-surface text-txt-primary border-border-subtle hover:border-gold'
                    }`}
                  >
                    {sz === '12oz' ? 'Regular (12 oz)' : 'Large (16 oz)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add CTA */}
            <div className="pt-4 border-t border-border-subtle flex items-center gap-4">
              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-bg-surface border border-border-subtle">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-lg text-txt-muted hover:text-txt-primary"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-mono font-bold text-sm w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-lg text-txt-muted hover:text-txt-primary"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  added ? 'bg-gold text-soft-black' : 'bg-gold hover:bg-gold-light text-soft-black'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added ({formatCurrency(item.price * quantity)})
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" /> Add to Order ({formatCurrency(item.price * quantity)})
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
