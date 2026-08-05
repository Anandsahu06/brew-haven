'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Star, Check, Eye, MapPin } from 'lucide-react';
import { MENU_ITEMS } from '@/lib/data';
import { MenuItem } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useSoundscape } from '@/context/SoundscapeContext';
import { VoiceSearch } from './VoiceSearch';
import { ItemDetailModal } from './ItemDetailModal';

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'All Crafts' },
  { id: 'espresso', label: 'Espresso Bar' },
  { id: 'cold-crafts', label: 'Cold Crafts' },
  { id: 'pour-over', label: 'Pour-Over Reserve' },
  { id: 'signature-latte', label: 'Signature Lattes' },
  { id: 'artisan-bakery', label: 'Artisan Bakery' },
  { id: 'beans-merch', label: 'Whole Beans' },
];

export const MenuGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const [detailItem, setDetailItem] = useState<MenuItem | null>(null);

  const { addToCart } = useCart();
  const { playSteamSound } = useSoundscape();

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.origin && item.origin.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    playSteamSound();
    addToCart(item, 'menu', 1);

    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Search & Filter Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 md:pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4.5 py-2 text-xs font-bold uppercase tracking-wider rounded-full whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-gold text-soft-black border border-gold shadow-[0_0_15px_rgba(197,155,39,0.35)] font-display scale-[1.02]'
                    : 'bg-bg-card text-txt-muted border border-border-subtle hover:text-gold hover:border-gold hover:bg-gold/10 hover:-translate-y-0.5 transition-all duration-300 font-sans'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar + Voice Search */}
        <div className="flex items-center gap-2 w-full md:w-80 font-sans">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search beans, flavors, pastries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-full bg-bg-card border border-border-subtle text-txt-primary text-xs placeholder:text-txt-muted focus:outline-none focus:border-gold hover:border-gold/50 transition-colors"
            />
            <Search className="w-4 h-4 text-txt-muted absolute left-3 top-3" />
          </div>

          <VoiceSearch onSearchResult={(result) => setSearchQuery(result)} />
        </div>
      </div>

      {/* Menu Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-2xl surface-card font-sans">
          <p className="text-txt-muted text-sm">No coffee craft matches your filter "{searchQuery}".</p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item) => {
              const isAdded = addedItemIds[item.id];
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  key={item.id}
                  onClick={() => setDetailItem(item)}
                  className="group rounded-2xl surface-card hover:border-gold hover:shadow-[0_8px_30px_rgba(197,155,39,0.18)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer border border-border-subtle"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative h-56 w-full overflow-hidden bg-bg-surface">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-60" />

                      {/* Tag Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 font-display">
                        {item.isBestseller && (
                          <span className="px-2.5 py-1 rounded-md bg-gold text-soft-black font-bold text-[10px] uppercase tracking-wider shadow-sm">
                            Bestseller
                          </span>
                        )}
                        {item.isNew && (
                          <span className="px-2.5 py-1 rounded-md bg-coffee text-gold border border-gold/30 font-bold text-[10px] uppercase tracking-wider">
                            New Craft
                          </span>
                        )}
                      </div>

                      {/* Rating & Quick View icon */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-sans">
                        <div className="flex items-center gap-1 text-xs text-txt-primary bg-bg-primary/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-border-subtle">
                          <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                          <span className="font-bold">{item.rating}</span>
                          <span className="text-txt-muted text-[10px]">({item.reviewsCount})</span>
                        </div>

                        <span className="p-2 rounded-full bg-bg-primary/80 text-txt-muted group-hover:text-gold group-hover:border-gold border border-border-subtle backdrop-blur-md transition-colors">
                          <Eye className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-6 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-lg font-bold text-txt-primary group-hover:text-gold transition-colors">
                          {item.name}
                        </h3>
                        <span className="font-display text-lg font-bold text-gold shrink-0">
                          {formatCurrency(item.price)}
                        </span>
                      </div>

                      {item.subtitle && (
                        <p className="text-xs font-semibold text-gold font-sans">{item.subtitle}</p>
                      )}

                      <p className="text-xs text-txt-muted font-sans line-clamp-2 leading-relaxed font-light">
                        {item.description}
                      </p>

                      {/* Origin & Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-3 font-sans">
                        {item.origin && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-bg-surface border border-border-subtle text-txt-primary font-medium flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gold" /> {item.origin}
                          </span>
                        )}
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-2 py-0.5 rounded bg-bg-card text-txt-muted border border-border-subtle"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Footer */}
                  <div className="p-6 pt-0 font-sans">
                    <button
                      onClick={(e) => handleQuickAdd(e, item)}
                      className={`w-full py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
                        isAdded
                          ? 'bg-gold text-soft-black border-gold shadow-md'
                          : 'bg-bg-surface hover:bg-gold hover:text-soft-black hover:border-gold border-border-subtle hover:shadow-[0_4px_20px_rgba(197,155,39,0.35)] text-txt-primary active:scale-95'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          Added to Cart
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          Add to Order
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Item Detail Modal */}
      <ItemDetailModal item={detailItem} onClose={() => setDetailItem(null)} />

    </section>
  );
};
