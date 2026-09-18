'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { orderStore, OrderWithRelations } from '@m-games/database';
import { OrderPreviewModal } from '@m-games/ui';
import {
  Video,
  Layers,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  Ruler,
  CheckCircle,
  Truck,
  HardHat,
  Eye,
  CheckCircle2,
  Users,
  MapPin,
  Clock,
  ExternalLink,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react';

export default function JobMissionPackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [job, setJob] = useState<OrderWithRelations | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [riggingSteps, setRiggingSteps] = useState([
    { id: 'step-1', label: 'Offload slate bed from truck tail-lift via pneumatic dolly', checked: true },
    { id: 'step-2', label: 'Attach heavy piano lifting straps & verify 4-man grip balance', checked: true },
    { id: 'step-3', label: 'Transit narrow doorway vertical tilt (92cm door clearance)', checked: false },
    { id: 'step-4', label: 'Assemble hardwood frame and calibrate initial leg levelers', checked: false },
    { id: 'step-5', label: 'Mount 1-piece Italian slate bed & align precision dowels', checked: false },
  ]);

  useEffect(() => {
    const found = orderStore.getById(resolvedParams.id);
    if (found) setJob(found);
  }, [resolvedParams.id]);

  if (!job) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-zinc-400 space-y-3">
        <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-mono">Loading mission pack dossier...</p>
      </div>
    );
  }

  const cfg = job.configuration;
  const audit = job.siteAudit;

  const toggleRiggingStep = (id: string) => {
    setRiggingSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Back Link & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Active Field Job Board</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPreviewModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-amber-500/60 text-zinc-200 hover:text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Preview Complete Build</span>
          </button>
        </div>
      </div>

      {/* Top Mission Dossier Banner */}
      <div className="p-6 rounded-3xl border border-zinc-800/90 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
                MISSION DOSSIER • {job.orderNumber}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full font-mono text-xs font-semibold border ${
                  job.status === 'INSTALLED_ACTIVE'
                    ? 'bg-emerald-950 border-emerald-500/40 text-emerald-300'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                }`}
              >
                {job.status.replace(/_/g, ' ')}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">
              {job.user.companyName || job.user.name}
            </h1>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 mt-1 flex-wrap">
              <span className="flex items-center gap-1 text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {audit?.deliveryAddress}, {audit?.deliveryCity} ({audit?.postalCode})
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-amber-400 font-mono font-medium">
                {cfg?.tableSize.replace(/_/g, ' ')} ({cfg?.bodyColorFinish})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-right">
              <div className="text-[10px] uppercase font-mono text-zinc-500">ASSIGNED RIG</div>
              <div className="text-sm font-bold text-amber-400">
                {audit?.crewRecommended || 2}-Man Crew
              </div>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-right">
              <div className="text-[10px] uppercase font-mono text-zinc-500">SLATE WEIGHT</div>
              <div className="text-sm font-bold text-white">
                {cfg?.tableSize === 'EIGHT_FOOT_PRO' ? '340 kg' : '285 kg'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: 2-Column Responsive Cockpit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Video Inspection & Rigging Checklist (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Walkway Ingress Video Card */}
          <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/80 p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-emerald-400" />
                <h2 className="text-base font-bold text-white tracking-tight">
                  Walkway Ingress Video & Stair Ascent Audit
                </h2>
              </div>
              <span className="text-[11px] font-mono text-zinc-400 bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded-lg">
                HD Pre-Check
              </span>
            </div>

            {audit?.ingressVideoUrl ? (
              <div className="rounded-2xl overflow-hidden bg-black aspect-video border border-zinc-800 shadow-inner">
                <video src={audit.ingressVideoUrl} controls className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-zinc-950 border border-dashed border-zinc-800 text-center space-y-2">
                <Video className="w-8 h-8 text-zinc-700 mx-auto" />
                <p className="text-xs font-semibold text-zinc-300">Level Ground Ingress Approved</p>
                <p className="text-[11px] text-zinc-500">
                  Zero stairs and 110cm wide threshold. Owner verified ground-floor access.
                </p>
              </div>
            )}

            {/* Owner Hazard Directives Callout */}
            {audit?.videoReviewNotes && (
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/50 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>Owner Dispatch Cautionary Note:</span>
                </div>
                <p className="text-xs text-amber-200/90 leading-relaxed pl-5">
                  {audit.videoReviewNotes}
                </p>
              </div>
            )}

            {/* Door Clearance vs Slate Dimension Meter */}
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                Doorway Clearance Check
              </span>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">Door Opening Width:</span>
                  <span className="text-white font-bold">{audit?.doorwayWidthCm || 92} cm</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{
                      width: `${Math.min(100, (((audit?.doorwayWidthCm || 92) - 60) / 60) * 100)}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                  <span>Minimum Required: 76 cm (vertical slate carry)</span>
                  <span className="text-emerald-400 font-bold">
                    +{(audit?.doorwayWidthCm || 92) - 76} cm safety clearance
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tactical Rigging Handling Checklist */}
          <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/80 p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400" />
                Tactical Rigging Handling Checklist
              </span>
              <span className="text-xs font-mono text-amber-400 font-semibold">
                {riggingSteps.filter((s) => s.checked).length} / {riggingSteps.length} Complete
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {riggingSteps.map((step) => (
                <label
                  key={step.id}
                  className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                    step.checked
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-zinc-200'
                      : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                        step.checked ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      {step.checked ? '✓' : ''}
                    </span>
                    <span className={step.checked ? 'line-through text-zinc-400' : ''}>
                      {step.label}
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={step.checked}
                    onChange={() => toggleRiggingStep(step.id)}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Blueprint, Equipment Specs & Sign-Off CTA (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Room Blueprint & Wall Clearance Diagram */}
          <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/80 p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-bold text-white">Room Blueprint & Wall Clearance</h3>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded">
                1.45m Envelope
              </span>
            </div>

            {/* Blueprint Visual Rendering */}
            <div className="rounded-2xl bg-[#080d17] border border-sky-900/60 p-5 relative overflow-hidden flex flex-col items-center justify-center">
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              <div className="relative w-64 h-40 border-2 border-dashed border-sky-500/40 rounded-xl flex items-center justify-center p-3 bg-sky-950/10">
                <span className="absolute top-1.5 left-2.5 text-[9px] font-mono text-sky-400">
                  Room: 6.2m × 4.8m
                </span>

                {/* 1.45m Cue clearance zone */}
                <div className="relative w-48 h-28 border border-dashed border-emerald-400/80 bg-emerald-950/20 rounded-lg flex items-center justify-center">
                  <span className="absolute -top-2.5 text-[8px] font-mono text-emerald-400 bg-[#080d17] px-1">
                    1.45m North Clear
                  </span>
                  <span className="absolute -bottom-2.5 text-[8px] font-mono text-emerald-400 bg-[#080d17] px-1">
                    1.45m South Clear
                  </span>

                  {/* Table Bed */}
                  <div className="w-32 h-16 rounded bg-gradient-to-br from-emerald-800 to-emerald-950 border-2 border-emerald-400 flex flex-col items-center justify-center shadow-lg">
                    <span className="text-[10px] font-black text-white">
                      {cfg?.tableSize.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[8px] font-mono text-emerald-200">{cfg?.feltColor}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 text-[11px] text-zinc-400 font-mono text-center">
                Optimal Centered Placement • Unobstructed Play Zone
              </div>
            </div>

            {/* Quick Dimension Specs */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase font-mono block">DOORWAY</span>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  {audit?.doorwayWidthCm || 92} cm
                </span>
                <span className="text-[10px] text-emerald-400">Wide enough for flat slate</span>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase font-mono block">STAIR INCLINE</span>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  {audit?.isGroundFloor ? '0 (Ground)' : `${audit?.stairsCount} Steps`}
                </span>
                <span className="text-[10px] text-zinc-400">
                  {audit?.stairType || 'Standard stairwell'}
                </span>
              </div>
            </div>
          </div>

          {/* Equipment Specification Sheet */}
          <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/80 p-5 sm:p-6 space-y-3.5 shadow-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
              Equipment & Finish Specification
            </span>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-400">Body Finish:</span>
                <span className="text-white font-bold">{cfg?.bodyColorFinish}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-400">Cloth Cloth / Felt:</span>
                <span className="text-emerald-400 font-bold">{cfg?.feltColor}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-400">Hardware / Sights:</span>
                <span className="text-zinc-200 capitalize">{cfg?.hardwareFinish || 'Brass'}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-400">Coin-Op Cash Box:</span>
                <span className="text-amber-400 font-bold">
                  {cfg?.coinOpMechanic ? 'Yes (Mechanical Dual Drop)' : 'No (Free Play)'}
                </span>
              </div>
            </div>
          </div>

          {/* CTA: Start Digital Precision Leveling & Sign-Off */}
          <div className="pt-2">
            <Link
              href={`/jobs/${job.id}/signoff`}
              className="w-full py-4 px-5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs shadow-xl shadow-amber-950/50 transition-all flex items-center justify-center gap-2 group"
            >
              <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Start Machinist Spirit Level & Customer Sign-Off</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Shared Order Spec Modal */}
      {job && (
        <OrderPreviewModal
          order={job}
          isOpen={isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
        />
      )}
    </div>
  );
}
