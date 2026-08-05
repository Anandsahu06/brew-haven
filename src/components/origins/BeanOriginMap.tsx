'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Sparkles, MapPin } from 'lucide-react';
import { BEAN_ORIGINS } from '@/lib/data';
import { BeanOrigin } from '@/types';

export const BeanOriginMap: React.FC = () => {
  const [selectedOrigin, setSelectedOrigin] = useState<BeanOrigin>(BEAN_ORIGINS[0]);

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-semibold text-gold uppercase tracking-widest">
          <Globe className="w-3.5 h-3.5" />
          <span>Indian Coffee Belt Atlas</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-txt-primary tracking-tight">
          Single-Origin Indian Estates
        </h2>
        <p className="text-sm text-txt-muted font-light leading-relaxed">
          Explore high-altitude shade-grown estates across the Western and Eastern Ghats of India.
        </p>
      </div>

      {/* Interactive Region Selector & Details Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Origin Selector List (Col 5) */}
        <div className="lg:col-span-5 space-y-3">
          {BEAN_ORIGINS.map((origin) => {
            const isSelected = selectedOrigin.id === origin.id;
            return (
              <div
                key={origin.id}
                onClick={() => setSelectedOrigin(origin)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-gold/10 border-gold shadow-[0_0_20px_rgba(197,155,39,0.25)]'
                    : 'surface-card border-border-subtle hover:border-border-accent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${isSelected ? 'bg-gold animate-pulse' : 'bg-txt-muted'}`} />
                    <div>
                      <h3 className="font-display font-bold text-txt-primary text-base">{origin.region}</h3>
                      <span className="text-xs text-txt-muted">{origin.farm}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-bold font-mono">
                    {origin.cuppingScore} SCA
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Origin Spotlight (Col 7) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedOrigin.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-8 rounded-3xl surface-card border-border-subtle space-y-6 shadow-xl"
            >
              <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-bg-surface">
                <Image src={selectedOrigin.image} alt={selectedOrigin.region} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-coffee text-gold border border-gold/40 text-xs font-mono font-bold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold" /> {selectedOrigin.altitude}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-display text-2xl font-bold text-txt-primary">{selectedOrigin.region}</h3>
                  <span className="text-xs text-gold font-mono uppercase font-bold">Process: {selectedOrigin.processMethod}</span>
                </div>
                <p className="text-xs text-txt-muted leading-relaxed font-light">{selectedOrigin.description}</p>
              </div>

              {/* Flavor Notes */}
              <div className="space-y-2">
                <span className="text-[10px] text-gold uppercase font-bold tracking-widest font-display">Tasting Notes</span>
                <div className="flex flex-wrap gap-2">
                  {selectedOrigin.notes.map((note) => (
                    <span key={note} className="px-3 py-1 rounded-full bg-bg-surface border border-border-subtle text-xs text-txt-primary font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-gold" /> {note}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
};
