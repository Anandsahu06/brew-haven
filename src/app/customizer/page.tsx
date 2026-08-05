'use client';

import React from 'react';
import { BrewCustomizer } from '@/components/customizer/BrewCustomizer';

export default function CustomizerPage() {
  return (
    <div className="pt-28 pb-16 min-h-screen bg-haven-black">
      <BrewCustomizer />
    </div>
  );
}
