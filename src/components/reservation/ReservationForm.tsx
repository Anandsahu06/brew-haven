'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Users, CheckCircle2, Printer, Coffee, Check } from 'lucide-react';
import { ReservationData } from '@/types';
import { generateReservationCode } from '@/lib/utils';
import confetti from 'canvas-confetti';

const reservationSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone number is required'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time slot'),
  guests: z.number().min(1).max(12),
  seatingArea: z.enum(['Window Bar', 'Cozy Lounge', 'Patio Garden', 'Private Tasting Pod']),
  specialRequests: z.string().optional(),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

const TIME_SLOTS = [
  '08:00 AM', '09:30 AM', '11:00 AM',
  '01:00 PM', '03:00 PM', '05:00 PM',
  '07:00 PM', '08:30 PM', '09:30 PM'
];

const SEATING_AREAS = [
  { id: 'Window Bar', name: 'Window Espresso Bar', desc: 'Overlooking the Arts District streets, ideal for individuals & couples' },
  { id: 'Cozy Lounge', name: 'Cozy Velvet Lounge', desc: 'Plush velvet couches & fireplace ambiance, great for conversations' },
  { id: 'Patio Garden', name: 'Botanical Patio Garden', desc: 'Lush greenery glasshouse setting with natural daylight' },
  { id: 'Private Tasting Pod', name: 'Private Cupping Pod', desc: 'Acoustically insulated pod with dedicated barista pour-over service' },
];

