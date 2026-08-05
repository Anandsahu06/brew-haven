'use client';

import React from 'react';
import { TasteProfile } from '@/types';

interface TasteRadarProps {
  profile: TasteProfile;
}

export const TasteRadar: React.FC<TasteRadarProps> = ({ profile }) => {
  const metrics = [
    { label: 'Body', value: profile.body, color: '#3B281C' },
    { label: 'Acidity', value: profile.acidity, color: '#C59B27' },
    { label: 'Sweetness', value: profile.sweetness, color: '#A47F1D' },
    { label: 'Aroma', value: profile.aroma, color: '#EFE9E1' },
  ];

  return (
    <div className="p-6 rounded-2xl surface-card space-y-5">
      <div className="flex items-center justify-between border-b border-border-subtle pb-3">
        <h4 className="font-display text-lg font-bold text-txt-primary">Taste Sensor Profile</h4>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-gold/10 text-gold border border-gold/30">
          Live Metric
        </span>
      </div>

      {/* Progress Bars */}
      <div className="space-y-4 font-sans">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-txt-primary font-medium">{m.label}</span>
              <span className="text-gold font-mono font-bold">{m.value}%</span>
            </div>
            <div className="h-2 w-full bg-bg-surface rounded-full overflow-hidden p-0.5 border border-border-subtle">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${m.value}%`,
                  backgroundColor: '#C59B27',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Taste Summary Badge */}
      <div className="pt-2 text-[11px] text-txt-muted flex items-center justify-between font-sans border-t border-border-subtle">
        <span>Balance Rating:</span>
        <span className="text-txt-primary font-semibold">
          {profile.acidity > 85 ? 'Vibrant & Citrusy' : profile.body > 85 ? 'Deep & Syrupy' : 'Harmonious & Smooth'}
        </span>
      </div>
    </div>
  );
};
