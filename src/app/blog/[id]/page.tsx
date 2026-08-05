'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BookOpen, Clock, User, ArrowLeft, Share2, Sparkles, MapPin, Thermometer, Droplets, CheckCircle2 } from 'lucide-react';
import { JOURNAL_ARTICLES } from '@/lib/journalData';

export default function JournalArticleDetailPage() {
  const params = useParams();
  const articleId = params.id as string;
  const article = JOURNAL_ARTICLES.find((a) => a.id === articleId) || JOURNAL_ARTICLES[0];
  const relatedArticles = JOURNAL_ARTICLES.filter((a) => a.id !== article.id);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-bg-primary font-sans text-txt-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-txt-muted hover:text-gold transition-colors font-display"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Coffee Journal
        </Link>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-bold uppercase tracking-wider font-display">
              {article.category}
            </span>
            <span className="text-xs text-txt-muted font-mono">{article.date}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-bold text-txt-primary tracking-tight leading-[1.15]">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-txt-muted font-light leading-relaxed">
            {article.subtitle}
          </p>

          {/* Author Meta Row */}
          <div className="flex items-center justify-between border-y border-border-subtle py-4 font-sans text-xs">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gold/40 shrink-0">
                <Image src={article.authorAvatar} alt={article.author} fill className="object-cover" />
              </div>
              <div>
                <span className="font-bold text-txt-primary block text-sm">{article.author}</span>
                <span className="text-txt-muted text-[11px]">{article.authorRole}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-txt-muted">
              <span className="flex items-center gap-1.5 font-mono">
                <Clock className="w-4 h-4 text-gold" /> {article.readTime}
              </span>
              <button
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Article link copied to clipboard!');
                  }
                }}
                className="p-2 rounded-full surface-card border border-border-subtle hover:border-gold hover:text-gold transition-all"
                title="Share Journal Entry"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Hero Media */}
        <div className="relative h-72 sm:h-[420px] w-full rounded-3xl overflow-hidden surface-card border-border-subtle shadow-xl">
          <Image src={article.image} alt={article.title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-30" />
        </div>

        {/* Extraction Science Parameters Card */}
        <div className="p-6 rounded-3xl surface-card border-gold/40 shadow-lg space-y-4">
          <div className="flex items-center gap-2 border-b border-border-subtle pb-3">
            <Sparkles className="w-5 h-5 text-gold" />
            <h3 className="font-display text-lg font-bold text-txt-primary">Lab Extraction Parameters</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-bg-surface border border-border-subtle">
              <span className="text-[10px] text-txt-muted uppercase font-sans">Bean Sourcing</span>
              <p className="font-bold text-txt-primary font-sans mt-0.5">{article.extractionParameters.origin}</p>
            </div>
            <div className="p-3 rounded-xl bg-bg-surface border border-border-subtle">
              <span className="text-[10px] text-txt-muted uppercase font-sans">Farm Altitude</span>
              <p className="font-bold text-gold mt-0.5">{article.extractionParameters.altitude}</p>
            </div>
            <div className="p-3 rounded-xl bg-bg-surface border border-border-subtle">
              <span className="text-[10px] text-txt-muted uppercase font-sans">Grind Calibration</span>
              <p className="font-bold text-txt-primary mt-0.5">{article.extractionParameters.grindSize}</p>
            </div>
            <div className="p-3 rounded-xl bg-bg-surface border border-border-subtle">
              <span className="text-[10px] text-txt-muted uppercase font-sans">Water Temperature</span>
              <p className="font-bold text-gold mt-0.5">{article.extractionParameters.waterTemp}</p>
            </div>
            <div className="p-3 rounded-xl bg-bg-surface border border-border-subtle">
              <span className="text-[10px] text-txt-muted uppercase font-sans">Brew Ratio</span>
              <p className="font-bold text-txt-primary mt-0.5">{article.extractionParameters.ratio}</p>
            </div>
            <div className="p-3 rounded-xl bg-bg-surface border border-border-subtle">
              <span className="text-[10px] text-txt-muted uppercase font-sans">Bloom Phase</span>
              <p className="font-bold text-gold mt-0.5">{article.extractionParameters.bloomTime}</p>
            </div>
          </div>
        </div>

        {/* Editorial Body Content */}
        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-txt-secondary font-sans font-light">
          {article.content.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-txt-primary tracking-tight">
                {section.heading}
              </h2>

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}

              {section.quote && (
                <blockquote className="my-6 p-6 rounded-2xl bg-gold/10 border-l-4 border-gold text-txt-primary font-display font-medium text-lg italic leading-relaxed">
                  "{section.quote}"
                </blockquote>
              )}
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border-subtle">
          {article.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full bg-bg-surface border border-border-subtle text-xs text-txt-muted">
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Bio Box */}
        <div className="p-6 rounded-3xl surface-card border-border-subtle flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gold shrink-0">
            <Image src={article.authorAvatar} alt={article.author} fill className="object-cover" />
          </div>
          <div>
            <h4 className="font-display font-bold text-base text-txt-primary">{article.author}</h4>
            <p className="text-xs text-gold font-medium">{article.authorRole}</p>
            <p className="text-xs text-txt-muted font-light mt-1">
              Curating micro-lot roasting curves and extraction fluid dynamics for Brew Haven.
            </p>
          </div>
        </div>

        {/* Related Articles Section */}
        <div className="pt-8 border-t border-border-subtle space-y-6">
          <h3 className="font-display text-2xl font-bold text-txt-primary">Related Journal Entries</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/blog/${rel.id}`}
                className="p-5 rounded-2xl surface-card hover:border-gold hover:shadow-[0_4px_20px_rgba(197,155,39,0.2)] hover:-translate-y-0.5 transition-all duration-300 space-y-3 border border-border-subtle block"
              >
                <span className="text-[10px] uppercase font-bold text-gold font-display">{rel.category}</span>
                <h4 className="font-display font-bold text-base text-txt-primary hover:text-gold transition-colors">
                  {rel.title}
                </h4>
                <p className="text-xs text-txt-muted line-clamp-2 font-light">{rel.excerpt}</p>
                <span className="text-xs text-gold font-bold uppercase tracking-wider block">
                  Read Article →
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
