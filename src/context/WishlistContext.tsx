'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '@/types';

interface WishlistContextType {
  wishlist: MenuItem[];
  toggleWishlist: (item: MenuItem) => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<MenuItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('brewhaven_wishlist');
      if (saved) setWishlist(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('brewhaven_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const toggleWishlist = (item: MenuItem) => {
    setWishlist((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  const isInWishlist = (id: string) => wishlist.some((i) => i.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
