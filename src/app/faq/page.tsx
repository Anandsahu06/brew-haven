'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

const FAQS = [
  { q: 'How does table reservation work at Brew Haven?', a: 'You can book a VIP sanctuary table pass online via our /reserve portal. Select date, time, and guest count to receive an instant digital voucher pass with email/WhatsApp confirmation.' },
  { q: 'What makes your micro-lot coffee beans single-origin?', a: 'Our beans are sourced directly from single volcanic micro-lot farms in Panama, Ethiopia, and Colombia above 1,800m elevation. Every lot is graded 91.5+ on the SCA cupping scale.' },
  { q: 'Can I redeem gift cards for online orders?', a: 'Yes! Enter your voucher code (e.g. BH-GIFT-889) at checkout or check your remaining card balance at /gift-cards.' },
  { q: 'What is the AI Roastery Sommelier?', a: 'Our AI Sommelier asks 3 quick sensory questions (flavor mood, brew method, occasion) to calculate your ideal coffee elixir match with 98% accuracy.' },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-bg-primary font-sans text-txt-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-semibold text-gold font-sans uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-txt-primary tracking-tight">
            Common Questions
          </h1>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl surface-card border border-border-subtle overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-display font-bold text-sm text-txt-primary hover:text-gold transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gold transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 text-xs text-txt-muted font-light leading-relaxed border-t border-border-subtle/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
