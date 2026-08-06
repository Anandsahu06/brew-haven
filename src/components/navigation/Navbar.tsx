'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, ShoppingBag, Menu, X, Calendar, Flame, User, LayoutDashboard } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { QRCodeMenuModal } from '@/components/features/QRCodeMenuModal';

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
          ? 'bg-bg-primary/95 backdrop-blur-md shadow-md border-b border-border-subtle py-1'
          : 'navbar-glass py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo with generous right margin (mr-4 sm:mr-6 lg:mr-8) */}
        <Link href="/" className="flex items-center gap-3 group shrink-0 mr-4 sm:mr-6 lg:mr-8">
          <div className="w-9 h-9 rounded-full bg-coffee flex items-center justify-center text-gold border border-gold/40 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(197,155,39,0.4)] transition-all duration-300">
            <Coffee className="w-4 h-4 text-gold group-hover:rotate-6 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-tight text-txt-primary group-hover:text-gold transition-colors">
              BREW HAVEN
            </span>
            <span className="text-[9px] tracking-widest text-txt-muted uppercase font-sans -mt-1">
              Specialty Roastery
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 surface-card px-4 py-1.5 rounded-full border-border-subtle">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-1.5 text-[11px] font-medium tracking-wider uppercase transition-all duration-300 rounded-full hover:-translate-y-0.5 ${
                  isActive ? 'text-txt-primary font-bold' : 'text-txt-muted hover:text-gold'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-gold/10 border border-gold/40 rounded-full shadow-[0_0_15px_rgba(197,155,39,0.2)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  {link.isSpecial && <Flame className="w-3.5 h-3.5 text-gold" />}
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop Uniform Action Buttons (All w-9 h-9 circles with equal gap-2.5 and generous left margin on QR button) */}
        <div className="hidden sm:flex items-center gap-2.5 ml-2 sm:ml-4 lg:ml-6">
          
          {/* 1. Digital Table QR Modal */}
          <QRCodeMenuModal />

          {/* 2. Customer Loyalty Dashboard */}
          <Link
            href="/dashboard"
            title="Customer Loyalty Dashboard"
            className="w-9 h-9 flex items-center justify-center rounded-full surface-card border border-border-subtle text-txt-muted hover:text-gold hover:border-gold hover:bg-gold/10 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(197,155,39,0.2)] active:scale-95 transition-all duration-300 shrink-0"
          >
            <User className="w-4 h-4" />
          </Link>

          {/* 3. Roastery Admin Control Panel */}
          <Link
            href="/admin"
            title="Roastery Live Admin Control"
            className="w-9 h-9 flex items-center justify-center rounded-full surface-card border border-border-subtle text-txt-muted hover:text-gold hover:border-gold hover:bg-gold/10 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(197,155,39,0.2)] active:scale-95 transition-all duration-300 shrink-0"
          >
            <LayoutDashboard className="w-4 h-4" />
          </Link>

          {/* 4. Theme Toggle (Sun/Moon) */}
          <ThemeToggle />

          {/* 5. Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            title="Shopping Cart"
            className="relative w-9 h-9 flex items-center justify-center rounded-full surface-card border border-border-subtle text-txt-muted hover:text-gold hover:border-gold hover:bg-gold/10 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(197,155,39,0.2)] active:scale-95 transition-all duration-300 shrink-0 group"
          >
            <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-soft-black font-bold text-[10px] rounded-full flex items-center justify-center shadow-md">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* 6. Table Reservation Button */}
          <Link
            href="/reserve"
            className="flex items-center gap-1.5 px-4.5 py-2 text-xs uppercase tracking-wider font-bold rounded-full bg-gold text-soft-black hover:bg-gold-light hover:shadow-[0_4px_25px_rgba(197,155,39,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 font-sans ml-1"
          >
            <Calendar className="w-3.5 h-3.5" />
            Reserve Table
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative w-9 h-9 flex items-center justify-center rounded-full surface-card border border-border-subtle text-txt-muted hover:text-gold transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-soft-black font-bold text-[10px] rounded-full flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-txt-muted hover:text-txt-primary"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="lg:hidden bg-bg-card border-b border-border-subtle px-6 py-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-display font-medium ${
                    pathname === link.href ? 'text-gold' : 'text-txt-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex items-center gap-4 pt-2">
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-xs text-gold flex items-center gap-1.5">
                  <User className="w-4 h-4" /> Customer Dashboard
                </Link>
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-xs text-gold flex items-center gap-1.5">
                  <LayoutDashboard className="w-4 h-4" /> Admin Controls
                </Link>
              </div>

              <hr className="border-border-subtle my-2" />

              <Link
                href="/reserve"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-gold text-soft-black font-bold uppercase tracking-wider text-xs font-sans hover:bg-gold-light hover:shadow-[0_4px_25px_rgba(197,155,39,0.4)] transition-all"
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
