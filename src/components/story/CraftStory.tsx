'use client';

import React from 'react';
import Image from 'next/image';
import { Award, Flame, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/data';

export const CraftStory: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
      
      {/* Brand Ethos Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-semibold text-gold font-sans uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5" />
            <span>Our Craft Philosophy</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold text-txt-primary tracking-tight leading-tight">
            Coffee is Not Just a Beverage. <br />
            <span className="text-gold font-normal italic">It is an Emotional Ceremony.</span>
          </h2>

          <p className="text-txt-muted text-sm sm:text-base leading-relaxed font-sans font-light">
            Founded in 2022 by a passionate collective of Q-Grader roasters and architectural designers, Brew Haven was created to elevate daily coffee rituals into pure sensory magic.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2 font-sans">
            <div className="p-5 rounded-2xl surface-card space-y-1">
              <span className="font-display text-2xl font-bold text-gold">100%</span>
              <p className="text-xs text-txt-muted">Direct-Trade Highland Smallholders</p>
            </div>
            <div className="p-5 rounded-2xl surface-card space-y-1">
              <span className="font-display text-2xl font-bold text-gold">0%</span>
              <p className="text-xs text-txt-muted">Bitterness in Cold Tower Extraction</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative h-96 sm:h-[420px] w-full rounded-3xl overflow-hidden surface-card border-border-subtle shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80"
            alt="Roaster craft"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-bg-card/90 backdrop-blur-md border border-border-subtle text-txt-primary font-sans">
            <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider mb-1 font-display">
              <Award className="w-4 h-4" />
              <span>Master Roaster Standard</span>
            </div>
            <p className="text-xs text-txt-muted font-light leading-relaxed">
              "We roast every micro-lot on custom cast-iron drum roasters, capturing peak sugars without scorching the bean fibers."
            </p>
          </div>
        </div>

      </div>

      {/* Testimonials */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase text-gold font-bold tracking-widest font-display">
            Words From Connoisseurs
          </span>
          <h3 className="font-display text-3xl font-bold text-txt-primary">Critical Acclaim</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl surface-card space-y-4 border-border-subtle flex flex-col justify-between"
            >
              <div className="space-y-3">
                <Quote className="w-6 h-6 text-gold/40" />
                <p className="text-xs text-txt-secondary leading-relaxed italic font-light">
                  "{t.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-border-subtle pt-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gold">
                  <Image src={t.avatar} alt={t.author} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-txt-primary text-sm">{t.author}</h4>
                  <p className="text-[10px] text-txt-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
