'use client';

import React from 'react';
import { Camera } from 'lucide-react';
import { CafeGallery } from '@/components/gallery/CafeGallery';

export default function GalleryPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-bg-primary font-sans text-txt-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-semibold text-gold font-sans uppercase tracking-widest">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Atmosphere</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-txt-primary tracking-tight">
            Cafe Atmosphere Gallery
          </h1>
          <p className="text-sm sm:text-base text-txt-muted font-light leading-relaxed">
            Explore our cast-iron drum roasteries, botanical glasshouses, and pour-over bar sanctuaries.
          </p>
        </div>

        {/* Gallery Grid */}
        <CafeGallery />

      </div>
    </div>
  );
}
