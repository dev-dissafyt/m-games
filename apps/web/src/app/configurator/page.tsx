'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Table3DViewer } from '@/components/table-3d-viewer';
import { formatZar } from '@m-games/ui';
import { Sparkles, Shield, Clock, ArrowRight, Check, Image as ImageIcon } from 'lucide-react';

const SIZES = [
  {
    key: 'SEVEN_FOOT_PUB' as const,
    name: '7ft Pub Classic',
    dims: '2.14m × 1.22m',
    room: '5.14m × 4.22m required',
    price: 32000,
    code: '7FT',
  },
  {
    key: 'EIGHT_FOOT_PRO' as const,
    name: '8ft Pro Tournament',
    dims: '2.44m × 1.32m',
    room: '5.44m × 4.32m required',
    price: 38000,
    code: '8FT',
  },
  {
    key: 'TWELVE_FOOT_SNOOKER' as const,
    name: '12ft Snooker Estate',
    dims: '3.85m × 2.05m',
    room: '6.85m × 5.05m required',
    price: 75000,
    code: '12FT',
  },
];

const FELT_COLORS = [
  { name: 'Speed Green', hex: '#1b5e20', code: 'GRN' },
  { name: 'Burgundy', hex: '#800020', code: 'BUR' },
  { name: 'Electric Blue', hex: '#0d47a1', code: 'BLU' },
  { name: 'Slate Grey', hex: '#37474f', code: 'GRY' },
  { name: 'Plum Royal', hex: '#4a154b', code: 'PLM' },
];

const WOOD_FINISHES = [
  { name: 'Kiaat Natural Oil', hex: '#a05a2c', code: 'KIAAT', surcharge: 0 },
  { name: 'Solid Walnut', hex: '#4a2e18', code: 'WALNUT', surcharge: 2500 },
  { name: 'African Mahogany', hex: '#6d281a', code: 'MAHOGANY', surcharge: 3000 },
  { name: 'Matte Black Steel', hex: '#1f1f23', code: 'BLKSTEEL', surcharge: 4500 },
  { name: 'White Lacquer', hex: '#f3f4f6', code: 'WHTLACQUER', surcharge: 2000 },
];

const HARDWARE_FINISHES = [
  { name: 'Chrome Mirror', hex: '#d1d5db', code: 'CHR' },
  { name: 'Brass Antique', hex: '#f59e0b', code: 'BRS' },
  { name: 'Matte Black', hex: '#18181b', code: 'BLK' },
];

