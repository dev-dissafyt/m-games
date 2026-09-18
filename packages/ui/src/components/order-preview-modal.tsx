'use client';

import React from 'react';
import { X, ExternalLink, Ruler, MapPin, Shield, Layers, Users, Phone, Video, CheckCircle2 } from 'lucide-react';
import { formatZar } from '../lib/utils';

export interface OrderPreviewModalProps {
  order: any;
  isOpen: boolean;
  onClose: () => void;
  onApproveDispatch?: (orderId: string) => void;
}

export function OrderPreviewModal({
  order,
  isOpen,
  onClose,
  onApproveDispatch,
}: OrderPreviewModalProps) {
  if (!isOpen || !order) return null;

  const cfg = order.configuration;
  const audit = order.siteAudit;
  const user = order.user;
  const lease = order.rentalAgreement;

  // Swatch colors
  const FELT_HEX_MAP: Record<string, string> = {
    'Speed Green': '#115e2e',
    'Burgundy': '#660b1d',
    'Electric Blue': '#0a4291',
    'Slate Grey': '#2e3740',
    'Plum': '#441447',
    'Plum Royal': '#441447',
  };

  const WOOD_HEX_MAP: Record<string, string> = {
    'Kiaat Natural Oil': '#8c5828',
    'Wild Kiaat': '#8c5828',
    'Solid Walnut': '#4d321d',
    'African Mahogany': '#5a2318',
    'Matte Black Steel': '#18181b',
    'White Lacquer': '#d4d4d8',
  };

  const feltBg = (cfg && FELT_HEX_MAP[cfg.feltColor]) || '#115e2e';
  const woodBorder = (cfg && WOOD_HEX_MAP[cfg.bodyColorFinish]) || '#8c5828';
  const tableDims = cfg?.tableSize === 'SEVEN_FOOT_PUB'
    ? { l: '2.14m', w: '1.22m', room: '5.14m × 4.22m', weight: '310 kg', name: '7ft Pub Classic' }
    : cfg?.tableSize === 'EIGHT_FOOT_PRO'
    ? { l: '2.44m', w: '1.32m', room: '5.44m × 4.32m', weight: '380 kg', name: '8ft Pro Tournament' }
    : { l: '3.85m', w: '2.05m', room: '6.85m × 5.05m', weight: '1,100 kg', name: '12ft Snooker Estate' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#090b10] border border-zinc-800 shadow-2xl text-zinc-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#06080d]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
                SPEC PREVIEW • {order.orderNumber}
              </span>
              <h2 className="text-base font-bold text-white leading-tight">
                {user.companyName || user.name}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* 1. VISUAL 2D TABLE RENDER MOCKUP */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
              <span className="uppercase font-semibold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                Rendered Table Blueprint & Materials
              </span>
              <span className="text-emerald-400 font-bold">{tableDims.name}</span>
            </div>

            <div className="relative rounded-2xl bg-[#030407] border border-zinc-800 p-6 flex flex-col items-center justify-center overflow-hidden">
              {/* Cue clearance perimeter indicator */}
              <div className="absolute inset-2 rounded-xl border border-dashed border-cyan-500/20 pointer-events-none flex items-start justify-end p-2">
                <span className="text-[9px] font-mono text-cyan-400/60 uppercase">1.45m Cue Safe Envelope</span>
              </div>

              {/* Top-down Pool Table Simulation */}
              <div
                className="relative rounded-xl p-3 shadow-2xl transition-all flex flex-col justify-between"
                style={{
                  width: cfg?.tableSize === 'TWELVE_FOOT_SNOOKER' ? '380px' : '290px',
                  height: cfg?.tableSize === 'TWELVE_FOOT_SNOOKER' ? '200px' : '160px',
                  backgroundColor: woodBorder,
                  border: '4px solid #1c1917',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.2)',
                }}
              >
                {/* Brass / Chrome Corner Castings */}
                <div className="absolute -top-1 -left-1 w-4 h-4 rounded-tl bg-amber-400/80 border border-amber-300" />
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-tr bg-amber-400/80 border border-amber-300" />
                <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-bl bg-amber-400/80 border border-amber-300" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-br bg-amber-400/80 border border-amber-300" />

                {/* Felt Bed Area */}
                <div
                  className="w-full h-full rounded-lg relative overflow-hidden flex items-center justify-center"
                  style={{
                    backgroundColor: feltBg,
                    boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.6)',
                  }}
                >
                  {/* Pocket Holes */}
                  <div className="absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-black" />
                  <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-black" />
                  <div className="absolute bottom-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-black" />
                  <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-black" />
                  <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-3.5 h-2.5 rounded-b-full bg-black" />
                  <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3.5 h-2.5 rounded-t-full bg-black" />

                  {/* Baulk line & D for English tables */}
                  <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-white/25" />
                  <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-sm" />

                  {/* Racked 15-Ball Triangle & Cue Ball */}
                  <div className="flex flex-col items-center gap-0.5 pl-12">
                    <div className="flex gap-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    </div>
                    <div className="flex gap-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    </div>
                    <div className="flex gap-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                      <span className="w-1.5 h-1.5 rounded-full bg-black" />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    </div>
                  </div>

                  {/* Coin Op indicator badge */}
                  {cfg?.coinOpMechanic && (
                    <div className="absolute bottom-1 right-2 px-1.5 py-0.5 rounded bg-black/70 text-[8px] font-mono text-emerald-400 font-bold border border-emerald-500/40">
                      COIN-OP ZAR
                    </div>
                  )}
                </div>
              </div>

              {/* Swatch chips below visual */}
              <div className="flex items-center gap-4 mt-4 text-[11px] font-mono text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full border border-white/40" style={{ backgroundColor: feltBg }} />
                  <span>Felt: <strong className="text-white">{cfg?.feltColor || 'Speed Green'}</strong></span>
                </div>
                <span className="text-zinc-700">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full border border-white/40" style={{ backgroundColor: woodBorder }} />
                  <span>Cabinet: <strong className="text-white">{cfg?.bodyColorFinish || 'Kiaat'}</strong></span>
                </div>
                <span className="text-zinc-700">•</span>
                <span>Hardware: <strong className="text-white uppercase">{cfg?.hardwareFinish || 'Brass'}</strong></span>
              </div>
            </div>
          </div>

          {/* 2. SPECIFICATION & CLEARANCE METRICS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase">Table Footprint</span>
              <div className="text-white font-bold">{tableDims.l} × {tableDims.w}</div>
            </div>
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase">Room Required</span>
              <div className="text-cyan-400 font-bold">{tableDims.room}</div>
            </div>
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase">Italian Slate Mass</span>
              <div className="text-white font-bold">{tableDims.weight}</div>
            </div>
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase">Generated SKU</span>
              <div className="text-zinc-300 font-bold text-[10px] truncate">{cfg?.generatedSku}</div>
            </div>
          </div>

          {/* 3. SITE INGRESS & STAIRWAY AUDIT */}
          <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-400" />
                Logistics & Walkway Ingress Dossier
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                {audit?.crewRecommended || 2}-Man Crew Rig Recommended
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-[#090b10] border border-zinc-800/80">
                <div className="text-zinc-500 text-[10px]">DELIVERY ADDRESS</div>
                <div className="text-white font-semibold mt-0.5 truncate">
                  {audit?.deliveryAddress}, {audit?.deliveryCity}
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#090b10] border border-zinc-800/80">
                <div className="text-zinc-500 text-[10px]">STAIRWAY HAZARD</div>
                <div className="text-amber-400 font-semibold mt-0.5">
                  {audit?.stairsCount ? `${audit.stairsCount} Steps (${audit.stairType || 'straight'})` : 'Ground Floor / No Stairs'}
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#090b10] border border-zinc-800/80">
                <div className="text-zinc-500 text-[10px]">MIN DOORWAY WIDTH</div>
                <div className="text-cyan-400 font-semibold mt-0.5">
                  {audit?.doorwayWidthCm ? `${audit.doorwayWidthCm} cm Clearance` : 'Standard Entrance'}
                </div>
              </div>
            </div>

            {audit?.videoReviewNotes && (
              <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/50 text-xs text-amber-200">
                <strong>Ingress Warning Note:</strong> {audit.videoReviewNotes}
              </div>
            )}
          </div>

          {/* 4. FINANCIAL SUMMARY */}
          <div className="p-4 rounded-2xl bg-[#06080d] border border-zinc-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">
                {order.type === 'RENTAL_COMMERCIAL' ? 'Commercial Lease Rate' : 'Total Commission Price'}
              </span>
              <div className="text-xl font-black text-white font-mono">
                {order.type === 'RENTAL_COMMERCIAL' && lease?.monthlyRateZar
                  ? `${formatZar(lease.monthlyRateZar)} / month`
                  : formatZar(order.quotedTotalZar)}
              </div>
            </div>

            <div className="text-right space-y-0.5">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Deposit Status</span>
              <div className="text-xs font-mono font-bold">
                {order.depositPaidAt ? (
                  <span className="text-emerald-400 flex items-center gap-1 justify-end">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Deposit Paid
                  </span>
                ) : (
                  <span className="text-amber-400">R {order.depositRequiredZar} Pending</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-[#06080d] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              href={`http://localhost:3000/configurator?size=${cfg?.tableSize || 'SEVEN_FOOT_PUB'}`}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 text-xs font-mono text-cyan-400 flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open in 3D Atelier
            </a>
            <a
              href="http://localhost:3000/commercial/planner"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-pink-500/50 text-xs font-mono text-pink-400 flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open in 2D Planner
            </a>
          </div>

          <div className="flex items-center gap-2">
            {onApproveDispatch && order.status !== 'READY_FOR_DISPATCH' && (
              <button
                type="button"
                onClick={() => {
                  onApproveDispatch(order.id);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs shadow-md transition-all active:scale-95"
              >
                Approve for Dispatch →
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
