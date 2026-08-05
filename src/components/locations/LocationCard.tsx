'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Phone, Users, Calendar } from 'lucide-react';
import { CAFE_LOCATIONS } from '@/lib/data';

export const LocationsSection: React.FC = () => {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-semibold text-gold font-sans uppercase tracking-widest">
          <MapPin className="w-3.5 h-3.5" />
          <span>Flagship Sanctuaries</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-txt-primary tracking-tight">
          Visit Our Craft Hubs
        </h2>
        <p className="text-sm text-txt-muted font-sans font-light">
          Each Brew Haven location is architected with natural stone, warm acoustic timber, and botanical glasshouse greenery.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {CAFE_LOCATIONS.map((loc) => (
          <div
            key={loc.id}
            className="rounded-3xl surface-card surface-card-hover overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Image Banner */}
              <div className="relative h-60 w-full overflow-hidden bg-bg-surface">
                <Image
                  src={loc.image}
                  alt={loc.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-80" />
                
                {/* Live Status Badge */}
                <div className="absolute top-4 left-4 font-sans">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-500 font-bold text-xs flex items-center gap-1.5 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Open Now
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 text-txt-primary font-sans">
                <div>
                  <h3 className="font-display text-xl font-bold text-txt-primary">{loc.name}</h3>
                  <p className="text-xs text-txt-muted mt-1">{loc.city}</p>
                </div>

                {/* Seating Occupancy Gauge */}
                <div className="p-3.5 rounded-xl bg-bg-surface border border-border-subtle space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-txt-muted flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-gold" /> Live Seating Fill
                    </span>
                    <span className="text-gold font-mono font-bold">{loc.currentOccupancy}% Occupied</span>
                  </div>
                  <div className="h-1.5 w-full bg-bg-card rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold rounded-full"
                      style={{ width: `${loc.currentOccupancy}%` }}
                    />
                  </div>
                </div>

                {/* Details list */}
                <div className="space-y-2 text-xs text-txt-muted">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span className="text-txt-primary">{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold shrink-0" />
                    <span>{loc.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gold shrink-0" />
                    <span>{loc.phone}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {loc.features.map((feat) => (
                    <span
                      key={feat}
                      className="text-[10px] px-2.5 py-1 rounded-md bg-bg-surface border border-border-subtle text-txt-primary"
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>

              </div>
            </div>

            {/* CTA */}
            <div className="p-6 pt-0 font-sans">
              <Link
                href="/reserve"
                className="w-full py-3 rounded-xl bg-bg-surface hover:bg-gold hover:text-soft-black border border-border-subtle hover:border-gold text-txt-primary font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <Calendar className="w-4 h-4" />
                Reserve Seat at this Hub
              </Link>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
