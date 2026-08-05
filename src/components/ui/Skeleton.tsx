'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={cn('skeleton', className)} />;
};

export const SkeletonCard: React.FC = () => {
  return (
    <div className="surface-card rounded-2xl p-5 space-y-4">
      <Skeleton className="h-48 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-12 w-full rounded-xl mt-4" />
      </div>
    </div>
  );
};
