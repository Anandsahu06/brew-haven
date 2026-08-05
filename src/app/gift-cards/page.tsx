'use client';

import React, { useState } from 'react';
import { Gift, CheckCircle2, Search, Send } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function GiftCardsPage() {
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [recipientEmail, setRecipientEmail] = useState<string>('');
  const [senderName, setSenderName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [issuedCode, setIssuedCode] = useState<string | null>(null);

  // Balance checker state
  const [checkCode, setCheckCode] = useState<string>('');
  const [checkedBalance, setCheckedBalance] = useState<number | null>(null);

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `BH-GIFT-${Math.floor(100 + Math.random() * 900)}`;
    setIssuedCode(code);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#C59B27', '#EFE9E1', '#3B281C'],
    });
  };

  const handleCheckBalance = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkCode.trim()) {
      setCheckedBalance(1500); // Mock balance in Rupees
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-bg-primary font-sans text-txt-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-semibold text-gold uppercase tracking-widest">
            <Gift className="w-3.5 h-3.5" />
            <span>Digital Roastery Vouchers</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-txt-primary tracking-tight">
            Brew Haven Gift Cards
          </h1>
          <p className="text-sm sm:text-base text-txt-muted font-light leading-relaxed">
            Give the gift of specialty micro-lot coffee, artisanal pastries, and glasshouse sanctuary experiences across India.
          </p>
        </div>

        {/* Purchase Form Card */}
        {issuedCode ? (
          <div className="p-8 rounded-3xl surface-card border-gold/40 max-w-lg mx-auto text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto border-2 border-gold shadow-[0_0_20px_rgba(197,155,39,0.3)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-display text-2xl font-bold text-txt-primary">Gift Voucher Issued!</h3>
            <p className="text-xs text-txt-muted">
              Digital card delivered to <strong className="text-txt-primary">{recipientEmail}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-bg-surface border border-border-subtle font-mono text-center space-y-1">
              <span className="text-[10px] text-txt-muted uppercase font-sans">Gift Pass Code</span>
              <p className="text-2xl font-bold text-gold">{issuedCode}</p>
              <p className="text-xs text-txt-primary font-sans">Value: {formatCurrency(selectedAmount)}</p>
            </div>

            <button
              onClick={() => setIssuedCode(null)}
              className="w-full py-3.5 rounded-xl bg-gold text-soft-black text-xs font-bold uppercase tracking-wider hover:bg-gold-light hover:shadow-[0_4px_20px_rgba(197,155,39,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300"
            >
              Purchase Another Gift Card
            </button>
          </div>
        ) : (
          <form onSubmit={handlePurchase} className="p-8 rounded-3xl surface-card space-y-8 border-border-subtle shadow-xl">
            
            {/* Amount Selection */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-bold tracking-widest text-gold font-display">
                1. Select Card Amount
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-display">
                {[500, 1000, 2500, 5000].map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => setSelectedAmount(amt)}
                    className={`py-3.5 rounded-xl border font-bold text-base transition-all duration-300 ${
                      selectedAmount === amt
                        ? 'bg-gold text-soft-black border-gold shadow-[0_0_20px_rgba(197,155,39,0.3)] scale-[1.02]'
                        : 'bg-bg-surface text-txt-primary border-border-subtle hover:border-gold hover:bg-gold/10 hover:-translate-y-0.5 hover:text-gold'
                    }`}
                  >
                    {formatCurrency(amt)}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient Details */}
            <div className="space-y-4">
              <label className="text-xs uppercase font-bold tracking-widest text-gold font-display">
                2. Recipient & Message
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Your Name (Sender)"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary text-xs hover:border-gold/60 focus:outline-none focus:border-gold focus:shadow-[0_0_15px_rgba(197,155,39,0.15)] transition-all duration-300"
                />
                <input
                  type="email"
                  required
                  placeholder="Recipient Email *"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary text-xs hover:border-gold/60 focus:outline-none focus:border-gold focus:shadow-[0_0_15px_rgba(197,155,39,0.15)] transition-all duration-300"
                />
              </div>

              <textarea
                rows={3}
                placeholder="Personal message (e.g. Happy Birthday! Enjoy rare Chikmagalur single-origin coffee...)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary text-xs hover:border-gold/60 focus:outline-none focus:border-gold focus:shadow-[0_0_15px_rgba(197,155,39,0.15)] transition-all duration-300"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gold text-soft-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-gold-light hover:shadow-[0_4px_25px_rgba(197,155,39,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300"
            >
              <Send className="w-4 h-4" />
              Purchase & Deliver Gift Card ({formatCurrency(selectedAmount)})
            </button>

          </form>
        )}

        {/* Balance Verification Tool */}
        <div className="p-8 rounded-3xl surface-card space-y-4 border-border-subtle max-w-xl mx-auto shadow-lg">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gold" />
            <h3 className="font-display text-lg font-bold text-txt-primary">Check Gift Card Balance</h3>
          </div>

          <form onSubmit={handleCheckBalance} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Voucher Code (e.g. BH-GIFT-889)"
              value={checkCode}
              onChange={(e) => setCheckCode(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary text-xs uppercase font-mono hover:border-gold/60 focus:outline-none focus:border-gold focus:shadow-[0_0_15px_rgba(197,155,39,0.15)] transition-all duration-300"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary hover:text-soft-black hover:bg-gold hover:border-gold hover:shadow-[0_4px_15px_rgba(197,155,39,0.3)] text-xs font-bold uppercase transition-all duration-300 active:scale-95"
            >
              Check
            </button>
          </form>

          {checkedBalance !== null && (
            <div className="p-3 rounded-xl bg-gold/10 border border-gold/30 text-xs text-gold font-mono text-center">
              Remaining Balance: <strong>{formatCurrency(checkedBalance)}</strong>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
