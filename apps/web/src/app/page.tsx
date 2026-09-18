'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Compass,
  Sparkles,
  Trophy,
  Wrench,
  ChevronRight,
  Calculator,
  Building2,
  CheckCircle2,
  Star,
  Layers,
} from 'lucide-react';
import { formatZar } from '@m-games/ui';

export default function HomePage() {
  // Commercial Calculator State
  const [gamesPerDay, setGamesPerDay] = useState<number>(35);
  const [gamePrice, setGamePrice] = useState<number>(10);
  const monthlyRevenue = gamesPerDay * gamePrice * 30;
  const fixedLease = 2200;
  const netProfit = Math.max(0, monthlyRevenue - fixedLease);

  return (
    <div className="space-y-28 pb-24 overflow-hidden">
      {/* 1. CINEMATIC LUXURY HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-16 pb-24 overflow-hidden">
        {/* Editorial Background Image with Obsidian Gradient Vignette */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544919982-b61976f0ba43?auto=format&fit=crop&w=2000&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07080a] via-[#07080a]/80 to-[#07080a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(212,175,55,0.12),transparent)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-950/30 text-amber-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Master Crafted in Cape Town • Commercial Leasing & Private Commissions</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.08]">
            Diamond-Honed Slate. <br />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              South African Hardwood BilIards.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Precision 19mm Italian slate beds, hand-rubbed indigenous Wild Kiaat, and Strachan 6811 tournament cloth. Engineered for Cape Town&apos;s premier hospitality venues and bespoke luxury residences.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/configurator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm shadow-xl shadow-amber-950/60 transition-all active:scale-95"
            >
              Configure in 3D Atelier
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/commercial/planner"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-100 font-semibold text-sm backdrop-blur-md transition-all active:scale-95"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              B2B Venue Clearance Planner
            </Link>
          </div>

          {/* Signature Pillar Metrics */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-zinc-800/80 text-left">
            <div className="space-y-1">
              <div className="text-2xl font-black text-white font-mono">19mm</div>
              <div className="text-xs text-amber-400/90 font-medium">Italian Slate Bed</div>
              <div className="text-[11px] text-zinc-500">Diamond-honed single slab</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-black text-white font-mono">100%</div>
              <div className="text-xs text-amber-400/90 font-medium">Indigenous Hardwood</div>
              <div className="text-[11px] text-zinc-500">Solid Kiaat & African Walnut</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-black text-white font-mono">0.00°</div>
              <div className="text-xs text-amber-400/90 font-medium">Digital Machinist Cert</div>
              <div className="text-[11px] text-zinc-500">3-axis spirit level sign-off</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-black text-white font-mono">R 0</div>
              <div className="text-xs text-amber-400/90 font-medium">Upfront Capital</div>
              <div className="text-[11px] text-zinc-500">Commercial revenue leasing</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE ANATOMY OF TOURNAMENT CRAFTSMANSHIP */}
      <section id="craft" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
            Uncompromising Build Quality
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered Down to the Millimeter
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Every table is constructed inside our Paarden Eiland atelier by master woodcrafters and tournament table fitters with over 30 years of pedigree.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group relative rounded-3xl border border-zinc-800 bg-[#090b10] overflow-hidden hover:border-amber-500/50 transition-all duration-300">
            <div
              className="h-48 bg-cover bg-center relative"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=800&q=80')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-[#090b10]/40 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10 text-[10px] font-mono text-amber-400">
                BED & CLOTH
              </div>
            </div>
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-bold text-white">Strachan 6811 & Italian Slate</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Precision 19mm solid slate cut from single mountain slabs, dressed with authentic English worsted wool for tournament-speed ball roll and dead-straight bank response.
              </p>
              <div className="pt-2 text-[11px] font-mono text-amber-400">
                Speed Green • Burgundy • Royal Blue
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative rounded-3xl border border-zinc-800 bg-[#090b10] overflow-hidden hover:border-amber-500/50 transition-all duration-300">
            <div
              className="h-48 bg-cover bg-center relative"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-[#090b10]/40 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10 text-[10px] font-mono text-amber-400">
                TIMBER SELECTION
              </div>
            </div>
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-bold text-white">Wild Kiaat & Solid Walnut</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Kiln-dried indigenous African timber with distinct rich golden-brown grain patterns, bonded with internal steel box subframes to prevent environmental warping.
              </p>
              <div className="pt-2 text-[11px] font-mono text-amber-400">
                Natural Hardwax Oil • Hand-Rubbed Satin
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative rounded-3xl border border-zinc-800 bg-[#090b10] overflow-hidden hover:border-amber-500/50 transition-all duration-300">
            <div
              className="h-48 bg-cover bg-center relative"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-[#090b10]/40 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10 text-[10px] font-mono text-amber-400">
                COMMERCIAL RIGGING
              </div>
            </div>
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-bold text-white">Machinist Spirit Level Guarantee</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Delivered and leveled by certified master assemblers using precision machinist levels. You receive a digital calibration certificate and photographic warranty sign-off.
              </p>
              <div className="pt-2 text-[11px] font-mono text-amber-400">
                Complimentary 6-Month Recloth & Service
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE COLLECTIONS SHOWCASE */}
      <section id="collections" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Curated Atelier Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              Iconic South African Models
            </h2>
          </div>
          <Link
            href="/configurator"
            className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
          >
            Explore all custom finishes in 3D <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: 7ft Pub Classic */}
          <div className="rounded-3xl border border-zinc-800 bg-[#090b10] p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded-md bg-zinc-800 text-[10px] font-bold font-mono text-zinc-300">
                  7FT PUB CLASSIC
                </span>
                <span className="text-xs text-emerald-400 font-bold font-mono">
                  From {formatZar(32000)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">The &apos;Kalk Bay&apos; Commercial</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The undisputed workhorse of South African pubs. Features mechanical ZAR coin drop, brass anti-chip corner castings, and heavy-duty speed green cloth.
              </p>
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                <div className="flex justify-between">
                  <span>Footprint:</span>
                  <span className="font-mono text-white">2.14m × 1.22m</span>
                </div>
                <div className="flex justify-between">
                  <span>Required Room:</span>
                  <span className="font-mono text-amber-400">5.14m × 4.22m</span>
                </div>
                <div className="flex justify-between">
                  <span>Commercial Lease:</span>
                  <span className="font-mono text-emerald-400 font-bold">R 2,200 / mo</span>
                </div>
              </div>
            </div>

            <Link
              href="/configurator"
              className="w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs text-center transition-colors block"
            >
              Customize in 3D
            </Link>
          </div>

          {/* Card 2: 8ft Pro Tournament */}
          <div className="rounded-3xl border-2 border-amber-500/40 bg-gradient-to-b from-amber-950/20 to-[#090b10] p-6 space-y-6 flex flex-col justify-between relative shadow-xl">
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-black uppercase tracking-wider">
              MOST POPULAR
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-800/40 text-[10px] font-bold font-mono text-amber-300">
                  8FT PRO TOURNAMENT
                </span>
                <span className="text-xs text-amber-400 font-bold font-mono">
                  From {formatZar(38000)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">The &apos;Clifton&apos; Minimalist</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Contemporary architectural lines with solid matte black steel trestle base or rich solid walnut cabinet. Electric blue tournament cloth for modern man caves.
              </p>
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                <div className="flex justify-between">
                  <span>Footprint:</span>
                  <span className="font-mono text-white">2.44m × 1.32m</span>
                </div>
                <div className="flex justify-between">
                  <span>Required Room:</span>
                  <span className="font-mono text-amber-400">5.44m × 4.32m</span>
                </div>
                <div className="flex justify-between">
                  <span>Dining Top Conversion:</span>
                  <span className="font-mono text-white">Available (+R 6,500)</span>
                </div>
              </div>
            </div>

            <Link
              href="/configurator"
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs text-center transition-colors block shadow-md"
            >
              Customize in 3D
            </Link>
          </div>

          {/* Card 3: 12ft Snooker Estate */}
          <div className="rounded-3xl border border-zinc-800 bg-[#090b10] p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded-md bg-zinc-800 text-[10px] font-bold font-mono text-zinc-300">
                  12FT SNOOKER ESTATE
                </span>
                <span className="text-xs text-amber-400 font-bold font-mono">
                  From {formatZar(75000)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">The &apos;Constantia&apos; Master</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Championship 12ft snooker table featuring 5-piece matched precision slate, traditional turned fluted legs, leather pocket nets, and hand-rubbed African Walnut finish.
              </p>
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                <div className="flex justify-between">
                  <span>Footprint:</span>
                  <span className="font-mono text-white">3.85m × 2.05m</span>
                </div>
                <div className="flex justify-between">
                  <span>Required Room:</span>
                  <span className="font-mono text-amber-400">6.85m × 5.05m</span>
                </div>
                <div className="flex justify-between">
                  <span>Build Time:</span>
                  <span className="font-mono text-white">6–8 Weeks</span>
                </div>
              </div>
            </div>

            <Link
              href="/configurator"
              className="w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs text-center transition-colors block"
            >
              Customize in 3D
            </Link>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE COMMERCIAL LEASING ROI CALCULATOR */}
      <section id="commercial" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-[#0c0f17] via-[#090b10] to-[#07080d] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/40 text-amber-400 text-xs font-mono uppercase tracking-widest">
              <Calculator className="w-3.5 h-3.5" /> B2B Hospitality Revenue Calculator
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Turn Empty Floor Area into Monthly Cash Profit
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We install tournament-grade coin-op tables in your venue with zero capital purchase. We handle all routine maintenance, leveling, and cloth replacements.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 bg-zinc-950/70 p-6 rounded-2xl border border-zinc-800">
              {/* Slider 1: Games Per Day */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300 font-semibold">Average Games Played per Day:</span>
                  <span className="font-mono text-amber-400 font-bold text-sm">
                    {gamesPerDay} Games
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={gamesPerDay}
                  onChange={(e) => setGamesPerDay(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-zinc-500">
                  <span>10 (Quiet Lounge)</span>
                  <span>40 (Typical Pub)</span>
                  <span>100+ (High-Traffic Bar)</span>
                </div>
              </div>

              {/* Slider 2: Price Per Game */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300 font-semibold">Price per Coin Drop (ZAR):</span>
                  <span className="font-mono text-amber-400 font-bold text-sm">
                    R {gamePrice} / game
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="20"
                  step="5"
                  value={gamePrice}
                  onChange={(e) => setGamePrice(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-zinc-500">
                  <span>R 5 (Historic)</span>
                  <span>R 10 (Standard SA Pub)</span>
                  <span>R 20 (Premium / Tokens)</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 space-y-1">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Full Service Guarantee Included in Lease:
                </div>
                <div>• Complimentary 6-month table re-cloth with Strachan wool</div>
                <div>• Emergency technician dispatch within 48 hours for coin mechanism jams</div>
                <div>• Digital spirit-level recalibration whenever table is repositioned</div>
              </div>
            </div>

            {/* Calculations Card (5 Cols) */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-amber-950/40 to-zinc-950 p-6 border border-amber-800/40 space-y-6 text-center">
              <div className="space-y-1">
                <div className="text-xs text-zinc-400 font-mono">ESTIMATED MONTHLY GROSS CASH</div>
                <div className="text-3xl font-black text-white font-mono">
                  {formatZar(monthlyRevenue)}
                </div>
                <div className="text-[11px] text-zinc-500">
                  Based on {gamesPerDay * 30} total games / month
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs space-y-2">
                <div className="flex justify-between text-zinc-400">
                  <span>Fixed Commercial Lease:</span>
                  <span className="font-mono text-zinc-300">-{formatZar(fixedLease)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-zinc-800 text-white font-bold">
                  <span className="text-xs text-emerald-400">Est. Net Venue Profit:</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">
                    +{formatZar(netProfit)} / mo
                  </span>
                </div>
              </div>

              <Link
                href="/commercial/planner"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs shadow-lg shadow-amber-950 transition-all flex items-center justify-center gap-2 block"
              >
                Plan Venue Space & Reserve Table
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CAPE TOWN VENUE CASE STUDIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
            Proven Commercial Reliability
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Trusted by Iconic Western Cape Venues
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-zinc-800 bg-[#090b10] p-8 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-zinc-300 italic leading-relaxed">
              &ldquo;M-Games delivered two coin-op 7ft tables up our tight staircase into the harbour bar. Their ingress audit team checked our landing geometry beforehand and brought 4 riggers with piano straps. Zero drama, perfect spirit leveling, and the coin revenue paid for the month within the first 10 days.&rdquo;
            </p>
            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">Dave Stewart</div>
                <div className="text-[11px] text-zinc-500">General Manager, The Brass Bell Kalk Bay</div>
              </div>
              <span className="text-[11px] font-mono text-emerald-400">2 Tables • Commercial Lease</span>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-[#090b10] p-8 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-zinc-300 italic leading-relaxed">
              &ldquo;We run a high-volume sports bar in De Waterkant. Players can immediately feel when a slate bed is truly flat versus cheap timber tables. Having M-Games re-cloth every six months without extra invoices keeps our regulars fiercely loyal.&rdquo;
            </p>
            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">Carl Weber</div>
                <div className="text-[11px] text-zinc-500">Proprietor, Fireman&apos;s Arms Cape Town</div>
              </div>
              <span className="text-[11px] font-mono text-emerald-400">12-Month Lease • Strachan Wool</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CONCIERGE CALLOUT */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-r from-amber-950/60 via-zinc-900 to-amber-950/60 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Commission Your Custom Table?
          </h2>
          <p className="text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Open the 3D Atelier to select your hardwood, felt shade, and coin-op configuration, or consult our dispatch concierge directly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/configurator"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm shadow-xl shadow-amber-950 transition-all"
            >
              Launch 3D Configurator
            </Link>
            <a
              href="tel:+27824559812"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-zinc-700 bg-zinc-950 hover:bg-zinc-800 text-zinc-200 font-semibold text-sm transition-all"
            >
              Call Master Craftsman: +27 82 455 9812
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
