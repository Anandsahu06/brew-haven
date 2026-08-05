'use client';

import React from 'react';

export default function AdminBlogsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-txt-primary">Blog Journal Publisher</h1>
      <div className="surface-card p-6 rounded-2xl border border-border-subtle text-xs space-y-2">
        <span className="font-bold text-txt-primary">The Science of High-Altitude Extraction</span>
        <p className="text-txt-muted">Published by Elena Vance • 1,420 Reads</p>
      </div>
    </div>
  );
}
