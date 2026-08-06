'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, User, Coffee } from 'lucide-react';

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    { sender: 'bot', text: 'Namaste! Welcome to Brew Haven. I am your AI Coffee Concierge. Looking for a custom roast recommendation or flagship cafe reservation?' },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputMessage('');

    setTimeout(() => {
      let botReply = 'I recommend our Chikmagalur Baba Budangiri V60 pour-over (₹420) or Smoked Vanilla Cold Drip (₹320)!';
      if (userText.toLowerCase().includes('reserve') || userText.toLowerCase().includes('table')) {
        botReply = 'You can reserve a table at our Indiranagar (Bengaluru) or Kala Ghoda (Mumbai) flagships directly on our /reserve page!';
      } else if (userText.toLowerCase().includes('location') || userText.toLowerCase().includes('where')) {
        botReply = 'We have flagships in Indiranagar (Bengaluru), Kala Ghoda (Mumbai), and Hauz Khas Village (Delhi)!';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    }, 800);
  };

  const widgetContent = (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-[9999] pointer-events-none font-sans">
      {/* Floating Concierge Trigger Badge */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto p-4 rounded-full bg-gold text-soft-black shadow-[0_4px_25px_rgba(197,155,39,0.5)] hover:scale-110 hover:bg-gold-light transition-all duration-300 active:scale-95 flex items-center gap-2 group"
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold font-display uppercase tracking-wider hidden sm:inline">
            AI Concierge
          </span>
        </button>
      )}

      {/* Solid Non-Transparent Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="pointer-events-auto w-[calc(100vw-2rem)] sm:w-96 bg-[#181614] border-2 border-gold/40 rounded-3xl shadow-[0_15px_60px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col h-[490px] text-txt-primary"
          >
            {/* Solid Header */}
            <div className="p-4 bg-[#12100E] border-b border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gold/20 text-gold border border-gold/40 flex items-center justify-center shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-txt-primary tracking-tight">Roastery Concierge</h3>
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Assistant
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-bg-surface text-txt-muted hover:text-gold hover:border-gold hover:bg-gold/15 hover:scale-110 transition-all active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Solid Chat History Area */}
            <div className="flex-1 p-4 bg-[#181614] overflow-y-auto space-y-3 text-xs">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl shadow-sm leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-gold text-soft-black font-semibold rounded-br-none'
                        : 'bg-[#24211D] text-txt-primary border border-border-subtle rounded-bl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Solid Quick Suggestions */}
            <div className="px-4 py-2 bg-[#12100E] border-t border-border-subtle flex gap-2 overflow-x-auto no-scrollbar text-[10px]">
              {['Roast Recommendation', 'Indiranagar Flagship', 'Book Table'].map((chip) => (
                <button
                  key={chip}
                  onClick={() => setInputMessage(chip)}
                  className="px-3 py-1 rounded-full bg-[#24211D] text-txt-muted border border-border-subtle hover:text-gold hover:border-gold hover:bg-gold/10 transition-all whitespace-nowrap"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Solid Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-[#12100E] border-t border-border-subtle flex gap-2">
              <input
                type="text"
                placeholder="Ask about roasts, locations..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#24211D] border border-border-subtle text-txt-primary text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              />
              <button
                type="submit"
                className="p-2.5 bg-gold text-soft-black rounded-xl hover:bg-gold-light hover:shadow-[0_0_15px_rgba(197,155,39,0.4)] transition-all active:scale-95 font-bold"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return mounted ? createPortal(widgetContent, document.body) : null;
};
