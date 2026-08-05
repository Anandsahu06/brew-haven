'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Coffee, ShoppingBag, Calendar, Users, Star, Tag, Bell, Settings, BarChart2, BookOpen, Layers } from 'lucide-react';

const ADMIN_LINKS = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Menu Catalog', href: '/admin/menu', icon: Coffee },
  { label: 'Kitchen Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Table Seating', href: '/admin/reservations', icon: Calendar },
  { label: 'Customers CRM', href: '/admin/customers', icon: Users },
  { label: 'Reviews', href: '/admin/reviews', icon: Star },
  { label: 'Coupons Engine', href: '/admin/coupons', icon: Tag },
  { label: 'Roastery Events', href: '/admin/events', icon: Layers },
  { label: 'Blog Journal', href: '/admin/blogs', icon: BookOpen },
  { label: 'Sales Analytics', href: '/admin/analytics', icon: BarChart2 },
  { label: 'Notifications', href: '/admin/notifications', icon: Bell },
  { label: 'Store Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="pt-20 min-h-screen bg-bg-primary font-sans text-txt-primary flex flex-col md:flex-row">
      
      {/* Mobile Admin Navigation Bar */}
      <div className="md:hidden bg-bg-card border-b border-border-subtle p-3 overflow-x-auto no-scrollbar flex items-center gap-2">
        {ADMIN_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? 'bg-gold text-soft-black font-bold shadow-[0_0_12px_rgba(197,155,39,0.3)]'
                  : 'bg-bg-surface text-txt-muted hover:text-gold hover:border-gold hover:bg-gold/10 border border-border-subtle'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Admin Desktop Sidebar */}
      <aside className="w-64 bg-bg-card border-r border-border-subtle p-5 hidden md:flex flex-col justify-between shrink-0 font-sans">
        <div className="space-y-6">
          <div className="px-3 py-2 border-b border-border-subtle pb-4">
            <span className="text-[10px] text-gold uppercase font-mono font-bold tracking-widest block">Roastery Operations 🇮🇳</span>
            <h2 className="font-display font-bold text-xl text-txt-primary mt-0.5">Admin Control</h2>
          </div>

          <nav className="space-y-1.5">
            {ADMIN_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all duration-300 border ${
                    isActive
                      ? 'bg-gold text-soft-black font-bold border-gold shadow-[0_0_15px_rgba(197,155,39,0.3)]'
                      : 'border-transparent text-txt-muted hover:text-gold hover:bg-gold/10 hover:border-gold/40 hover:translate-x-1 font-medium'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-3.5 rounded-2xl bg-bg-surface border border-border-subtle text-xs text-txt-muted space-y-1">
          <span className="block text-[10px] uppercase font-bold text-gold font-mono">Active Session</span>
          <span className="font-bold text-txt-primary block">Head Roaster Admin</span>
        </div>
      </aside>

      {/* Admin Main Body */}
      <main className="flex-1 p-4 sm:p-8 md:p-10 max-w-7xl overflow-x-hidden">
        {children}
      </main>

    </div>
  );
}
