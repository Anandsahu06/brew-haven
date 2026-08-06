'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="w-9 h-9 flex items-center justify-center rounded-full surface-card border border-border-subtle text-txt-muted hover:text-gold hover:border-gold hover:bg-gold/10 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(197,155,39,0.2)] active:scale-95 transition-all duration-300 shrink-0"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-gold" />
      ) : (
        <Moon className="w-4 h-4 text-coffee" />
      )}
    </button>
  );
};
