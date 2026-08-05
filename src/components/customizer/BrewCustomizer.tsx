'use client';

import React, { useState, useMemo } from 'react';
import { Flame, Sparkles, ShoppingBag, Check } from 'lucide-react';
import { TasteRadar } from './TasteRadar';
import { useCart } from '@/context/CartContext';
import { useSoundscape } from '@/context/SoundscapeContext';
import { CustomBrew } from '@/types';
import { formatCurrency } from '@/lib/utils';

const ORIGINS = [
  { id: 'Chikmagalur, Karnataka', name: 'Chikmagalur, Karnataka', notes: 'Jasmine & Bergamot', acidity: 92, body: 65, sweetness: 88, aroma: 95, basePrice: 240 },
  { id: 'Araku Valley, AP', name: 'Araku Valley, AP', notes: 'Toffee & Red Apple', acidity: 78, body: 82, sweetness: 90, aroma: 85, basePrice: 320 },
  { id: 'Coorg Reserve, Karnataka', name: 'Coorg Reserve, Karnataka', notes: 'Dark Cacao & Nutmeg', acidity: 72, body: 85, sweetness: 84, aroma: 89, basePrice: 420 },
  { id: 'Wayanad Hills, Kerala', name: 'Wayanad Hills, Kerala', notes: 'Cedar & Malabar Spice', acidity: 45, body: 96, sweetness: 76, aroma: 82, basePrice: 290 },
];

const ROAST_LEVELS = ['Light Roast', 'Medium Roast', 'Dark Roast'];

const BREW_METHODS = [
  { id: 'V60 Pour-Over', name: 'V60 Pour-Over', desc: 'Clean, floral, crisp clarity' },
  { id: 'Aeropress', name: 'Aeropress', desc: 'Rich extraction, balanced body' },
  { id: 'French Press', name: 'French Press', desc: 'Heavy body, essential oils preserved' },
  { id: 'Double Ristretto', name: 'Double Ristretto', desc: 'Concentrated, sweet, intense' },
  { id: 'Cold Tower Drip', name: 'Cold Tower Drip', desc: '24hr ice drip, zero bitterness' },
];

const GRIND_SIZES = ['Extra Coarse', 'Coarse', 'Medium-Fine', 'Espresso Fine'];

const MILK_OPTIONS = ['None', 'Oat Milk (Minor Figures)', 'Almond Milk', 'Coconut Cream', 'Whole Jersey Milk'];

const ADD_INS = [
  { id: 'Madagascar Bourbon Vanilla', name: 'Madagascar Vanilla', price: 40 },
  { id: 'Himalayan Pink Salted Caramel', name: 'Salted Caramel', price: 40 },
  { id: 'Kashmir Saffron Extract', name: 'Kashmir Saffron', price: 60 },
  { id: 'Edible 24k Gold Flakes', name: '24k Gold Flakes', price: 90 },
];

