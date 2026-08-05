'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, ArrowRight, Calendar, Award, Star, Compass } from 'lucide-react';
import { useSoundscape } from '@/context/SoundscapeContext';

export const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { playSteamSound } = useSoundscape();

  // Floating Steam Particles Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeRate: number;
    }> = [];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 200,
        size: Math.random() * 3 + 1,
        speedY: Math.random() * 0.6 + 0.2,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.1,
        fadeRate: Math.random() * 0.002 + 0.001,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.opacity -= p.fadeRate;

        if (p.y < 0 || p.opacity <= 0) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
          p.opacity = Math.random() * 0.4 + 0.1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197, 155, 39, ${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-bg-primary">
      
      {/* Particle Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10 opacity-60"
      />

      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary/90 to-bg-primary" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full text-center">
        
        {/* Award Badge Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full surface-card text-xs text-txt-primary border-border-subtle hover:border-gold hover:bg-gold/10 hover:-translate-y-0.5 transition-all duration-300 mb-8"
        >
          <Award className="w-4 h-4 text-gold" />
          <span className="text-gold font-semibold uppercase tracking-wider font-display">Awwwards Showcase</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-txt-muted">Specialty Roastery</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-txt-primary max-w-4xl mx-auto leading-[1.08]"
        >
          Where Every Cup <br className="hidden sm:inline" />
          <span className="text-gold font-normal italic">Tells a Story</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-sm sm:text-lg text-txt-secondary max-w-2xl mx-auto font-sans font-light leading-relaxed"
        >
          An elevated fusion of direct-trade Indian highland micro-lots, precision roasting science, and architectural cafe sanctuaries.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 font-sans"
        >
          <Link
            href="/menu"
            className="px-7 py-3.5 rounded-full bg-gold text-soft-black font-bold text-xs uppercase tracking-wider shadow-sm hover:bg-gold-light hover:shadow-[0_4px_25px_rgba(197,155,39,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 flex items-center gap-2"
          >
            Explore Menu
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/customizer"
            onClick={playSteamSound}
            className="px-7 py-3.5 rounded-full surface-card hover:border-gold hover:text-gold hover:bg-gold/10 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(197,155,39,0.2)] text-txt-primary font-semibold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 active:scale-95"
          >
            <Flame className="w-4 h-4 text-gold" />
            Custom Brew Lab
          </Link>

          <Link
            href="/reserve"
            className="px-6 py-3.5 rounded-full border border-border-subtle hover:border-gold hover:text-gold hover:bg-gold/10 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(197,155,39,0.15)] text-txt-secondary font-medium text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 active:scale-95"
          >
            <Calendar className="w-4 h-4 text-gold" />
            Reserve Table
          </Link>
        </motion.div>

        {/* Whitespace Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <div className="p-5 rounded-2xl surface-card text-left hover:border-gold hover:bg-gold/5 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(197,155,39,0.15)] transition-all duration-300">
            <div className="flex items-center gap-2 text-gold mb-1">
              <Star className="w-4 h-4 fill-gold" />
              <span className="font-display font-bold text-xl text-txt-primary">92.5+</span>
            </div>
            <p className="text-xs text-txt-muted font-sans">SCA Micro-lot Cupping Score</p>
          </div>

          <div className="p-5 rounded-2xl surface-card text-left hover:border-gold hover:bg-gold/5 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(197,155,39,0.15)] transition-all duration-300">
            <div className="flex items-center gap-2 text-gold mb-1">
              <Compass className="w-4 h-4" />
              <span className="font-display font-bold text-xl text-txt-primary">100%</span>
            </div>
            <p className="text-xs text-txt-muted font-sans">Direct Trade Farm Sourcing</p>
          </div>

          <div className="p-5 rounded-2xl surface-card text-left hover:border-gold hover:bg-gold/5 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(197,155,39,0.15)] transition-all duration-300">
            <div className="flex items-center gap-2 text-gold mb-1">
              <Flame className="w-4 h-4" />
              <span className="font-display font-bold text-xl text-txt-primary">24-Hr</span>
            </div>
            <p className="text-xs text-txt-muted font-sans">Ice Tower Slow Drip</p>
          </div>

          <div className="p-5 rounded-2xl surface-card text-left hover:border-gold hover:bg-gold/5 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(197,155,39,0.15)] transition-all duration-300">
            <div className="flex items-center gap-2 text-gold mb-1">
              <Award className="w-4 h-4" />
              <span className="font-display font-bold text-xl text-txt-primary">3 Hubs</span>
            </div>
            <p className="text-xs text-txt-muted font-sans">Architectural Flagships</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
