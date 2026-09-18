'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  PhoneCall,
  Truck,
  SlidersHorizontal,
  Globe,
  Shield,
  HardHat,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Radio,
  BarChart3,
  Settings,
  Sparkles,
  Users,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Load collapse state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mg_admin_sidebar_collapsed');
      if (saved !== null) {
        setIsCollapsed(saved === 'true');
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('mg_admin_sidebar_collapsed', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const navItems = [
    {
      href: '/leads',
      label: 'Leads Stream',
      sub: 'Pipeline & WhatsApp',
      icon: PhoneCall,
      color: 'text-emerald-400',
      activeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40',
      badge: '4 Active',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    },
    {
      href: '/dispatch',
      label: 'Ingress Audit & Rigging',
      sub: 'Video timeline & crew',
      icon: Truck,
      color: 'text-sky-400',
      activeColor: 'bg-sky-500/10 text-sky-300 border-sky-500/40',
      badge: 'HD Video',
      badgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
    },
    {
      href: '/catalog',
      label: 'Inventory & Rates',
      sub: 'Pricing & Coin-Op specs',
      icon: SlidersHorizontal,
      color: 'text-amber-400',
      activeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/40',
      badge: 'Live',
      badgeColor: 'bg-zinc-800 text-zinc-400 border-zinc-700',
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#040507] text-zinc-100 antialiased selection:bg-emerald-500 selection:text-black">
      {/* =========================================================
          DESKTOP COLLAPSIBLE SIDEBAR (Hidden on mobile)
         ========================================================= */}
      <aside
        className={`hidden md:flex flex-col justify-between border-r border-zinc-800/80 bg-[#06080d]/95 backdrop-blur-xl transition-all duration-300 ease-in-out shrink-0 sticky top-0 h-screen z-30 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Top Header / Brand */}
        <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between gap-2">
          <Link href="/leads" className="flex items-center gap-3 overflow-hidden group">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-black text-sm shadow-[0_0_12px_rgba(16,185,129,0.2)] group-hover:border-emerald-400 transition-all shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0 transition-opacity duration-200">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-sm tracking-tight text-white font-mono truncate">
                    M-GAMES
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-950/70 border border-emerald-800/50 text-[9px] font-mono text-emerald-400 font-bold">
                    HQ
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono truncate">
                  Owner Dispatch Studio
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Toggle Button */}
          <button
            type="button"
            onClick={toggleCollapse}
            className="p-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto scrollbar-none">
          {!isCollapsed && (
            <div className="px-3 pb-1 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
              Operations Portals
            </div>
          )}

          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={isCollapsed ? item.label : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all relative group ${
                  isActive
                    ? `${item.activeColor} shadow-sm font-bold`
                    : 'border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900 hover:border-zinc-800'
                } ${isCollapsed ? 'justify-center px-0' : ''}`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? item.color : 'text-zinc-400 group-hover:' + item.color}`} />

                {!isCollapsed && (
                  <div className="flex-1 min-w-0 flex items-center justify-between gap-1">
                    <div className="truncate">
                      <span className="block truncate text-white">{item.label}</span>
                      <span className="block text-[10px] font-mono text-zinc-500 font-normal truncate">
                        {item.sub}
                      </span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md border shrink-0 ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}

          {/* Fleet Status Card (Only when expanded) */}
          {!isCollapsed && (
            <div className="pt-4 mt-4 border-t border-zinc-800/80 px-1 space-y-2">
              <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-400 font-semibold flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    Fleet Telemetry
                  </span>
                  <span className="text-emerald-400 font-bold">LIVE</span>
                </div>
                <div className="text-xs text-zinc-300 font-bold">Truck #2 (Isuzu 4T)</div>
                <div className="text-[10px] text-zinc-500 font-mono">
                  Route: Cape Town Metro • 3 Runs
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar: Cross-App Switcher & User Profile */}
        <div className="p-3 border-t border-zinc-800/80 space-y-2 bg-[#04060a]">
          {!isCollapsed ? (
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 px-1">
                Cross-Platform Switcher
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <a
                  href="http://localhost:3000"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:text-white flex items-center justify-center gap-1 transition-colors"
                  title="Open Customer Storefront"
                >
                  <Globe className="w-3 h-3 text-cyan-400" />
                  <span>Storefront</span>
                </a>
                <a
                  href="http://localhost:3002"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:text-white flex items-center justify-center gap-1 transition-colors"
                  title="Open Field Ops Cockpit"
                >
                  <HardHat className="w-3 h-3 text-amber-400" />
                  <span>Field Ops</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-cyan-400 transition-colors"
                title="Customer Storefront (:3000)"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="http://localhost:3002"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-amber-400 transition-colors"
                title="Field Ops Cockpit (:3002)"
              >
                <HardHat className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </aside>

      {/* =========================================================
          MOBILE SLIDE-OUT DRAWER OVERLAY
         ========================================================= */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        >
          <div
            className="w-80 max-w-[88vw] h-full bg-[#07090e] border-r border-zinc-800 p-5 flex flex-col justify-between shadow-2xl overflow-y-auto overscroll-contain pb-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-black text-sm shadow-md">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white font-mono">M-GAMES OWNER HQ</div>
                    <div className="text-[10px] text-zinc-400 font-mono">Dispatch & Fleet</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block mb-1">
                  Main Portals
                </span>
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 p-3 rounded-2xl border text-sm font-semibold transition-all ${
                        isActive
                          ? `${item.activeColor} shadow-md`
                          : 'border-zinc-800/80 bg-zinc-950/60 text-zinc-300'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${item.color}`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-bold">{item.label}</div>
                        <div className="text-xs text-zinc-400 font-mono">{item.sub}</div>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Cross-Platform Quick Links */}
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block mb-1">
                  Switch Platforms
                </span>
                <a
                  href="http://localhost:3000"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    Customer Storefront (:3000)
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                </a>
                <a
                  href="http://localhost:3002"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <HardHat className="w-4 h-4 text-amber-400" />
                    Field Ops Cockpit (:3002)
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
              <span>Admin: Dave Stewart</span>
              <span className="text-emerald-400 font-bold">● Connected</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MAIN CONTENT WORKSPACE WITH RESPONSIVE TOP BAR
         ========================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-[#06080d]/90 backdrop-blur-xl border-b border-zinc-800/80 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Mobile Title */}
            <div className="md:hidden flex items-center gap-2">
              <span className="font-black text-sm text-white font-mono">M-GAMES HQ</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-[10px] font-mono text-emerald-400 font-bold">
                DISPATCH
              </span>
            </div>

            {/* Desktop Current Page Indicator */}
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                HQ Workspace
              </span>
              <span>/</span>
              <span className="text-emerald-400 font-bold">
                {pathname === '/dispatch'
                  ? 'Ingress Audit & Crew Rigging'
                  : pathname === '/catalog'
                  ? 'Inventory Catalog & Rates'
                  : 'Commercial Leads Stream'}
              </span>
            </div>
          </div>

          {/* Right Header Status & Cross-App Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Quick Switcher */}
            <div className="hidden lg:flex items-center gap-1 bg-[#090b10] p-1 rounded-xl border border-zinc-800 text-[11px] font-mono">
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors flex items-center gap-1"
                title="Open Storefront"
              >
                <Globe className="w-3 h-3 text-cyan-400" />
                <span>Storefront (:3000)</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-800 text-white font-bold flex items-center gap-1 shadow-sm">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span>Dispatch (:3001)</span>
              </span>
              <a
                href="http://localhost:3002"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors flex items-center gap-1"
                title="Open Field Ops"
              >
                <HardHat className="w-3 h-3 text-amber-400" />
                <span>Field Ops (:3002)</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            </div>

            {/* Live Feed Status Pill */}
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 sm:px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]" />
              <span className="font-bold">LIVE STREAM</span>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="flex-1 pb-20 md:pb-12 w-full">{children}</main>

        {/* Mobile Fixed Bottom Navigation Bar (for single-thumb mobile navigation) */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07090e]/95 backdrop-blur-xl border-t border-zinc-800 h-16 flex items-center justify-around px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive ? item.color + ' font-bold' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-mono">{item.label.split(' ')[0]}</span>
              </Link>
            );
          })}
          <a
            href="http://localhost:3002"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-1 text-zinc-500 hover:text-amber-400 transition-colors"
          >
            <HardHat className="w-5 h-5" />
            <span className="text-[10px] font-mono">Ops :3002</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
