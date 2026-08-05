'use client';

import React from 'react';

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border-subtle pb-4">
        <h1 className="font-display text-2xl font-bold text-txt-primary">Kitchen Order Queue</h1>
        <p className="text-xs text-txt-muted">Manage active bar extraction orders and pickup statuses</p>
      </div>

      <div className="p-6 rounded-2xl surface-card border border-border-subtle text-xs space-y-3 font-sans">
        <div className="flex justify-between font-mono font-bold text-gold">
          <span>ORD-9021 • Elena Vance</span>
          <span className="text-emerald-500">In Preparation</span>
        </div>
        <p className="text-txt-primary">Obsidian Reserve Espresso (x2), French Croissant (x1)</p>
      </div>
    </div>
  );
}
