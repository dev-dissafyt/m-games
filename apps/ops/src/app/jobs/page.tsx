'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { orderStore, OrderWithRelations } from '@m-games/database';
import {
  MapPin,
  Users,
  Navigation,
  ExternalLink,
  Clock,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';

export default function ActiveJobBoardPage() {
  const [jobs, setJobs] = useState<OrderWithRelations[]>([]);

  useEffect(() => {
    // Load jobs ready for dispatch, dispatched, or recently installed
    const all = orderStore.getAll();
    setJobs(all);
  }, []);

  return (
    <div className="max-w-md mx-auto px-4 py-4 space-y-4">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Today&apos;s Field Installations</h1>
        <p className="text-xs text-zinc-400">Assigned dispatch runs • Truck #2</p>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => {
          const cfg = job.configuration;
          const audit = job.siteAudit;
          const user = job.user;

          const addressQuery = encodeURIComponent(
            `${audit?.deliveryAddress || ''}, ${audit?.deliveryCity || ''}`
          );
          const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;
          const wazeUrl = `https://waze.com/ul?q=${addressQuery}`;

          return (
            <div
              key={job.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 space-y-3.5 shadow-sm"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-amber-950/70 border border-amber-800/60 text-amber-400 text-[10px] font-bold tracking-wider uppercase">
                      {job.status.replace(/_/g, ' ')}
                    </span>
                    <span className="font-mono text-xs text-zinc-400 font-semibold">
                      {job.orderNumber}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">
                    {user.companyName || user.name}
                  </h3>
                </div>

                <div className="text-right">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-xs font-bold text-white">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    {audit?.crewRecommended || 2}-Man Rig
                  </div>
                </div>
              </div>

              {/* Table details */}
              <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-xs space-y-1">
                <div className="text-zinc-300 font-medium">
                  {cfg?.tableSize.replace(/_/g, ' ')} • {cfg?.bodyColorFinish}
                </div>
                <div className="text-zinc-500 text-[11px]">
                  Felt: <span className="text-emerald-400">{cfg?.feltColor}</span> | Coin-Op:{' '}
                  {cfg?.coinOpMechanic ? 'Yes' : 'No'}
                </div>
                {audit?.requiresRiggingGear && (
                  <div className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold pt-1 border-t border-zinc-800/60">
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                    Gear: Piano straps & tracked stair trolley required
                  </div>
                )}
              </div>

              {/* Navigation One-Tap Links */}
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {audit?.deliveryAddress}, {audit?.deliveryCity}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={gmapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs text-center border border-zinc-700 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                    Google Maps
                  </a>
                  <a
                    href={wazeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs text-center border border-zinc-700 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                    Waze
                  </a>
                </div>
              </div>

              {/* Action: Open Mission Pack */}
              <Link
                href={`/jobs/${job.id}`}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md"
              >
                Open Site Mission Pack & Leveling Sign-Off
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
