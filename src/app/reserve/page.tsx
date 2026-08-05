'use client';

import React from 'react';
import { ReservationForm } from '@/components/reservation/ReservationForm';

export default function ReservePage() {
  return (
    <div className="pt-28 pb-16 min-h-screen bg-haven-black">
      <ReservationForm />
    </div>
  );
}
