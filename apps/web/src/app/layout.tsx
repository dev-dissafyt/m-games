'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './globals.css';
import {
  Sparkles,
  Compass,
  Radio,
  Gamepad2,
  Disc3,
  Layers,
  Trophy,
  Camera,
  Shield,
  HardHat,
  Menu,
  X,
  Phone,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';
import { AccountWidget } from '@/components/account-widget';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'games' | 'vibes' | null>(null);

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <title>M-GAMES | Coin-Op Billiards, Retro Arcades & Neon Jukeboxes • Cape Town</title>
        <meta
          name="description"
          content="South Africa's premier commercial & residential gaming powerhouse. Custom slate pool tables, 3000+ game retro arcades, illuminated bubble jukeboxes, and venue leasing since 1994."
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#030305] text-zinc-100 selection:bg-neon-cyan selection:text-black antialiased arcade-grid-bg">
        {/* Sleek Announcement Marquee */}
        <div className="relative bg-[#07090e] border-b border-zinc-800/80 text-[11px] py-2 px-4 text-center font-mono tracking-wider flex items-center justify-center gap-3 overflow-hidden">
          <span className="flex items-center gap-1.5 text-zinc-300 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_6px_#00f0ff]" />
            LIVE LEASING DESK
          </span>
          <span className="text-zinc-600 hidden sm:inline">|</span>
          <span className="text-zinc-400 hidden sm:inline">
            Pool Tables • Arcade Multicades • Neon Jukeboxes • B2B Venue Packages
          </span>
          <span className="text-zinc-600">|</span>
          <a
            href="tel:+27824559812"
            className="text-neon-cyan hover:text-white font-bold transition-colors"
          >
            Direct: +27 (0)82 455 9812
          </a>
        </div>

        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-[#030305]/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
            {/* Logo: Only square with M and M-GAMES in text, no subtext */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900 border border-neon-cyan/40 text-white font-black text-xl shadow-subtle-cyan group-hover:border-neon-cyan group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all">
                <span>M</span>
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-neon-lime border-2 border-black" />
              </div>
              <span className="font-extrabold tracking-wider text-white text-lg font-mono">
                M-GAMES
              </span>
            </Link>

            {/* Middle Navigation: Games [Pool Tables, Arcade Games] & Vibes [Jukebox, Lighting & Gear] & Reviews */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              {/* GAMES Dropdown */}
              <div
                className="relative group py-2"
                onMouseEnter={() => setActiveDropdown('games')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === 'games' ? null : 'games')}
                  className="flex items-center gap-1.5 hover:text-white transition-colors group-hover:text-neon-cyan font-mono"
                >
                  <Gamepad2 className="w-3.5 h-3.5 text-neon-cyan/80" />
                  <span>GAMES</span>
                  <ChevronDown className="w-3 h-3 text-zinc-500 group-hover:text-neon-cyan group-hover:rotate-180 transition-transform duration-200" />
                </button>

                {activeDropdown === 'games' && (
                  <div className="absolute top-full -left-4 w-72 rounded-2xl bg-[#080a0f]/98 border border-zinc-800 shadow-2xl p-2.5 space-y-1 backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-100">
                    <Link
                      href="/#pool"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-zinc-900/90 border border-transparent hover:border-zinc-700/80 transition-all group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan shrink-0 mt-0.5 group-hover/item:border-neon-cyan">
                        <Trophy className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover/item:text-neon-cyan transition-colors">
                          Pool Tables
                        </div>
                        <div className="text-[10px] text-zinc-400 normal-case leading-tight mt-0.5">
                          7ft Pub Classics, 8ft Pro Tournaments & Italian Slate
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/#arcades"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-zinc-900/90 border border-transparent hover:border-zinc-700/80 transition-all group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-neon-pink/10 border border-neon-pink/30 flex items-center justify-center text-neon-pink shrink-0 mt-0.5 group-hover/item:border-neon-pink">
                        <Gamepad2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover/item:text-neon-pink transition-colors">
                          Arcade Games
                        </div>
                        <div className="text-[10px] text-zinc-400 normal-case leading-tight mt-0.5">
                          3,000+ Classic Multicades & 2-Player Coin-Op Cabinets
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* VIBES Dropdown */}
              <div
                className="relative group py-2"
                onMouseEnter={() => setActiveDropdown('vibes')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === 'vibes' ? null : 'vibes')}
                  className="flex items-center gap-1.5 hover:text-white transition-colors group-hover:text-neon-amber font-mono"
                >
                  <Sparkles className="w-3.5 h-3.5 text-neon-amber/80" />
                  <span>VIBES</span>
                  <ChevronDown className="w-3 h-3 text-zinc-500 group-hover:text-neon-amber group-hover:rotate-180 transition-transform duration-200" />
                </button>

                {activeDropdown === 'vibes' && (
                  <div className="absolute top-full -left-4 w-72 rounded-2xl bg-[#080a0f]/98 border border-zinc-800 shadow-2xl p-2.5 space-y-1 backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-100">
                    <Link
                      href="/#jukeboxes"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-zinc-900/90 border border-transparent hover:border-zinc-700/80 transition-all group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-neon-amber/10 border border-neon-amber/30 flex items-center justify-center text-neon-amber shrink-0 mt-0.5 group-hover/item:border-neon-amber">
                        <Disc3 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover/item:text-neon-amber transition-colors">
                          Jukeboxes
                        </div>
                        <div className="text-[10px] text-zinc-400 normal-case leading-tight mt-0.5">
                          Illuminated Bubble Jukeboxes & Bluetooth Sound Centers
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/#accessories"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-zinc-900/90 border border-transparent hover:border-zinc-700/80 transition-all group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-neon-lime/10 border border-neon-lime/30 flex items-center justify-center text-neon-lime shrink-0 mt-0.5 group-hover/item:border-neon-lime">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover/item:text-neon-lime transition-colors">
                          Lighting & Gear
                        </div>
                        <div className="text-[10px] text-zinc-400 normal-case leading-tight mt-0.5">
                          Overhead Billiard Canopies, Ash Cues, Chalk & Racks
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Reviews / Completed Orders Link */}
              <Link
                href="/#reviews"
                className="hover:text-white transition-colors flex items-center gap-1.5 font-mono text-zinc-400 hover:text-emerald-400"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/80" />
                <span>REVIEWS & DELIVERIES</span>
              </Link>
            </nav>

            {/* Right CTAs: Account Management + Unified Studio Designer Button */}
            <div className="flex items-center gap-3">
              {/* Account Management (Signed in status & client navigation) */}
              <AccountWidget />

              {/* Unified Studio Designer Action Button */}
              <Link
                href="/designer"
                className="inline-flex items-center justify-center gap-2 text-xs font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-white text-black hover:bg-zinc-100 btn-hover-glow-white active:scale-95 font-mono tracking-wider transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>STUDIO DESIGNER</span>
              </Link>

              {/* Mobile Hamburger Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Sliding Drawer Navigation */}
          {mobileMenuOpen && (
            <div
              className="md:hidden fixed inset-0 top-[90px] z-50 bg-black/95 backdrop-blur-2xl border-t border-zinc-800 p-6 flex flex-col justify-between overflow-y-auto"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="space-y-6" onClick={(e) => e.stopPropagation()}>
                {/* Primary Studio Action */}
                <Link
                  href="/designer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full p-4 rounded-2xl bg-gradient-to-r from-neon-cyan/20 via-zinc-900 to-zinc-900 border border-neon-cyan/50 text-white font-mono font-bold flex items-center justify-between"
                >
                  <span className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-neon-cyan" />
                    <span>LAUNCH STUDIO DESIGNER</span>
                  </span>
                  <span className="text-xs text-neon-cyan font-mono">3D & CAD →</span>
                </Link>

                {/* GAMES Category */}
                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-neon-cyan font-bold flex items-center gap-1.5">
                    <Gamepad2 className="w-3.5 h-3.5" />
                    Games Selection
                  </div>
                  <nav className="space-y-1.5">
                    <Link
                      href="/#pool"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950 border border-zinc-800/80 text-sm font-bold text-white hover:border-neon-cyan/60 transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <Trophy className="w-4 h-4 text-neon-cyan" />
                        Commercial Pool Tables
                      </span>
                      <ChevronRight className="w-4 h-4 text-zinc-600" />
                    </Link>

                    <Link
                      href="/#arcades"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950 border border-zinc-800/80 text-sm font-bold text-white hover:border-neon-pink/60 transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <Gamepad2 className="w-4 h-4 text-neon-pink" />
                        Retro Arcades (3000+ Games)
                      </span>
                      <ChevronRight className="w-4 h-4 text-zinc-600" />
                    </Link>
                  </nav>
                </div>

                {/* VIBES Category */}
                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-neon-amber font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Vibes & Audio
                  </div>
                  <nav className="space-y-1.5">
                    <Link
                      href="/#jukeboxes"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950 border border-zinc-800/80 text-sm font-bold text-white hover:border-neon-amber/60 transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <Disc3 className="w-4 h-4 text-neon-amber" />
                        Neon Jukebox Sound Centers
                      </span>
                      <ChevronRight className="w-4 h-4 text-zinc-600" />
                    </Link>

                    <Link
                      href="/#accessories"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950 border border-zinc-800/80 text-sm font-bold text-white transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-neon-lime" />
                        Lighting & Billiard Gear
                      </span>
                      <ChevronRight className="w-4 h-4 text-zinc-600" />
                    </Link>
                  </nav>
                </div>

                {/* REVIEWS & DELIVERIES */}
                <div className="space-y-2 pt-2 border-t border-zinc-800">
                  <Link
                    href="/#reviews"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950 border border-zinc-800/80 text-sm font-bold text-white hover:border-emerald-400/60 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Completed Orders & Reviews
                    </span>
                    <ChevronRight className="w-4 h-4 text-zinc-600" />
                  </Link>
                </div>

                {/* Staff Portals */}
                <div className="space-y-2 pt-2 border-t border-zinc-800">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">
                    Staff & Operations Portals
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <a
                      href="http://localhost:3001"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-emerald-400 flex items-center justify-center gap-1 font-semibold"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Dispatch (:3001)</span>
                    </a>
                    <a
                      href="http://localhost:3002"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-amber-400 flex items-center justify-center gap-1 font-semibold"
                    >
                      <HardHat className="w-3.5 h-3.5" />
                      <span>Field Ops (:3002)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Content */}
        <main className="flex-1">{children}</main>

        {/* Sleek Dark Footer */}
        <footer className="border-t border-zinc-800/80 bg-[#020204] text-zinc-400 text-xs pt-16 pb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent shadow-[0_0_8px_rgba(0,240,255,0.15)]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Brand Col */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-neon-cyan/30 flex items-center justify-center font-black text-white text-sm shadow-subtle-cyan">
                    M
                  </div>
                  <span className="font-extrabold text-white text-base tracking-wider font-mono">
                    M-GAMES AMUSEMENTS
                  </span>
                </div>
                <p className="text-zinc-500 text-xs leading-relaxed max-w-sm">
                  Cape Town&apos;s leader in commercial coin-op pool tables, multi-game retro arcade cabinets, glowing jukebox sound centers, and neon billiard canopies. Supplying legendary Western Cape taverns, hotels, and luxury private game rooms.
                </p>
                <div className="text-[11px] font-mono text-zinc-500">
                  Workshop: Unit 4, Paarden Eiland Industrial Park, Cape Town
                </div>
              </div>

              {/* Equipment */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-neon-cyan font-mono">
                  Amusements Range
                </h4>
                <ul className="space-y-2 text-xs">
                  <li>
                    <Link href="/#pool" className="hover:text-white transition-colors">
                      Commercial Slate Pool Tables
                    </Link>
                  </li>
                  <li>
                    <Link href="/#arcades" className="hover:text-white transition-colors">
                      Stand-Up Multicades (3000+ Games)
                    </Link>
                  </li>
                  <li>
                    <Link href="/#jukeboxes" className="hover:text-white transition-colors">
                      Neon Bubble & Digital Jukeboxes
                    </Link>
                  </li>
                  <li>
                    <Link href="/#accessories" className="hover:text-white transition-colors">
                      Overhead Neon Table Lighting
                    </Link>
                  </li>
                </ul>
              </div>

              {/* B2B Commercial */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-neon-pink font-mono">
                  Venue Partnerships
                </h4>
                <ul className="space-y-2 text-xs">
                  <li>
                    <Link href="/#commercial" className="hover:text-white transition-colors">
                      Zero-Capital Coin-Op Lease
                    </Link>
                  </li>
                  <li>
                    <Link href="/#commercial" className="hover:text-white transition-colors">
                      Full Venue Package Bundles
                    </Link>
                  </li>
                  <li>
                    <Link href="/#commercial" className="hover:text-white transition-colors">
                      48h Emergency Mechanism Dispatch
                    </Link>
                  </li>
                  <li>
                    <Link href="/#commercial" className="hover:text-white transition-colors">
                      Complimentary 6-Month Recloth
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Internal Portals */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-neon-lime font-mono">
                  Staff Portals
                </h4>
                <ul className="space-y-2 text-xs">
                  <li>
                    <a
                      href="http://localhost:3001"
                      target="_blank"
                      rel="noreferrer"
                      className="text-neon-cyan hover:underline font-mono"
                    >
                      Owner Dispatch PWA →
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://localhost:3002"
                      target="_blank"
                      rel="noreferrer"
                      className="text-neon-lime hover:underline font-mono"
                    >
                      Field Rigging & Sign-Off →
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-arcade-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-zinc-600 font-mono">
              <p>© 2026 M-Games (Pty) Ltd. Amusements & Leisure Systems. Cape Town, SA.</p>
              <div className="flex items-center gap-4">
                <span>Coin-Op Standards</span>
                <span>•</span>
                <span>Leveling Warranty</span>
                <span>•</span>
                <span>POPIA Protected</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
