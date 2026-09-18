'use client';

import React, { useState } from 'react';
import { formatZar } from '@m-games/ui';
import { SlidersHorizontal, Check, Save, Sparkles, RefreshCw } from 'lucide-react';

export default function CatalogControlsPage() {
  const [feltAvailability, setFeltAvailability] = useState<Record<string, boolean>>({
    'Speed Green': true,
    'Burgundy': true,
    'Electric Blue': true,
    'Slate Grey': false, // temporarily out of stock
    'Plum Royal': true,
  });

  const [leaseRates, setLeaseRates] = useState({
    monthToMonth: 2800,
    threeMonths: 2500,
    sixMonths: 2200,
    twelveMonths: 1950,
  });

  const [depositPct, setDepositPct] = useState(50);
  const [saved, setSaved] = useState(false);

  const toggleFelt = (name: string) => {
    setFeltAvailability((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-4 space-y-5">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Catalog & Price Controls</h1>
        <p className="text-xs text-zinc-400">Live workshop inventory toggles & leasing rates</p>
      </div>

      {/* 1. Felt Cloth Availability */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
            Felt Inventory Availability
          </span>
          <span className="text-[10px] text-zinc-500 font-mono">Real-time sync</span>
        </div>

        <div className="space-y-2">
          {Object.entries(feltAvailability).map(([name, inStock]) => (
            <div
              key={name}
              className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs"
            >
              <span className="text-white font-medium">{name} Wool</span>
              <button
                type="button"
                onClick={() => toggleFelt(name)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  inStock
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-800 text-zinc-500 line-through'
                }`}
              >
                {inStock ? 'In Stock' : 'Unavailable'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Commercial Lease Tier Pricing */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
          Commercial B2B Monthly Lease Tiers (ZAR)
        </span>

        <div className="space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Month-to-Month:</span>
            <input
              type="number"
              value={leaseRates.monthToMonth}
              onChange={(e) =>
                setLeaseRates({ ...leaseRates, monthToMonth: parseInt(e.target.value) || 0 })
              }
              className="w-28 bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-right font-mono text-white"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-400">3-Month Term:</span>
            <input
              type="number"
              value={leaseRates.threeMonths}
              onChange={(e) =>
                setLeaseRates({ ...leaseRates, threeMonths: parseInt(e.target.value) || 0 })
              }
              className="w-28 bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-right font-mono text-white"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-400">6-Month Term (Standard):</span>
            <input
              type="number"
              value={leaseRates.sixMonths}
              onChange={(e) =>
                setLeaseRates({ ...leaseRates, sixMonths: parseInt(e.target.value) || 0 })
              }
              className="w-28 bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-right font-mono text-emerald-400 font-bold"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-400">12-Month Contract:</span>
            <input
              type="number"
              value={leaseRates.twelveMonths}
              onChange={(e) =>
                setLeaseRates({ ...leaseRates, twelveMonths: parseInt(e.target.value) || 0 })
              }
              className="w-28 bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-right font-mono text-white"
            />
          </div>
        </div>
      </div>

      {/* 3. Base Deposit Percentage */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold uppercase tracking-wider text-zinc-300">
            Manufacturing Deposit Requirement
          </span>
          <span className="font-mono text-emerald-400 font-bold">{depositPct}%</span>
        </div>
        <input
          type="range"
          min="30"
          max="80"
          step="5"
          value={depositPct}
          onChange={(e) => setDepositPct(parseInt(e.target.value))}
          className="w-full accent-emerald-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-zinc-500">
          <span>30% Flex</span>
          <span>50% Standard</span>
          <span>80% Heavy Custom</span>
        </div>
      </div>

      {/* Save Button */}
      <button
        type="button"
        onClick={handleSave}
        className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
      >
        {saved ? (
          <>
            <Check className="w-4 h-4" />
            Config Saved & Synchronized
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            Update Storefront Pricing & Inventory
          </>
        )}
      </button>
    </div>
  );
}
