'use client';

import React from 'react';

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-txt-primary">Customer CRM</h1>
      <div className="surface-card p-6 rounded-2xl border border-border-subtle text-xs space-y-2">
        <span className="font-bold text-txt-primary">Elena Vance (Gold Member — 420 Pts)</span>
        <p className="text-txt-muted">Total Spent: $340.50 • 12 Orders</p>
      </div>
    </div>
  );
}
