'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, X, Smartphone, Sparkles } from 'lucide-react';

export const QRCodeMenuModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        title="In-Cafe Digital QR Menu"
        className="p-2 rounded-full surface-card text-txt-muted hover:text-gold transition-colors"
      >
        <QrCode className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-bg-card border border-border-subtle rounded-3xl p-8 shadow-2xl text-center space-y-5 text-txt-primary z-10 font-sans"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-txt-muted hover:text-txt-primary"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto border border-gold/30">
                <QrCode className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-txt-primary">In-Cafe QR Menu</h3>
                <p className="text-xs text-txt-muted mt-1">Scan with your smartphone camera for instant table ordering</p>
              </div>

              {/* Vector Simulated QR Code Box */}
              <div className="p-6 rounded-2xl bg-white text-black max-w-[200px] mx-auto shadow-inner border border-gray-200 space-y-2">
                <div className="grid grid-cols-5 gap-1.5 p-2 bg-black rounded-lg">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-4 w-4 rounded-sm ${
                        i % 2 === 0 || i % 7 === 0 ? 'bg-white' : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 font-bold block">
                  BREWHAVEN.CAFE
                </span>
              </div>

              <div className="p-3 rounded-xl bg-bg-surface border border-border-subtle text-xs text-txt-muted flex items-center justify-center gap-2">
                <Smartphone className="w-4 h-4 text-gold" />
                <span>Instant contactless table ordering</span>
              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
};
