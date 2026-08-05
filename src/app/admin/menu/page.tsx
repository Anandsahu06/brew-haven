'use client';

import React, { useState } from 'react';
import { Plus, X, Coffee, Check } from 'lucide-react';
import { MENU_ITEMS } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import { MenuItem, CoffeeCategory } from '@/types';

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New craft form state
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<CoffeeCategory>('espresso');
  const [newPrice, setNewPrice] = useState(320);

  const toggleStock = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, isBestseller: !i.isBestseller } : i))
    );
  };

  const handleAddCraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newItem: MenuItem = {
      id: `menu-custom-${Date.now()}`,
      name: newName,
      subtitle: 'Single-Origin Reserve Craft',
      description: 'Hand-harvested micro-lot roasted fresh daily in India.',
      price: newPrice,
      category: newCategory,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviewsCount: 24,
      tags: ['New Release', 'Single Origin'],
      calories: 120,
      prepTime: '4 mins',
      origin: 'Chikmagalur, Karnataka',
      roastLevel: 'Medium',
    };

    setItems([newItem, ...items]);
    setNewName('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 font-sans text-txt-primary">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-txt-primary">Menu Catalog Management</h1>
          <p className="text-xs text-txt-muted">Add, edit, or toggle stock availability for micro-lot crafts across India</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gold text-soft-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-gold-light hover:shadow-[0_4px_20px_rgba(197,155,39,0.35)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95 w-fit"
        >
          <Plus className="w-4 h-4" /> Add New Craft
        </button>
      </div>

      {/* Catalog Table */}
      <div className="surface-card rounded-2xl border border-border-subtle overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-bg-surface text-txt-muted uppercase font-mono border-b border-border-subtle">
              <tr>
                <th className="p-4">Item Craft</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-bg-surface/60 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-txt-primary text-sm">{item.name}</div>
                    <span className="text-[10px] text-txt-muted">{item.origin || 'Chikmagalur Reserve'}</span>
                  </td>
                  <td className="p-4 font-mono text-gold font-bold uppercase">{item.category}</td>
                  <td className="p-4 font-mono font-bold text-txt-primary">{formatCurrency(item.price)}</td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleStock(item.id)}
                      className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all duration-300 active:scale-95 ${
                        item.isBestseller
                          ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/40 hover:bg-emerald-500 hover:text-soft-black'
                          : 'bg-gold/15 text-gold border-gold/40 hover:bg-gold hover:text-soft-black'
                      }`}
                    >
                      {item.isBestseller ? 'In Stock (Active)' : 'Available'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Craft Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

          <div className="relative w-full max-w-md bg-bg-card border border-border-subtle rounded-3xl p-6 shadow-2xl z-10 space-y-5">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <h3 className="font-display font-bold text-lg text-txt-primary flex items-center gap-2">
                <Coffee className="w-5 h-5 text-gold" /> Add Micro-Lot Craft
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:text-gold hover:bg-gold/15 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCraft} className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] uppercase font-bold text-txt-muted mb-1 block">Craft Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wayanad Robusta Nitro Cold Brew"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-txt-muted mb-1 block">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as CoffeeCategory)}
                  className="w-full px-4 py-2.5 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary focus:outline-none focus:border-gold uppercase"
                >
                  <option value="espresso">Espresso</option>
                  <option value="pour-over">Pour Over</option>
                  <option value="cold-crafts">Cold Crafts</option>
                  <option value="artisan-bakery">Artisan Bakery</option>
                  <option value="signature-latte">Signature Latte</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-txt-muted mb-1 block">Price (₹ INR)</label>
                <input
                  type="number"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-bg-surface border border-border-subtle text-txt-primary focus:outline-none focus:border-gold font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gold text-soft-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-gold-light hover:shadow-[0_4px_20px_rgba(197,155,39,0.35)] transition-all active:scale-95"
              >
                <Check className="w-4 h-4" /> Save Craft to Catalog
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
