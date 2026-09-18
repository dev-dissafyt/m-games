'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Table3DViewer } from '@/components/table-3d-viewer';
import { formatZar } from '@m-games/ui';
import {
  Sparkles,
  Shield,
  Clock,
  ArrowRight,
  Check,
  Image as ImageIcon,
  Compass,
  CheckCircle2,
  Layers,
  Ruler,
  Info,
} from 'lucide-react';

const SIZES = [
  {
    key: 'SEVEN_FOOT_PUB' as const,
    name: '7ft Pub Classic',
    subtitle: 'The Standard South African Tavern & Games Room Size',
    dims: '2.14m × 1.22m',
    room: '5.14m × 4.22m',
    weight: '310 kg',
    price: 32000,
    code: '7FT',
  },
  {
    key: 'EIGHT_FOOT_PRO' as const,
    name: '8ft Pro Tournament',
    subtitle: 'Championship Pro Playfield • Luxury Dining Conversion Ready',
    dims: '2.44m × 1.32m',
    room: '5.44m × 4.32m',
    weight: '380 kg',
    price: 38000,
    code: '8FT',
  },
  {
    key: 'TWELVE_FOOT_SNOOKER' as const,
    name: '12ft Championship Snooker',
    subtitle: 'Full-Scale Estate Snooker Table with 5-Piece Matched Slate',
    dims: '3.85m × 2.05m',
    room: '6.85m × 5.05m',
    weight: '1,100 kg',
    price: 75000,
    code: '12FT',
  },
];

const FELT_COLORS = [
  { name: 'Speed Green', hex: '#115e2e', code: 'GRN', desc: 'Classic English Championship Wool' },
  { name: 'Burgundy Red', hex: '#660b1d', code: 'BUR', desc: 'Opulent Warm Lounge Finish' },
  { name: 'Electric Blue', hex: '#0a4291', code: 'BLU', desc: 'Contemporary TV Tournament Speed' },
  { name: 'Slate Grey', hex: '#2e3740', code: 'GRY', desc: 'Monochrome Architectural Minimalist' },
  { name: 'Plum Royal', hex: '#441447', code: 'PLM', desc: 'Deep Velvet Luxury Shade' },
];

const WOOD_FINISHES = [
  {
    name: 'Wild Kiaat Natural Oil',
    hex: '#965225',
    code: 'KIAAT',
    surcharge: 0,
    desc: 'Indigenous South African flame grain, hand-rubbed satin oil',
  },
  {
    name: 'Solid African Walnut',
    hex: '#422714',
    code: 'WALNUT',
    surcharge: 2500,
    desc: 'Dark chocolate rich tones with deep interlocking grain',
  },
  {
    name: 'African Mahogany',
    hex: '#5c1f13',
    code: 'MAHOGANY',
    surcharge: 3000,
    desc: 'Classic reddish luster with high-polish gloss lacquer',
  },
  {
    name: 'Matte Black Steel A-Frame',
    hex: '#18191c',
    code: 'BLKSTEEL',
    surcharge: 4500,
    desc: 'Contemporary architectural powder-coated industrial trestle',
  },
  {
    name: 'Pure White Piano Lacquer',
    hex: '#f5f5f7',
    code: 'WHTLACQUER',
    surcharge: 2000,
    desc: 'Multi-coat hand-buffed high gloss penthouse luxury',
  },
];

const HARDWARE_FINISHES = [
  { name: 'Mirror Chrome', hex: '#d4d8df', code: 'CHR' },
  { name: 'Antique Cast Brass', hex: '#e5a522', code: 'BRS' },
  { name: 'Matte Obsidian Black', hex: '#161719', code: 'BLK' },
];

