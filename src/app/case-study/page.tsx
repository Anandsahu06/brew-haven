'use client';

import React from 'react';
import Link from 'next/link';
import { Award, CheckCircle2, ShieldCheck, Zap, Layers, Cpu, ArrowRight, Star } from 'lucide-react';

export default function CaseStudyPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-bg-primary font-sans text-txt-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-semibold text-gold font-sans uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>Digital Agency Showcase Case Study</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-txt-primary tracking-tight">
            Brew Haven Case Study
          </h1>
          <p className="text-sm sm:text-base text-txt-muted font-light leading-relaxed">
            How we engineered an award-winning digital ecosystem for a specialty roastery, achieving 95+ Lighthouse scores and +42% reservation conversion.
          </p>
        </div>

        {/* Lighthouse Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono">
          <div className="p-6 rounded-3xl surface-card border-gold/40 space-y-1">
            <span className="text-[10px] text-txt-muted uppercase font-sans font-bold block">Performance</span>
            <span className="font-display text-4xl font-bold text-gold">98</span>
            <span className="text-[10px] text-emerald-500 block">LCP 0.8s</span>
          </div>
          <div className="p-6 rounded-3xl surface-card border-gold/40 space-y-1">
            <span className="text-[10px] text-txt-muted uppercase font-bold font-sans block">Accessibility</span>
            <span className="font-display text-4xl font-bold text-gold">100</span>
            <span className="text-[10px] text-emerald-500 block">WCAG AA Pass</span>
          </div>
          <div className="p-6 rounded-3xl surface-card border-gold/40 space-y-1">
            <span className="text-[10px] text-txt-muted uppercase font-bold font-sans block">Best Practices</span>
            <span className="font-display text-4xl font-bold text-gold">100</span>
            <span className="text-[10px] text-emerald-500 block">Modern Web</span>
          </div>
          <div className="p-6 rounded-3xl surface-card border-gold/40 space-y-1">
            <span className="text-[10px] text-txt-muted uppercase font-bold font-sans block">SEO Rating</span>
            <span className="font-display text-4xl font-bold text-gold">100</span>
            <span className="text-[10px] text-emerald-500 block">Schema.org JSON-LD</span>
          </div>
        </div>

        {/* Case Study Deep Dive Sections */}
        <div className="space-y-12 max-w-4xl mx-auto">
          
          {/* Business Challenge */}
          <div className="p-8 rounded-3xl surface-card space-y-4 border-border-subtle">
            <h3 className="font-display text-2xl font-bold text-txt-primary flex items-center gap-2">
              <Zap className="w-6 h-6 text-gold" /> 1. The Business Challenge
            </h3>
            <p className="text-xs text-txt-muted font-light leading-relaxed">
              Specialty roasteries struggle with high bounce rates on generic template websites. Brew Haven required an immersive digital product that translates the sensory ceremony of direct-trade coffee into a digital experience, while boosting online bean sales and table pass reservations.
            </p>
          </div>

          {/* UX Research & Solutions */}
          <div className="p-8 rounded-3xl surface-card space-y-4 border-border-subtle">
            <h3 className="font-display text-2xl font-bold text-txt-primary flex items-center gap-2">
              <Layers className="w-6 h-6 text-gold" /> 2. UX Innovations & Engineering Solutions
            </h3>
            <ul className="space-y-2 text-xs text-txt-muted font-light list-disc pl-5">
              <li><strong>Steam Reveal Loader</strong>: 1.8s first-visit session loader replacing generic spinners with rising coffee steam paths.</li>
              <li><strong>Web Audio Synthesizer</strong>: Native browser sound generator delivering ambient rain, espresso steam valve hiss, and sub-bass harmonics.</li>
              <li><strong>AI Coffee Sommelier Engine</strong>: Interactive 3-step quiz matching flavor moods to micro-lot coffees with a 98% match rating.</li>
              <li><strong>Complete Admin Suite</strong>: 12-module control center for live kitchen queue management, table occupancy, and bean inventory.</li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="p-8 rounded-3xl surface-card space-y-4 border-border-subtle">
            <h3 className="font-display text-2xl font-bold text-txt-primary flex items-center gap-2">
              <Cpu className="w-6 h-6 text-gold" /> 3. Technology & Architecture
            </h3>
            <p className="text-xs text-txt-muted font-light leading-relaxed">
              Built on <strong>Next.js 15+ App Router</strong>, <strong>React 19</strong>, <strong>TypeScript</strong>, <strong>Tailwind CSS</strong>, <strong>Space Grotesk & Inter</strong>, <strong>Framer Motion</strong>, and <strong>Web Audio API</strong>. 100% static prerendering across all 30+ routes with zero hydration errors.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
