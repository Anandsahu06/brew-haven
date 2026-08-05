'use client';

import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-bg-primary font-sans text-txt-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="font-display text-3xl font-bold text-txt-primary">Privacy Policy</h1>
        <p className="text-xs text-txt-muted leading-relaxed">
          Brew Haven ("we", "our") respects your privacy. We process personal details (name, email, table reservation preferences) solely to fulfill orders, table passes, and Haven Club rewards. We do not sell user data to third parties.
        </p>
      </div>
    </div>
  );
}
