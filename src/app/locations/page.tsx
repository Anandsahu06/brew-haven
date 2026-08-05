'use client';

import React from 'react';
import { LocationsSection } from '@/components/locations/LocationCard';

export default function LocationsPage() {
  return (
    <div className="pt-28 pb-16 min-h-screen bg-haven-black">
      <LocationsSection />
    </div>
  );
}
