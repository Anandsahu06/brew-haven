'use client';

import React from 'react';

export default function AdminCouponsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-txt-primary">Coupons & Promo Codes</h1>
      <div className="surface-card p-6 rounded-2xl border border-border-subtle text-xs space-y-2">
        <span className="font-mono text-gold font-bold">BREWHAVEN10 (15% Off)</span>
        <p className="text-txt-muted">Used 142 times • Total Discount Value: $385.00</p>
      </div>
    </div>
  );
}