export default function ConfiguratorPage() {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<typeof SIZES[0]>(SIZES[1]);
  const [selectedFelt, setSelectedFelt] = useState<typeof FELT_COLORS[0]>(FELT_COLORS[2]);
  const [selectedWood, setSelectedWood] = useState<typeof WOOD_FINISHES[0]>(WOOD_FINISHES[1]);
  const [selectedHardware, setSelectedHardware] = useState<typeof HARDWARE_FINISHES[0]>(HARDWARE_FINISHES[0]);
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
  const generatedSku = `MG-${selectedSize.code}-${selectedWood.code}-${selectedFelt.code}${coinOp ? '-COIN' : ''}-${selectedHardware.code}`;

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-zinc-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> 3D Digital Atelier
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Custom Table Configurator
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Real-time material preview with diamond-honed slate bed rendering.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800 font-mono text-xs">
          <span className="text-zinc-500">SKU:</span>
          <span className="text-emerald-400 font-semibold">{generatedSku}</span>
        </div>
      </div>

      {/* Main Grid: 3D Canvas on Left, Controls on Right */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 3D Viewer (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Table3DViewer
            tableSize={selectedSize.key}
            feltColor={selectedFelt.hex}
            woodColor={selectedWood.hex}
            hardwareColor={selectedHardware.hex}
            coinOp={coinOp}
            onSnapshotReady={(data) => setSnapshotUrl(data)}
          />

          {/* Quick Specs Callout */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <div className="text-[11px] text-zinc-500 font-mono">FRAME SIZE</div>
              <div className="text-sm font-semibold text-white mt-0.5">{selectedSize.dims}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <div className="text-[11px] text-zinc-500 font-mono">SLATE BED</div>
              <div className="text-sm font-semibold text-white mt-0.5">19mm Italian 1-Piece</div>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <div className="text-[11px] text-zinc-500 font-mono">MANUFACTURE</div>
              <div className="text-sm font-semibold text-emerald-400 mt-0.5">4–6 Weeks</div>
            </div>
          </div>
        </div>

        {/* Right Column: Customization Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Size Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              1. Table Size & Playfield
            </label>
            <div className="grid grid-cols-1 gap-2">
              {SIZES.map((size) => {
                const isSelected = selectedSize.key === size.key;
                return (
                  <button
                    key={size.key}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-950/20 text-white'
                        : 'border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm flex items-center gap-2">
                        {size.name}
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5">
                        {size.dims} • <span className="text-zinc-400">{size.room}</span>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-white font-mono">
                      {formatZar(size.price)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Felt Color */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              2. Tournament Felt Cloth ({selectedFelt.name})
            </label>
            <div className="grid grid-cols-5 gap-2.5">
              {FELT_COLORS.map((felt) => {
                const isSelected = selectedFelt.hex === felt.hex;
                return (
                  <button
                    key={felt.hex}
                    type="button"
                    onClick={() => setSelectedFelt(felt)}
                    className={`group relative flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-emerald-500 bg-zinc-900'
                        : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
                    }`}
                  >
                    <span
                      className="w-8 h-8 rounded-full shadow-inner border border-white/20 block"
                      style={{ backgroundColor: felt.hex }}
                    />
                    <span className="text-[10px] text-zinc-300 text-center truncate max-w-full font-medium">
                      {felt.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Wood / Body Finish */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              3. Hardwood Cabinet Finish ({selectedWood.name})
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {WOOD_FINISHES.map((wood) => {
                const isSelected = selectedWood.name === wood.name;
                return (
                  <button
                    key={wood.name}
                    type="button"
                    onClick={() => setSelectedWood(wood)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-950/20 text-white'
                        : 'border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: wood.hex }}
                    />
                    <div className="truncate">
                      <div className="text-xs font-medium text-white truncate">{wood.name}</div>
                      <div className="text-[10px] text-zinc-500 font-mono">
                        {wood.surcharge > 0 ? `+${formatZar(wood.surcharge)}` : 'Standard'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Hardware & Pocket Trim */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              4. Corner Castings & Trim ({selectedHardware.name})
            </label>
            <div className="grid grid-cols-3 gap-2">
              {HARDWARE_FINISHES.map((hw) => {
                const isSelected = selectedHardware.name === hw.name;
                return (
                  <button
                    key={hw.name}
                    type="button"
                    onClick={() => setSelectedHardware(hw)}
                    className={`flex items-center justify-center gap-2 p-2 rounded-xl border text-xs font-medium transition-all ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-950/20 text-white'
                        : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-white/20"
                      style={{ backgroundColor: hw.hex }}
                    />
                    {hw.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Extras: Coin-Op & Custom Vinyl */}
          <div className="space-y-2 pt-2 border-t border-zinc-800">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              5. Mechanical & Commercial Options
            </label>
            <div className="grid grid-cols-1 gap-2">
              <label className="flex items-center justify-between p-3 rounded-xl border border-zinc-800 bg-zinc-900/40 cursor-pointer hover:border-zinc-700 transition-colors">
                <div>
                  <div className="text-xs font-semibold text-white">Commercial Coin-Op Mechanism</div>
                  <div className="text-[11px] text-zinc-500">ZAR calibrated coin drop + ball return drawer</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-zinc-300 font-bold">+R 3,500</span>
                  <input
                    type="checkbox"
                    checked={coinOp}
                    onChange={(e) => setCoinOp(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-zinc-950 border-zinc-700"
                  />
                </div>
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-zinc-800 bg-zinc-900/40 cursor-pointer hover:border-zinc-700 transition-colors">
                <div>
                  <div className="text-xs font-semibold text-white">Custom Side Vinyl Branding</div>
                  <div className="text-[11px] text-zinc-500">High-res venue logo or custom artwork wrapped on sides</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-zinc-300 font-bold">+R 2,800</span>
                  <input
                    type="checkbox"
                    checked={hasCustomWrap}
                    onChange={(e) => setHasCustomWrap(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-zinc-950 border-zinc-700"
                  />
                </div>
              </label>
            </div>
          </div>

          {/* Pricing & Checkout Action Card */}
          <div className="p-5 rounded-2xl border border-emerald-800/40 bg-gradient-to-b from-zinc-900 to-zinc-950 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Base ({selectedSize.name}):</span>
                <span className="font-mono">{formatZar(basePrice)}</span>
              </div>
              {woodSurcharge > 0 && (
                <div className="flex justify-between text-zinc-400">
                  <span>{selectedWood.name} Hardwood:</span>
                  <span className="font-mono">+{formatZar(woodSurcharge)}</span>
                </div>
              )}
              {coinOp && (
                <div className="flex justify-between text-zinc-400">
                  <span>Coin-Op Mechanism:</span>
                  <span className="font-mono">+{formatZar(coinOpPrice)}</span>
                </div>
              )}
              {hasCustomWrap && (
                <div className="flex justify-between text-zinc-400">
                  <span>Custom Vinyl Graphics:</span>
                  <span className="font-mono">+{formatZar(wrapPrice)}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-2 border-t border-zinc-800 text-white">
                <span className="font-bold text-sm">Quoted Total:</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  {formatZar(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-zinc-500">
                <span>50% Manufacturing Deposit:</span>
                <span className="font-mono text-zinc-400">{formatZar(depositPrice)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleProceed}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md shadow-emerald-950 transition-all flex items-center justify-center gap-2"
            >
              Confirm Spec & Check Ingress Walkway
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
