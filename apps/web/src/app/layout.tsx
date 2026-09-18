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
} from 'lucide-react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900 border border-neon-cyan/40 text-white font-black text-xl shadow-subtle-cyan group-hover:border-neon-cyan group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all shrink-0">
                <span>M</span>
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-neon-lime border-2 border-black" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-wider text-white text-base font-mono">
                  M-GAMES
                </span>
                <span className="text-[9px] text-zinc-400 tracking-[0.22em] font-mono font-semibold">
                  AMUSEMENTS & BILLIARDS
                </span>
              </div>
            </Link>

            {/* Navigation links (Desktop) */}
            <nav className="hidden xl:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              <Link href="/#pool" className="hover:text-neon-cyan transition-colors flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-neon-cyan/70" />
                Pool Tables
              </Link>
              <Link href="/#arcades" className="hover:text-neon-pink transition-colors flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5 text-neon-pink/70" />
                Arcades
              </Link>
              <Link href="/#jukeboxes" className="hover:text-neon-amber transition-colors flex items-center gap-1.5">
                <Disc3 className="w-3.5 h-3.5 text-neon-amber/70" />
                Jukeboxes
              </Link>
              <Link href="/#accessories" className="hover:text-zinc-200 transition-colors">
                Lighting & Gear
              </Link>
              <Link href="/#projects" className="hover:text-neon-lime transition-colors flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-neon-lime/70" />
                Past Projects
              </Link>
              <Link href="/configurator" className="hover:text-neon-cyan transition-colors text-zinc-300">
                3D Configurator
              </Link>
              <Link href="/commercial/planner" className="hover:text-zinc-200 transition-colors">
                2D CAD Planner
              </Link>
            </nav>

            {/* CTAs & Mobile Hamburger */}
            <div className="flex items-center gap-2.5">
              <Link
                href="/commercial/planner"
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-white hover:border-neon-cyan/70 btn-hover-glow-cyan font-mono"
              >
                <Compass className="w-3.5 h-3.5 text-neon-cyan" />
                Venue Planner
              </Link>
              <Link
                href="/configurator"
                className="inline-flex items-center justify-center text-xs font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-white text-black hover:bg-zinc-100 btn-hover-glow-white active:scale-95 font-mono tracking-wider"
              >
                BUILD TABLE
              </Link>

              {/* Mobile Hamburger Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Sliding Drawer Navigation */}
          {mobileMenuOpen && (
            <div
              className="xl:hidden fixed inset-0 top-[110px] z-50 bg-black/90 backdrop-blur-2xl border-t border-zinc-800 p-6 flex flex-col justify-between overflow-y-auto"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="space-y-6" onClick={(e) => e.stopPropagation()}>
                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">
                    Amusements & Billiards
                  </div>
                  <nav className="space-y-1">
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
                        <Sparkles className="w-4 h-4 text-zinc-400" />
                        Overhead Billiard Lighting & Cues
                      </span>
                      <ChevronRight className="w-4 h-4 text-zinc-600" />
                    </Link>

                    <Link
                      href="/#projects"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950 border border-zinc-800/80 text-sm font-bold text-white hover:border-neon-lime/60 transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <Camera className="w-4 h-4 text-neon-lime" />
                        Past Cape Town Projects
                      </span>
                      <ChevronRight className="w-4 h-4 text-zinc-600" />
                    </Link>
                  </nav>
                </div>

                {/* Interactive Tools */}
                <div className="space-y-2 pt-2 border-t border-zinc-800">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">
                    Design & Planning Tools
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <Link
                      href="/configurator"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-zinc-900 border border-amber-500/40 text-amber-300 font-bold text-sm flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        3D Bespoke Pool Configurator
                      </span>
                      <span className="text-xs font-mono">Open →</span>
                    </Link>
                    <Link
                      href="/commercial/planner"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3.5 rounded-2xl bg-gradient-to-r from-sky-500/20 to-zinc-900 border border-sky-500/40 text-sky-300 font-bold text-sm flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <Compass className="w-4 h-4 text-sky-400" />
                        2D Venue CAD Clearance Planner
                      </span>
                      <span className="text-xs font-mono">Open →</span>
                    </Link>
                  </div>
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
