'use client';

import React from 'react';
import { Compass, Flame, ShieldCheck, Sparkles, Award } from 'lucide-react';

const PILLARS = [
  {
    icon: Compass,
    title: '100% Direct-Trade Farms',
    desc: 'We forge long-term partnerships directly with highland smallholders, ensuring fair prices and sustainable farming practices.',
    tag: 'Ethical Sourcing',
  },
  {
    icon: Award,
    title: '91.5+ SCA Cupping Standard',
    desc: 'Every lot is evaluated by licensed Q-Graders. Only the top 1% of world micro-lots earn a place on our roastery bar.',
    tag: 'Quality Benchmark',
  },
  {
    icon: Flame,
    title: 'Zero Bitterness Extraction',
    desc: 'Our signature cold drip is brewed drop-by-drop through Japanese ice towers over 24 hours for pure, silky nectar.',
    tag: 'Roasting Science',
  },
  {
    icon: Sparkles,
    title: 'Architectural Sanctuaries',
    desc: 'Designed with acoustic timber, natural stone, and botanical glasshouses for remote work, focus, and quiet conversation.',
    tag: 'Cafe Atmosphere',
  },
];

export const WhyBrewHaven: React.FC = () => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-semibold text-gold font-sans uppercase tracking-widest">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>The Haven Guarantee</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-txt-primary tracking-tight">
          Why Brew Haven?
        </h2>
        <p className="text-sm text-txt-muted font-sans font-light">
          We refuse generic commercial standards. Here are the four non-negotiable pillars of our roastery experience.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PILLARS.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className="p-6 rounded-2xl surface-card surface-card-hover space-y-4 font-sans flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center border border-gold/30">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gold font-display">
                  {p.tag}
                </span>
                <h3 className="font-display text-lg font-bold text-txt-primary">{p.title}</h3>
                <p className="text-xs text-txt-muted font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
