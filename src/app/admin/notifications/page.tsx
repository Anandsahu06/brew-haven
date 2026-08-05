'use client';

import React from 'react';

export default function AdminNotificationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-txt-primary">Kitchen Notification Center</h1>
      <div className="surface-card p-6 rounded-2xl border border-border-subtle text-xs space-y-2">
        <span className="font-bold text-gold">⚠️ Low Stock Alert</span>
        <p className="text-txt-primary">Ethiopian Yirgacheffe bean reserve level reached 12 kg threshold.</p>
      </div>
    </div>
  );
}
