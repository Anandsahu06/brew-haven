'use client';

import React from 'react';
import { BeanOriginMap } from '@/components/origins/BeanOriginMap';

export default function OriginsPage() {
  return (
    <div className="pt-28 pb-16 min-h-screen bg-haven-black">
      <BeanOriginMap />
    </div>
  );
}
