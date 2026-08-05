'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-bg-primary font-sans text-txt-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-semibold text-gold font-sans uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Inquiries India</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-txt-primary tracking-tight">
            Connect with Brew Haven
          </h1>
          <p className="text-sm sm:text-base text-txt-muted font-light leading-relaxed">
            Have questions regarding wholesale beans, masterclasses, or table reservations at our Bengaluru, Mumbai, or Delhi flagships?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form (Col 2) */}
          <div className="lg:col-span-2 p-8 rounded-3xl surface-card border-border-subtle space-y-6">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-gold mx-auto" />
                <h3 className="font-display text-2xl font-bold">Message Sent!</h3>
                <p className="text-xs text-txt-muted">Our roastery team will reply within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    className="px-4 py-3 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary focus:border-gold"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    className="px-4 py-3 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary focus:border-gold"
                  />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Subject (Wholesale / Reservations / General) *"
                  className="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-subtle text-xs text-txt-primary focus:border-gold"
                />
                <textarea
                  rows={4}
                  required
                  placeholder="Your Message *"
                  className="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-subtle text-xs text-txt-primary focus:border-gold"
                />
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gold text-soft-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-gold-light"
                >
                  <Send className="w-4 h-4" /> Send Direct Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Details Column (Col 1) */}
          <div className="p-8 rounded-3xl surface-card space-y-6 border-border-subtle h-fit">
            <h3 className="font-display text-lg font-bold border-b border-border-subtle pb-3">Flagship Details</h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-txt-primary">Bengaluru Flagship</span>
                  <span className="text-txt-muted">100ft Road, 12th Main, Indiranagar, Karnataka 560038</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-txt-primary">Concierge Line</span>
                  <span className="text-txt-muted">+91 98765 43210</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-txt-primary">Operating Hours</span>
                  <span className="text-txt-muted">Mon — Sun: 7:00 AM — 11:00 PM IST</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
