'use client';

import React, { useState, useEffect, useRef } from 'react';
import { orderStore, OrderWithRelations } from '@m-games/database';
import { OrderPreviewModal } from '@m-games/ui';
import {
  Truck,
  Video,
  CheckSquare,
  Users,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Eye,
  Play,
  Pause,
  Clock,
  AlertTriangle,
  Ruler,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
  Scale,
  Maximize2,
  Flame,
} from 'lucide-react';

interface HazardPin {
  timeSeconds: number;
  timeLabel: string;
  title: string;
  severity: 'low' | 'medium' | 'critical';
  detail: string;
  protocol: string;
}

const ORDER_HAZARD_MAP: Record<string, HazardPin[]> = {
  'ord-brass-bell-01': [
    {
      timeSeconds: 4,
      timeLabel: '00:04',
      title: 'Harbour Gate & Cobblestone Incline',
      severity: 'low',
      detail: 'Slight incline from parking bay to main deck threshold.',
      protocol: 'Use pneumatic tire slate dolly to prevent slate shock.',
    },
    {
      timeSeconds: 12,
      timeLabel: '00:12',
      title: '14-Step Exterior Stone Stairwell',
      severity: 'critical',
      detail: '14 uneven granite steps with stone balustrade. Heavy 290kg Italian slate payload.',
      protocol: 'MANDATORY: 4-Man Rig + Tracked Stair-Climbing Slate Trolley.',
    },
    {
      timeSeconds: 23,
      timeLabel: '00:23',
      title: '90° Deck Landing Pivot',
      severity: 'medium',
      detail: 'Narrow 92cm landing before sea-facing interior doorway.',
      protocol: 'Employ heavy-duty piano lifting straps. Protect frame corners with neoprene pads.',
    },
    {
      timeSeconds: 34,
      timeLabel: '00:34',
      title: 'Bar Saloon Entry & Flooring Transition',
      severity: 'low',
      detail: 'Solid timber floorboards. 6.2m × 4.8m designated play arena.',
      protocol: 'Confirm 1.45m cue envelope around central pillar with laser rangefinder.',
    },
  ],
};

const DEFAULT_HAZARDS: HazardPin[] = [
  {
    timeSeconds: 5,
    timeLabel: '00:05',
    title: 'Driveway Curb & Vehicle Offload Area',
    severity: 'low',
    detail: 'Level asphalt with direct tail-lift ramp deployment.',
    protocol: 'Standard 2-man offload procedure.',
  },
  {
    timeSeconds: 15,
    timeLabel: '00:15',
    title: 'Main Entrance Doorway Clearance',
    severity: 'medium',
    detail: 'Verifying door sweep and jamb clearance for one-piece slate slab.',
    protocol: 'Measure clearance with 90cm minimum threshold margin.',
  },
  {
    timeSeconds: 28,
    timeLabel: '00:28',
    title: 'Final Room Placement & Leveling Zone',
    severity: 'low',
    detail: 'Hard floor surface ready for brass foot adjuster calibration.',
    protocol: 'Machinist spirit level 0.00° balance protocol upon assembly.',
  },
];

