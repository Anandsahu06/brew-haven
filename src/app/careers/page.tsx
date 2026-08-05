'use client';

import React, { useState } from 'react';
import { Briefcase, CheckCircle2, ArrowRight, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const JOBS = [
  { id: 'j1', title: 'Head Barista & Cupping Specialist', location: 'San Francisco, CA', type: 'Full-Time', salary: '$55,000 - $68,000' },
  { id: 'j2', title: 'Cast-Iron Roastery Apprentice', location: 'Oakland Roastery', type: 'Full-Time', salary: '$48,000 - $58,000' },
  { id: 'j3', title: 'Sanctuary Cafe Floor Manager', location: 'San Francisco, CA', type: 'Full-Time', salary: '$60,000 - $72,000' },
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<typeof JOBS[0] | null>(null);
  const [applied, setApplied] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#C59B27', '#EFE9E1', '#3B281C'],
    });
    setTimeout(() => {
      setApplied(false);
      setSelectedJob(null);
    }, 3000);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-bg-primary font-sans text-txt-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-semibold text-gold font-sans uppercase tracking-widest">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Join Our Craft Team</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-txt-primary tracking-tight">
            Careers at Brew Haven
          </h1>
          <p className="text-sm sm:text-base text-txt-muted font-light leading-relaxed">
            We are always seeking passionate baristas, roastery apprentices, and sanctuary hospitality leaders.
          </p>
        </div>

        {/* Job Listings */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {JOBS.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-3xl surface-card border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <span className="text-[10px] text-gold font-mono uppercase font-bold">{job.type} • {job.location}</span>
                <h3 className="font-display text-xl font-bold text-txt-primary mt-1">{job.title}</h3>
                <span className="text-xs text-txt-muted font-mono">{job.salary}</span>
              </div>

              <button
                onClick={() => setSelectedJob(job)}
                className="px-6 py-3 rounded-xl bg-gold text-soft-black font-bold uppercase tracking-wider text-xs hover:bg-gold-light"
              >
                Apply Now <ArrowRight className="w-4 h-4 inline" />
              </button>
            </div>
          ))}
        </div>

        {/* Application Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedJob(null)} />
            <div className="relative w-full max-w-md bg-bg-card border border-border-subtle rounded-3xl p-8 shadow-2xl z-10 space-y-4 font-sans text-txt-primary">
              <button onClick={() => setSelectedJob(null)} className="absolute top-4 right-4 text-txt-muted">
                <X className="w-5 h-5" />
              </button>

              {applied ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-gold mx-auto" />
                  <h3 className="font-display text-xl font-bold">Application Submitted!</h3>
                  <p className="text-xs text-txt-muted">Our roastery team will review your resume shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  <h3 className="font-display text-xl font-bold">Apply: {selectedJob.title}</h3>
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    className="w-full px-4 py-2.5 rounded-xl bg-bg-surface border border-border-subtle text-xs text-txt-primary focus:border-gold"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    className="w-full px-4 py-2.5 rounded-xl bg-bg-surface border border-border-subtle text-xs text-txt-primary focus:border-gold"
                  />
                  <input
                    type="url"
                    placeholder="LinkedIn / Portfolio Link"
                    className="w-full px-4 py-2.5 rounded-xl bg-bg-surface border border-border-subtle text-xs text-txt-primary focus:border-gold"
                  />
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gold text-soft-black font-bold uppercase tracking-wider text-xs hover:bg-gold-light"
                  >
                    Submit Application
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
