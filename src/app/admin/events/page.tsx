'use client';

import React from 'react';

export default function AdminEventsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-txt-primary">Roastery Events Manager</h1>
      <div className="surface-card p-6 rounded-2xl border border-border-subtle text-xs space-y-2">
        <span className="font-bold text-txt-primary">Cupping Masterclass — Panama Geisha</span>
        <p className="text-txt-muted font-mono">18 / 20 Seats Booked • Next Saturday 4:00 PM</p>
      </div>
    </div>
  );
}
