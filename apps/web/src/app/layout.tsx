'use client';

import React from 'react';
import Link from 'next/link';
import './globals.css';
import { Sparkles, Compass, Radio, Gamepad2, Disc3, Layers, Trophy, Camera, Shield } from 'lucide-react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <title>M-GAMES | Coin-Op Billiards, Retro Arcades & Neon Jukeboxes • Cape Town</title>
        <meta
          name="description"
          content="South Africa's premier commercial & residential gaming powerhouse. Custom slate pool tables, 3000+ game retro arcades, illuminated bubble jukeboxes, and venue leasing since 1994."
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#05060a] text-zinc-100 selection:bg-neon-cyan selection:text-black antialiased arcade-grid-bg">
        {/* Neon High-Voltage Announcement Marquee */}
        <div className="relative bg-gradient-to-r from-neon-purple/20 via-neon-pink/20 to-neon-cyan/20 border-b border-neon-cyan/30 text-[11px] py-1.5 px-4 text-center font-mono tracking-wider flex items-center justify-center gap-3 overflow-hidden">
          <span className="flex items-center gap-1.5 text-neon-cyan font-bold">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_8px_#00f0ff]" />
            LIVE LEASING DESK
          </span>
          <span className="text-zinc-500">|</span>
          <span className="text-zinc-300">
            Pool Tables • Arcade Multicades • Neon Jukeboxes • B2B Venue Packages Available
          </span>
          <span className="text-zinc-500">|</span>
          <a
            href="tel:+27824559812"
            className="text-neon-pink hover:text-white font-bold transition-colors"
          >
            Direct: +27 (0)82 455 9812
          </a>
        </div>

        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-arcade-border/80 bg-[#05060a]/90 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-neon-cyan via-neon-pink to-neon-purple text-black font-black text-2xl shadow-neon-cyan group-hover:scale-105 transition-all">
                <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">M</span>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-neon-lime border-2 border-black shadow-[0_0_8px_#39ff14]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-widest text-white text-lg font-mono neon-glow-cyan">
                  M-GAMES
                </span>
                <span className="text-[9px] text-neon-pink tracking-[0.25em] font-mono -mt-1 font-bold">
                  AMUSEMENTS & BILLIARDS
                </span>
              </div>
            </Link>

            {/* Navigation links */}
            <nav className="hidden xl:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-zinc-300">
              <Link href="/#pool" className="hover:text-neon-cyan transition-colors flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-neon-cyan" />
                Pool Tables
              </Link>
              <Link href="/#arcades" className="hover:text-neon-pink transition-colors flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5 text-neon-pink" />
                Arcades
              </Link>
              <Link href="/#jukeboxes" className="hover:text-neon-amber transition-colors flex items-center gap-1.5">
                <Disc3 className="w-3.5 h-3.5 text-neon-amber" />
                Jukeboxes
              </Link>
              <Link href="/#accessories" className="hover:text-neon-purple transition-colors">
                Lighting & Gear
              </Link>
              <Link href="/#projects" className="hover:text-neon-lime transition-colors flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-neon-lime" />
                Past Projects
              </Link>
              <Link href="/configurator" className="hover:text-neon-cyan transition-colors text-neon-cyan">
                3D Configurator
              </Link>
              <Link href="/commercial/planner" className="hover:text-neon-pink transition-colors">
                2D CAD Planner
              </Link>
            </nav>

            {/* CTAs */}
            <div className="flex items-center gap-3">
              <Link
                href="/commercial/planner"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl border border-neon-cyan/50 text-neon-cyan bg-neon-cyan/10 hover:bg-neon-cyan/20 transition-all shadow-[0_0_12px_rgba(0,240,255,0.2)] font-mono"
              >
                <Compass className="w-3.5 h-3.5" />
                Venue Planner
              </Link>
              <Link
                href="/configurator"
                className="inline-flex items-center justify-center text-xs font-black px-5 py-2.5 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple hover:from-neon-pink hover:to-neon-pink text-white shadow-neon-pink transition-all active:scale-95 font-mono tracking-wider"
              >
                BUILD TABLE
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1">{children}</main>

        {/* Neon Footer */}
        <footer className="border-t border-arcade-border bg-[#030407] text-zinc-400 text-xs pt-16 pb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-lime shadow-[0_0_15px_#00f0ff]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Brand Col */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-pink flex items-center justify-center font-black text-black text-base shadow-neon-cyan">
                    M
                  </div>
                  <span className="font-extrabold text-white text-base tracking-widest font-mono neon-glow-cyan">
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
