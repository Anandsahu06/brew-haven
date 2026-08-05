'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Coffee, Check, ArrowRight, RotateCcw, Flame, Sun, Moon, Laptop, Flower2, Droplets, Zap } from 'lucide-react';
import { MENU_ITEMS } from '@/lib/data';
import { MenuItem } from '@/types';
import { useCart } from '@/context/CartContext';
import { useSoundscape } from '@/context/SoundscapeContext';
import { formatCurrency } from '@/lib/utils';

export const AICoffeeSommelier: React.FC = () => {
  const { addToCart } = useCart();
  const { playSteamSound } = useSoundscape();

  const [step, setStep] = useState<number>(1);
  const [flavorPreference, setFlavorPreference] = useState<string>('floral');
  const [brewStyle, setBrewStyle] = useState<string>('pour-over');
  const [timeOfDay, setTimeOfDay] = useState<string>('morning');
  const [recommendation, setRecommendation] = useState<MenuItem | null>(null);
  const [matchScore, setMatchScore] = useState<number>(98);

  const handleCalculateMatch = () => {
    let match = MENU_ITEMS[0];
    if (flavorPreference === 'floral') match = MENU_ITEMS[2]; // Coorg Geisha
    else if (flavorPreference === 'chocolate') match = MENU_ITEMS[0]; // Chikmagalur Obsidian Espresso
    else if (flavorPreference === 'cold') match = MENU_ITEMS[1]; // Araku Smoked Vanilla Cold Drip
    else if (flavorPreference === 'sweet') match = MENU_ITEMS[3]; // Wayanad Charcoal Gold Latte

    setRecommendation(match);
    setMatchScore(95 + Math.floor(Math.random() * 4));
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setRecommendation(null);
  };

  const handleAddRecommended = () => {
    if (!recommendation) return;
    playSteamSound();
    addToCart(recommendation, 'menu', 1);
  };

  return (
    <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Title */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-semibold text-gold font-sans uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Roastery Sommelier India</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-txt-primary tracking-tight">
          Find Your Perfect Brew Match
        </h2>
        <p className="text-sm text-txt-muted font-sans font-light max-w-xl mx-auto">
          Answer 3 quick sensory questions and our AI Sommelier engine will match you with your ideal Indian micro-lot elixir.
        </p>
      </div>

      <div className="p-8 rounded-3xl surface-card border-border-subtle shadow-xl font-sans">
        
        {step < 4 && (
          <div className="flex items-center justify-between text-xs text-txt-muted border-b border-border-subtle pb-4 mb-6">
            <span className="font-display uppercase tracking-wider font-bold text-gold">
              Step 0{step} of 03
            </span>
            <div className="flex gap-1.5">
              <span className={`w-6 h-1 rounded-full ${step >= 1 ? 'bg-gold' : 'bg-bg-surface'}`} />
              <span className={`w-6 h-1 rounded-full ${step >= 2 ? 'bg-gold' : 'bg-bg-surface'}`} />
              <span className={`w-6 h-1 rounded-full ${step >= 3 ? 'bg-gold' : 'bg-bg-surface'}`} />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="font-display text-xl font-bold text-txt-primary">
                1. What flavor profile do you crave right now?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'floral', icon: Flower2, title: 'Chikmagalur Floral & Bergamot Citrus', desc: 'Light, crisp, tea-like elegance' },
                  { id: 'chocolate', icon: Flame, title: 'Coorg Deep Cacao & Spiced Nutmeg', desc: 'Heavy body, intense dark chocolate' },
                  { id: 'cold', icon: Droplets, title: '24-Hr Araku Cold Drip & Smoked Vanilla', desc: 'Zero bitterness, smooth ice drip' },
                  { id: 'sweet', icon: Sparkles, title: 'Kashmir Saffron & Edible 24k Gold', desc: 'Decadent, creamy, sweet luxury' },
                ].map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = flavorPreference === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setFlavorPreference(opt.id);
                        setStep(2);
                      }}
                      className={`relative p-5 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 ${
                        isSelected
                          ? 'bg-gold/10 border-gold shadow-[0_0_25px_rgba(197,155,39,0.25)] scale-[1.01]'
                          : 'bg-bg-card border-border-subtle hover:border-gold hover:bg-gold/5 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(197,155,39,0.15)] opacity-85 hover:opacity-100'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl border shrink-0 transition-all ${
                        isSelected ? 'bg-gold text-soft-black border-gold' : 'bg-bg-surface text-gold border-border-subtle group-hover:border-gold'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 pr-6">
                        <span className="font-display font-bold text-txt-primary text-sm block leading-snug">{opt.title}</span>
                        <span className="text-xs text-txt-muted mt-1 block font-light">{opt.desc}</span>
                      </div>

                      {/* Active Gold Checkmark Badge */}
                      {isSelected && (
                        <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-gold text-soft-black flex items-center justify-center shadow-md">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="font-display text-xl font-bold text-txt-primary">
                2. What brewing method do you prefer?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'pour-over', icon: Coffee, title: 'V60 Chemex Hand Pour', desc: 'Clean paper filter extraction' },
                  { id: 'espresso', icon: Zap, title: 'Double Ristretto Shot', desc: 'Concentrated velvet crema' },
                  { id: 'cold-tower', icon: Droplets, title: 'Japanese Ice Tower Drip', desc: 'Drop-by-drop 24hr infusion' },
                  { id: 'latte', icon: Sparkles, title: 'Micro-Foam Latte Art', desc: 'Steamed milk or oat milk' },
                ].map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = brewStyle === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setBrewStyle(opt.id);
                        setStep(3);
                      }}
                      className={`relative p-5 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 ${
                        isSelected
                          ? 'bg-gold/10 border-gold shadow-[0_0_25px_rgba(197,155,39,0.25)] scale-[1.01]'
                          : 'bg-bg-card border-border-subtle hover:border-gold hover:bg-gold/5 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(197,155,39,0.15)] opacity-85 hover:opacity-100'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl border shrink-0 transition-all ${
                        isSelected ? 'bg-gold text-soft-black border-gold' : 'bg-bg-surface text-gold border-border-subtle'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 pr-6">
                        <span className="font-display font-bold text-txt-primary text-sm block leading-snug">{opt.title}</span>
                        <span className="text-xs text-txt-muted mt-1 block font-light">{opt.desc}</span>
                      </div>

                      {isSelected && (
                        <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-gold text-soft-black flex items-center justify-center shadow-md">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="font-display text-xl font-bold text-txt-primary">
                3. What is your occasion or time of day?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'morning', icon: Sun, title: 'Morning Awakening', desc: 'High energy kick' },
                  { id: 'afternoon', icon: Laptop, title: 'Afternoon Deep Focus', desc: 'Balanced clarity' },
                  { id: 'evening', icon: Moon, title: 'Evening Lounge Ritual', desc: 'Relaxing aroma' },
                ].map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = timeOfDay === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setTimeOfDay(opt.id);
                        handleCalculateMatch();
                      }}
                      className={`relative p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between gap-3 ${
                        isSelected
                          ? 'bg-gold/10 border-gold shadow-[0_0_25px_rgba(197,155,39,0.25)] scale-[1.01]'
                          : 'bg-bg-card border-border-subtle hover:border-gold hover:bg-gold/5 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(197,155,39,0.15)] opacity-85 hover:opacity-100'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl border w-fit transition-all ${
                        isSelected ? 'bg-gold text-soft-black border-gold' : 'bg-bg-surface text-gold border-border-subtle'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div>
                        <span className="font-display font-bold text-txt-primary text-sm block leading-snug">{opt.title}</span>
                        <span className="text-xs text-txt-muted mt-1 block font-light">{opt.desc}</span>
                      </div>

                      {isSelected && (
                        <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-gold text-soft-black flex items-center justify-center shadow-md">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 4 && recommendation && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/40 text-xs font-bold font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                {matchScore}% Match Score Calculated
              </div>

              <div className="p-6 rounded-2xl surface-card max-w-md mx-auto space-y-4 border-gold/40 text-left shadow-lg">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-xl font-bold text-txt-primary">{recommendation.name}</h4>
                  <span className="font-display text-lg font-bold text-gold">{formatCurrency(recommendation.price)}</span>
                </div>
                <p className="text-xs text-txt-muted font-light leading-relaxed">{recommendation.description}</p>
                {recommendation.origin && (
                  <p className="text-xs text-gold font-medium">Origin: {recommendation.origin}</p>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-5 py-3 rounded-xl surface-card text-txt-muted hover:text-txt-primary border border-border-subtle hover:border-gold hover:bg-gold/5 transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
                </button>
                <button
                  onClick={handleAddRecommended}
                  className="px-6 py-3 rounded-xl bg-gold text-soft-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-gold-light shadow-md hover:scale-105 transition-all"
                >
                  <Coffee className="w-4 h-4" /> Order Recommended Elixir
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
