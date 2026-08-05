'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Smartphone, ShieldCheck, CheckCircle2, Printer, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';

export const RazorpayModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, total, cart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('•••');
  const [upiId, setUpiId] = useState('brewfan@okaxis');

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const generatedId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setOrderComplete(true);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C59B27', '#EFE9E1', '#3B281C'],
      });
    }, 2000);
  };

  const handleClose = () => {
    if (orderComplete) {
      clearCart();
      setOrderComplete(false);
    }
    setIsCheckoutOpen(false);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-bg-card border border-border-subtle rounded-3xl shadow-2xl overflow-hidden text-txt-primary z-10 font-sans"
          >
            
            {/* Header Banner */}
            <div className="bg-bg-surface p-6 border-b border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-txt-primary">Razorpay Secure Checkout</h3>
                  <p className="text-[10px] text-txt-muted">256-Bit SSL Encrypted Instant Payment</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-full text-txt-muted hover:text-txt-primary hover:bg-bg-card"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {orderComplete ? (
              /* Success & Digital Receipt State */
              <div className="p-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-gold" />
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-txt-primary">Payment Successful!</h3>
                  <p className="text-xs text-txt-muted mt-1">
                    Your coffee order has been dispatched to the Brew Haven roastery kitchen.
                  </p>
                </div>

                {/* Receipt Details Box */}
                <div className="p-5 rounded-2xl bg-bg-surface border border-border-subtle text-left text-xs space-y-2 font-mono">
                  <div className="flex justify-between border-b border-border-subtle pb-2">
                    <span className="text-txt-muted">Order ID:</span>
                    <span className="text-gold font-bold">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-txt-muted">Amount Paid:</span>
                    <span className="text-txt-primary font-bold">{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-txt-muted">Est. Preparation Time:</span>
                    <span className="text-gold font-bold">12-15 Mins</span>
                  </div>
                  <div className="pt-2 text-[10px] text-txt-muted text-center font-sans border-t border-border-subtle">
                    A digital receipt has been sent to your registered email.
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-3 rounded-xl bg-bg-surface border border-border-subtle text-xs font-semibold text-txt-primary hover:text-gold flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    Print Receipt
                  </button>
                  <button
                    onClick={handleClose}
                    className="flex-1 py-3 rounded-xl bg-gold text-soft-black text-xs font-bold uppercase tracking-wider hover:bg-gold-light"
                  >
                    Done & Return
                  </button>
                </div>
              </div>
            ) : (
              /* Payment Form State */
              <form onSubmit={handlePayNow} className="p-6 space-y-6">
                
                {/* Total amount banner */}
                <div className="p-4 rounded-2xl bg-bg-surface border border-border-subtle flex items-center justify-between">
                  <div>
                    <span className="text-xs text-txt-muted">Total Payable Amount</span>
                    <p className="text-xs text-gold font-medium">{cart.length} Items Selected</p>
                  </div>
                  <span className="font-display text-2xl font-bold text-gold">
                    {formatCurrency(total)}
                  </span>
                </div>

                {/* Payment Tabs */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'upi'
                        ? 'bg-gold/10 border-gold text-gold'
                        : 'bg-bg-surface border-border-subtle text-txt-muted hover:text-txt-primary'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    UPI / QR
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-gold/10 border-gold text-gold'
                        : 'bg-bg-surface border-border-subtle text-txt-muted hover:text-txt-primary'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    Card
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'bg-gold/10 border-gold text-gold'
                        : 'bg-bg-surface border-border-subtle text-txt-muted hover:text-txt-primary'
                    }`}
                  >
                    <Lock className="w-4 h-4" />
                    NetBanking
                  </button>
                </div>

                {/* Tab Content */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-3">
                    <label className="text-xs text-txt-muted">Instant UPI ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary text-xs focus:outline-none focus:border-gold font-mono"
                    />
                    <p className="text-[11px] text-txt-muted">Instant approval via GPay, PhonePe, or Paytm.</p>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-txt-muted">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary text-xs font-mono focus:outline-none focus:border-gold mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-txt-muted">Expiry Date</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-4 py-2 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary text-xs font-mono focus:outline-none focus:border-gold mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-txt-muted">CVV Code</label>
                        <input
                          type="password"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full px-4 py-2 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary text-xs font-mono focus:outline-none focus:border-gold mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-3 text-xs text-txt-muted">
                    <p>Select your bank portal for direct secure transfer:</p>
                    <select className="w-full px-4 py-2.5 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary focus:outline-none focus:border-gold font-sans">
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>State Bank of India</option>
                      <option>Axis Bank</option>
                    </select>
                  </div>
                )}

                {/* Submit Pay Now Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 rounded-xl bg-gold text-soft-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-gold-light shadow-sm transition-all active:scale-95 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Processing Test Order...
                    </span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Pay {formatCurrency(total)}
                    </>
                  )}
                </button>

              </form>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
