'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, X, Smartphone, Coffee, ExternalLink, CheckCircle2 } from 'lucide-react';

export const QRCodeMenuModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        title="In-Cafe Digital QR Menu"
        className="p-2.5 rounded-full surface-card text-txt-muted hover:text-gold hover:border-gold hover:bg-gold/10 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(197,155,39,0.2)] active:scale-95 transition-all duration-300"
      >
        <QrCode className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] overflow-y-auto flex items-center justify-center p-4 sm:p-6">
            
            {/* Dark Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-bg-card border border-border-subtle rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6 text-txt-primary z-10 font-sans border-gold/30"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-bg-surface border border-border-subtle text-txt-muted hover:text-gold hover:border-gold hover:bg-gold/10 transition-all active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header Icon & Title */}
              <div className="space-y-2 pt-2">
                <div className="w-12 h-12 rounded-2xl bg-gold/15 text-gold border border-gold/40 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(197,155,39,0.2)]">
                  <Coffee className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-txt-primary tracking-tight">Digital Table QR</h3>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 text-gold text-[11px] font-semibold border border-gold/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold" /> Table #08 • Indiranagar Flagship
                </span>
              </div>

              {/* High Precision Vector SVG QR Code Container */}
              <div className="relative p-5 rounded-2xl bg-white text-black max-w-[220px] mx-auto shadow-xl border-2 border-gold/40 space-y-2 group">
                <svg
                  className="w-full h-auto aspect-square"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer Position Detection Squares */}
                  <rect x="5" y="5" width="26" height="26" rx="4" fill="#121110" />
                  <rect x="9" y="9" width="18" height="18" rx="2" fill="#FFFFFF" />
                  <rect x="13" y="13" width="10" height="10" rx="1.5" fill="#121110" />

                  <rect x="69" y="5" width="26" height="26" rx="4" fill="#121110" />
                  <rect x="73" y="9" width="18" height="18" rx="2" fill="#FFFFFF" />
                  <rect x="77" y="13" width="10" height="10" rx="1.5" fill="#121110" />

                  <rect x="5" y="69" width="26" height="26" rx="4" fill="#121110" />
                  <rect x="9" y="73" width="18" height="18" rx="2" fill="#FFFFFF" />
                  <rect x="13" y="77" width="10" height="10" rx="1.5" fill="#121110" />

                  {/* QR Data Pattern Rectangles */}
                  <rect x="36" y="8" width="6" height="6" rx="1" fill="#121110" />
                  <rect x="46" y="8" width="6" height="6" rx="1" fill="#C59B27" />
                  <rect x="56" y="8" width="6" height="6" rx="1" fill="#121110" />

                  <rect x="36" y="18" width="6" height="6" rx="1" fill="#121110" />
                  <rect x="46" y="18" width="16" height="6" rx="1" fill="#121110" />

                  <rect x="8" y="36" width="6" height="6" rx="1" fill="#121110" />
                  <rect x="18" y="36" width="6" height="6" rx="1" fill="#C59B27" />
                  <rect x="28" y="36" width="6" height="6" rx="1" fill="#121110" />
                  <rect x="38" y="36" width="16" height="16" rx="3" fill="#3B281C" />

                  {/* Center Coffee Bean Icon Overlay */}
                  <rect x="42" y="42" width="16" height="16" rx="4" fill="#C59B27" />

                  <rect x="66" y="36" width="6" height="6" rx="1" fill="#121110" />
                  <rect x="76" y="36" width="16" height="6" rx="1" fill="#121110" />

                  <rect x="8" y="46" width="16" height="6" rx="1" fill="#121110" />
                  <rect x="66" y="46" width="6" height="16" rx="1" fill="#121110" />
                  <rect x="76" y="46" width="16" height="6" rx="1" fill="#C59B27" />

                  <rect x="8" y="56" width="6" height="6" rx="1" fill="#C59B27" />
                  <rect x="18" y="56" width="16" height="6" rx="1" fill="#121110" />

                  <rect x="36" y="66" width="6" height="16" rx="1" fill="#121110" />
                  <rect x="46" y="66" width="16" height="6" rx="1" fill="#121110" />
                  <rect x="66" y="66" width="6" height="6" rx="1" fill="#C59B27" />

                  <rect x="36" y="86" width="16" height="6" rx="1" fill="#121110" />
                  <rect x="56" y="86" width="6" height="6" rx="1" fill="#121110" />
                  <rect x="66" y="76" width="16" height="16" rx="2" fill="#121110" />
                </svg>

                <div className="pt-1">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-soft-black block uppercase">
                    BREWHAVEN.CAFE
                  </span>
                </div>
              </div>

              {/* Instructions */}
              <div className="p-3 rounded-2xl bg-bg-surface border border-border-subtle text-xs text-txt-muted flex items-center justify-center gap-2">
                <Smartphone className="w-4 h-4 text-gold shrink-0" />
                <span>Scan with mobile camera for instant table ordering</span>
              </div>

              {/* Action Link */}
              <Link
                href="/menu"
                onClick={() => setIsOpen(false)}
                className="w-full py-3.5 rounded-xl bg-gold text-soft-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-gold-light hover:shadow-[0_4px_25px_rgba(197,155,39,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 font-sans"
              >
                Open Digital Menu <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
};
