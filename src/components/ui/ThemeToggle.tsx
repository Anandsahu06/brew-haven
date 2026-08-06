'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      className="px-2.5 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold font-bold text-[9.5px] flex items-center gap-1 hover:bg-gold/25 hover:border-gold hover:scale-105 shadow-[0_0_10px_rgba(197,155,39,0.2)] active:scale-95 transition-all duration-300 shrink-0 font-sans whitespace-nowrap"
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-3 h-3 text-gold shrink-0" />
          <span className="hidden xl:inline text-[9px] tracking-wider uppercase">Dark</span>
        </>
      ) : (
        <>
          <Moon className="w-3 h-3 text-coffee shrink-0" />
          <span className="hidden xl:inline text-[9px] tracking-wider uppercase text-coffee">Light</span>
        </>
      )}
    </button>
  );
};