export default function ConfiguratorPage() {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<typeof SIZES[0]>(SIZES[1]);
  const [selectedFelt, setSelectedFelt] = useState<typeof FELT_COLORS[0]>(FELT_COLORS[2]);
  const [selectedWood, setSelectedWood] = useState<typeof WOOD_FINISHES[0]>(WOOD_FINISHES[0]);
  const [selectedHardware, setSelectedHardware] = useState<typeof HARDWARE_FINISHES[0]>(HARDWARE_FINISHES[1]);
  const [coinOp, setCoinOp] = useState(false);
  const [hasCustomWrap, setHasCustomWrap] = useState(false);
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);

  // Price Calculation
  const basePrice = selectedSize.price;
  const woodSurcharge = selectedWood.surcharge;
  const coinOpPrice = coinOp ? 3500 : 0;
  const wrapPrice = hasCustomWrap ? 2800 : 0;
  const totalPrice = basePrice + woodSurcharge + coinOpPrice + wrapPrice;
  const depositPrice = Math.round(totalPrice * 0.5);

  // Dynamic SKU Generator
  const generatedSku = `MG-${selectedSize.code}-${selectedWood.code}-${selectedFelt.code}${
    coinOp ? '-COIN' : ''
  }-${selectedHardware.code}`;

  const handleProceed = () => {
    const query = new URLSearchParams({
      sku: generatedSku,
      size: selectedSize.key,
      sizeName: selectedSize.name,
      felt: selectedFelt.name,
      wood: selectedWood.name,
      hardware: selectedHardware.name,
      coinOp: coinOp.toString(),
      totalPrice: totalPrice.toString(),
      depositPrice: depositPrice.toString(),
    });
    router.push(`/checkout/ingress?${query.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Atelier Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-zinc-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/40 text-[11px] font-mono text-amber-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> 3D Digital Atelier • Real-Time Physics Shaders
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            Bespoke Table Configurator
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Customize tournament wool, solid South African hardwoods, and pocket iron castings in live 3D.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#0b0d13] px-4 py-2.5 rounded-2xl border border-zinc-800 font-mono text-xs shadow-inner">
            <span className="text-zinc-500 mr-2">SPEC SKU:</span>
            <span className="text-amber-400 font-bold tracking-wider">{generatedSku}</span>
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 3D Interactive Canvas & Quick Specs (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Table3DViewer
            tableSize={selectedSize.key}
            feltColor={selectedFelt.hex}
            woodColor={selectedWood.hex}
            hardwareColor={selectedHardware.hex}
            coinOp={coinOp}
            onSnapshotReady={(data) => setSnapshotUrl(data)}
          />

          {/* Quick Technical Specs Strip */}
          <div className="grid grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#090b10] border border-zinc-800 text-center">
              <div className="text-[10px] text-zinc-500 font-mono uppercase">OUTER DIMENSIONS</div>
              <div className="text-xs font-bold text-white font-mono mt-1">{selectedSize.dims}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#090b10] border border-zinc-800 text-center">
              <div className="text-[10px] text-zinc-500 font-mono uppercase">MIN ROOM (57&quot; CUE)</div>
              <div className="text-xs font-bold text-amber-400 font-mono mt-1">{selectedSize.room}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#090b10] border border-zinc-800 text-center">
              <div className="text-[10px] text-zinc-500 font-mono uppercase">SLATE MASS</div>
              <div className="text-xs font-bold text-white font-mono mt-1">{selectedSize.weight}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#090b10] border border-zinc-800 text-center">
              <div className="text-[10px] text-zinc-500 font-mono uppercase">ATELIER LEAD TIME</div>
              <div className="text-xs font-bold text-emerald-400 font-mono mt-1">4–6 Weeks</div>
            </div>
          </div>

          {/* Spatial Room Clearance Link Callout */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/40 via-zinc-900 to-zinc-900 border border-sky-800/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <Compass className="w-5 h-5 text-sky-400 shrink-0" />
              <div>
                <span className="font-bold text-white">Unsure if this table fits your room?</span>
                <p className="text-zinc-400 text-[11px] mt-0.5">
                  Test your exact venue blueprint on our 2D clearance planner with 1.45m cue envelopes.
                </p>
              </div>
            </div>
            <Link
              href="/commercial/planner"
              className="px-3 py-1.5 rounded-xl bg-sky-950 hover:bg-sky-900 text-sky-300 border border-sky-700/50 font-semibold shrink-0 transition-colors"
            >
              Open 2D Planner →
            </Link>
          </div>
        </div>

        {/* Right Column: Customization Controls & Drawer (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Size Selection */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                1. Table Size & Playfield
              </label>
              <span className="text-[11px] text-zinc-500">19mm 1-Piece Slate</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {SIZES.map((size) => {
                const isSelected = selectedSize.key === size.key;
                return (
                  <button
                    key={size.key}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                      isSelected
                        ? 'border-amber-500/80 bg-amber-950/20 text-white shadow-md'
                        : 'border-zinc-800 bg-[#090b10] text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-sm flex items-center gap-2">
                          {size.name}
                          {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                        </div>
                        <div className="text-xs text-zinc-400 mt-0.5">{size.subtitle}</div>
                        <div className="text-[11px] text-zinc-500 mt-1 font-mono">
                          {size.dims} • Room: <span className="text-amber-400/90">{size.room}</span>
                        </div>
                      </div>
                      <div className="text-sm font-extrabold text-white font-mono">
                        {formatZar(size.price)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Felt Selection */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                2. Tournament Worsted Wool
              </label>
              <span className="text-[11px] text-zinc-400 font-medium">Strachan 6811 Spec</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {FELT_COLORS.map((felt) => {
                const isSelected = selectedFelt.hex === felt.hex;
                return (
                  <button
                    key={felt.hex}
                    type="button"
                    onClick={() => setSelectedFelt(felt)}
                    className={`flex items-center gap-3 p-2.5 rounded-2xl border transition-all text-left ${
                      isSelected
                        ? 'border-amber-500/80 bg-zinc-900 text-white shadow-sm'
                        : 'border-zinc-800/80 bg-[#090b10] text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-xl shadow-md border border-white/20 shrink-0"
                      style={{ backgroundColor: felt.hex }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate">{felt.name}</div>
                      <div className="text-[11px] text-zinc-500 truncate">{felt.desc}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Hardwood Cabinet Finish */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                3. South African Hardwood Finish
              </label>
              <span className="text-[11px] text-zinc-400 font-medium">Hand-Rubbed Oils</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {WOOD_FINISHES.map((wood) => {
                const isSelected = selectedWood.name === wood.name;
                return (
                  <button
                    key={wood.name}
                    type="button"
                    onClick={() => setSelectedWood(wood)}
                    className={`flex items-center gap-3 p-2.5 rounded-2xl border transition-all text-left ${
                      isSelected
                        ? 'border-amber-500/80 bg-amber-950/20 text-white shadow-sm'
                        : 'border-zinc-800/80 bg-[#090b10] text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-xl shadow-md border border-white/20 shrink-0"
                      style={{ backgroundColor: wood.hex }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate">{wood.name}</div>
                      <div className="text-[11px] text-zinc-500 truncate">{wood.desc}</div>
                    </div>
                    <div className="text-xs font-mono font-bold text-zinc-400 shrink-0">
                      {wood.surcharge > 0 ? `+${formatZar(wood.surcharge)}` : 'Included'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Metallic Pocket Castings */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono block">
              4. Corner Pocket Castings & Accents
            </label>
            <div className="grid grid-cols-3 gap-2">
              {HARDWARE_FINISHES.map((hw) => {
                const isSelected = selectedHardware.name === hw.name;
                return (
                  <button
                    key={hw.name}
                    type="button"
                    onClick={() => setSelectedHardware(hw)}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border text-xs font-medium transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-950/20 text-white'
                        : 'border-zinc-800 bg-[#090b10] text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/20"
                      style={{ backgroundColor: hw.hex }}
                    />
                    <span className="text-[11px] text-center font-medium">{hw.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Commercial Mechanics & Vinyl */}
          <div className="space-y-2 pt-2 border-t border-zinc-800">
            <label className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono block">
              5. Commercial Mechanism
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl border border-zinc-800 bg-[#090b10] cursor-pointer hover:border-amber-500/50 transition-colors">
              <div>
                <div className="text-xs font-bold text-white">ZAR Mechanical Coin Acceptor Unit</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">
                  Pre-calibrated coin drop with anti-cheat ball trap and key drawer
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono text-amber-400 font-bold">+R 3,500</span>
                <input
                  type="checkbox"
                  checked={coinOp}
                  onChange={(e) => setCoinOp(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-zinc-950 border-zinc-700"
                />
              </div>
            </label>
          </div>

          {/* Pricing & Checkout Summary Box */}
          <div className="p-6 rounded-3xl border border-amber-500/40 bg-gradient-to-b from-amber-950/30 to-[#07080d] space-y-5 shadow-2xl">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Base ({selectedSize.name}):</span>
                <span className="font-mono text-zinc-200">{formatZar(basePrice)}</span>
              </div>
              {woodSurcharge > 0 && (
                <div className="flex justify-between text-zinc-400">
                  <span>{selectedWood.name}:</span>
                  <span className="font-mono text-zinc-200">+{formatZar(woodSurcharge)}</span>
                </div>
              )}
              {coinOp && (
                <div className="flex justify-between text-zinc-400">
                  <span>Commercial Coin-Op Unit:</span>
                  <span className="font-mono text-zinc-200">+{formatZar(coinOpPrice)}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-3 border-t border-zinc-800/80 text-white">
                <span className="font-bold text-sm">Quoted Total:</span>
                <span className="text-2xl font-black text-amber-400 font-mono">
                  {formatZar(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-zinc-500">
                <span>50% Manufacturing Deposit:</span>
                <span className="font-mono text-zinc-300 font-bold">{formatZar(depositPrice)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleProceed}
              className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm shadow-xl shadow-amber-950 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              Lock Spec & Check Stairway Access
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Includes 3-Axis Digital Leveling Warranty on Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
