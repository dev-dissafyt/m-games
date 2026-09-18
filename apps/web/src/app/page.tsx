'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Compass,
  Sparkles,
  Trophy,
  Gamepad2,
  Disc3,
  Lightbulb,
  Camera,
  Coins,
  Radio,
  Star,
  CheckCircle2,
  Sliders,
  Volume2,
  Layers,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { formatZar } from '@m-games/ui';

export default function HomePage() {
  // Commercial Venue Simulator State
  const [tableCount, setTableCount] = useState<number>(2);
  const [arcadeCount, setArcadeCount] = useState<number>(1);
  const [jukeboxCount, setJukeboxCount] = useState<number>(1);
  const [gamesPerDay, setGamesPerDay] = useState<number>(40);

  // Revenue math
  const poolRevenue = tableCount * gamesPerDay * 10 * 30;
  const arcadeRevenue = arcadeCount * (gamesPerDay * 0.8) * 10 * 30;
  const jukeboxRevenue = jukeboxCount * 3500; // estimated monthly coin-op / digital credits
  const totalMonthlyGross = poolRevenue + arcadeRevenue + jukeboxRevenue;

  const packageLeaseCost = tableCount * 2200 + arcadeCount * 1800 + jukeboxCount * 1500;
  const netVenueProfit = Math.max(0, totalMonthlyGross - packageLeaseCost);

  // Project Gallery Filter State
  const [galleryFilter, setGalleryFilter] = useState<'ALL' | 'PUBS' | 'MANCAVES' | 'CORPORATE'>('ALL');

  const PAST_PROJECTS = [
    {
      id: 'proj-brass-bell',
      title: 'The Brass Bell Harbour Pub',
      category: 'PUBS',
      location: 'Kalk Bay, Cape Town',
      equipment: '2× 7ft Coin-Op Tables • Custom Kiaat • Neon Canopies',
      imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80',
      badge: 'COMMERCIAL LEASE',
      desc: 'Sea-facing tavern game deck. Delivered via 14-step tight stair rigging with 4-man heavy crew and machinist level sign-off.',
    },
    {
      id: 'proj-camps-bay',
      title: 'Camps Bay Executive Penthouse',
      category: 'MANCAVES',
      location: 'Camps Bay, Cape Town',
      equipment: '8ft Clifton Minimalist Dining Conversion • Blue Felt • 4K Pinball',
      imageUrl: 'https://images.unsplash.com/photo-1544919982-b61976f0ba43?auto=format&fit=crop&w=900&q=80',
      badge: 'CUSTOM COMMISSION',
      desc: 'Sleek matte black steel frame pool table converting into a 10-seater banquet dining table, paired with a custom virtual pinball machine.',
    },
    {
      id: 'proj-firemans',
      title: "Fireman's Arms Historic Sports Bar",
      category: 'PUBS',
      location: 'De Waterkant, Cape Town',
      equipment: '8ft Tournament Pro • Stand-up Multicade (3000 Games) • Bubble Jukebox',
      imageUrl: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=900&q=80',
      badge: 'FULL VENUE BUNDLE',
      desc: 'Complete entertainment zone overhaul with coin-drop retro arcade, illuminated neon bubble jukebox, and tournament slate table.',
    },
    {
      id: 'proj-century-tech',
      title: 'Century City Fintech HQ',
      category: 'CORPORATE',
      location: 'Century City, Cape Town',
      equipment: '2× Multicade Arcade Cabinets • 7ft Pub Slate Table • Neon Wall Art',
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
      badge: 'CORPORATE LOUNGE',
      desc: 'Vibrant employee recreational game center featuring 4-player retro brawlers, custom company branded pool table, and LED table canopy.',
    },
  ];

  const filteredProjects = PAST_PROJECTS.filter((p) => {
    if (galleryFilter === 'ALL') return true;
    return p.category === galleryFilter;
  });

  return (
    <div className="space-y-32 pb-28 overflow-hidden">
      {/* 1. HIGH-VOLTAGE NEON HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-16 pb-24 overflow-hidden">
        {/* Background glow pools */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-pink/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          {/* Pulsing neon badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/50 bg-[#0a0f1d] text-neon-cyan text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(0,240,255,0.25)]">
            <Radio className="w-3.5 h-3.5 text-neon-pink animate-pulse" />
            <span>EST. 1994 • CAPE TOWN&apos;S COIN-OP & AMUSEMENTS ATELIER</span>
          </div>

          {/* Giant Neon Display Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.06] uppercase font-mono">
            COIN-OP SLATE.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple neon-glow-cyan">
              RETRO ARCADES.
            </span>{' '}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-amber to-neon-lime">
              NEON JUKEBOXES.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed font-normal">
            We manufacture, sell, and lease tournament pool tables, 3,000-game retro arcade cabinets, glowing bubble jukeboxes, and overhead neon lighting. Zero-capital commercial venue leasing or custom private commissions.
          </p>

          {/* Category Quick Jump Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <a
              href="#pool"
              className="px-3.5 py-1.5 rounded-xl bg-arcade-card border border-neon-cyan/40 hover:border-neon-cyan text-neon-cyan text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(0,240,255,0.15)]"
            >
              <Trophy className="w-3.5 h-3.5" /> Pool Tables
            </a>
            <a
              href="#arcades"
              className="px-3.5 py-1.5 rounded-xl bg-arcade-card border border-neon-pink/40 hover:border-neon-pink text-neon-pink text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(255,0,127,0.15)]"
            >
              <Gamepad2 className="w-3.5 h-3.5" /> Retro Arcades
            </a>
            <a
              href="#jukeboxes"
              className="px-3.5 py-1.5 rounded-xl bg-arcade-card border border-neon-amber/40 hover:border-neon-amber text-neon-amber text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(255,183,0,0.15)]"
            >
              <Disc3 className="w-3.5 h-3.5" /> Jukeboxes
            </a>
            <a
              href="#accessories"
              className="px-3.5 py-1.5 rounded-xl bg-arcade-card border border-neon-purple/40 hover:border-neon-purple text-neon-purple text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(176,38,255,0.15)]"
            >
              <Lightbulb className="w-3.5 h-3.5" /> Neon Lighting
            </a>
            <a
              href="#projects"
              className="px-3.5 py-1.5 rounded-xl bg-arcade-card border border-neon-lime/40 hover:border-neon-lime text-neon-lime text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(57,255,20,0.15)]"
            >
              <Camera className="w-3.5 h-3.5" /> Past Projects
            </a>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/configurator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple hover:from-neon-cyan hover:to-neon-pink text-black font-black text-sm shadow-neon-cyan transition-all font-mono tracking-wider active:scale-95"
            >
              LAUNCH 3D ATELIER
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/commercial/planner"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-neon-pink/60 bg-neon-pink/10 hover:bg-neon-pink/20 text-neon-pink font-bold text-sm shadow-neon-pink transition-all font-mono tracking-wider active:scale-95"
            >
              <Compass className="w-4 h-4" />
              VENUE CAD CLEARANCE PLANNER
            </Link>
          </div>
        </div>
      </section>

      {/* NEON TUBE DIVIDER */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="neon-tube-cyan" />
      </div>

      {/* 2. 🎱 COMMERCIAL & CUSTOM POOL TABLES */}
      <section id="pool" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-arcade-border pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-neon-cyan uppercase tracking-widest">
              <Trophy className="w-4 h-4" /> 01 • Tournament Billiards
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              PRECISION SLATE POOL TABLES
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Italian 1-piece slate, Strachan 6811 cloth, and jam-free ZAR coin mechanisms.
            </p>
          </div>

          <Link
            href="/configurator"
            className="text-xs font-mono text-neon-cyan hover:underline flex items-center gap-1 font-bold"
          >
            Configure in 3D Atelier <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="rounded-3xl border border-arcade-border bg-arcade-card p-6 space-y-6 flex flex-col justify-between hover:border-neon-cyan/60 transition-all group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded-md bg-neon-cyan/10 border border-neon-cyan/30 text-[10px] font-mono font-bold text-neon-cyan">
                  7FT PUB CLASSIC
                </span>
                <span className="text-xs text-neon-lime font-mono font-bold">
                  {formatZar(32000)} | R2,200/mo
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors">
                The &apos;Kalk Bay&apos; Coin-Op
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                South Africa&apos;s tavern champion. Solid Kiaat with anti-cheat mechanical coin drop, heavy brass corners, and high-tensile speed green wool.
              </p>
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-arcade-border font-mono">
                <div className="flex justify-between">
                  <span>Footprint:</span>
                  <span className="text-white">2.14m × 1.22m</span>
                </div>
                <div className="flex justify-between">
                  <span>Required Room:</span>
                  <span className="text-neon-cyan">5.14m × 4.22m</span>
                </div>
                <div className="flex justify-between">
                  <span>Mechanism:</span>
                  <span className="text-neon-lime">R5 / R10 ZAR Coin Slot</span>
                </div>
              </div>
            </div>

            <Link
              href="/configurator?size=SEVEN_FOOT_PUB"
              className="w-full py-3 px-4 rounded-xl bg-neon-cyan/10 hover:bg-neon-cyan/20 border border-neon-cyan/40 text-neon-cyan font-mono font-bold text-xs text-center transition-colors block"
            >
              Build 7ft in 3D →
            </Link>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border-2 border-neon-pink/50 bg-gradient-to-b from-neon-pink/10 via-arcade-card to-arcade-card p-6 space-y-6 flex flex-col justify-between relative shadow-neon-pink">
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-neon-pink text-white text-[10px] font-mono font-black uppercase tracking-wider shadow-md">
              POPULAR MANCAVE
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded-md bg-neon-pink/20 border border-neon-pink/40 text-[10px] font-mono font-bold text-neon-pink">
                  8FT PRO TOURNAMENT
                </span>
                <span className="text-xs text-neon-pink font-mono font-bold">
                  {formatZar(38000)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">The &apos;Clifton&apos; Minimalist</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Architectural matte black steel trestle legs with electric blue tournament worsted wool. Optional solid wood dining conversion top.
              </p>
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-arcade-border font-mono">
                <div className="flex justify-between">
                  <span>Footprint:</span>
                  <span className="text-white">2.44m × 1.32m</span>
                </div>
                <div className="flex justify-between">
                  <span>Required Room:</span>
                  <span className="text-neon-pink">5.44m × 4.32m</span>
                </div>
                <div className="flex justify-between">
                  <span>Dining Leaves:</span>
                  <span className="text-white">Available (+R 6,500)</span>
                </div>
              </div>
            </div>

            <Link
              href="/configurator?size=EIGHT_FOOT_PRO"
              className="w-full py-3 px-4 rounded-xl bg-neon-pink hover:bg-neon-pink/80 text-white font-mono font-bold text-xs text-center transition-colors block shadow-md"
            >
              Build 8ft in 3D →
            </Link>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl border border-arcade-border bg-arcade-card p-6 space-y-6 flex flex-col justify-between hover:border-neon-amber/60 transition-all group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded-md bg-neon-amber/10 border border-neon-amber/30 text-[10px] font-mono font-bold text-neon-amber">
                  12FT SNOOKER ESTATE
                </span>
                <span className="text-xs text-neon-amber font-mono font-bold">
                  {formatZar(75000)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-neon-amber transition-colors">
                The &apos;Constantia&apos; Master
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Full-scale English championship snooker table with 5-piece matched precision slate, solid turned fluted legs, and handmade English pocket nets.
              </p>
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-arcade-border font-mono">
                <div className="flex justify-between">
                  <span>Footprint:</span>
                  <span className="text-white">3.85m × 2.05m</span>
                </div>
                <div className="flex justify-between">
                  <span>Required Room:</span>
                  <span className="text-neon-amber">6.85m × 5.05m</span>
                </div>
                <div className="flex justify-between">
                  <span>Slate Mass:</span>
                  <span className="text-white">1,100 kg</span>
                </div>
              </div>
            </div>

            <Link
              href="/configurator?size=TWELVE_FOOT_SNOOKER"
              className="w-full py-3 px-4 rounded-xl bg-neon-amber/10 hover:bg-neon-amber/20 border border-neon-amber/40 text-neon-amber font-mono font-bold text-xs text-center transition-colors block"
            >
              Build 12ft in 3D →
            </Link>
          </div>
        </div>
      </section>

      {/* NEON TUBE DIVIDER */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="neon-tube-pink" />
      </div>

      {/* 3. 🕹️ RETRO & MODERN ARCADE GAMING MACHINES */}
      <section id="arcades" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-arcade-border pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-neon-pink uppercase tracking-widest">
              <Gamepad2 className="w-4 h-4" /> 02 • Arcade Amusement Machines
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              RETRO & MODERN ARCADE MACHINES
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Stand-up cabinets, 4-player brawlers, virtual pinball & claw cranes for sale or commercial revenue share.
            </p>
          </div>

          <a
            href="tel:+27824559812"
            className="text-xs font-mono text-neon-pink hover:underline flex items-center gap-1 font-bold"
          >
            Inquire About Arcade Fleet Leasing <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Arcade 1 */}
          <div className="rounded-3xl border border-arcade-border bg-arcade-card p-6 space-y-6 flex flex-col justify-between hover:border-neon-pink/60 transition-all group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded-md bg-neon-pink/10 border border-neon-pink/30 text-[10px] font-mono font-bold text-neon-pink">
                  STAND-UP MULTICADE
                </span>
                <span className="text-xs text-neon-lime font-mono font-bold">
                  {formatZar(19500)} | R1,800/mo
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-neon-pink transition-colors">
                The &apos;Cyber-Cade 3000&apos;
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Over 3,000 classic 80s/90s arcade titles in one cabinet (Pac-Man, Galaga, Street Fighter II, Metal Slug). Commercial Japanese Sanwa joysticks, glowing LED buttons, and illuminated marquee.
              </p>
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-arcade-border font-mono">
                <div className="flex justify-between">
                  <span>Display:</span>
                  <span className="text-white">24&quot; HD IPS Low-Lag Screen</span>
                </div>
                <div className="flex justify-between">
                  <span>Controls:</span>
                  <span className="text-neon-cyan">2-Player 6-Button Layout</span>
                </div>
                <div className="flex justify-between">
                  <span>Coin Mechanism:</span>
                  <span className="text-neon-lime">Electronic ZAR Acceptor</span>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/27824559812?text=Hi%2C%20I%20am%20interested%20in%20the%20Cyber-Cade%203000%20Arcade%20Machine"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-neon-pink/10 hover:bg-neon-pink/20 border border-neon-pink/40 text-neon-pink font-mono font-bold text-xs text-center transition-colors block"
            >
              Order / Rent Multicade →
            </a>
          </div>

          {/* Arcade 2 */}
          <div className="rounded-3xl border border-arcade-border bg-arcade-card p-6 space-y-6 flex flex-col justify-between hover:border-neon-purple/60 transition-all group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded-md bg-neon-purple/10 border border-neon-purple/30 text-[10px] font-mono font-bold text-neon-purple">
                  4-PLAYER DELUXE
                </span>
                <span className="text-xs text-neon-lime font-mono font-bold">
                  {formatZar(26500)} | R2,400/mo
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-neon-purple transition-colors">
                The &apos;Street Brawler 4P&apos;
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Massive 4-player wide deck built for party brawlers: TMNT, Simpsons, NBA Jam, and Sunset Riders. Features high-output stereo sound system and addressable RGB underglow neon.
              </p>
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-arcade-border font-mono">
                <div className="flex justify-between">
                  <span>Display:</span>
                  <span className="text-white">32&quot; Wide-Angle IPS</span>
                </div>
                <div className="flex justify-between">
                  <span>Audio:</span>
                  <span className="text-neon-purple">120W Stereo Amp + Subwoofer</span>
                </div>
                <div className="flex justify-between">
                  <span>Coin Mode:</span>
                  <span className="text-neon-lime">Freeplay or ZAR Coin Drop</span>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/27824559812?text=Hi%2C%20I%20am%20interested%20in%20the%204-Player%20Brawler%20Arcade"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-neon-purple/10 hover:bg-neon-purple/20 border border-neon-purple/40 text-neon-purple font-mono font-bold text-xs text-center transition-colors block"
            >
              Order / Rent 4-Player →
            </a>
          </div>

          {/* Arcade 3 */}
          <div className="rounded-3xl border border-arcade-border bg-arcade-card p-6 space-y-6 flex flex-col justify-between hover:border-neon-cyan/60 transition-all group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded-md bg-neon-cyan/10 border border-neon-cyan/30 text-[10px] font-mono font-bold text-neon-cyan">
                  4K DIGITAL PINBALL
                </span>
                <span className="text-xs text-neon-lime font-mono font-bold">
                  {formatZar(36000)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors">
                The &apos;Virtual Wizard 4K&apos;
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                43&quot; 4K 120Hz playfield glass with authentic mechanical solenoids and shaker motor that recreate real flipper recoil and ball clatter. Pre-loaded with 500+ iconic tables.
              </p>
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-arcade-border font-mono">
                <div className="flex justify-between">
                  <span>Playfield:</span>
                  <span className="text-white">43&quot; 4K 120Hz Low Latency</span>
                </div>
                <div className="flex justify-between">
                  <span>Haptics:</span>
                  <span className="text-neon-cyan">8x Force Feedback Solenoids</span>
                </div>
                <div className="flex justify-between">
                  <span>Backglass:</span>
                  <span className="text-white">Secondary LCD Scoreboard</span>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/27824559812?text=Hi%2C%20I%20am%20interested%20in%20the%204K%20Virtual%20Pinball"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-neon-cyan/10 hover:bg-neon-cyan/20 border border-neon-cyan/40 text-neon-cyan font-mono font-bold text-xs text-center transition-colors block"
            >
              Order Virtual Pinball →
            </a>
          </div>
        </div>
      </section>

      {/* NEON TUBE DIVIDER */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="neon-tube-lime" />
      </div>

      {/* 4. 🎵 NOSTALGIC & DIGITAL JUKEBOXES */}
      <section id="jukeboxes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-arcade-border pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-neon-amber uppercase tracking-widest">
              <Disc3 className="w-4 h-4" /> 03 • Sound Systems & Jukeboxes
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              ILLUMINATED NEON JUKEBOXES
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Classic bubble tube nostalgia or modern wall-mounted digital touchscreens with coin-op credit drops.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Jukebox 1 */}
          <div className="rounded-3xl border border-arcade-border bg-arcade-card p-8 space-y-6 flex flex-col justify-between hover:border-neon-amber/60 transition-all">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 rounded-md bg-neon-amber/20 border border-neon-amber/40 text-xs font-mono font-bold text-neon-amber">
                  NOSTALGIC BUBBLER
                </span>
                <span className="text-sm text-neon-lime font-mono font-bold">
                  {formatZar(28500)} | R1,500/mo
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">The &apos;Route 66&apos; Neon Bubble Jukebox</h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Authentic 1950s Rock-Ola silhouette with continuous bubbling glass tubes and multi-colored rotating neon cylinders. Modernized with high-fidelity Bluetooth 5.2, USB playback, and physical ZAR coin drop for commercial revenue.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-arcade-border text-xs font-mono">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="text-zinc-500 text-[10px]">LIGHTING</div>
                  <div className="text-neon-amber font-bold mt-0.5">Liquid Bubbles + Neon LEDs</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="text-zinc-500 text-[10px]">AUDIO POWER</div>
                  <div className="text-white font-bold mt-0.5">200W Peak High-Fidelity</div>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/27824559812?text=Hi%2C%20I%20am%20interested%20in%20the%20Route%2066%20Bubble%20Jukebox"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-neon-amber/20 hover:bg-neon-amber/30 border border-neon-amber text-neon-amber font-mono font-bold text-xs text-center transition-colors block"
            >
              Order Bubble Jukebox →
            </a>
          </div>

          {/* Jukebox 2 */}
          <div className="rounded-3xl border border-arcade-border bg-arcade-card p-8 space-y-6 flex flex-col justify-between hover:border-neon-cyan/60 transition-all">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 rounded-md bg-neon-cyan/20 border border-neon-cyan/40 text-xs font-mono font-bold text-neon-cyan">
                  DIGITAL TOUCH PRO
                </span>
                <span className="text-sm text-neon-lime font-mono font-bold">
                  {formatZar(22000)} | R1,400/mo
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">The &apos;Nightclub Pro&apos; Wall Touch Jukebox</h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Space-saving wall-mounted digital jukebox with 19&quot; capacitive touchscreen. Over 50,000 pre-installed licensed songs spanning rock, jazz, amapiano, and pop, with smart search and bar staff volume override.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-arcade-border text-xs font-mono">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="text-zinc-500 text-[10px]">SCREEN</div>
                  <div className="text-neon-cyan font-bold mt-0.5">19&quot; Anti-Glare Touch</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="text-zinc-500 text-[10px]">CONNECTIVITY</div>
                  <div className="text-white font-bold mt-0.5">Wi-Fi • Multi-Zone Amp</div>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/27824559812?text=Hi%2C%20I%20am%20interested%20in%20the%20Digital%20Wall%20Jukebox"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-neon-cyan/20 hover:bg-neon-cyan/30 border border-neon-cyan text-neon-cyan font-mono font-bold text-xs text-center transition-colors block"
            >
              Order Wall Jukebox →
            </a>
          </div>
        </div>
      </section>

      {/* 5. ⚡ ACCESSORIES & NEON CANOPY LIGHTING */}
      <section id="accessories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-arcade-border pb-6 space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-neon-purple uppercase tracking-widest">
            <Lightbulb className="w-4 h-4" /> 04 • Lighting, Neon & Billiard Gear
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
            OVERHEAD CANOPIES & NEON ART
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Flicker-free tournament shadowless illumination, custom pub neon signs, and premium cue accessories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-arcade-card border border-arcade-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neon-purple/20 border border-neon-purple/40 flex items-center justify-center text-neon-purple">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Overhead LED Table Canopy</h4>
            <p className="text-xs text-zinc-400">
              Tournament shadowless 1.8m suspended matte black LED hood. Zero shadows under balls.
            </p>
            <div className="text-xs font-mono font-bold text-neon-purple">{formatZar(4800)}</div>
          </div>

          <div className="p-6 rounded-2xl bg-arcade-card border border-arcade-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neon-pink/20 border border-neon-pink/40 flex items-center justify-center text-neon-pink">
              <Flame className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Custom Neon Wall Art</h4>
            <p className="text-xs text-zinc-400">
              Hand-bent LED neon signs: &quot;BILLIARDS&quot;, &quot;INSERT COIN&quot;, or your pub&apos;s custom logo.
            </p>
            <div className="text-xs font-mono font-bold text-neon-pink">{formatZar(3200)}</div>
          </div>

          <div className="p-6 rounded-2xl bg-arcade-card border border-arcade-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neon-cyan/20 border border-neon-cyan/40 flex items-center justify-center text-neon-cyan">
              <Trophy className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Aramith Pro Ball Sets</h4>
            <p className="text-xs text-zinc-400">
              Phenolic resin tournament balls with laser-straight spin balance and high impact resistance.
            </p>
            <div className="text-xs font-mono font-bold text-neon-cyan">{formatZar(2600)}</div>
          </div>

          <div className="p-6 rounded-2xl bg-arcade-card border border-arcade-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neon-lime/20 border border-neon-lime/40 flex items-center justify-center text-neon-lime">
              <Coins className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Deluxe Cue Stands & Tokens</h4>
            <p className="text-xs text-zinc-400">
              Solid Kiaat wall-mounted cue holders, short 48&quot;/36&quot; cues, and branded metal arcade tokens.
            </p>
            <div className="text-xs font-mono font-bold text-neon-lime">{formatZar(1800)}</div>
          </div>
        </div>
      </section>

      {/* 6. 📸 PAST PROJECTS & REAL VENUE INSTALLATIONS */}
      <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-arcade-border pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-neon-lime uppercase tracking-widest">
              <Camera className="w-4 h-4" /> 05 • Real-World Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              PAST PROJECTS & VENUE FITOUTS
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Explore completed Cape Town pub makeovers, luxury man caves, and corporate game centers.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 bg-arcade-card p-1.5 rounded-2xl border border-arcade-border text-xs font-mono">
            {(['ALL', 'PUBS', 'MANCAVES', 'CORPORATE'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setGalleryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl transition-colors font-bold ${
                  galleryFilter === cat
                    ? 'bg-neon-lime text-black shadow-[0_0_10px_#39ff14]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-3xl border border-arcade-border bg-arcade-card overflow-hidden hover:border-neon-lime/60 transition-all group space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div
                  className="h-64 bg-cover bg-center relative"
                  style={{ backgroundImage: `url('${proj.imageUrl}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-arcade-card via-arcade-card/30 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur border border-neon-lime/50 text-[10px] font-mono text-neon-lime font-bold">
                      {proj.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="text-xs font-mono text-zinc-300 font-bold bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur">
                      📍 {proj.location}
                    </div>
                  </div>
                </div>

                <div className="px-6 space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-neon-lime transition-colors">
                    {proj.title}
                  </h3>
                  <div className="text-xs text-neon-cyan font-mono font-semibold">
                    {proj.equipment}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{proj.desc}</p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-[11px] text-zinc-500 font-mono flex items-center justify-between">
                  <span>Delivered & Leveled by M-Games Team</span>
                  <span className="text-emerald-400 font-bold">✓ 0.00° Level Cert</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. COMBINED MULTI-PRODUCT VENUE LEASING CALCULATOR */}
      <section id="commercial" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-neon-cyan/40 bg-gradient-to-br from-[#0c1426] via-arcade-card to-[#060810] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neon-cyan/20 border border-neon-cyan/50 text-neon-cyan text-xs font-mono uppercase tracking-widest font-bold">
              <Coins className="w-3.5 h-3.5 text-neon-lime" /> B2B Commercial Package Bundle Simulator
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              COMBINED ENTERTAINMENT CASHFLOW SIMULATOR
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Bundle pool tables, arcade multicades, and jukeboxes together. See your combined coin-op cash collection versus monthly fixed lease cost.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls (7 Cols) */}
            <div className="lg:col-span-7 space-y-5 bg-zinc-950/80 p-6 rounded-2xl border border-zinc-800">
              {/* Table Count */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-300 font-bold font-mono">🎱 Pool Tables (7ft / 8ft):</span>
                  <span className="text-neon-cyan font-mono font-bold">{tableCount} Tables (R2,200 ea)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  value={tableCount}
                  onChange={(e) => setTableCount(parseInt(e.target.value))}
                  className="w-full accent-neon-cyan cursor-pointer"
                />
              </div>

              {/* Arcade Count */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-300 font-bold font-mono">🕹️ Multicade Arcades:</span>
                  <span className="text-neon-pink font-mono font-bold">{arcadeCount} Arcades (R1,800 ea)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={arcadeCount}
                  onChange={(e) => setArcadeCount(parseInt(e.target.value))}
                  className="w-full accent-neon-pink cursor-pointer"
                />
              </div>

              {/* Jukebox Count */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-300 font-bold font-mono">🎵 Bubble / Digital Jukeboxes:</span>
                  <span className="text-neon-amber font-mono font-bold">{jukeboxCount} Jukeboxes (R1,500 ea)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  value={jukeboxCount}
                  onChange={(e) => setJukeboxCount(parseInt(e.target.value))}
                  className="w-full accent-neon-amber cursor-pointer"
                />
              </div>

              {/* Traffic slider */}
              <div className="space-y-1.5 pt-2 border-t border-zinc-800">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-300 font-bold font-mono">Avg Daily Plays per Table:</span>
                  <span className="text-neon-lime font-mono font-bold">{gamesPerDay} Plays / day</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="80"
                  step="5"
                  value={gamesPerDay}
                  onChange={(e) => setGamesPerDay(parseInt(e.target.value))}
                  className="w-full accent-neon-lime cursor-pointer"
                />
              </div>
            </div>

            {/* Cashflow Card (5 Cols) */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-arcade-card to-[#04060a] p-6 border border-neon-cyan/50 space-y-6 text-center shadow-neon-cyan">
              <div className="space-y-1">
                <div className="text-xs text-zinc-400 font-mono">EST. COMBINED MONTHLY COIN GROSS</div>
                <div className="text-3xl font-black text-white font-mono">
                  {formatZar(totalMonthlyGross)}
                </div>
                <div className="text-[11px] text-zinc-500 font-mono">
                  Pool: {formatZar(poolRevenue)} • Arcade: {formatZar(arcadeRevenue)} • Music: {formatZar(jukeboxRevenue)}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs space-y-2 font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Total Package Lease:</span>
                  <span className="text-zinc-300">-{formatZar(packageLeaseCost)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-zinc-800 text-white font-bold">
                  <span className="text-xs text-neon-lime">Net Passive Venue Profit:</span>
                  <span className="text-2xl font-black text-neon-lime">
                    +{formatZar(netVenueProfit)} / mo
                  </span>
                </div>
              </div>

              <Link
                href="/commercial/planner"
                className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple hover:from-neon-cyan hover:to-neon-pink text-black font-black text-xs font-mono tracking-wider shadow-neon-cyan transition-all flex items-center justify-center gap-2 block active:scale-95"
              >
                TEST VENUE FIT ON CAD PLANNER
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
