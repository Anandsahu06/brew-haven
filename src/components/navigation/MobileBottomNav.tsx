'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Coffee, Flame, Calendar, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { totalItemsCount, setIsCartOpen } = useCart();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Menu', href: '/menu', icon: Coffee },
    { label: 'Custom Lab', href: '/customizer', icon: Flame },
    { label: 'Reserve', href: '/reserve', icon: Calendar },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-bg-card/95 backdrop-blur-md border-t border-border-subtle px-3 py-2 shadow-2xl font-sans">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] px-2 rounded-xl transition-colors ${
                isActive ? 'text-gold font-bold' : 'text-txt-muted hover:text-txt-primary'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}

        {/* Cart Trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center min-h-[44px] min-w-[44px] px-2 rounded-xl text-txt-muted hover:text-gold transition-colors"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Cart</span>
          {totalItemsCount > 0 && (
            <span className="absolute top-1 right-2 w-4 h-4 bg-gold text-soft-black font-bold text-[9px] rounded-full flex items-center justify-center">
              {totalItemsCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