export default function DispatchAuditPage() {
  const [orders, setOrders] = useState<OrderWithRelations[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('');
  const [crewSize, setCrewSize] = useState<number>(2);
  const [gearPianoStraps, setGearPianoStraps] = useState(false);
  const [gearStairTrolley, setGearStairTrolley] = useState(false);
  const [gearShortCues, setGearShortCues] = useState(false);
  const [gearCornerPads, setGearCornerPads] = useState(true);
  const [reviewNotes, setReviewNotes] = useState('');
  const [isApproved, setIsApproved] = useState(false);

  // Video Inspection State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(40);
  const [activeHazardIndex, setActiveHazardIndex] = useState<number | null>(null);

  // Order Preview Modal State
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  useEffect(() => {
    const list = orderStore.getAll();
    setOrders(list);
    if (list.length > 0) {
      const first = list[0];
      setSelectedOrderId(first.id);
      syncOrderState(first);
    }
  }, []);

  const syncOrderState = (ord: OrderWithRelations) => {
    setCrewSize(ord.siteAudit?.crewRecommended || 2);
    setGearPianoStraps(ord.siteAudit?.requiresRiggingGear || false);
    setGearStairTrolley(ord.siteAudit?.requiresRiggingGear || false);
    setGearShortCues(false);
    setGearCornerPads(true);
    setReviewNotes(ord.siteAudit?.videoReviewNotes || '');
    setIsApproved(ord.status === 'READY_FOR_DISPATCH');
    setCurrentTime(0);
    setIsPlaying(false);
    setActiveHazardIndex(0);
  };

  const currentOrder = orders.find((o) => o.id === selectedOrderId);
  const currentHazards = currentOrder ? (ORDER_HAZARD_MAP[currentOrder.id] || DEFAULT_HAZARDS) : [];

  const handleSelectOrder = (id: string) => {
    setSelectedOrderId(id);
    const ord = orders.find((o) => o.id === id);
    if (ord) syncOrderState(ord);
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

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeekToHazard = (pin: HazardPin, idx: number) => {
    setActiveHazardIndex(idx);
    setCurrentTime(pin.timeSeconds);
    if (videoRef.current) {
      videoRef.current.currentTime = pin.timeSeconds;
    }
  };

  // Rigging calculations
  const tableWeightKg = currentOrder?.configuration?.tableSize === 'EIGHT_FOOT_PRO' ? 340 : 285;
  const stairsCount = currentOrder?.siteAudit?.stairsCount || 0;
  const doorWidth = currentOrder?.siteAudit?.doorwayWidthCm || 90;
  const calculatedDifficulty = stairsCount > 8 ? 'EXTREME' : stairsCount > 0 || doorWidth < 85 ? 'ELEVATED' : 'STANDARD';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Pre-Flight Logistics Studio
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-xs text-zinc-400 font-mono">Truck Dispatch & Ingress Safety</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 flex items-center gap-3">
            Walkway Ingress Audit & Crew Dispatch
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
            Inspect customer ingress video footage, scrutinize pinch points and stair ascents, calibrate rigging crew sizing, and transmit mission specs to Field Ops Truck #2.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {currentOrder && (
            <button
              type="button"
              onClick={() => setIsPreviewModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-emerald-500/60 text-zinc-200 hover:text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-sm hover:shadow-emerald-950/40"
            >
              <Eye className="w-4 h-4 text-emerald-400" />
              Preview Complete Build Spec
            </button>
          )}
        </div>
      </div>

      {/* Order Selector Carousel Ribbon */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span className="font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            Select Order In Dispatch Queue ({orders.length})
          </span>
          <span className="text-[11px] font-mono text-zinc-500">Cape Town Metro Fleet</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {orders.map((o) => {
            const isSelected = o.id === selectedOrderId;
            const hasVideo = !!o.siteAudit?.ingressVideoUrl;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => handleSelectOrder(o.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-950/20 shadow-lg shadow-emerald-950/50'
                    : 'border-zinc-800/80 bg-zinc-900/60 hover:bg-zinc-800/40 hover:border-zinc-700'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-400" />
                )}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-white tracking-wider">
                    {o.orderNumber}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      o.status === 'READY_FOR_DISPATCH'
                        ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                        : o.status === 'INSTALLED_ACTIVE'
                        ? 'bg-sky-950/80 border-sky-500/40 text-sky-300'
                        : 'bg-amber-950/80 border-amber-500/40 text-amber-300'
                    }`}
                  >
                    {o.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="font-semibold text-sm text-zinc-200 truncate mt-1.5">
                  {o.user.companyName || o.user.name}
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-2 font-mono">
                  <span>{o.configuration?.tableSize.replace(/_/g, ' ')}</span>
                  <span className="flex items-center gap-1">
                    {hasVideo ? (
                      <span className="text-emerald-400 flex items-center gap-0.5">
                        <Video className="w-3 h-3" /> Video Ready
                      </span>
                    ) : (
                      <span className="text-zinc-500">Ground Ingress</span>
                    )}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {currentOrder && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          {/* LEFT & CENTER COLUMN: Video Inspection Studio & CAD Placement Preview (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Interactive Video Audit Player */}
            <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/80 p-5 sm:p-6 space-y-4 shadow-xl relative overflow-hidden backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                      Ingress Walk-Through Video Inspection Studio
                    </h2>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Frame-by-frame hazard evaluation for {currentOrder.user.companyName || currentOrder.user.name}
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400">
                    Resolution: <strong className="text-white">1080p 60fps</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-emerald-400 font-bold">
                    GPS Verified
                  </span>
                </div>
              </div>

              {/* Player Viewport */}
              <div className="relative rounded-2xl overflow-hidden bg-black border border-zinc-800 aspect-video group">
                {currentOrder.siteAudit?.ingressVideoUrl ? (
                  <video
                    ref={videoRef}
                    src={currentOrder.siteAudit.ingressVideoUrl}
                    className="w-full h-full object-cover"
                    onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                    onLoadedMetadata={(e) => setVideoDuration(e.currentTarget.duration || 40)}
                    onEnded={() => setIsPlaying(false)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-zinc-900 to-zinc-950">
                    <Video className="w-12 h-12 text-zinc-700 mb-3" />
                    <h3 className="text-sm font-bold text-zinc-300">No Raw Video Uploaded</h3>
                    <p className="text-xs text-zinc-500 max-w-md mt-1">
                      Direct ground-floor driveway ingress verified by client satellite imagery. Zero stairs flagged in pre-site assessment.
                    </p>
                  </div>
                )}

                {/* Video HUD Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-emerald-400 font-bold">
                    REC AUDIT: {currentOrder.orderNumber}
                  </span>
                  {activeHazardIndex !== null && currentHazards[activeHazardIndex] && (
                    <span
                      className={`px-2 py-1 rounded-md backdrop-blur-md text-[10px] font-mono font-bold flex items-center gap-1 ${
                        currentHazards[activeHazardIndex].severity === 'critical'
                          ? 'bg-rose-950/80 border border-rose-500/40 text-rose-300'
                          : 'bg-amber-950/80 border border-amber-500/40 text-amber-300'
                      }`}
                    >
                      <AlertTriangle className="w-3 h-3" />
                      HAZARD PIN #{activeHazardIndex + 1}: {currentHazards[activeHazardIndex].title}
                    </span>
                  )}
                </div>

                {/* Video Bottom Control Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex flex-col gap-2">
                  {/* Timeline Bar with Hazard Markers */}
                  <div className="relative w-full h-2.5 bg-zinc-800/90 rounded-full cursor-pointer overflow-visible">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${(currentTime / (videoDuration || 1)) * 100}%` }}
                    />

                    {/* Render Hazard Pin Markers */}
                    {currentHazards.map((pin, i) => {
                      const pct = (pin.timeSeconds / (videoDuration || 40)) * 100;
                      const isActive = activeHazardIndex === i;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSeekToHazard(pin, i);
                          }}
                          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-transform hover:scale-125 z-10 flex items-center justify-center ${
                            pin.severity === 'critical'
                              ? 'bg-rose-500 border-white ring-2 ring-rose-500/40'
                              : 'bg-amber-500 border-white ring-2 ring-amber-500/40'
                          } ${isActive ? 'scale-125' : ''}`}
                          style={{ left: `${pct}%` }}
                          title={`${pin.timeLabel} - ${pin.title}`}
                        >
                          <span className="sr-only">{pin.title}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Play Controls & Time */}
                  <div className="flex items-center justify-between text-xs text-white pt-1">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="w-8 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors shadow-md"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white translate-x-0.5" />}
                      </button>
                      <span className="font-mono text-xs text-zinc-300">
                        {Math.floor(currentTime / 60)
                          .toString()
                          .padStart(2, '0')}
                        :
                        {Math.floor(currentTime % 60)
                          .toString()
                          .padStart(2, '0')}{' '}
                        /{' '}
                        {Math.floor(videoDuration / 60)
                          .toString()
                          .padStart(2, '0')}
                        :
                        {Math.floor(videoDuration % 60)
                          .toString()
                          .padStart(2, '0')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.currentTime = 0;
                            setCurrentTime(0);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 transition-colors"
                        title="Replay from start"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scanned Timeline Hazard Cards */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    Timeline Ingress Hazards ({currentHazards.length})
                  </span>
                  <span className="text-[11px] text-zinc-400">Click hazard pin to jump video timestamp</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentHazards.map((pin, i) => {
                    const isSelected = activeHazardIndex === i;
                    return (
                      <div
                        key={i}
                        onClick={() => handleSeekToHazard(pin, i)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? pin.severity === 'critical'
                              ? 'bg-rose-950/30 border-rose-500/60 shadow-md shadow-rose-950/50'
                              : 'bg-amber-950/30 border-amber-500/60 shadow-md shadow-amber-950/50'
                            : 'bg-zinc-950/80 border-zinc-800/80 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                              pin.severity === 'critical'
                                ? 'bg-rose-950 text-rose-300 border border-rose-800/80'
                                : 'bg-amber-950 text-amber-300 border border-amber-800/80'
                            }`}
                          >
                            {pin.timeLabel} • {pin.severity.toUpperCase()}
                          </span>
                          <span className="text-xs font-mono text-zinc-500">Hazard #{i + 1}</span>
                        </div>

                        <h4 className="font-bold text-white text-xs mt-2">{pin.title}</h4>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">{pin.detail}</p>

                        <div className="mt-2.5 pt-2 border-t border-zinc-800/60 flex items-start gap-1.5 text-[11px] text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
                          <span>{pin.protocol}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2D CAD Placement & Room Clearance Preview Card */}
            <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/80 p-5 sm:p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-sky-400" />
                    2D Architectural Room Placement & Wall Clearance
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Verify the 1.45m tournament cue stroke envelope against room walls
                  </p>
                </div>
                <span className="font-mono text-xs text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-full font-bold">
                  Zero Wall Clashes
                </span>
              </div>

              {/* Vector Blueprint Drawing */}
              <div className="rounded-2xl bg-[#070b12] border border-sky-950/80 p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[260px]">
                {/* Architectural Grid Background */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Outer Room Boundary */}
                <div className="relative w-full max-w-md h-52 border-2 border-dashed border-sky-500/40 rounded-xl flex items-center justify-center p-4 bg-sky-950/10">
                  <span className="absolute top-2 left-3 text-[10px] font-mono text-sky-400/80">
                    Room: 6.2m Length × 4.8m Width
                  </span>
                  <span className="absolute bottom-2 right-3 text-[10px] font-mono text-zinc-500">
                    Doorway: {currentOrder.siteAudit?.doorwayWidthCm || 92}cm Ingress Arc
                  </span>

                  {/* 1.45m Cue Envelope (Dashed boundary) */}
                  <div className="relative w-72 h-36 border-2 border-dashed border-emerald-500/60 bg-emerald-950/20 rounded-lg flex items-center justify-center">
                    <span className="absolute -top-3 text-[9px] font-mono text-emerald-400 bg-[#070b12] px-1.5 rounded">
                      1.45m North Cue Clearance
                    </span>
                    <span className="absolute -bottom-3 text-[9px] font-mono text-emerald-400 bg-[#070b12] px-1.5 rounded">
                      1.45m South Cue Clearance
                    </span>
                    <span className="absolute -left-4 top-1/2 -translate-y-1/2 text-[9px] font-mono text-emerald-400 bg-[#070b12] px-1 py-0.5 rounded -rotate-90">
                      1.45m West
                    </span>
                    <span className="absolute -right-4 top-1/2 -translate-y-1/2 text-[9px] font-mono text-emerald-400 bg-[#070b12] px-1 py-0.5 rounded rotate-90">
                      1.45m East
                    </span>

                    {/* Table Footprint */}
                    <div className="w-44 h-22 rounded-md bg-gradient-to-br from-emerald-900 to-emerald-950 border-2 border-emerald-400/90 shadow-lg shadow-emerald-950 flex flex-col items-center justify-center p-2 text-center">
                      <span className="text-[11px] font-black text-white tracking-wider">
                        {currentOrder.configuration?.tableSize.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[9px] font-mono text-emerald-200">
                        {currentOrder.configuration?.bodyColorFinish}
                      </span>
                      <span className="text-[8px] font-mono text-emerald-400 mt-0.5">
                        {currentOrder.configuration?.feltColor} Felt
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>Table Perimeter (2.13m × 1.17m)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 border border-dashed border-emerald-400" />
                    <span>1.45m Tournament Stroke Envelope</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 border border-dashed border-sky-400" />
                    <span>Room Perimeter</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Rigging Calculator, Gear Checklist & Transmit CTA (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Rigging & Crew Sizing Calculator */}
            <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/80 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-emerald-400" />
                  Crew Rigging Calculator
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                    calculatedDifficulty === 'EXTREME'
                      ? 'bg-rose-950 text-rose-300 border-rose-800'
                      : calculatedDifficulty === 'ELEVATED'
                      ? 'bg-amber-950 text-amber-300 border-amber-800'
                      : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  }`}
                >
                  {calculatedDifficulty} INGRESS
                </span>
              </div>

              {/* Payload Breakdown */}
              <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Slate Bed Payload:</span>
                  <span className="font-mono text-white font-bold">{tableWeightKg} kg (1-Piece Slate)</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Elevation Factor:</span>
                  <span className="font-mono text-white">
                    {stairsCount > 0 ? `${stairsCount} Flights (${currentOrder.siteAudit?.stairType || 'stairs'})` : 'Ground Floor (Level)'}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Doorway Clearance:</span>
                  <span className="font-mono text-white">{doorWidth} cm</span>
                </div>
                <div className="flex justify-between text-zinc-400 border-t border-zinc-800/60 pt-2 font-semibold">
                  <span className="text-zinc-300">Recommended Crew:</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    {stairsCount > 0 ? '4-Man Heavy Rig' : '2-Man Standard Crew'}
                  </span>
                </div>
              </div>

              {/* Crew Switch Buttons */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Assign Technician Team Size:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCrewSize(2)}
                    className={`py-3 px-3 rounded-2xl border text-xs font-bold text-center transition-all ${
                      crewSize === 2
                        ? 'border-emerald-500 bg-emerald-950/40 text-white shadow-md shadow-emerald-950'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <Users className="w-4 h-4 mx-auto mb-1 text-zinc-400" />
                    2-Man Standard
                    <span className="block text-[10px] font-normal text-zinc-500 mt-0.5">
                      Ground & wide entry
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCrewSize(4)}
                    className={`py-3 px-3 rounded-2xl border text-xs font-bold text-center transition-all ${
                      crewSize === 4
                        ? 'border-emerald-500 bg-emerald-950/40 text-white shadow-md shadow-emerald-950'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <Users className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                    4-Man Heavy Rig
                    <span className="block text-[10px] font-normal text-zinc-500 mt-0.5">
                      Stair carry & tight turns
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Required Rigging Gear Checklist */}
            <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/80 p-5 space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Required Rigging Gear Manifest
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>

              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors">
                  <span className="text-zinc-200">Heavy-Duty Piano Lifting Straps</span>
                  <input
                    type="checkbox"
                    checked={gearPianoStraps}
                    onChange={(e) => setGearPianoStraps(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 bg-zinc-900 border-zinc-700 focus:ring-emerald-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors">
                  <span className="text-zinc-200">Tracked Stair-Climbing Slate Trolley</span>
                  <input
                    type="checkbox"
                    checked={gearStairTrolley}
                    onChange={(e) => setGearStairTrolley(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 bg-zinc-900 border-zinc-700 focus:ring-emerald-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors">
                  <span className="text-zinc-200">Neoprene Frame Edge Bumpers</span>
                  <input
                    type="checkbox"
                    checked={gearCornerPads}
                    onChange={(e) => setGearCornerPads(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 bg-zinc-900 border-zinc-700 focus:ring-emerald-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors">
                  <span className="text-zinc-200">Pack 48&quot; Short Cues (Wall Obstruction)</span>
                  <input
                    type="checkbox"
                    checked={gearShortCues}
                    onChange={(e) => setGearShortCues(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 bg-zinc-900 border-zinc-700 focus:ring-emerald-500"
                  />
                </label>
              </div>
            </div>

            {/* Owner Dispatch Directives */}
            <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/80 p-5 space-y-3 shadow-xl">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                Owner Directives for Technician Run
              </label>
              <textarea
                rows={3}
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="e.g. Unload from Kalk Bay harbour lower bay. Beware low archway at 0:12. Park tail-lift on south berth."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-3 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Transmit to Truck #2 Action */}
            <div className="pt-2">
              {isApproved ? (
                <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 flex flex-col items-center justify-center text-center gap-2 text-xs font-bold text-emerald-300 shadow-xl shadow-emerald-950">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white">Dispatched to Truck #2!</span>
                    <span className="text-[11px] font-normal text-emerald-300/80">
                      Active on Field Ops Cockpit ({currentOrder.orderNumber})
                    </span>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleApproveDispatch}
                  className="w-full py-4 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xl shadow-emerald-950 transition-all flex items-center justify-center gap-2.5 group"
                >
                  <Truck className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  <span>Authorize & Transmit to Field Ops Truck #2</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Shared Order Spec & Table Blueprint Preview Modal */}
      {currentOrder && (
        <OrderPreviewModal
          order={currentOrder}
          isOpen={isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
        />
      )}
    </div>
  );
}
