'use client';

import React from 'react';

export default function AdminReservationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-txt-primary">Table Reservations Grid</h1>
      <div className="surface-card p-6 rounded-2xl border border-border-subtle text-xs space-y-2">
        <div className="flex justify-between font-mono text-gold font-bold">
          <span>BH-RES-8821 • Marcus Sterling</span>
          <span>4 Guests • 7:30 PM</span>
        </div>
        <p className="text-txt-muted">Seating Area: Botanical Glasshouse Sanctuary</p>
      </div>
    </div>
  );
}
