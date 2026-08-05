'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

const GALLERY_IMAGES = [
  {
    id: 'g1',
    title: 'Precision Drum Roastery',
    subtitle: 'Cast-iron micro-lot roasting',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    span: 'col-span-1 md:col-span-2 row-span-2',
  },
  {
    id: 'g2',
    title: 'Botanical Glasshouse Garden',
    subtitle: 'Acoustic sanctuary seating',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    span: 'col-span-1 row-span-1',
  },
  {
    id: 'g3',
    title: 'Chemex V60 Extraction',
    subtitle: 'Hand-crafted single origin pour-over',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    span: 'col-span-1 row-span-1',
  },
  {
    id: 'g4',
    title: 'Artisan Laminated Pastries',
    subtitle: 'Freshly baked AOP butter croissants',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    span: 'col-span-1 md:col-span-2 row-span-1',
  },
];

export const CafeGallery: React.FC = () => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-semibold text-gold font-sans uppercase tracking-widest">
          <Camera className="w-3.5 h-3.5" />
          <span>Handcrafted Atmosphere</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-txt-primary tracking-tight">
          Visual Sanctuary
        </h2>
        <p className="text-sm text-txt-muted font-sans font-light">
          Step inside our roasteries, botanical gardens, and pour-over bars through the lens. Swipe to explore.
        </p>
      </div>

      {/* Touch Swipeable Container for Mobile */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -100, right: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[600px] touch-pan-y"
      >
        {GALLERY_IMAGES.map((img) => (
          <div
            key={img.id}
            className={`relative rounded-3xl overflow-hidden surface-card group h-72 md:h-auto ${img.span}`}
          >
            <Image
              src={img.image}
              alt={img.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            <div className="absolute bottom-6 left-6 right-6 font-sans text-txt-primary">
              <span className="text-[10px] text-gold font-mono uppercase tracking-widest font-bold">
                {img.subtitle}
              </span>
              <h3 className="font-display text-xl font-bold text-white mt-0.5">{img.title}</h3>
            </div>
          </div>
        ))}
      </motion.div>

    </section>
  );
};
