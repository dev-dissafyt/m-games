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

  // Completed Orders & Reviews Filter State
  const [reviewFilter, setReviewFilter] = useState<'ALL' | 'PUBS' | 'MANCAVES' | 'CORPORATE'>('ALL');

  const COMPLETED_ORDERS_REVIEWS = [
    {
      id: 'ord-brass-bell-01',
      orderNumber: 'MG-2026-0182',
      rating: 5,
      clientName: 'Dave Stewart',
      clientRole: 'Proprietor & Managing Partner',
      venueName: 'The Brass Bell Harbour Pub',
      location: 'Kalk Bay Harbour, Cape Town',
      category: 'PUBS' as const,
      badge: 'COMMERCIAL LEASE',
      badgeColor: 'emerald',
      equipment: '2× 7ft Coin-Op Classics • Wild Kiaat Natural Oil • Speed Green Felt • 14-Step Sea Ingress',
      imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80',
      quote:
        'The 4-man rigging crew hauled both 310kg slate tables up 14 narrow wooden stairs onto our sea-facing deck without touching a railing. The 0.00° level check was verified with a rolling steel bearing. Coin drop revenue covered the lease within the first 8 days.',
      verifiedSpecs: ['0.00° Level Cert #MG-7975', 'Signed by Sipho Ndlovu', '4-Man Rigging Crew', '50/50 Coin Split'],
      deliveredDate: 'Delivered: Sept 2026',
    },
    {
      id: 'ord-firemans-02',
      orderNumber: 'MG-2026-0178',
      rating: 5,
      clientName: 'Carl Weber',
      clientRole: 'Owner & General Manager',
      venueName: "Fireman's Arms Historic Sports Bar",
      location: 'De Waterkant, Cape Town',
      category: 'PUBS' as const,
      badge: 'FULL VENUE BUNDLE',
      badgeColor: 'cyan',
      equipment: '8ft Tournament Pro (Solid Walnut) • 3,000-Game Retro Multicade • Illuminated Bubble Jukebox',
      imageUrl: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=900&q=80',
      quote:
        'M-Games transformed our back room into a high-yield destination zone. The 8ft tournament table plays like glass, and the 3000-game multicade keeps crowds entertained between rugby matches. Zero capital upfront was an absolute no-brainer.',
      verifiedSpecs: ['0.00° Level Cert #MG-8001', '3,000+ Classic Games', 'Illuminated Bubble Jukebox', '48hr Service Guarantee'],
      deliveredDate: 'Delivered: Aug 2026',
    },
    {
      id: 'ord-camps-bay-03',
      orderNumber: 'MG-2026-0174',
      rating: 5,
      clientName: 'Julian Vance-Moreau',
      clientRole: 'Private Collector',
      venueName: 'Camps Bay Ocean Penthouse',
      location: 'Camps Bay, Cape Town',
      category: 'MANCAVES' as const,
      badge: 'CUSTOM COMMISSION',
      badgeColor: 'purple',
      equipment: '8ft Clifton Minimalist Dining Conversion • Blue Worsted Cloth • Matte Black Steel A-Frame',
      imageUrl: 'https://images.unsplash.com/photo-1544919982-b61976f0ba43?auto=format&fit=crop&w=900&q=80',
      quote:
        'A bespoke architectural masterpiece. It seamlessly converts into a 10-seater banquet dining table for dinner parties, then lifts off to reveal tournament-grade slate underneath. The engineering tolerances are stunning.',
      verifiedSpecs: ['Italian Precision Slate', 'Single-Piece Level Sign-Off', 'Custom Steel Powdercoat', 'Dual Dining Top'],
      deliveredDate: 'Delivered: July 2026',
    },
    {
      id: 'ord-kloof-04',
      orderNumber: 'MG-2026-0180',
      rating: 5,
      clientName: 'Tshiamo Moloi',
      clientRole: 'Architect & Loft Owner',
      venueName: 'Kloof Street Skyline Loft',
      location: 'Gardens, Cape Town',
      category: 'MANCAVES' as const,
      badge: 'BESPOKE PURCHASE',
      badgeColor: 'amber',
      equipment: '7ft Classic • Indigenous Wild Kiaat Natural Satin • Charcoal Felt • Chrome Cast Pockets',
      imageUrl: 'https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?auto=format&fit=crop&w=900&q=80',
      quote:
        'The natural Kiaat grain matches our bespoke oak flooring flawlessly. Lift access rigging was handled with white gloves. The cushions have crisp, tournament-true rebound. Best investment for entertaining guests in Cape Town.',
      verifiedSpecs: ['0.00° Stabila Verified', 'Lift Access Rigging', 'Wild Flame Kiaat', 'Championship Wool'],
      deliveredDate: 'Delivered: Sept 2026',
    },
    {
      id: 'ord-century-05',
      orderNumber: 'MG-2026-0171',
      rating: 5,
      clientName: 'Andre Van Der Merwe',
      clientRole: 'Head of People & Workplace',
      venueName: 'Century City Fintech Campus',
      location: 'Century City, Cape Town',
      category: 'CORPORATE' as const,
      badge: 'CORPORATE LEASE',
      badgeColor: 'lime',
      equipment: '2× Stand-Up Multicade Cabinets (Custom Branding) • 7ft Pub Slate • Overhead LED Canopy',
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
      quote:
        'Our tech teams use the arcade machines and pool table daily during sprint reviews. Build quality is commercial tank-grade. Regular complimentary recloth and mechanism maintenance keeps everything in 100% pristine order.',
      verifiedSpecs: ['Corporate Lease SLA', 'Custom Company Vinyl', 'Complimentary 6-Mo Recloth', 'Multi-Game Coin-Op'],
      deliveredDate: 'Delivered: June 2026',
    },
  ];

  const filteredReviews = COMPLETED_ORDERS_REVIEWS.filter((item) => {
    if (reviewFilter === 'ALL') return true;
    return item.category === reviewFilter;
  });

  return (
    <div className="space-y-32 pb-28 overflow-hidden">
      {/* 1. BALANCED SLEEK HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-12 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          {/* Subtle badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-[#07090e] text-zinc-300 text-xs font-mono tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_6px_#00f0ff]" />
            <span>EST. 1994 • CAPE TOWN&apos;S COIN-OP & AMUSEMENTS ATELIER</span>
          </div>

          {/* Crisp Display Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.08] uppercase font-mono">
            COIN-OP SLATE. <span className="text-zinc-400">RETRO ARCADES.</span><br />
            <span className="text-white">NEON JUKEBOXES.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Manufacturing, retail, and commercial leasing of slate pool tables, 3,000-game multicades, illuminated bubble jukeboxes, and tournament lighting.
          </p>

          {/* Category Quick Jump Badges (Subtle outline, responsive hover glow) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <a
              href="#pool"
              className="px-3.5 py-1.5 rounded-xl bg-[#080a0f] border border-neon-cyan/25 text-zinc-300 hover:text-white hover:border-neon-cyan/80 btn-hover-glow-cyan text-xs font-mono font-medium flex items-center gap-1.5 transition-all"
            >
              <Trophy className="w-3.5 h-3.5 text-neon-cyan" /> Pool Tables
            </a>
            <a
              href="#arcades"
              className="px-3.5 py-1.5 rounded-xl bg-[#080a0f] border border-neon-pink/25 text-zinc-300 hover:text-white hover:border-neon-pink/80 btn-hover-glow-pink text-xs font-mono font-medium flex items-center gap-1.5 transition-all"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-neon-pink" /> Retro Arcades
            </a>
            <a
              href="#jukeboxes"
              className="px-3.5 py-1.5 rounded-xl bg-[#080a0f] border border-neon-amber/25 text-zinc-300 hover:text-white hover:border-neon-amber/80 transition-all hover:shadow-[0_0_15px_rgba(255,183,0,0.3)] text-xs font-mono font-medium flex items-center gap-1.5"
            >
              <Disc3 className="w-3.5 h-3.5 text-neon-amber" /> Jukeboxes
            </a>
            <a
              href="#accessories"
              className="px-3.5 py-1.5 rounded-xl bg-[#080a0f] border border-neon-purple/25 text-zinc-300 hover:text-white hover:border-neon-purple/80 transition-all hover:shadow-[0_0_15px_rgba(176,38,255,0.3)] text-xs font-mono font-medium flex items-center gap-1.5"
            >
              <Lightbulb className="w-3.5 h-3.5 text-neon-purple" /> Neon Lighting
            </a>
            <a
              href="#reviews"
              className="px-3.5 py-1.5 rounded-xl bg-[#080a0f] border border-emerald-500/25 text-zinc-300 hover:text-white hover:border-emerald-400/80 transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] text-xs font-mono font-medium flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Client Reviews
            </a>
          </div>

          {/* Primary Action Buttons (Sleek, luminous hover glow) */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/designer?mode=3d"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-black hover:bg-zinc-100 font-bold text-xs tracking-wider font-mono btn-hover-glow-white active:scale-95 transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-black" />
              LAUNCH 3D ATELIER
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/designer?mode=planner"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-zinc-800 bg-[#080a0f] text-zinc-300 hover:text-white hover:border-neon-cyan/70 font-semibold text-xs tracking-wider font-mono btn-hover-glow-cyan active:scale-95 transition-all"
            >
              <Compass className="w-4 h-4 text-neon-cyan" />
              VENUE CAD CLEARANCE PLANNER
            </Link>
          </div>
        </div>
      </section>

      {/* Subtle Hairline Divider */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="borderline-divider-cyan" />
      </div>

      {/* 2. 🎱 COMMERCIAL & CUSTOM POOL TABLES */}
      <section id="pool" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/80 pb-6">
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
            href="/designer?mode=3d"
            className="text-xs font-mono text-neon-cyan hover:underline flex items-center gap-1 font-bold"
          >
            Configure in 3D Atelier <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="rounded-3xl border border-zinc-800/90 bg-[#080a0f] p-6 space-y-6 flex flex-col justify-between hover:border-neon-cyan/50 hover:shadow-subtle-cyan transition-all group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-neon-cyan/30 text-[10px] font-mono font-bold text-neon-cyan">
                  7FT PUB CLASSIC
                </span>
                <span className="text-xs text-emerald-400 font-mono font-bold">
                  {formatZar(32000)} | R2,200/mo
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors">
                The &apos;Kalk Bay&apos; Coin-Op
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                South Africa&apos;s tavern champion. Solid Kiaat with anti-cheat mechanical coin drop, heavy brass corners, and high-tensile speed green wool.
              </p>
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-zinc-800/80 font-mono">
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
                  <span className="text-emerald-400">R5 / R10 ZAR Coin Slot</span>
                </div>
              </div>
            </div>

            <Link
              href="/designer?size=SEVEN_FOOT_PUB&mode=3d"
              className="w-full py-3 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-neon-cyan/80 btn-hover-glow-cyan font-mono font-semibold text-xs text-center transition-all block"
            >
              Build 7ft in 3D →
            </Link>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-neon-pink/30 bg-[#080a0f] p-6 space-y-6 flex flex-col justify-between relative shadow-subtle-pink hover:border-neon-pink/60 transition-all">
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-zinc-900 border border-neon-pink/50 text-neon-pink text-[10px] font-mono font-bold uppercase tracking-wider">
              POPULAR MANCAVE
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-neon-pink/30 text-[10px] font-mono font-bold text-neon-pink">
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
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-zinc-800/80 font-mono">
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
              href="/designer?size=EIGHT_FOOT_PRO&mode=3d"
              className="w-full py-3 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-neon-pink/80 btn-hover-glow-pink font-mono font-semibold text-xs text-center transition-all block"
            >
              Build 8ft in 3D →
            </Link>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl border border-zinc-800/90 bg-[#080a0f] p-6 space-y-6 flex flex-col justify-between hover:border-neon-amber/50 hover:shadow-subtle-amber transition-all group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-neon-amber/30 text-[10px] font-mono font-bold text-neon-amber">
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
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-zinc-800/80 font-mono">
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
              href="/designer?size=TWELVE_FOOT_SNOOKER&mode=3d"
              className="w-full py-3 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-neon-amber/80 transition-all hover:shadow-[0_0_15px_rgba(255,183,0,0.3)] font-mono font-semibold text-xs text-center block"
            >
              Build 12ft in 3D →
            </Link>
          </div>
        </div>
      </section>

      {/* Subtle Hairline Divider */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="borderline-divider-pink" />
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
          <div className="rounded-3xl border border-zinc-800/90 bg-[#080a0f] p-6 space-y-6 flex flex-col justify-between hover:border-neon-pink/50 hover:shadow-subtle-pink transition-all group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-neon-pink/30 text-[10px] font-mono font-bold text-neon-pink">
                  STAND-UP MULTICADE
                </span>
                <span className="text-xs text-emerald-400 font-mono font-bold">
                  {formatZar(19500)} | R1,800/mo
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-neon-pink transition-colors">
                The &apos;Cyber-Cade 3000&apos;
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Over 3,000 classic 80s/90s arcade titles in one cabinet (Pac-Man, Galaga, Street Fighter II, Metal Slug). Commercial Japanese Sanwa joysticks, glowing LED buttons, and illuminated marquee.
              </p>
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-zinc-800/80 font-mono">
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
                  <span className="text-emerald-400">Electronic ZAR Acceptor</span>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/27824559812?text=Hi%2C%20I%20am%20interested%20in%20the%20Cyber-Cade%203000%20Arcade%20Machine"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-neon-pink/80 btn-hover-glow-pink font-mono font-semibold text-xs text-center transition-all block"
            >
              Order / Rent Multicade →
            </a>
          </div>

          {/* Arcade 2 */}
          <div className="rounded-3xl border border-zinc-800/90 bg-[#080a0f] p-6 space-y-6 flex flex-col justify-between hover:border-neon-purple/50 hover:shadow-subtle-purple transition-all group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-neon-purple/30 text-[10px] font-mono font-bold text-neon-purple">
                  4-PLAYER DELUXE
                </span>
                <span className="text-xs text-emerald-400 font-mono font-bold">
                  {formatZar(26500)} | R2,400/mo
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-neon-purple transition-colors">
                The &apos;Street Brawler 4P&apos;
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Massive 4-player wide deck built for party brawlers: TMNT, Simpsons, NBA Jam, and Sunset Riders. Features high-output stereo sound system and addressable RGB underglow neon.
              </p>
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-zinc-800/80 font-mono">
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
                  <span className="text-emerald-400">Freeplay or ZAR Coin Drop</span>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/27824559812?text=Hi%2C%20I%20am%20interested%20in%20the%204-Player%20Brawler%20Arcade"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-neon-purple/80 transition-all hover:shadow-[0_0_15px_rgba(176,38,255,0.3)] font-mono font-semibold text-xs text-center block"
            >
              Order / Rent 4-Player →
            </a>
          </div>

          {/* Arcade 3 */}
          <div className="rounded-3xl border border-zinc-800/90 bg-[#080a0f] p-6 space-y-6 flex flex-col justify-between hover:border-neon-cyan/50 hover:shadow-subtle-cyan transition-all group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-neon-cyan/30 text-[10px] font-mono font-bold text-neon-cyan">
                  4K DIGITAL PINBALL
                </span>
                <span className="text-xs text-emerald-400 font-mono font-bold">
                  {formatZar(36000)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors">
                The &apos;Virtual Wizard 4K&apos;
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                43&quot; 4K 120Hz playfield glass with authentic mechanical solenoids and shaker motor that recreate real flipper recoil and ball clatter. Pre-loaded with 500+ iconic tables.
              </p>
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-zinc-800/80 font-mono">
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
              className="w-full py-3 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-neon-cyan/80 btn-hover-glow-cyan font-mono font-semibold text-xs text-center transition-all block"
            >
              Order Virtual Pinball →
            </a>
          </div>
        </div>
      </section>

      {/* Subtle Hairline Divider */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="borderline-divider-lime" />
      </div>

      {/* 4. 🎵 NOSTALGIC & DIGITAL JUKEBOXES */}
      <section id="jukeboxes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
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
          <div className="rounded-3xl border border-zinc-800/90 bg-[#080a0f] p-8 space-y-6 flex flex-col justify-between hover:border-neon-amber/50 hover:shadow-subtle-amber transition-all">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 rounded-md bg-zinc-900 border border-neon-amber/30 text-xs font-mono font-bold text-neon-amber">
                  NOSTALGIC BUBBLER
                </span>
                <span className="text-sm text-emerald-400 font-mono font-bold">
                  {formatZar(28500)} | R1,500/mo
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">The &apos;Route 66&apos; Neon Bubble Jukebox</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Authentic 1950s Rock-Ola silhouette with continuous bubbling glass tubes and multi-colored rotating neon cylinders. Modernized with high-fidelity Bluetooth 5.2, USB playback, and physical ZAR coin drop for commercial revenue.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-800/80 text-xs font-mono">
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
              className="w-full py-3.5 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-neon-amber/80 transition-all hover:shadow-[0_0_15px_rgba(255,183,0,0.3)] font-mono font-semibold text-xs text-center block"
            >
              Order Bubble Jukebox →
            </a>
          </div>

          {/* Jukebox 2 */}
          <div className="rounded-3xl border border-zinc-800/90 bg-[#080a0f] p-8 space-y-6 flex flex-col justify-between hover:border-neon-cyan/50 hover:shadow-subtle-cyan transition-all">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 rounded-md bg-zinc-900 border border-neon-cyan/30 text-xs font-mono font-bold text-neon-cyan">
                  DIGITAL TOUCH PRO
                </span>
                <span className="text-sm text-emerald-400 font-mono font-bold">
                  {formatZar(22000)} | R1,400/mo
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">The &apos;Nightclub Pro&apos; Wall Touch Jukebox</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Space-saving wall-mounted digital jukebox with 19&quot; capacitive touchscreen. Over 50,000 pre-installed licensed songs spanning rock, jazz, amapiano, and pop, with smart search and bar staff volume override.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-800/80 text-xs font-mono">
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
              className="w-full py-3.5 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-neon-cyan/80 btn-hover-glow-cyan font-mono font-semibold text-xs text-center transition-all block"
            >
              Order Wall Jukebox →
            </a>
          </div>
        </div>
      </section>

      {/* Subtle Hairline Divider */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="borderline-divider-cyan" />
      </div>

      {/* 5. ⚡ ACCESSORIES & NEON CANOPY LIGHTING */}
      <section id="accessories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-zinc-800/80 pb-6 space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest">
            <Lightbulb className="w-4 h-4 text-neon-purple/80" /> 04 • Lighting, Neon & Billiard Gear
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
            OVERHEAD CANOPIES & NEON ART
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Flicker-free tournament shadowless illumination, custom pub neon signs, and premium cue accessories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#080a0f] border border-zinc-800/80 hover:border-zinc-700 hover:shadow-subtle-purple transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-neon-purple/30 flex items-center justify-center text-neon-purple">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Overhead LED Table Canopy</h4>
            <p className="text-xs text-zinc-400">
              Tournament shadowless 1.8m suspended matte black LED hood. Zero shadows under balls.
            </p>
            <div className="text-xs font-mono font-bold text-zinc-200">{formatZar(4800)}</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#080a0f] border border-zinc-800/80 hover:border-zinc-700 hover:shadow-subtle-pink transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-neon-pink/30 flex items-center justify-center text-neon-pink">
              <Flame className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Custom Neon Wall Art</h4>
            <p className="text-xs text-zinc-400">
              Hand-bent LED neon signs: &quot;BILLIARDS&quot;, &quot;INSERT COIN&quot;, or your pub&apos;s custom logo.
            </p>
            <div className="text-xs font-mono font-bold text-zinc-200">{formatZar(3200)}</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#080a0f] border border-zinc-800/80 hover:border-zinc-700 hover:shadow-subtle-cyan transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan">
              <Trophy className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Aramith Pro Ball Sets</h4>
            <p className="text-xs text-zinc-400">
              Phenolic resin tournament balls with laser-straight spin balance and high impact resistance.
            </p>
            <div className="text-xs font-mono font-bold text-zinc-200">{formatZar(2600)}</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#080a0f] border border-zinc-800/80 hover:border-zinc-700 hover:shadow-subtle-lime transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-neon-lime/30 flex items-center justify-center text-neon-lime">
              <Coins className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Deluxe Cue Stands & Tokens</h4>
            <p className="text-xs text-zinc-400">
              Solid Kiaat wall-mounted cue holders, short 48&quot;/36&quot; cues, and branded metal arcade tokens.
            </p>
            <div className="text-xs font-mono font-bold text-zinc-200">{formatZar(1800)}</div>
          </div>
        </div>
      </section>

      {/* Subtle Hairline Divider */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="borderline-divider-lime" />
      </div>

      {/* 6. ⭐ COMPLETED INSTALLATIONS & VERIFIED CLIENT REVIEWS */}
      <section id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative scroll-mt-24">
        <span id="projects" className="sr-only" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 05 • Verified Deliveries & Client Sign-Offs
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              COMPLETED ORDERS & VERIFIED REVIEWS
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">
              Real Cape Town venue makeovers, commercial lease operations, and bespoke private commissions with 0.00° machinist leveling and certified client quotes.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800 text-xs font-mono">
            {(['ALL', 'PUBS', 'MANCAVES', 'CORPORATE'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setReviewFilter(cat)}
                className={`px-3 py-1.5 rounded-xl transition-all font-semibold ${
                  reviewFilter === cat
                    ? 'bg-white text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat === 'PUBS' ? 'COMMERCIAL PUBS' : cat === 'MANCAVES' ? 'RESIDENTIAL' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredReviews.map((order) => (
            <div
              key={order.id}
              className="rounded-3xl border border-zinc-800/90 bg-[#080a0f] overflow-hidden hover:border-zinc-700 hover:shadow-subtle-cyan transition-all group flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Photo Header */}
                <div
                  className="h-64 bg-cover bg-center relative"
                  style={{ backgroundImage: `url('${order.imageUrl}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-[#080a0f]/30 to-transparent" />

                  {/* Top badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur border border-zinc-700 text-[10px] font-mono text-white font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                      {order.badge}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur border border-zinc-800 text-[10px] font-mono text-neon-cyan font-bold">
                      ORDER #{order.orderNumber}
                    </span>
                  </div>

                  {/* Bottom Location */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="text-xs font-mono text-zinc-300 font-semibold bg-black/75 px-2.5 py-1 rounded-lg backdrop-blur border border-zinc-800">
                      📍 {order.location}
                    </div>
                    <div className="text-[10px] font-mono text-zinc-400 bg-black/75 px-2.5 py-1 rounded-lg backdrop-blur border border-zinc-800">
                      {order.deliveredDate}
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="px-6 space-y-3">
                  {/* Stars and Client info */}
                  <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{order.clientName}</span>
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="text-[11px] text-zinc-400 font-mono">
                        {order.clientRole} • <span className="text-zinc-300 font-semibold">{order.venueName}</span>
                      </div>
                    </div>

                    {/* 5 Stars */}
                    <div className="flex items-center gap-0.5" aria-label="5 Star Rating">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Client Review Quote */}
                  <div className="relative pl-3.5 border-l-2 border-neon-cyan/50 py-1">
                    <p className="text-xs text-zinc-300 leading-relaxed italic">
                      &ldquo;{order.quote}&rdquo;
                    </p>
                  </div>

                  {/* Installed Equipment SKU & Specs */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold">
                      Installed Equipment & Venue Specs:
                    </div>
                    <div className="text-xs font-mono text-zinc-300">
                      {order.equipment}
                    </div>
                  </div>

                  {/* Verified Spec Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {order.verifiedSpecs.map((spec, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-400"
                      >
                        ✓ {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Cert Stamp */}
              <div className="px-6 pb-6 pt-4">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/90 text-[11px] text-zinc-400 font-mono flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                    <span>Precision Leveled & Signed Off</span>
                  </div>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    ✓ 0.00° Precision Cert Active
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subtle Hairline Divider */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="borderline-divider-cyan" />
      </div>

      {/* 7. COMBINED MULTI-PRODUCT VENUE LEASING CALCULATOR */}
      <section id="commercial" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-neon-cyan/25 bg-[#06080d] p-8 sm:p-12 relative overflow-hidden shadow-[0_0_15px_rgba(0,240,255,0.06)]">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono uppercase tracking-wider font-semibold">
              <Coins className="w-3.5 h-3.5 text-emerald-400" /> B2B Commercial Package Bundle Simulator
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              COMBINED ENTERTAINMENT CASHFLOW SIMULATOR
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Bundle pool tables, arcade multicades, and jukeboxes together. See your combined coin-op cash collection versus monthly fixed lease cost.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls (7 Cols) */}
            <div className="lg:col-span-7 space-y-5 bg-zinc-950/90 p-6 rounded-2xl border border-zinc-800/80">
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
              <div className="space-y-1.5 pt-2 border-t border-zinc-800/80">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-300 font-bold font-mono">Avg Daily Plays per Table:</span>
                  <span className="text-emerald-400 font-mono font-bold">{gamesPerDay} Plays / day</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="80"
                  step="5"
                  value={gamesPerDay}
                  onChange={(e) => setGamesPerDay(parseInt(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Cashflow Card (5 Cols) */}
            <div className="lg:col-span-5 rounded-2xl bg-zinc-950 p-6 border border-neon-cyan/30 space-y-6 text-center shadow-subtle-cyan">
              <div className="space-y-1">
                <div className="text-xs text-zinc-400 font-mono">EST. COMBINED MONTHLY COIN GROSS</div>
                <div className="text-3xl font-black text-white font-mono">
                  {formatZar(totalMonthlyGross)}
                </div>
                <div className="text-[11px] text-zinc-500 font-mono">
                  Pool: {formatZar(poolRevenue)} • Arcade: {formatZar(arcadeRevenue)} • Music: {formatZar(jukeboxRevenue)}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#080a0f] border border-zinc-800/80 text-xs space-y-2 font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Total Package Lease:</span>
                  <span className="text-zinc-300">-{formatZar(packageLeaseCost)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-zinc-800 text-white font-bold">
                  <span className="text-xs text-zinc-400">Net Passive Venue Profit:</span>
                  <span className="text-2xl font-black text-emerald-400">
                    +{formatZar(netVenueProfit)} / mo
                  </span>
                </div>
              </div>

              <Link
                href="/designer?mode=planner"
                className="w-full py-3.5 px-4 rounded-xl bg-white text-black font-bold text-xs font-mono tracking-wider hover:bg-zinc-100 btn-hover-glow-white transition-all flex items-center justify-center gap-2 block active:scale-95 shadow-sm"
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
