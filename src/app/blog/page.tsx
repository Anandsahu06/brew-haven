'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Clock, User, ArrowRight } from 'lucide-react';
import { JOURNAL_ARTICLES } from '@/lib/journalData';

export default function BlogPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-bg-primary font-sans text-txt-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-semibold text-gold font-sans uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Roaster Science & Journal</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-txt-primary tracking-tight">
            The Coffee Journal
          </h1>
          <p className="text-sm sm:text-base text-txt-muted font-light leading-relaxed">
            Deep-dives into Indian highland farm micro-climates, extraction science, and barista craft techniques.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="rounded-3xl surface-card hover:border-gold hover:shadow-[0_8px_30px_rgba(197,155,39,0.2)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between border border-border-subtle group"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-bg-surface">
                  <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded-md bg-gold text-soft-black text-[10px] font-bold uppercase tracking-wider font-display shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-txt-muted font-mono">
                    <span className="flex items-center gap-1"><User className="w-3 h-3 text-gold" /> {article.author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-gold" /> {article.readTime}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-txt-primary group-hover:text-gold transition-colors">{article.title}</h3>
                  <p className="text-xs text-txt-muted font-light leading-relaxed">{article.excerpt}</p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/blog/${article.id}`}
                  className="w-full py-3 rounded-xl bg-bg-surface border border-border-subtle hover:border-gold hover:bg-gold hover:text-soft-black text-gold font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:shadow-[0_4px_20px_rgba(197,155,39,0.35)] transition-all duration-300 active:scale-95"
                >
                  Read Journal Entry <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
