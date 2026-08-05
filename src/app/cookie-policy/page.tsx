'use client';

import React from 'react';

export default function CookiePolicyPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-bg-primary font-sans text-txt-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="font-display text-3xl font-bold text-txt-primary">Cookie Policy</h1>
        <p className="text-xs text-txt-muted leading-relaxed">
          We use local storage and session cookies (`brewhaven_visited_session`, `brewhaven_wishlist`, `brewhaven_theme`) to persist your theme preferences, favorite micro-lots, and order cart state.
        </p>
      </div>
    </div>
  );
}
