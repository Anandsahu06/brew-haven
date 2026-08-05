'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Flame, Disc, ChevronDown, ChevronUp, Sliders } from 'lucide-react';
import { useSoundscape } from '@/context/SoundscapeContext';

export const AmbientPlayer: React.FC = () => {
  const { isPlaying, togglePlay, volume, setVolume, playSteamSound, activeTrackName } = useSoundscape();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 p-4 rounded-2xl surface-card w-72 shadow-2xl border-gold/30 text-txt-primary space-y-3 font-sans"
          >
            <div className="flex items-center justify-between border-b border-border-subtle pb-2">
              <div className="flex items-center gap-2">
                <Disc className={`w-4 h-4 text-gold ${isPlaying ? 'animate-pulse' : ''}`} />
                <span className="text-xs font-bold uppercase tracking-wider font-display text-gold">
                  Cafe Soundscape Synth
                </span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-txt-muted hover:text-txt-primary p-1"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div>
              <p className="text-xs font-semibold text-txt-primary">{activeTrackName}</p>
              <p className="text-[10px] text-txt-muted">Synthesized Web Audio Atmosphere</p>
            </div>

            {/* Volume Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-txt-muted font-mono">
                <span>Volume</span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1 bg-bg-surface rounded-lg appearance-none cursor-pointer accent-gold"
              />
            </div>

            {/* Steam Valve Trigger */}
            <div className="pt-1">
              <button
                onClick={playSteamSound}
                className="w-full py-2 px-3 rounded-xl bg-bg-surface border border-gold/40 hover:border-gold text-gold text-xs font-medium flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Flame className="w-3.5 h-3.5" />
                Trigger Espresso Steam Hiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed Docked Bar */}
      <div className="flex items-center gap-2 p-1.5 rounded-full surface-card shadow-xl border-border-subtle">
        <button
          onClick={togglePlay}
          className={`p-2.5 rounded-full font-semibold transition-all duration-300 ${
            isPlaying ? 'bg-gold text-soft-black shadow-sm' : 'bg-bg-surface text-txt-primary'
          }`}
        >
          {isPlaying ? <Volume2 className="w-4 h-4 text-soft-black" /> : <VolumeX className="w-4 h-4 text-txt-muted" />}
        </button>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-3 py-1 text-xs text-txt-primary font-medium hover:text-gold transition-colors font-sans"
        >
          <Sliders className="w-3.5 h-3.5 text-gold" />
          <span className="hidden sm:inline">Ambience</span>
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
