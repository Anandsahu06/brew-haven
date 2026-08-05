'use client';

import React from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/hero/HeroSection';
import { MenuGrid } from '@/components/menu/MenuGrid';
import { CraftStory } from '@/components/story/CraftStory';
import { BrewCustomizer } from '@/components/customizer/BrewCustomizer';
import { CafeGallery } from '@/components/gallery/CafeGallery';
import { WhyBrewHaven } from '@/components/features/WhyBrewHaven';
import { CafeEvents } from '@/components/events/CafeEvents';
import { ReservationForm } from '@/components/reservation/ReservationForm';
import { AICoffeeSommelier } from '@/components/features/AICoffeeSommelier';
import { ArrowRight, Coffee, Calendar } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-16">
      
      {/* 2. Hero Section - Fullscreen Cinematic & Subtle Motion */}
      <HeroSection />

      {/* 3. Featured Coffee Micro-Lots Section */}
      <section className="pt-8">
        <div className="text-center max-w-3xl mx-auto px-4 mb-4">
          <span className="text-xs uppercase text-gold font-bold tracking-widest font-display">
            Single-Origin Micro-Lots
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-txt-primary tracking-tight mt-1">
            Featured Roastery Crafts
          </h2>
          <p className="text-sm text-txt-muted mt-2 font-sans font-light">
            Explore single-origin pour-overs, Japanese cold drips, and freshly baked French croissants.
          </p>
        </div>
        <MenuGrid />
      </section>

      {/* AI Coffee Sommelier Engine */}
      <section className="bg-bg-surface py-12 border-y border-border-subtle">
        <AICoffeeSommelier />
      </section>

      {/* 4. Our Story & Roasting Science */}
      <CraftStory />

      {/* 5. Interactive Custom Brew Lab & Signature Menu */}
      <section className="bg-bg-surface py-12 border-y border-border-subtle relative">
        <BrewCustomizer />
      </section>

      {/* 6. Handcrafted Cafe Atmosphere Gallery */}
      <CafeGallery />

      {/* 7. Why Brew Haven Core Pillars */}
      <section className="bg-bg-surface py-12 border-y border-border-subtle">
        <WhyBrewHaven />
      </section>

      {/* 9. Events & Masterclasses */}
      <CafeEvents />

      {/* 10. Table Reservation Sanctuary CTA */}
      <section className="bg-bg-surface py-12 border-y border-border-subtle">
        <ReservationForm />
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="rounded-3xl surface-card p-10 sm:p-16 text-center space-y-6 relative overflow-hidden border-border-subtle shadow-lg">
          <div className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto border border-gold/30">
            <Coffee className="w-6 h-6" />
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold text-txt-primary tracking-tight">
            Ready to Experience Brew Haven?
          </h2>
          <p className="text-sm sm:text-base text-txt-muted max-w-xl mx-auto font-sans font-light">
            Order online for swift pickup or reserve a table pass for an uninterrupted sensory coffee ceremony.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 font-sans">
            <Link
              href="/menu"
              className="px-8 py-4 rounded-full bg-gold text-soft-black font-bold uppercase tracking-wider text-xs flex items-center gap-2 hover:bg-gold-light shadow-sm transition-all active:scale-95"
            >
              Order Online Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/reserve"
              className="px-8 py-4 rounded-full surface-card hover:border-gold border border-border-subtle text-txt-primary hover:text-gold font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-all"
            >
              <Calendar className="w-4 h-4 text-gold" />
              Book Table Pass
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
