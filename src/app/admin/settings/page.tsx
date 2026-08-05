'use client';

import React, { useState } from 'react';
import { Save, Check, Settings, Shield, BellRing, Clock } from 'lucide-react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [storeName, setStoreName] = useState('Brew Haven Flagship Roastery 🇮🇳');
  const [taxRate, setTaxRate] = useState('5.0');
  const [openTime, setOpenTime] = useState('07:00 AM');
  const [closeTime, setCloseTime] = useState('11:00 PM');
  const [onlineOrdering, setOnlineOrdering] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 font-sans text-txt-primary">
      
      {/* Header */}
      <div className="border-b border-border-subtle pb-4">
        <h1 className="font-display text-2xl font-bold text-txt-primary">Store Settings & Operations Configuration</h1>
        <p className="text-xs text-txt-muted">Manage operating hours, GST taxes, online ordering toggles, and Indian flagship parameters</p>
      </div>

      <form onSubmit={handleSave} className="surface-card p-8 rounded-3xl border border-border-subtle text-xs space-y-6 max-w-xl shadow-xl">
        
        <div className="space-y-4">
          <label className="text-xs uppercase font-bold tracking-widest text-gold font-display flex items-center gap-2">
            <Settings className="w-4 h-4" /> Store Credentials
          </label>

          <div>
            <label className="text-[10px] text-txt-muted uppercase font-bold block mb-1">Flagship Brand Name</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary hover:border-gold/60 focus:outline-none focus:border-gold focus:shadow-[0_0_15px_rgba(197,155,39,0.15)] transition-all duration-300"
            />
          </div>

          <div>
            <label className="text-[10px] text-txt-muted uppercase font-bold block mb-1">Applicable GST Tax Rate (%)</label>
            <input
              type="text"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary font-mono hover:border-gold/60 focus:outline-none focus:border-gold focus:shadow-[0_0_15px_rgba(197,155,39,0.15)] transition-all duration-300"
            />
          </div>
        </div>

        {/* Operating Hours */}
        <div className="space-y-4 pt-4 border-t border-border-subtle">
          <label className="text-xs uppercase font-bold tracking-widest text-gold font-display flex items-center gap-2">
            <Clock className="w-4 h-4" /> Flagship Operating Hours
          </label>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-txt-muted uppercase font-bold block mb-1">Opening Time</label>
              <input
                type="text"
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary font-mono hover:border-gold/60 focus:outline-none focus:border-gold transition-all duration-300"
              />
            </div>
            <div>
              <label className="text-[10px] text-txt-muted uppercase font-bold block mb-1">Closing Time</label>
              <input
                type="text"
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary font-mono hover:border-gold/60 focus:outline-none focus:border-gold transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Online Ordering Toggle */}
        <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
          <div>
            <span className="font-bold text-txt-primary block">Accept Online Orders</span>
            <span className="text-[11px] text-txt-muted">Toggle live digital ordering across Bengaluru, Mumbai, Delhi</span>
          </div>

          <button
            type="button"
            onClick={() => setOnlineOrdering(!onlineOrdering)}
            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
              onlineOrdering ? 'bg-gold' : 'bg-bg-surface border border-border-subtle'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-soft-black transition-transform duration-300 ${
                onlineOrdering ? 'translate-x-6 bg-soft-black' : 'translate-x-0 bg-txt-muted'
              }`}
            />
          </button>
        </div>

        {/* Submit CTA */}
        <button
          type="submit"
          className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 ${
            saved
              ? 'bg-emerald-500 text-white shadow-[0_4px_25px_rgba(16,185,129,0.4)]'
              : 'bg-gold text-soft-black hover:bg-gold-light hover:shadow-[0_4px_25px_rgba(197,155,39,0.4)] hover:-translate-y-0.5'
          }`}
        >
          {saved ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" /> Settings Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Save Roastery Configuration
            </>
          )}
        </button>

      </form>

    </div>
  );
}
