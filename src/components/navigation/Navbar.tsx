'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, ShoppingBag, Menu, X, Calendar, Flame, User, LayoutDashboard } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Menu', href: '/menu' },
    { name: 'Custom Brew Lab', href: '/customizer', isSpecial: true },
    { name: 'Bean Origins', href: '/origins' },
    { name: 'Locations', href: '/locations' },
    { name: 'Journal', href: '/blog' },
    { name: 'Gift Cards', href: '/gift-cards' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-bg-primary/95 backdrop-blur-md shadow-md border-b border-border-subtle py-0.5'
          : 'navbar-glass py-1'
      }`}
    >
      {/* Symmetric Full-Width Outer Container with Ultra-Sleek 56px Height (h-14) */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 h-14 flex items-center justify-between">
        
        {/* Brand Logo - Compact Ultra-Sleek Scale */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-7 h-7 rounded-full bg-coffee flex items-center justify-center text-gold border border-gold/40 group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(197,155,39,0.3)] transition-all duration-300">
            <Coffee className="w-3 h-3 text-gold group-hover:rotate-6 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm sm:text-base font-bold tracking-tight text-txt-primary group-hover:text-gold transition-colors whitespace-nowrap">
              BREW HAVEN
            </span>
            <span className="text-[7px] sm:text-[7.5px] tracking-widest text-txt-muted uppercase font-sans -mt-1 whitespace-nowrap">
              Specialty Roastery
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links - Ultra-Sleek Compact Glass Pill */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 surface-card px-3 xl:px-3.5 py-1 rounded-full border-border-subtle shrink-0 mx-3 lg:mx-5 xl:mx-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-2.5 xl:px-3 py-1 text-[9.5px] xl:text-[10px] font-semibold tracking-wider uppercase transition-all duration-300 rounded-full hover:-translate-y-0.5 whitespace-nowrap shrink-0 ${
                  isActive ? 'text-txt-primary font-bold' : 'text-txt-muted hover:text-gold'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-gold/10 border border-gold/40 rounded-full shadow-[0_0_10px_rgba(197,155,39,0.2)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1 whitespace-nowrap">
                  {link.isSpecial && <Flame className="w-3 h-3 text-gold shrink-0" />}
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Action Tools Section - Ultra-Sleek Compact Badges */}
        <div className="hidden sm:flex items-center gap-1.5 lg:gap-2 font-sans shrink-0">
          
          {/* 1. Customer Profile & Loyalty Badge */}
          <Link
            href="/dashboard"
            title="Customer Profile & Loyalty Dashboard"
            className="px-2.5 py-1 rounded-full bg-sky-500/15 border border-sky-500/40 text-sky-400 font-bold text-[9.5px] flex items-center gap-1 hover:bg-sky-500/25 hover:border-sky-400 hover:scale-105 shadow-[0_0_10px_rgba(56,189,248,0.2)] active:scale-95 transition-all duration-300 shrink-0 whitespace-nowrap"
          >
            <User className="w-3 h-3 text-sky-400 shrink-0" />
            <span className="hidden xl:inline uppercase tracking-wider text-[9px]">Profile</span>
          </Link>

          {/* 2. Admin Control Panel Badge */}
          <Link
            href="/admin"
            title="Roastery Live Admin Control Panel"
            className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/50 text-amber-400 font-bold text-[9.5px] flex items-center gap-1 hover:bg-amber-500/25 hover:border-amber-400 hover:scale-105 shadow-[0_0_10px_rgba(245,158,11,0.25)] active:scale-95 transition-all duration-300 shrink-0 whitespace-nowrap"
          >
            <LayoutDashboard className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="hidden xl:inline uppercase tracking-wider text-[9px]">Admin</span>
          </Link>

          {/* 3. Theme Toggle Badge */}
          <ThemeToggle />

          {/* 4. Cart Badge Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            title="Shopping Cart & Order Checkout"
            className="px-2.5 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold font-bold text-[9.5px] flex items-center gap-1 hover:bg-gold/25 hover:border-gold hover:scale-105 shadow-[0_0_10px_rgba(197,155,39,0.2)] active:scale-95 transition-all duration-300 shrink-0 group whitespace-nowrap"
          >
            <ShoppingBag className="w-3 h-3 text-gold group-hover:scale-110 transition-transform shrink-0" />
            <span className="hidden xl:inline uppercase tracking-wider text-[9px]">Cart</span>
            {totalItemsCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-gold text-soft-black font-extrabold text-[8.5px] shadow-sm">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* 5. Ultra-Sleek Luxury Gold Shimmer Reserve Table CTA Button */}
          <Link
            href="/reserve"
            title="Book a Table at Flagship Roasteries"
            className="relative flex items-center gap-1 px-3.5 py-1.5 text-[9.5px] uppercase tracking-wider font-extrabold rounded-full bg-gradient-to-r from-[#E6C665] via-[#C59B27] to-[#D4AF37] text-soft-black border border-yellow-200/60 shadow-[0_0_15px_rgba(197,155,39,0.45)] hover:shadow-[0_0_22px_rgba(197,155,39,0.75)] hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shrink-0 group overflow-hidden whitespace-nowrap"
          >
            <Calendar className="w-3 h-3 text-soft-black stroke-[2.5] group-hover:rotate-12 transition-transform duration-300 shrink-0" />
            <span className="font-display tracking-widest font-extrabold text-[9.5px] whitespace-nowrap">Reserve Table</span>
            
            {/* Shimmer Light Ray */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </Link>

        </div>

        {/* Mobile Hamburger Toggle (Visible on Mobile & Tablet <1024px) */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative w-7.5 h-7.5 flex items-center justify-center rounded-full surface-card border border-border-subtle text-txt-muted hover:text-gold transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gold text-soft-black font-bold text-[8.5px] rounded-full flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 rounded-lg text-txt-muted hover:text-txt-primary transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4.5 h-4.5 text-gold" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-bg-card/95 backdrop-blur-xl border-b border-border-subtle px-5 py-5 shadow-2xl"
          >
            <div className="flex flex-col gap-3.5 max-w-md mx-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-display font-medium flex items-center justify-between py-0.5 transition-colors ${
                    pathname === link.href ? 'text-gold font-bold' : 'text-txt-primary hover:text-gold'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.isSpecial && <Flame className="w-3.5 h-3.5 text-gold" />}
                    {link.name}
                  </span>
                  {pathname === link.href && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
                </Link>
              ))}

              <hr className="border-border-subtle my-1" />

              <div className="grid grid-cols-2 gap-2.5 pt-0.5">
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-xl surface-card border border-sky-500/30 text-sky-400 flex items-center justify-center gap-2 text-[11px] font-sans font-bold hover:bg-sky-500/10 transition-all">
                  <User className="w-3.5 h-3.5" /> Profile
                </Link>
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-xl surface-card border border-amber-500/30 text-amber-400 flex items-center justify-center gap-2 text-[11px] font-sans font-bold hover:bg-amber-500/10 transition-all">
                  <LayoutDashboard className="w-3.5 h-3.5" /> Admin
                </Link>
              </div>

              <Link
                href="/reserve"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-[#E6C665] via-[#C59B27] to-[#D4AF37] text-soft-black font-extrabold uppercase tracking-wider text-[11px] font-sans hover:shadow-[0_4px_25px_rgba(197,155,39,0.6)] active:scale-95 transition-all mt-0.5"
              >
                Reserve Table
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
