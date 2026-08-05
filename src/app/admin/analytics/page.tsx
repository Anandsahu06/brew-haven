'use client';

import React, { useState } from 'react';
import { Download, TrendingUp, DollarSign, Award, Calendar } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function AdminAnalyticsPage() {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

  const getMetrics = () => {
    switch (timeframe) {
      case 'daily':
        return { rev: 184500, aov: 620, top: 'Chikmagalur Pour-Over', count: '298 orders' };
      case 'weekly':
        return { rev: 1245000, aov: 650, top: 'Smoked Vanilla Cold Drip', count: '1,915 orders' };
      default:
        return { rev: 4285000, aov: 680, top: 'Obsidian Espresso', count: '6,300 orders' };
    }
  };

  const currentMetrics = getMetrics();

  const handleExportCSV = () => {
    alert('Exporting Roastery Analytics CSV report for India flagships...');
  };

  return (
    <div className="space-y-8 font-sans text-txt-primary">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-txt-primary">Sales & Revenue Analytics (India 🇮🇳)</h1>
          <p className="text-xs text-txt-muted">Track revenue growth across Bengaluru, Mumbai, and New Delhi flagships</p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Timeframe Selector Pills */}
          <div className="flex items-center gap-1 bg-bg-surface p-1 rounded-xl border border-border-subtle">
            {(['daily', 'weekly', 'monthly'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all duration-300 ${
                  timeframe === tf
                    ? 'bg-gold text-soft-black shadow-[0_0_10px_rgba(197,155,39,0.3)]'
                    : 'text-txt-muted hover:text-gold hover:bg-gold/10'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Export CSV CTA with Hover Shadow */}
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl bg-gold text-soft-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-gold-light hover:shadow-[0_4px_20px_rgba(197,155,39,0.35)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
          >
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl surface-card hover:border-gold hover:shadow-[0_4px_20px_rgba(197,155,39,0.2)] hover:-translate-y-0.5 transition-all duration-300 space-y-2 border border-border-subtle">
          <div className="flex items-center justify-between text-gold">
            <span className="text-[10px] text-txt-muted uppercase font-bold tracking-widest font-display">Revenue ({timeframe})</span>
            <DollarSign className="w-5 h-5" />
          </div>
          <p className="font-display text-3xl font-bold text-gold">{formatCurrency(currentMetrics.rev)}</p>
          <span className="text-xs text-emerald-500 font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +16.4% growth vs previous {timeframe}
          </span>
        </div>

        <div className="p-6 rounded-3xl surface-card hover:border-gold hover:shadow-[0_4px_20px_rgba(197,155,39,0.2)] hover:-translate-y-0.5 transition-all duration-300 space-y-2 border border-border-subtle">
          <div className="flex items-center justify-between text-gold">
            <span className="text-[10px] text-txt-muted uppercase font-bold tracking-widest font-display">Average Order Value</span>
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="font-display text-3xl font-bold text-txt-primary">{formatCurrency(currentMetrics.aov)}</p>
          <span className="text-xs text-txt-muted font-mono">{currentMetrics.count}</span>
        </div>

        <div className="p-6 rounded-3xl surface-card hover:border-gold hover:shadow-[0_4px_20px_rgba(197,155,39,0.2)] hover:-translate-y-0.5 transition-all duration-300 space-y-2 border border-border-subtle">
          <div className="flex items-center justify-between text-gold">
            <span className="text-[10px] text-txt-muted uppercase font-bold tracking-widest font-display">Top Selling Craft</span>
            <Award className="w-5 h-5" />
          </div>
          <p className="font-display text-2xl font-bold text-gold">{currentMetrics.top}</p>
          <span className="text-xs text-emerald-500 font-medium">32% of total bean consumption</span>
        </div>
      </div>

    </div>
  );
}
