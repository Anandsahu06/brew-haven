'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee } from 'lucide-react';

export const SteamLoader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSteam, setShowSteam] = useState(false);
  const [revealMask, setRevealMask] = useState(false);

  useEffect(() => {
    // 1. Accessibility Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // 2. SessionStorage Check
    const hasVisited = sessionStorage.getItem('brewhaven_visited_session');

    if (hasVisited || prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    // Start 1.8s Steam Reveal Sequence
    setIsVisible(true);

    // 300ms: Steam slowly rises
    const steamTimer = setTimeout(() => {
      setShowSteam(true);
    }, 300);

    // 1.5s: Steam acts as reveal mask
    const maskTimer = setTimeout(() => {
      setRevealMask(true);
    }, 1500);

    // 1.8s: Loader fades & sessionStorage saved
    const endTimer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('brewhaven_visited_session', 'true');
    }, 1800);

    return () => {
      clearTimeout(steamTimer);
      clearTimeout(maskTimer);
      clearTimeout(endTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: revealMask ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[200] bg-[#FDFBF7] dark:bg-[#121110] flex flex-col items-center justify-center pointer-events-none select-none font-sans overflow-hidden transition-colors"
      >
        
        {/* Blurred SVG Coffee Steam Paths */}
        <AnimatePresence>
          {showSteam && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 0.45, y: -40, scale: 1.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <svg
                className="w-80 h-80 text-[#C59B27] filter blur-[12px] opacity-60"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Organic realistic steam curves */}
                <path
                  d="M60 160 C70 120, 50 80, 75 30 C85 60, 65 110, 80 160 Z"
                  fill="currentColor"
                />
                <path
                  d="M100 170 C120 130, 90 70, 115 20 C125 55, 105 105, 120 170 Z"
                  fill="currentColor"
                />
                <path
                  d="M140 165 C130 125, 150 85, 135 35 C145 65, 135 115, 150 165 Z"
                  fill="currentColor"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimal Centered Logo & Tagline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center text-center space-y-3"
        >
          <div className="w-12 h-12 rounded-full bg-[#3B281C] flex items-center justify-center text-[#C59B27] border border-[#C59B27]/40 shadow-sm">
            <Coffee className="w-6 h-6 text-[#C59B27]" />
          </div>

          <div className="space-y-1">
            <h1 className="font-display text-2xl font-bold tracking-tight text-[#121110] dark:text-[#FDFBF7]">
              BREW HAVEN
            </h1>
            <p className="text-xs text-[#6E665D] dark:text-[#A8A096] font-sans font-light tracking-wide">
              Where Every Cup Tells a Story
            </p>
          </div>
        </motion.div>

      </motion.div>
    </AnimatePresence>
  );
};