export const ReservationForm: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<ReservationData | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guests: 2,
      seatingArea: 'Cozy Lounge',
      date: new Date().toISOString().split('T')[0],
      time: '05:00 PM',
    },
  });

  const selectedTime = watch('time');
  const selectedSeating = watch('seatingArea');
  const guestCount = watch('guests');

  const onSubmit = (data: ReservationFormValues) => {
    const confirmationCode = generateReservationCode();
    const reservation: ReservationData = {
      ...data,
      id: `res-${Date.now()}`,
      confirmationCode,
    };

    setSubmittedData(reservation);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#C59B27', '#EFE9E1', '#3B281C'],
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 font-sans">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-semibold text-gold font-sans uppercase tracking-widest">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>Priority Table Booking</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-txt-primary tracking-tight">
          Reserve Your Table Sanctuary
        </h2>
        <p className="text-sm text-txt-muted font-sans font-light">
          Lock in your preferred seating environment, micro-lot cupping flight, or cozy lounge table at Brew Haven.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {submittedData ? (
          /* Confirmation Pass Card */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="p-8 rounded-3xl surface-card border-gold/40 shadow-2xl space-y-6 max-w-xl mx-auto text-txt-primary font-sans"
          >
            <div className="flex items-center justify-between border-b border-border-subtle pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold text-soft-black flex items-center justify-center font-bold">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">BREW HAVEN VIP PASS</h3>
                  <p className="text-xs text-gold font-medium">Table Reservation Voucher</p>
                </div>
              </div>
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-bg-surface border border-gold/30 text-gold font-bold">
                {submittedData.confirmationCode}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-txt-muted uppercase text-[10px]">Guest Name</span>
                <p className="text-txt-primary font-bold font-sans text-sm">{submittedData.fullName}</p>
              </div>
              <div className="space-y-1">
                <span className="text-txt-muted uppercase text-[10px]">Party Size</span>
                <p className="text-txt-primary font-bold font-sans text-sm">{submittedData.guests} Guests</p>
              </div>
              <div className="space-y-1">
                <span className="text-txt-muted uppercase text-[10px]">Date & Time</span>
                <p className="text-gold font-bold">{submittedData.date} @ {submittedData.time}</p>
              </div>
              <div className="space-y-1">
                <span className="text-txt-muted uppercase text-[10px]">Seating Area</span>
                <p className="text-gold font-bold font-sans">{submittedData.seatingArea}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-bg-surface border border-border-subtle text-xs text-txt-muted">
              📍 <strong className="text-txt-primary">Brew Haven Flagship Roastery:</strong> 100ft Road, Indiranagar, Bengaluru. Please arrive 5 minutes prior to your time slot.
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl bg-bg-surface border border-border-subtle hover:border-gold hover:text-gold text-xs font-semibold text-txt-primary hover:bg-gold/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print Voucher
              </button>
              <button
                onClick={() => setSubmittedData(null)}
                className="flex-1 py-3 rounded-xl bg-gold text-soft-black text-xs font-bold uppercase tracking-wider hover:bg-gold-light hover:shadow-[0_4px_20px_rgba(197,155,39,0.35)] transition-all duration-300"
              >
                Book Another
              </button>
            </div>
          </motion.div>
        ) : (
          /* Booking Form */
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 rounded-3xl surface-card space-y-8 text-txt-primary border-border-subtle font-sans shadow-xl"
          >
            
            {/* Step 1: Party Size & Seating */}
            <div className="space-y-4">
              <label className="text-xs uppercase font-bold tracking-widest text-gold font-display flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>1. Select Guests & Seating Ambiance</span>
              </label>

              <div className="flex items-center gap-4">
                <span className="text-xs text-txt-muted">Party Size:</span>
                <div className="flex items-center gap-2 bg-bg-surface p-1.5 rounded-xl border border-border-subtle">
                  {[1, 2, 4, 6, 8].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setValue('guests', num)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                        guestCount === num
                          ? 'bg-gold text-soft-black shadow-[0_0_12px_rgba(197,155,39,0.3)]'
                          : 'text-txt-muted hover:text-gold hover:bg-gold/10'
                      }`}
                    >
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {SEATING_AREAS.map((area) => {
                  const isSelected = selectedSeating === area.id;
                  return (
                    <button
                      type="button"
                      key={area.id}
                      onClick={() => setValue('seatingArea', area.id as any)}
                      className={`relative p-5 rounded-2xl border text-left transition-all duration-300 ${
                        isSelected
                          ? 'bg-gold/10 border-gold shadow-[0_0_20px_rgba(197,155,39,0.25)] scale-[1.01]'
                          : 'bg-bg-card border-border-subtle hover:border-gold hover:bg-gold/5 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(197,155,39,0.15)] opacity-85 hover:opacity-100'
                      }`}
                    >
                      <h4 className="font-display font-bold text-sm text-txt-primary pr-6">{area.name}</h4>
                      <p className="text-xs text-txt-muted mt-1 leading-relaxed font-light">{area.desc}</p>

                      {isSelected && (
                        <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-gold text-soft-black flex items-center justify-center shadow-md">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Date & Time Slot */}
            <div className="space-y-4">
              <label className="text-xs uppercase font-bold tracking-widest text-gold font-display flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>2. Select Date & Time Slot</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-txt-muted mb-1 block">Reservation Date</label>
                  <input
                    type="date"
                    {...register('date')}
                    className="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary text-xs hover:border-gold/60 focus:outline-none focus:border-gold focus:shadow-[0_0_15px_rgba(197,155,39,0.15)] transition-all duration-300"
                  />
                  {errors.date && <p className="text-[11px] text-red-400 mt-1">{errors.date.message}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs text-txt-muted mb-1 block">Available Time Slots</label>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setValue('time', slot)}
                          className={`py-2.5 text-xs rounded-xl border text-center transition-all duration-300 ${
                            isSelected
                              ? 'bg-gold text-soft-black font-bold border-gold shadow-[0_0_15px_rgba(197,155,39,0.35)] scale-[1.02]'
                              : 'bg-bg-surface text-txt-muted border-border-subtle hover:text-gold hover:border-gold hover:bg-gold/10 hover:-translate-y-0.5'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Contact Info */}
            <div className="space-y-4">
              <label className="text-xs uppercase font-bold tracking-widest text-gold font-display flex items-center gap-2">
                <span>3. Contact Information</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    {...register('fullName')}
                    className="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary text-xs hover:border-gold/60 focus:outline-none focus:border-gold focus:shadow-[0_0_15px_rgba(197,155,39,0.15)] transition-all duration-300"
                  />
                  {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName.message}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email Address *"
                    {...register('email')}
                    className="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary text-xs hover:border-gold/60 focus:outline-none focus:border-gold focus:shadow-[0_0_15px_rgba(197,155,39,0.15)] transition-all duration-300"
                  />
                  {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    {...register('phone')}
                    className="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary text-xs hover:border-gold/60 focus:outline-none focus:border-gold focus:shadow-[0_0_15px_rgba(197,155,39,0.15)] transition-all duration-300"
                  />
                  {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <textarea
                  rows={2}
                  placeholder="Special requests (e.g., anniversary celebration, quiet corner...)"
                  {...register('specialRequests')}
                  className="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary text-xs hover:border-gold/60 focus:outline-none focus:border-gold focus:shadow-[0_0_15px_rgba(197,155,39,0.15)] transition-all duration-300"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gold text-soft-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-gold-light hover:shadow-[0_4px_25px_rgba(197,155,39,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300"
            >
              <CheckCircle2 className="w-4 h-4" />
              Confirm Reservation & Generate VIP Pass
            </button>

          </motion.form>
        )}
      </AnimatePresence>

    </div>
  );
};
