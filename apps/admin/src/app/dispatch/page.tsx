'use client';

import React, { useState, useEffect } from 'react';
import { orderStore, OrderWithRelations } from '@m-games/database';
import {
  Truck,
  Video,
  CheckSquare,
  Users,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  MapPin,
} from 'lucide-react';

export default function DispatchAuditPage() {
  const [orders, setOrders] = useState<OrderWithRelations[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('');
  const [crewSize, setCrewSize] = useState<number>(2);
  const [gearPianoStraps, setGearPianoStraps] = useState(false);
  const [gearStairTrolley, setGearStairTrolley] = useState(false);
  const [gearShortCues, setGearShortCues] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    const list = orderStore.getAll();
    setOrders(list);
    if (list.length > 0) {
      const first = list[0];
      setSelectedOrderId(first.id);
      setCrewSize(first.siteAudit?.crewRecommended || 2);
      setGearPianoStraps(first.siteAudit?.requiresRiggingGear || false);
      setGearStairTrolley(first.siteAudit?.requiresRiggingGear || false);
      setReviewNotes(first.siteAudit?.videoReviewNotes || '');
    }
  }, []);

  const currentOrder = orders.find((o) => o.id === selectedOrderId);

  const handleSelectOrder = (id: string) => {
    setSelectedOrderId(id);
    setIsApproved(false);
    const ord = orders.find((o) => o.id === id);
    if (ord) {
      setCrewSize(ord.siteAudit?.crewRecommended || 2);
      setGearPianoStraps(ord.siteAudit?.requiresRiggingGear || false);
      setGearStairTrolley(ord.siteAudit?.requiresRiggingGear || false);
      setReviewNotes(ord.siteAudit?.videoReviewNotes || '');
    }
  };

  const handleApproveDispatch = () => {
    if (!currentOrder) return;
    orderStore.update(currentOrder.id, {
      status: 'READY_FOR_DISPATCH',
      siteAudit: currentOrder.siteAudit
        ? {
            ...currentOrder.siteAudit,
            crewRecommended: crewSize,
            requiresRiggingGear: gearPianoStraps || gearStairTrolley,
            videoReviewNotes: reviewNotes,
          }
        : null,
    });
    setOrders(orderStore.getAll());
    setIsApproved(true);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-4 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Logistics Ingress Audit</h1>
        <p className="text-xs text-zinc-400">Walkway video review & crew pre-flight dispatch</p>
      </div>

      {/* Order Selector Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {orders.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => handleSelectOrder(o.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono shrink-0 transition-colors ${
              o.id === selectedOrderId
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400'
            }`}
          >
            {o.orderNumber}
          </button>
        ))}
      </div>

      {currentOrder && (
        <div className="space-y-4">
          {/* Video Player Card */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-zinc-200 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-emerald-400" />
                Ingress Walk-Through Video
              </span>
              <span className="text-[10px] font-mono text-zinc-500">24fps • HD Audit</span>
            </div>

            {currentOrder.siteAudit?.ingressVideoUrl ? (
              <div className="rounded-xl overflow-hidden bg-black aspect-video border border-zinc-800">
                <video
                  src={currentOrder.siteAudit.ingressVideoUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl bg-zinc-950 border border-dashed border-zinc-800 p-8 text-center text-xs text-zinc-500">
                No video recorded yet for this client. Ground-floor verification accepted.
              </div>
            )}

            <div className="text-xs text-zinc-400 space-y-1 pt-1">
              <div className="flex justify-between">
                <span>Destination:</span>
                <span className="text-white font-medium truncate max-w-[200px]">
                  {currentOrder.siteAudit?.deliveryAddress}, {currentOrder.siteAudit?.deliveryCity}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Staircases:</span>
                <span className="text-white font-medium">
                  {currentOrder.siteAudit?.isGroundFloor
                    ? 'None (Level ground floor)'
                    : `${currentOrder.siteAudit?.stairsCount} steps (${currentOrder.siteAudit?.stairType})`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Narrowest Doorway:</span>
                <span className="text-white font-medium">
                  {currentOrder.siteAudit?.doorwayWidthCm} cm
                </span>
              </div>
            </div>
          </div>

          {/* Crew Sizing Switch */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                Crew Sizing Switch
              </span>
              <Users className="w-4 h-4 text-zinc-500" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCrewSize(2)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                  crewSize === 2
                    ? 'border-emerald-500 bg-emerald-950/40 text-white'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                }`}
              >
                2-Man Standard Crew
                <span className="block text-[10px] font-normal text-zinc-500 mt-0.5">
                  Ground floor / wide doors
                </span>
              </button>

              <button
                type="button"
                onClick={() => setCrewSize(4)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                  crewSize === 4
                    ? 'border-emerald-500 bg-emerald-950/40 text-white'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                }`}
              >
                4-Man Heavy Rig
                <span className="block text-[10px] font-normal text-zinc-500 mt-0.5">
                  Stair carry / tight corners
                </span>
              </button>
            </div>
          </div>

          {/* Rigging Gear Checklist */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
              Required Rigging Gear Checklist
            </span>

            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 cursor-pointer">
                <span>Heavy-Duty Piano Lifting Straps</span>
                <input
                  type="checkbox"
                  checked={gearPianoStraps}
                  onChange={(e) => setGearPianoStraps(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 bg-zinc-900 border-zinc-700"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 cursor-pointer">
                <span>Tracked Stair-Climbing Slate Trolley</span>
                <input
                  type="checkbox"
                  checked={gearStairTrolley}
                  onChange={(e) => setGearStairTrolley(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 bg-zinc-900 border-zinc-700"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 cursor-pointer">
                <span>Pack 48&quot; Short Cues (Restricted Wall Alert)</span>
                <input
                  type="checkbox"
                  checked={gearShortCues}
                  onChange={(e) => setGearShortCues(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 bg-zinc-900 border-zinc-700"
                />
              </label>
            </div>
          </div>

          {/* Owner Review Notes */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
              Owner Dispatch Notes for Technicians
            </label>
            <textarea
              rows={2}
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              placeholder="e.g. Low hanging chandelier in foyer at 0:08. Unload from rear lane."
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Approval CTA */}
          <div className="pt-1">
            {isApproved ? (
              <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center gap-2 text-xs font-bold text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Published to Field Ops Active Board!
              </div>
            ) : (
              <button
                type="button"
                onClick={handleApproveDispatch}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950 transition-all flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4" />
                Approve for Delivery & Push to Field Ops
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