export const BrewCustomizer: React.FC = () => {
  const { addToCart } = useCart();
  const { playSteamSound } = useSoundscape();

  const [selectedOrigin, setSelectedOrigin] = useState(ORIGINS[0]);
  const [roastLevel, setRoastLevel] = useState(ROAST_LEVELS[1]);
  const [grindSize, setGrindSize] = useState(GRIND_SIZES[2]);
  const [brewMethod, setBrewMethod] = useState(BREW_METHODS[0]);
  const [milkType, setMilkType] = useState(MILK_OPTIONS[0]);
  const [selectedAddIns, setSelectedAddIns] = useState<string[]>([]);
  const [customName, setCustomName] = useState('My Reserve Elixir');
  const [added, setAdded] = useState(false);

  const toggleAddIn = (id: string) => {
    setSelectedAddIns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const calculatedPrice = useMemo(() => {
    let price = selectedOrigin.basePrice;
    if (milkType !== 'None') price += 40;
    selectedAddIns.forEach((addInId) => {
      const match = ADD_INS.find((a) => a.id === addInId);
      if (match) price += match.price;
    });
    return price;
  }, [selectedOrigin, milkType, selectedAddIns]);

  const calculatedTaste = useMemo(() => {
    let acidity = selectedOrigin.acidity;
    let body = selectedOrigin.body;
    let sweetness = selectedOrigin.sweetness;
    let aroma = selectedOrigin.aroma;

    if (roastLevel === 'Dark Roast') {
      acidity = Math.max(30, acidity - 20);
      body = Math.min(100, body + 15);
    } else if (roastLevel === 'Light Roast') {
      acidity = Math.min(100, acidity + 10);
      sweetness = Math.min(100, sweetness + 5);
    }

    if (brewMethod.id === 'French Press') body = Math.min(100, body + 10);
    if (brewMethod.id === 'V60 Pour-Over') acidity = Math.min(100, acidity + 8);

    if (milkType !== 'None') {
      body = Math.min(100, body + 15);
      acidity = Math.max(20, acidity - 15);
    }

    return { acidity, body, sweetness, aroma };
  }, [selectedOrigin, roastLevel, brewMethod, milkType]);

  const handleAddToCart = () => {
    playSteamSound();
    const customBrew: CustomBrew = {
      id: `custom-${Date.now()}`,
      name: customName || 'Custom Reserve Brew',
      beanOrigin: selectedOrigin.name,
      roastLevel,
      grindSize,
      brewMethod: brewMethod.name,
      milkType,
      sweetener: 'Standard',
      addIns: selectedAddIns,
      tasteProfile: calculatedTaste,
      price: calculatedPrice,
    };

    addToCart(customBrew, 'custom', 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-semibold text-gold font-sans uppercase tracking-widest">
          <Flame className="w-3.5 h-3.5" />
          <span>Interactive Craft Studio</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-txt-primary tracking-tight">
          Custom Brew Lab
        </h2>
        <p className="text-txt-secondary text-sm sm:text-base font-sans font-light leading-relaxed">
          Engineer your personal coffee elixir. Adjust origin micro-lots, roast curves, extraction methods, and sensory add-ins with live taste sensor analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Configurator Controls (Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Bean Origin */}
          <div className="p-6 rounded-2xl surface-card space-y-4">
            <label className="text-xs uppercase font-bold tracking-widest text-gold font-display">
              01. Select Micro-Lot Origin
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ORIGINS.map((origin) => {
                const isSelected = selectedOrigin.id === origin.id;
                return (
                  <button
                    key={origin.id}
                    onClick={() => setSelectedOrigin(origin)}
                    className={`relative p-4 rounded-xl text-left border transition-all duration-300 ${
                      isSelected
                        ? 'bg-gold/10 border-gold shadow-[0_0_20px_rgba(197,155,39,0.25)] scale-[1.01]'
                        : 'bg-bg-card border-border-subtle hover:border-gold hover:bg-gold/5 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(197,155,39,0.12)] opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div className="flex justify-between items-center pr-4">
                      <span className="font-display font-bold text-txt-primary text-sm">{origin.name}</span>
                    </div>
                    <p className="text-xs text-txt-muted mt-1 font-sans">{origin.notes}</p>
                    
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gold text-soft-black flex items-center justify-center shadow-md">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Roast Level & Grind Size */}
          <div className="p-6 rounded-2xl surface-card space-y-5">
            <label className="text-xs uppercase font-bold tracking-widest text-gold font-display">
              02. Roast Curve & Grind Size
            </label>
            
            <div className="space-y-2">
              <span className="text-xs text-txt-muted font-sans font-medium">Roast Profile</span>
              <div className="grid grid-cols-3 gap-2">
                {ROAST_LEVELS.map((r) => {
                  const isSelected = roastLevel === r;
                  return (
                    <button
                      key={r}
                      onClick={() => setRoastLevel(r)}
                      className={`py-2 px-3 text-xs rounded-xl border font-sans font-medium transition-all duration-300 ${
                        isSelected
                          ? 'bg-gold text-soft-black font-bold border-gold shadow-[0_0_15px_rgba(197,155,39,0.3)]'
                          : 'bg-bg-card text-txt-muted border-border-subtle hover:border-gold hover:bg-gold/5 hover:text-txt-primary'
                      }`}
                    >
                      {r}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-txt-muted font-sans font-medium">Grind Calibration</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {GRIND_SIZES.map((g) => {
                  const isSelected = grindSize === g;
                  return (
                    <button
                      key={g}
                      onClick={() => setGrindSize(g)}
                      className={`py-2 px-2 text-xs rounded-xl border font-sans transition-all duration-300 ${
                        isSelected
                          ? 'bg-gold/10 border-gold text-gold font-bold shadow-[0_0_15px_rgba(197,155,39,0.25)]'
                          : 'bg-bg-card text-txt-muted border-border-subtle hover:border-gold hover:bg-gold/5 hover:text-txt-primary'
                      }`}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step 3: Brew Method */}
          <div className="p-6 rounded-2xl surface-card space-y-4">
            <label className="text-xs uppercase font-bold tracking-widest text-gold font-display">
              03. Extraction & Brew Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BREW_METHODS.map((b) => {
                const isSelected = brewMethod.id === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setBrewMethod(b)}
                    className={`relative p-3.5 rounded-xl text-left border transition-all duration-300 ${
                      isSelected
                        ? 'bg-gold/10 border-gold shadow-[0_0_20px_rgba(197,155,39,0.25)] scale-[1.01]'
                        : 'bg-bg-card border-border-subtle hover:border-gold hover:bg-gold/5 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(197,155,39,0.12)] opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div className="flex justify-between items-center text-sm font-bold font-display text-txt-primary pr-4">
                      <span>{b.name}</span>
                    </div>
                    <p className="text-[11px] text-txt-muted font-sans mt-0.5">{b.desc}</p>
                    
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gold text-soft-black flex items-center justify-center shadow-md">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Milk & Add-Ins */}
          <div className="p-6 rounded-2xl surface-card space-y-5">
            <label className="text-xs uppercase font-bold tracking-widest text-gold font-display">
              04. Milk Base & Artisanal Add-Ins
            </label>

            <div className="space-y-2">
              <span className="text-xs text-txt-muted font-sans font-medium">Dairy / Milk Alternative (+ ₹40)</span>
              <div className="flex flex-wrap gap-2">
                {MILK_OPTIONS.map((m) => {
                  const isSelected = milkType === m;
                  return (
                    <button
                      key={m}
                      onClick={() => setMilkType(m)}
                      className={`py-1.5 px-3 text-xs rounded-lg border font-sans transition-all duration-300 ${
                        isSelected
                          ? 'bg-gold text-soft-black font-bold border-gold shadow-[0_0_12px_rgba(197,155,39,0.3)]'
                          : 'bg-bg-card text-txt-muted border-border-subtle hover:border-gold hover:bg-gold/5 hover:text-txt-primary'
                      }`}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-txt-muted font-sans font-medium font-display">Sensory Flavors & Glazes</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans">
                {ADD_INS.map((a) => {
                  const isChecked = selectedAddIns.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      onClick={() => toggleAddIn(a.id)}
                      className={`relative p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all duration-300 ${
                        isChecked
                          ? 'bg-gold/10 border-gold text-txt-primary font-semibold shadow-[0_0_15px_rgba(197,155,39,0.2)]'
                          : 'bg-bg-card text-txt-muted border-border-subtle hover:border-gold hover:bg-gold/5 hover:text-txt-primary'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isChecked && <Check className="w-3.5 h-3.5 text-gold stroke-[3]" />}
                        {a.name}
                      </span>
                      <span className="text-gold font-mono font-bold">+{formatCurrency(a.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* Live Preview & Taste Radar Sidebar (Col 5) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          
          {/* Elixir Naming */}
          <div className="p-6 rounded-2xl surface-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-display text-gold uppercase tracking-widest">
                Elixir Name
              </span>
              <Sparkles className="w-4 h-4 text-gold" />
            </div>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary text-sm focus:outline-none focus:border-gold font-display font-bold"
              placeholder="Name your brew"
            />
          </div>

          {/* Taste Radar Chart */}
          <TasteRadar profile={calculatedTaste} />

          {/* Live Order Card */}
          <div className="p-6 rounded-2xl surface-card border-gold/40 shadow-lg space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div>
                <h4 className="font-display text-lg font-bold text-txt-primary">{customName}</h4>
                <p className="text-xs text-txt-muted">{selectedOrigin.name} • {brewMethod.name}</p>
              </div>
              <span className="font-display text-2xl font-bold text-gold">
                {formatCurrency(calculatedPrice)}
              </span>
            </div>

            <div className="text-xs space-y-1 text-txt-muted">
              <p>• {roastLevel} | {grindSize}</p>
              <p>• Milk: {milkType}</p>
              {selectedAddIns.length > 0 && (
                <p className="text-gold font-medium">
                  • Add-Ins: {selectedAddIns.map((id) => ADD_INS.find((a) => a.id === id)?.name).join(', ')}
                </p>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-4 rounded-xl bg-gold text-soft-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-gold-light shadow-md hover:scale-[1.02] transition-all active:scale-95"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  Add Custom Brew to Cart
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
