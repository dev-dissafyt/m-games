'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { orderStore, OrderWithRelations } from '@m-games/database';
import { SignaturePad, OrderPreviewModal } from '@m-games/ui';
import {
  CheckSquare,
  Camera,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  FileCheck,
  Sparkles,
  Award,
  Eye,
  Crosshair,
  RotateCcw,
  Sliders,
  Check,
  Download,
  Printer,
  X,
  ExternalLink,
} from 'lucide-react';

export default function InstallationSignoffPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [job, setJob] = useState<OrderWithRelations | null>(null);

  // 2-Axis Machinist Spirit Level Simulation
  const [pitchX, setPitchX] = useState<number>(0.14); // degrees
  const [rollY, setRollY] = useState<number>(-0.09); // degrees
  const [isLevelCalibrated, setIsLevelCalibrated] = useState<boolean>(false);

  // 4-point Technician Checklist
  const [slateLeveled, setSlateLeveled] = useState(false);
  const [clothTensioned, setClothTensioned] = useState(false);
  const [cushionsChecked, setCushionsChecked] = useState(false);
  const [coinOpChecked, setCoinOpChecked] = useState(false);

  // Photographic Evidence
  const [spiritLevelPhoto, setSpiritLevelPhoto] = useState<string | null>(
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
  );
  const [roomPhoto, setRoomPhoto] = useState<string | null>(
    'https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?auto=format&fit=crop&w=800&q=80'
  );

  // Signature & Installer Info
  const [installerName, setInstallerName] = useState('Sipho Ndlovu');
  const [signatureData, setSignatureData] = useState<string>(
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60"><path d="M10 40 Q50 10 90 40 T180 30" stroke="black" stroke-width="2" fill="none"/></svg>'
  );
  const [isCompleted, setIsCompleted] = useState(false);

  // Certificate Modal State
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  useEffect(() => {
    const found = orderStore.getById(resolvedParams.id);
    if (found) {
      setJob(found);
      if (found.installationSignoff) {
        setIsCompleted(true);
        setSlateLeveled(true);
        setClothTensioned(true);
        setCushionsChecked(true);
        setCoinOpChecked(true);
        setIsLevelCalibrated(true);
        setPitchX(0.0);
        setRollY(0.0);
        if (found.installationSignoff.customerSignatureUrl) {
          setSignatureData(found.installationSignoff.customerSignatureUrl);
        }
      }
    }
  }, [resolvedParams.id]);

  if (!job) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-zinc-400 space-y-3">
        <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-mono">Loading sign-off certificate...</p>
      </div>
    );
  }

  const allChecksPassed = slateLeveled && clothTensioned && cushionsChecked && coinOpChecked;
  const isDeadCenter = Math.abs(pitchX) < 0.02 && Math.abs(rollY) < 0.02;

  const handleAutoCalibrateLevel = () => {
    setPitchX(0.0);
    setRollY(0.0);
    setIsLevelCalibrated(true);
    setSlateLeveled(true);
  };

  const handleCompleteSignoff = () => {
    if (!allChecksPassed) {
      alert('Please verify all 4 technician precision checklist items.');
      return;
    }
    if (!isDeadCenter && !isLevelCalibrated) {
      alert('Please calibrate the machinist spirit level to 0.00° Dead Center before signing.');
      return;
    }
    if (!signatureData) {
      alert('Please have the client sign on the touch signature pad.');
      return;
    }

    orderStore.update(job.id, {
      status: 'INSTALLED_ACTIVE',
      installationSignoff: {
        id: `sig-${Date.now()}`,
        orderId: job.id,
        installerName,
        slateLeveled: true,
        clothTensioned: true,
        cushionsChecked: true,
        spiritLevelPhotoUrl:
          spiritLevelPhoto ||
          'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        completedRoomPhotoUrl:
          roomPhoto ||
          'https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?auto=format&fit=crop&w=800&q=80',
        customerSignatureUrl: signatureData,
        signedAt: new Date().toISOString(),
      },
    });

    setIsCompleted(true);
    setIsCertModalOpen(true);
  };

  // Compute bubble position in spirit level (-40px to +40px)
  const bubbleOffsetX = pitchX * 120;
  const bubbleOffsetY = rollY * 120;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <Link
            href={`/jobs/${job.id}`}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-2 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Mission Pack</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider">
              OFFICIAL CERTIFICATION • {job.orderNumber}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Installation & Precision Leveling Sign-Off
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            {job.user.companyName || job.user.name} • {job.configuration?.tableSize.replace(/_/g, ' ')} • {job.configuration?.feltColor}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPreviewModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-amber-500/60 text-zinc-200 hover:text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Preview Build</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCertModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-950/40 transition-all"
          >
            <Award className="w-4 h-4" />
            <span>Preview Live Certificate</span>
          </button>
        </div>
      </div>

      {isCompleted ? (
        /* Completed Status Banner */
        <div className="rounded-3xl border border-emerald-500/50 bg-gradient-to-r from-emerald-950/60 via-zinc-900 to-zinc-950 p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-950 shrink-0">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-xs font-mono font-bold text-emerald-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  STATUS: INSTALLED & DIGITALLY CERTIFIED
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Precision Leveling Certified: 0.00° Dead Center
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
                  Signed off by {job.user.name} and verified by Lead Technician {installerName}. 10-Year commercial chassis & precision slate warranty active.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsCertModalOpen(true)}
                className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs shadow-xl shadow-emerald-950 flex items-center gap-2 transition-all"
              >
                <Award className="w-4 h-4" />
                <span>View Full Warranty Certificate</span>
              </button>
              <Link
                href="/jobs"
                className="px-4 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs transition-colors"
              >
                Return to Job Board
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {/* Main 2-Column Responsive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: 2-Axis Circular Machinist Spirit Level Widget (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl border border-zinc-800/90 bg-zinc-900/80 p-5 sm:p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Crosshair className="w-4 h-4 text-emerald-400" />
                  2-Axis Machinist Precision Spirit Level
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Calibrate dual-axis slate tilt to tournament 0.00° dead center
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold border transition-colors ${
                  isDeadCenter
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                    : 'bg-amber-950 border-amber-500 text-amber-300'
                }`}
              >
                {isDeadCenter ? '0.00° DEAD CENTER' : 'TILT DETECTED'}
              </span>
            </div>

            {/* Circular Bullseye Bubble Spirit Level */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto rounded-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border-4 border-zinc-700 shadow-2xl flex items-center justify-center overflow-hidden p-3">
              {/* Outer Metallic Bezel Rings */}
              <div className="absolute inset-0 rounded-full border-8 border-zinc-800/80 pointer-events-none" />
              <div className="absolute inset-4 rounded-full border border-zinc-700/60 pointer-events-none" />

              {/* Concentric Gauge Rings */}
              <div className="absolute w-48 h-48 rounded-full border border-dashed border-zinc-600/40 pointer-events-none" />
              <div className="absolute w-32 h-32 rounded-full border border-dashed border-emerald-500/40 pointer-events-none" />
              <div className="absolute w-16 h-16 rounded-full border-2 border-emerald-400/80 bg-emerald-500/10 pointer-events-none" />

              {/* Crosshairs */}
              <div className="absolute w-full h-[1px] bg-zinc-600/50 pointer-events-none" />
              <div className="absolute h-full w-[1px] bg-zinc-600/50 pointer-events-none" />

              {/* Floating Spirit Bubble */}
              <div
                className={`w-12 h-12 rounded-full transition-transform duration-200 ease-out shadow-lg flex items-center justify-center pointer-events-none ${
                  isDeadCenter
                    ? 'bg-gradient-to-br from-emerald-300 to-emerald-500 shadow-emerald-400/80 border-2 border-white'
                    : 'bg-gradient-to-br from-amber-300 to-amber-500 shadow-amber-400/80 border-2 border-white'
                }`}
                style={{
                  transform: `translate(${bubbleOffsetX}px, ${bubbleOffsetY}px)`,
                }}
              >
                <div className="w-3 h-3 rounded-full bg-white/70" />
              </div>

              {/* Center Bullseye Crosshair Indicator */}
              <div className="absolute w-2 h-2 rounded-full bg-emerald-400 pointer-events-none" />
            </div>

            {/* Readout Telemetry Display */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase block">PITCH (X-AXIS)</span>
                <span
                  className={`text-lg font-black mt-0.5 block ${
                    Math.abs(pitchX) < 0.02 ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {pitchX >= 0 ? `+${pitchX.toFixed(2)}°` : `${pitchX.toFixed(2)}°`}
                </span>
                <span className="text-[10px] text-zinc-400">Head-to-Foot Roll</span>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase block">ROLL (Y-AXIS)</span>
                <span
                  className={`text-lg font-black mt-0.5 block ${
                    Math.abs(rollY) < 0.02 ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {rollY >= 0 ? `+${rollY.toFixed(2)}°` : `${rollY.toFixed(2)}°`}
                </span>
                <span className="text-[10px] text-zinc-400">Side-to-Side Tilt</span>
              </div>
            </div>

            {/* Tactile Calibrate & Nudge Controls */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleAutoCalibrateLevel}
                className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950 flex items-center justify-center gap-2 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Calibrate Leg Levelers to 0.00° Dead Center</span>
              </button>

              <div className="flex items-center justify-between text-xs text-zinc-400 px-1 pt-1">
                <span>Micro-nudge slate:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPitchX((prev) => Math.max(-0.5, +(prev - 0.02).toFixed(2)))}
                    className="px-2 py-1 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                  >
                    -X
                  </button>
                  <button
                    type="button"
                    onClick={() => setPitchX((prev) => Math.min(0.5, +(prev + 0.02).toFixed(2)))}
                    className="px-2 py-1 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                  >
                    +X
                  </button>
                  <button
                    type="button"
                    onClick={() => setRollY((prev) => Math.max(-0.5, +(prev - 0.02).toFixed(2)))}
                    className="px-2 py-1 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                  >
                    -Y
                  </button>
                  <button
                    type="button"
                    onClick={() => setRollY((prev) => Math.min(0.5, +(prev + 0.02).toFixed(2)))}
                    className="px-2 py-1 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                  >
                    +Y
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 4-Point Checklist, Photo Proofs, Signature Pad & Final Submit (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* 1. Technician Precision Verification Checklist */}
          <div className="rounded-3xl border border-zinc-800/90 bg-zinc-900/80 p-5 sm:p-6 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                1. Technician Precision Verification Checklist
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {[slateLeveled, clothTensioned, cushionsChecked, coinOpChecked].filter(Boolean).length} / 4
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950 border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors">
                <span className="text-zinc-200">Slate bed leveled on 3 axes using machinist spirit level</span>
                <input
                  type="checkbox"
                  checked={slateLeveled}
                  onChange={(e) => setSlateLeveled(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 bg-zinc-900 border-zinc-700 focus:ring-emerald-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950 border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors">
                <span className="text-zinc-200">Bed cloth stretched & staple-tensioned to tournament spec</span>
                <input
                  type="checkbox"
                  checked={clothTensioned}
                  onChange={(e) => setClothTensioned(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 bg-zinc-900 border-zinc-700 focus:ring-emerald-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950 border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors">
                <span className="text-zinc-200">Cushion rails torqued and corner castings flush</span>
                <input
                  type="checkbox"
                  checked={cushionsChecked}
                  onChange={(e) => setCushionsChecked(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 bg-zinc-900 border-zinc-700 focus:ring-emerald-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950 border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors">
                <span className="text-zinc-200">Ball return track & coin-op mechanism drop-tested</span>
                <input
                  type="checkbox"
                  checked={coinOpChecked}
                  onChange={(e) => setCoinOpChecked(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 bg-zinc-900 border-zinc-700 focus:ring-emerald-500"
                />
              </label>
            </div>
          </div>

          {/* 2. Photographic Evidence Proofs */}
          <div className="rounded-3xl border border-zinc-800/90 bg-zinc-900/80 p-5 sm:p-6 space-y-3.5 shadow-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
              <Camera className="w-4 h-4 text-sky-400" />
              2. Photographic Quality Evidence
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl border border-zinc-800 bg-zinc-950 space-y-2">
                <span className="text-[10px] font-mono text-zinc-400 block uppercase">
                  Machinist Spirit Photo
                </span>
                {spiritLevelPhoto ? (
                  <div className="relative rounded-xl overflow-hidden aspect-video border border-zinc-800 group">
                    <img
                      src={spiritLevelPhoto}
                      alt="Spirit level"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-white font-mono">
                      ✓ Level Verified
                    </div>
                  </div>
                ) : (
                  <label className="p-4 rounded-xl border border-dashed border-zinc-700 text-center cursor-pointer block hover:border-emerald-500 transition-colors">
                    <Camera className="w-5 h-5 mx-auto text-zinc-500 mb-1" />
                    <span className="text-[11px] text-zinc-400">Snap Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) setSpiritLevelPhoto(URL.createObjectURL(f));
                      }}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="p-3 rounded-2xl border border-zinc-800 bg-zinc-950 space-y-2">
                <span className="text-[10px] font-mono text-zinc-400 block uppercase">
                  Completed Room Photo
                </span>
                {roomPhoto ? (
                  <div className="relative rounded-xl overflow-hidden aspect-video border border-zinc-800 group">
                    <img
                      src={roomPhoto}
                      alt="Completed installation"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-white font-mono">
                      ✓ Installed Table
                    </div>
                  </div>
                ) : (
                  <label className="p-4 rounded-xl border border-dashed border-zinc-700 text-center cursor-pointer block hover:border-emerald-500 transition-colors">
                    <Camera className="w-5 h-5 mx-auto text-zinc-500 mb-1" />
                    <span className="text-[11px] text-zinc-400">Snap Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) setRoomPhoto(URL.createObjectURL(f));
                      }}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* 3. Customer Touch Signature Canvas */}
          <div className="rounded-3xl border border-zinc-800/90 bg-zinc-900/80 p-5 sm:p-6 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                3. Customer Touch Signature Acceptance
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Touchscreen Pad</span>
            </div>

            <SignaturePad onSave={(data) => setSignatureData(data)} />
          </div>

          {/* 4. Complete Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleCompleteSignoff}
              className="w-full py-4 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-xl shadow-emerald-950 transition-all flex items-center justify-center gap-2 group"
            >
              <FileCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Complete Sign-Off & Generate Official Leveling Certificate</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
          LIVE CERTIFICATE OF PRECISION LEVELING PREVIEW MODAL
         ========================================================= */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl border-2 border-amber-500/60 bg-[#090b10] text-zinc-100 shadow-2xl p-6 sm:p-10 my-8 space-y-6">
            {/* Modal Close */}
            <button
              type="button"
              onClick={() => setIsCertModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Official Certificate Border & Content */}
            <div className="border-4 border-double border-amber-500/50 p-6 sm:p-8 rounded-2xl space-y-6 relative overflow-hidden bg-gradient-to-b from-zinc-950 via-[#0a0d14] to-zinc-950">
              {/* Watermark Logo Stamp */}
              <div className="absolute right-6 top-6 opacity-10 pointer-events-none">
                <Award className="w-48 h-48 text-amber-400" />
              </div>

              {/* Certificate Header */}
              <div className="text-center space-y-2 border-b border-amber-500/30 pb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-300 font-mono text-[11px] font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  M-GAMES MASTERWORK VERIFICATION
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-serif">
                  Certificate of Precision Leveling
                </h2>
                <p className="text-xs text-zinc-400 font-mono">
                  Certificate Serial: <strong className="text-amber-300">CERT-{job.orderNumber}-0.00-LVL</strong>
                </p>
              </div>

              {/* Certificate Body Details */}
              <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                <p>
                  This document certifies that the following precision slate billiards installation has been assembled, balanced, and verified by certified M-Games master rigging technicians to tournament play tolerances:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 font-mono text-xs">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">CLIENT & VENUE</span>
                    <strong className="text-white text-sm">
                      {job.user.companyName || job.user.name}
                    </strong>
                    <div className="text-zinc-400 text-[11px]">{job.siteAudit?.deliveryAddress}, {job.siteAudit?.deliveryCity}</div>
                  </div>

                  <div>
                    <span className="text-zinc-500 block text-[10px]">TABLE SPECIFICATION</span>
                    <strong className="text-white text-sm">
                      {job.configuration?.tableSize.replace(/_/g, ' ')}
                    </strong>
                    <div className="text-emerald-400 text-[11px]">
                      {job.configuration?.bodyColorFinish} • {job.configuration?.feltColor} Felt
                    </div>
                  </div>
                </div>

                {/* Leveling Calibration Result Badge */}
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                      Machinist Spirit Level Calibration
                    </div>
                    <div className="text-lg font-black text-white">
                      X: 0.00° DEAD CENTER • Y: 0.00° LEVEL
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Standard deviation: &lt; 0.005mm/m across entire 1-piece Italian slate bed.
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                </div>

                {/* Signature & Seal Block */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      CERTIFIED LEAD TECHNICIAN
                    </span>
                    <div className="font-bold text-white">{installerName}</div>
                    <div className="text-[11px] text-zinc-400 font-mono">
                      Badge #MG-TECH-482 • Field Ops Fleet
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      CLIENT ACCEPTANCE SIGNATURE
                    </span>
                    {signatureData ? (
                      <div className="h-10 border-b border-zinc-700 flex items-center">
                        <img
                          src={signatureData}
                          alt="Customer Signature"
                          className="h-8 max-w-full invert opacity-90"
                        />
                      </div>
                    ) : (
                      <div className="h-8 border-b border-zinc-700 text-xs text-zinc-500 flex items-center">
                        Signed electronically on glass
                      </div>
                    )}
                    <div className="text-[11px] text-zinc-400 font-mono">
                      Date: {new Date().toLocaleDateString('en-ZA')} • 10-Yr Warranty Activated
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-800 text-xs">
                <span className="text-[11px] font-mono text-zinc-500">
                  Stored securely in M-Games Supabase Cloud
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Print Certificate
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCertModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold transition-colors"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
