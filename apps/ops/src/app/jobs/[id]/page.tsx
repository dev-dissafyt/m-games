'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { orderStore, OrderWithRelations } from '@m-games/database';
import {
  Video,
  Layers,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  Ruler,
  CheckCircle,
} from 'lucide-react';

export default function JobMissionPackPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [job, setJob] = useState<OrderWithRelations | null>(null);

  useEffect(() => {
    const found = orderStore.getById(resolvedParams.id);
    if (found) setJob(found);
  }, [resolvedParams.id]);

  if (!job) {
    return (
      <div className="max-w-md mx-auto p-6 text-center text-zinc-400">
        Loading mission pack...
      </div>
    );
  }

  const cfg = job.configuration;
  const audit = job.siteAudit;

  return (
    <div className="max-w-md mx-auto px-4 py-4 space-y-4">
      {/* Back button */}
      <Link
        href="/jobs"
        className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Job Board
      </Link>

      <div>
        <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest">
          MISSION PACK: {job.orderNumber}
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">
          {job.user.companyName || job.user.name}
        </h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          {audit?.deliveryAddress}, {audit?.deliveryCity}
        </p>
      </div>

      {/* 1. Walkway Ingress Video Preview */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-white flex items-center gap-1.5">
            <Video className="w-4 h-4 text-emerald-400" />
            Ingress Walkway Video Pre-Check
          </span>
          <span className="text-[10px] text-zinc-500 font-mono">Replay stairs</span>
        </div>

        {audit?.ingressVideoUrl ? (
          <div className="rounded-xl overflow-hidden bg-black aspect-video border border-zinc-800">
            <video src={audit.ingressVideoUrl} controls className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 text-center text-xs text-zinc-500">
            No video recorded. Visual check from driveway confirmed by owner.
          </div>
        )}

        {audit?.videoReviewNotes && (
          <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/40 text-xs text-amber-200">
            <strong>Owner Warning:</strong> {audit.videoReviewNotes}
          </div>
        )}
      </div>

      {/* 2. Room Blueprint & Placement Diagram */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-white flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-sky-400" />
            Room Blueprint & Wall Clearance
          </span>
          <span className="text-[10px] text-zinc-500 font-mono">1.45m Envelope</span>
        </div>

        {/* Blueprint Visual Mock */}
        <div className="relative rounded-xl bg-[#090d16] border border-sky-900/50 p-6 text-center overflow-hidden">
          <div className="w-40 h-24 mx-auto rounded-lg border-2 border-dashed border-emerald-500/80 bg-emerald-950/20 flex flex-col items-center justify-center relative">
            <div className="w-24 h-12 rounded bg-zinc-800 border border-zinc-600 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">{cfg?.tableSize.replace(/_/g, ' ')}</span>
            </div>
            <span className="absolute -top-3 text-[9px] font-mono text-emerald-400 bg-[#090d16] px-1">
              1.45m Cue Clear
            </span>
            <span className="absolute -bottom-3 text-[9px] font-mono text-emerald-400 bg-[#090d16] px-1">
              1.45m Cue Clear
            </span>
          </div>

          <div className="mt-3 text-[11px] text-zinc-400 font-mono">
            Room Size: 6.2m × 4.8m • Centered Placement
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="text-[10px] text-zinc-500">DOOR OPENING</div>
            <div className="text-sm font-bold text-white mt-0.5">{audit?.doorwayWidthCm || 90} cm</div>
          </div>
          <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="text-[10px] text-zinc-500">STAIR CARRY</div>
            <div className="text-sm font-bold text-white mt-0.5">
              {audit?.isGroundFloor ? 'Zero (Ground)' : `${audit?.stairsCount} Steps`}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Action: Proceed to Digital Leveling Cert */}
      <div className="pt-2">
        <Link
          href={`/jobs/${job.id}/signoff`}
          className="w-full py-4 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950 transition-all flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-4 h-4" />
          Start Digital Leveling & Customer Sign-Off
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
