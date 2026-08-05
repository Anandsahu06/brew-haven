'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem, CustomBrew } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem | CustomBrew, itemType: 'menu' | 'custom', quantity?: number) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  totalItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('brewhaven_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('brewhaven_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const addToCart = (item: MenuItem | CustomBrew, itemType: 'menu' | 'custom', quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.item.id === item.id && ci.itemType === itemType
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      const cartId = `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const price = item.price;
      
      let formattedOptions: string[] = [];
      if (itemType === 'custom') {
        const cb = item as CustomBrew;
        formattedOptions = [
          `Bean: ${cb.beanOrigin}`,
          `Roast: ${cb.roastLevel}`,
          `Brew: ${cb.brewMethod}`,
          `Grind: ${cb.grindSize}`,
          cb.milkType !== 'None' ? `Milk: ${cb.milkType}` : '',
          ...cb.addIns,
        ].filter(Boolean);
      } else {
        const mi = item as MenuItem;
        if (mi.roastLevel) formattedOptions.push(`Roast: ${mi.roastLevel}`);
        if (mi.origin) formattedOptions.push(`Origin: ${mi.origin}`);
      }

      return [
        ...prev,
        {
          cartId,
          item,
          itemType,
          quantity,
          formattedOptions,
          price,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((ci) => ci.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((ci) => (ci.cartId === cartId ? { ...ci, quantity } : ci))
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setDiscountPercent(0);
  };

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'BREWHAVEN10' || clean === 'FIRSTBREW' || clean === 'AWWWARDS') {
      setCouponCode(clean);
      setDiscountPercent(15); // 15% discount
      return true;
    }
    return false;
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = (subtotal * discountPercent) / 100;
  const tax = (subtotal - discount) * 0.08; // 8% sales tax
  const total = subtotal - discount + tax;
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discount,
        tax,
        total,
        couponCode,
        applyCoupon,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        totalItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
