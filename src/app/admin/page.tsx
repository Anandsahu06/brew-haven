'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Coffee, Users, ShoppingBag, Flame, CheckCircle2, Clock, ArrowUpRight, Check, Play } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState([
    { id: 'ORD-901', customer: 'Aarav Sharma', items: 'Chikmagalur Pour-Over x2', status: 'In Prep', time: '2 mins ago' },
    { id: 'ORD-902', customer: 'Meera Nair', items: 'Smoked Vanilla Cold Drip x1', status: 'Pending', time: '5 mins ago' },
    { id: 'ORD-903', customer: 'Rohan Mehta', items: 'Araku Valley Geisha x1, Cardamom Bun x1', status: 'Ready', time: '8 mins ago' },
  ]);

  const toggleOrderStatus = (id: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, status: o.status === 'Pending' ? 'In Prep' : o.status === 'In Prep' ? 'Ready' : 'Completed' }
          : o
      )
    );
  };

  return (
    <div className="space-y-8 font-sans text-txt-primary">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-xs font-semibold text-gold font-mono uppercase">
            Live Operations Control India
          </div>
          <h1 className="font-display text-3xl font-bold text-txt-primary mt-1">Roastery Admin Dashboard</h1>
        </div>

        <span className="text-xs text-emerald-500 font-bold bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/30 flex items-center gap-1.5 w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Kitchen Bar Station Active
        </span>
      </div>

      {/* Top Metrics Cards with Hover Lift & Glow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl surface-card hover:border-gold hover:shadow-[0_4px_20px_rgba(197,155,39,0.2)] hover:-translate-y-0.5 transition-all duration-300 space-y-1 border border-border-subtle">
          <span className="text-[10px] text-txt-muted uppercase font-bold tracking-widest font-display">Today Revenue</span>
          <p className="font-display text-2xl font-bold text-gold">{formatCurrency(184500)}</p>
          <span className="text-[11px] text-emerald-500 font-medium">+14% vs yesterday</span>
        </div>

        <div className="p-5 rounded-2xl surface-card hover:border-gold hover:shadow-[0_4px_20px_rgba(197,155,39,0.2)] hover:-translate-y-0.5 transition-all duration-300 space-y-1 border border-border-subtle">
          <span className="text-[10px] text-txt-muted uppercase font-bold tracking-widest font-display">Active Kitchen Queue</span>
          <p className="font-display text-2xl font-bold text-txt-primary">6 Orders</p>
          <span className="text-[11px] text-gold font-mono">Avg prep: 4 mins</span>
        </div>

        <div className="p-5 rounded-2xl surface-card hover:border-gold hover:shadow-[0_4px_20px_rgba(197,155,39,0.2)] hover:-translate-y-0.5 transition-all duration-300 space-y-1 border border-border-subtle">
          <span className="text-[10px] text-txt-muted uppercase font-bold tracking-widest font-display">Flagship Seating Fill</span>
          <p className="font-display text-2xl font-bold text-txt-primary">68% Occupied</p>
          <span className="text-[11px] text-txt-muted">51 / 75 Seats Filled</span>
        </div>

        <div className="p-5 rounded-2xl surface-card hover:border-gold hover:shadow-[0_4px_20px_rgba(197,155,39,0.2)] hover:-translate-y-0.5 transition-all duration-300 space-y-1 border border-border-subtle">
          <span className="text-[10px] text-txt-muted uppercase font-bold tracking-widest font-display">Bean Reserve Stock</span>
          <p className="font-display text-2xl font-bold text-gold">84 Kg</p>
          <span className="text-[11px] text-emerald-500 font-medium">Chikmagalur & Araku Good</span>
        </div>
      </div>

      {/* Live Kitchen Order Queue */}
      <div className="p-6 rounded-3xl surface-card space-y-5 border border-border-subtle shadow-xl">
        <div className="flex items-center justify-between border-b border-border-subtle pb-4">
          <h3 className="font-display text-xl font-bold text-txt-primary flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gold" /> Live Kitchen Orders
          </h3>

          <Link
            href="/admin/orders"
            className="text-xs text-gold font-bold uppercase tracking-wider flex items-center gap-1 hover:underline"
          >
            View All Orders <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3 font-sans">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="p-4 rounded-2xl bg-bg-surface border border-border-subtle hover:border-gold/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-gold">{ord.id}</span>
                  <span className="font-bold text-txt-primary">{ord.customer}</span>
                  <span className="text-txt-muted text-[10px]">({ord.time})</span>
                </div>
                <p className="text-txt-secondary mt-1 font-light">{ord.items}</p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono ${
                    ord.status === 'Ready'
                      ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30'
                      : ord.status === 'Completed'
                      ? 'bg-txt-muted/15 text-txt-muted border border-border-subtle'
                      : 'bg-gold/15 text-gold border border-gold/30'
                  }`}
                >
                  {ord.status}
                </span>

                <button
                  onClick={() => toggleOrderStatus(ord.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-bg-card border border-border-subtle hover:bg-gold hover:text-soft-black hover:border-gold hover:shadow-[0_0_15px_rgba(197,155,39,0.35)] text-txt-primary text-xs font-bold transition-all duration-300 active:scale-95 flex items-center gap-1.5"
                >
                  <Play className="w-3 h-3 fill-current" /> Advance Status
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
