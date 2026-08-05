'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Coffee, Award, Send, CheckCircle2, MapPin, Clock, Phone, Globe, Share2, AtSign } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { applyCoupon } = useCart();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      applyCoupon('BREWHAVEN10');
    }
  };

  return (
    <footer className="bg-bg-surface border-t border-border-subtle text-txt-secondary relative overflow-hidden pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border-subtle">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-coffee flex items-center justify-center text-gold border border-gold/40">
                <Coffee className="w-4 h-4 text-gold" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-txt-primary">
                BREW HAVEN
              </span>
            </div>
            <p className="text-xs text-txt-muted leading-relaxed max-w-sm font-sans">
              Where Every Cup Tells a Story. Sourcing shade-grown Indian micro-lots roasted with precision science and human craftsmanship.
            </p>

            {/* Award Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg surface-card text-xs text-txt-primary hover:border-gold hover:bg-gold/10 hover:-translate-y-0.5 transition-all duration-300">
                <Award className="w-3.5 h-3.5 text-gold" />
                <span>Awwwards Site of the Day</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg surface-card text-xs text-txt-primary hover:border-gold hover:bg-gold/10 hover:-translate-y-0.5 transition-all duration-300">
                <Coffee className="w-3.5 h-3.5 text-gold" />
                <span>Specialty Roastery 2025</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-txt-primary font-bold text-xs uppercase tracking-widest font-display">
              Explore
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <Link href="/menu" className="hover:text-gold transition-colors">
                  Artisanal Menu
                </Link>
              </li>
              <li>
                <Link href="/customizer" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  Custom Brew Lab
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-gold/10 text-gold font-bold">Interactive</span>
                </Link>
              </li>
              <li>
                <Link href="/origins" className="hover:text-gold transition-colors">
                  Indian Coffee Atlas
                </Link>
              </li>
              <li>
                <Link href="/reserve" className="hover:text-gold transition-colors">
                  Table Reservation
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-gold transition-colors">
                  Store Locator
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-txt-primary font-bold text-xs uppercase tracking-widest font-display">
              Bengaluru Flagship
            </h4>
            <ul className="space-y-2.5 text-xs font-sans">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="text-txt-primary">100ft Road, Indiranagar, Bengaluru</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                <span>Mon - Sun: 7am - 11pm IST</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>

          {/* Secret Club Newsletter */}
          <div className="space-y-3">
            <h4 className="text-txt-primary font-bold text-xs uppercase tracking-widest font-display">
              Join the Haven Club
            </h4>
            <p className="text-xs text-txt-muted font-sans">
              Subscribe to unlock micro-lot coffee releases and receive an instant 15% off coupon.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-gold/10 border border-gold/40 text-txt-primary text-xs space-y-1 font-sans">
                <div className="flex items-center gap-1.5 text-gold font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  Welcome to the Club!
                </div>
                <p>Use code <span className="font-mono bg-bg-card px-1.5 py-0.5 rounded text-gold font-bold">BREWHAVEN10</span> at checkout for 15% off.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2 font-sans">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-bg-card border border-border-subtle text-txt-primary text-xs placeholder:text-txt-muted focus:outline-none focus:border-gold transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-gold text-soft-black text-xs font-bold rounded-lg hover:bg-gold-light hover:shadow-[0_2px_12px_rgba(197,155,39,0.4)] active:scale-95 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-txt-muted font-sans">
          <p>© {new Date().getFullYear()} Brew Haven Specialty Roastery. Showcase Portfolio Project.</p>
          
          <div className="flex items-center gap-4">
            <span className="hover:text-gold transition-colors cursor-pointer flex items-center gap-1">
              <Globe className="w-4 h-4 text-gold" /> Global Journal
            </span>
            <span className="hover:text-gold transition-colors cursor-pointer flex items-center gap-1">
              <AtSign className="w-4 h-4 text-gold" /> @brewhaven.cafe
            </span>
            <span className="hover:text-gold transition-colors cursor-pointer flex items-center gap-1">
              <Share2 className="w-4 h-4 text-gold" /> Community
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
