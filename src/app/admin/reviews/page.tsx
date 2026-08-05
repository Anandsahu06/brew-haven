'use client';

import React from 'react';

export default function AdminReviewsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-txt-primary">Customer Reviews Moderation</h1>
      <div className="surface-card p-6 rounded-2xl border border-border-subtle text-xs space-y-2">
        <span className="font-bold text-gold">5.0 ★ — Verified Buyer</span>
        <p className="text-txt-primary">"The Panama Geisha pour-over has tea-like floral clarity. Unbelievable sensory experience!"</p>
      </div>
    </div>
  );
}
