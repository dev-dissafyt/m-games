'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { orderStore, OrderWithRelations } from '@m-games/database';
import { OrderPreviewModal } from '@m-games/ui';
import {
  MapPin,
  Users,
  Navigation,
  ExternalLink,
  Clock,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Eye,
  Layers,
  Phone,
  Truck,
  HardHat,
  Sparkles,
  AlertTriangle,
  Scale,
} from 'lucide-react';

export default function ActiveJobBoardPage() {
  const [jobs, setJobs] = useState<OrderWithRelations[]>([]);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'READY' | 'ACTIVE' | 'INSTALLED'>('ALL');
  const [previewOrder, setPreviewOrder] = useState<OrderWithRelations | null>(null);

  useEffect(() => {
    const all = orderStore.getAll();
    setJobs(all);
  }, []);

  const filteredJobs = jobs.filter((job) => {
    if (statusFilter === 'READY') return job.status === 'READY_FOR_DISPATCH';
    if (statusFilter === 'ACTIVE') return job.status === 'DISPATCHED' || job.status === 'READY_FOR_DISPATCH';
    if (statusFilter === 'INSTALLED') return job.status === 'INSTALLED_ACTIVE';
    return true;
  });

  const totalSlateWeightKg = jobs.reduce((acc, j) => {
    return acc + (j.configuration?.tableSize === 'EIGHT_FOOT_PRO' ? 340 : 285);
  }, 0);

  const riggingAlertsCount = jobs.filter((j) => j.siteAudit?.requiresRiggingGear).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Field Manifest • Truck #2
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-xs text-zinc-400 font-mono">Western Cape Metro Route</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 flex items-center gap-3">
            Today&apos;s Field Installations & Rigging Manifest
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Assigned dispatch runs, doorway clearance audits, walkway video inspections, and digital machinist leveling sign-offs.
          </p>
        </div>

        {/* Lead Tech Badge */}
        <div className="flex items-center gap-3 self-start md:self-auto bg-zinc-900/90 border border-zinc-800 p-3 rounded-2xl shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <HardHat className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Lead Rigging Tech</div>
            <div className="text-xs text-amber-300 font-mono">Sipho Ndlovu • Crew of 4</div>
          </div>
        </div>
      </div>

      {/* Tactical KPI Stats Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 shadow-sm space-y-1">
          <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            Scheduled Stops
          </span>
          <div className="text-2xl font-black text-white">{jobs.length} Runs</div>
          <p className="text-[11px] text-zinc-500">Kalk Bay • De Waterkant • Constantia</p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 shadow-sm space-y-1">
          <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-sky-400" />
            Total Slate Payload
          </span>
          <div className="text-2xl font-black text-sky-400">{totalSlateWeightKg} kg</div>
          <p className="text-[11px] text-zinc-500">Diamond-honed Italian slate slabs</p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 shadow-sm space-y-1">
          <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            Rigging Gear Alerts
          </span>
          <div className="text-2xl font-black text-rose-400">{riggingAlertsCount} Stops</div>
          <p className="text-[11px] text-zinc-500">Stair crawler & piano straps loaded</p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 shadow-sm space-y-1">
          <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Certified Signed-Off
          </span>
          <div className="text-2xl font-black text-emerald-400">
            {jobs.filter((j) => j.status === 'INSTALLED_ACTIVE').length} Done
          </div>
          <p className="text-[11px] text-zinc-500">0.00° Precision certificates generated</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {(
          [
            { key: 'ALL', label: `All Stops (${jobs.length})` },
            {
              key: 'READY',
              label: `Ready For Dispatch (${jobs.filter((j) => j.status === 'READY_FOR_DISPATCH').length})`,
            },
            {
              key: 'INSTALLED',
              label: `Installed & Certified (${jobs.filter((j) => j.status === 'INSTALLED_ACTIVE').length})`,
            },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setStatusFilter(tab.key)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              statusFilter === tab.key
                ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-950/40'
                : 'bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Responsive Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredJobs.map((job) => {
          const cfg = job.configuration;
          const audit = job.siteAudit;
          const user = job.user;

          const addressQuery = encodeURIComponent(
            `${audit?.deliveryAddress || ''}, ${audit?.deliveryCity || ''}`
          );
          const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;
          const wazeUrl = `https://waze.com/ul?q=${addressQuery}`;

          const isHeavy = (audit?.stairsCount || 0) > 0 || (audit?.crewRecommended || 2) >= 4;

          return (
            <div
              key={job.id}
              className="rounded-3xl border border-zinc-800/90 bg-zinc-900/80 p-5 sm:p-6 space-y-4 shadow-xl hover:border-zinc-700/80 transition-all flex flex-col justify-between group relative overflow-hidden backdrop-blur-sm"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${
                          job.status === 'INSTALLED_ACTIVE'
                            ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                            : job.status === 'READY_FOR_DISPATCH'
                            ? 'bg-amber-950/80 border-amber-500/40 text-amber-300'
                            : 'bg-sky-950/80 border-sky-500/40 text-sky-300'
                        }`}
                      >
                        {job.status.replace(/_/g, ' ')}
                      </span>
                      <span className="font-mono text-xs text-zinc-400 font-semibold">
                        {job.orderNumber}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mt-1.5 group-hover:text-amber-300 transition-colors">
                      {user.companyName || user.name}
                    </h3>
                  </div>

                  <div className="shrink-0">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border ${
                        isHeavy
                          ? 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-200'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      {audit?.crewRecommended || 2}-Man Rig
                    </span>
                  </div>
                </div>

                {/* Visual Equipment & Specification Card */}
                <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-200">
                      {cfg?.tableSize.replace(/_/g, ' ')}
                    </span>
                    <span className="font-mono text-[11px] text-zinc-400">{cfg?.generatedSku}</span>
                  </div>

                  {/* Swatches Pill Ribbon */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    <span className="px-2 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-700" />
                      {cfg?.bodyColorFinish}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 flex items-center gap-1">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor:
                            cfg?.feltColor === 'Speed Green'
                              ? '#10b981'
                              : cfg?.feltColor === 'Electric Blue'
                              ? '#3b82f6'
                              : cfg?.feltColor === 'Burgundy'
                              ? '#881337'
                              : '#475569',
                        }}
                      />
                      {cfg?.feltColor} Felt
                    </span>
                    {cfg?.coinOpMechanic && (
                      <span className="px-2 py-0.5 rounded-lg bg-amber-950/60 border border-amber-500/30 text-[11px] text-amber-300 font-bold">
                        Coin-Op
                      </span>
                    )}
                  </div>

                  {/* Rigging Equipment Alert */}
                  {audit?.requiresRiggingGear && (
                    <div className="flex items-center gap-1.5 text-[11px] text-rose-300 font-semibold pt-1.5 border-t border-zinc-800/80">
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>Tracked stair trolley & piano straps mandatory</span>
                    </div>
                  )}
                </div>

                {/* Location & Access Summary */}
                <div className="space-y-2 text-xs text-zinc-400">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-zinc-300 leading-snug">
                      {audit?.deliveryAddress}, {audit?.deliveryCity} ({audit?.postalCode})
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-zinc-400 pt-1">
                    <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800/80">
                      <span className="text-zinc-500 block text-[10px]">DOOR OPENING</span>
                      <strong className="text-white text-xs">{audit?.doorwayWidthCm || 90} cm</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800/80">
                      <span className="text-zinc-500 block text-[10px]">STAIR INCLINE</span>
                      <strong className="text-white text-xs">
                        {audit?.isGroundFloor ? 'Ground (0)' : `${audit?.stairsCount} Steps`}
                      </strong>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={gmapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 px-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs text-center border border-zinc-700 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                      Google Maps
                    </a>
                    <a
                      href={wazeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 px-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs text-center border border-zinc-700 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                      Waze
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                {/* One-Click Preview Button */}
                <button
                  type="button"
                  onClick={() => setPreviewOrder(job)}
                  className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold text-xs border border-zinc-700/80 flex items-center justify-center gap-2 transition-all"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  Quick Preview Build & Blueprint Spec
                </button>

                {/* Primary Mission Pack Link */}
                <Link
                  href={`/jobs/${job.id}`}
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-lg shadow-amber-950/40 transition-all flex items-center justify-center gap-2"
                >
                  <span>Open Site Mission Pack & Leveling Sign-Off</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Shared Order Spec Modal */}
      {previewOrder && (
        <OrderPreviewModal
          order={previewOrder}
          isOpen={!!previewOrder}
          onClose={() => setPreviewOrder(null)}
        />
      )}
    </div>
  );
}
