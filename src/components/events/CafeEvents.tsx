'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, Ticket, ArrowRight } from 'lucide-react';

const EVENTS = [
  {
    id: 'e1',
    title: 'Barista Pour-Over Masterclass',
    date: 'Every Saturday',
    time: '10:00 AM - 12:00 PM',
    location: 'Roastery Lab, Downtown Hub',
    desc: 'Learn grind calibration, water temperature math, and pulse pour techniques from our licensed Q-Grader head roaster.',
    price: '$45 / Seat',
    seatsLeft: '4 Seats Left',
  },
  {
    id: 'e2',
    title: 'Micro-Lot Cupping Flight Night',
    date: 'Every Thursday',
    time: '07:00 PM - 08:30 PM',
    location: 'Innovation Lab & Garden',
    desc: 'An intimate sensory tasting of 5 rare, unreleased highland coffees evaluated against World Specialty Coffee Guild standards.',
    price: '$35 / Seat',
    seatsLeft: '2 Seats Left',
  },
  {
    id: 'e3',
    title: 'Friday Acoustic Jazz & Cold Brew Lounge',
    date: 'Every Friday',
    time: '08:00 PM - 10:30 PM',
    location: 'Waterfront Terrace Lounge',
    desc: 'Live acoustic jazz quartet paired with nitrogen draft cold brew, espresso martini crafts, and dark chocolate Danish treats.',
    price: 'Free Entry',
    seatsLeft: 'Open Seating',
  },
];

export const CafeEvents: React.FC = () => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-semibold text-gold font-sans uppercase tracking-widest">
            <Ticket className="w-3.5 h-3.5" />
            <span>Roastery Gatherings</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-txt-primary tracking-tight">
            Events & Masterclasses
          </h2>
          <p className="text-sm text-txt-muted font-sans font-light max-w-xl">
            Immerse yourself in specialty coffee culture, barista masterclasses, and acoustic lounge evenings.
          </p>
        </div>

        <Link
          href="/reserve"
          className="px-6 py-3 rounded-full surface-card hover:border-gold text-txt-primary hover:text-gold text-xs font-bold uppercase tracking-wider font-sans flex items-center gap-2"
        >
          View All Events
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
        {EVENTS.map((event) => (
          <div
            key={event.id}
            className="p-6 rounded-3xl surface-card surface-card-hover space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-gold/15 text-gold border border-gold/30">
                  {event.seatsLeft}
                </span>
                <span className="font-display font-bold text-sm text-gold">{event.price}</span>
              </div>

              <h3 className="font-display text-xl font-bold text-txt-primary">{event.title}</h3>
              <p className="text-xs text-txt-muted font-light leading-relaxed">{event.desc}</p>
            </div>

            <div className="space-y-3 border-t border-border-subtle pt-4 text-xs text-txt-muted">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold shrink-0" />
                <span className="text-txt-primary font-medium">{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                <span>{event.time}</span>
              </div>

              <Link
                href="/reserve"
                className="w-full mt-2 py-3 rounded-xl bg-bg-surface hover:bg-gold hover:text-soft-black border border-border-subtle hover:border-gold text-txt-primary font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                Reserve Seat for Event
              </Link>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
