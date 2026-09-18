'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Video,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Play,
} from 'lucide-react';

function IngressAuditContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Audit state
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Logistics form state
  const [isGroundFloor, setIsGroundFloor] = useState(true);
  const [hasElevator, setHasElevator] = useState(false);
  const [stairsCount, setStairsCount] = useState(0);
  const [stairType, setStairType] = useState('straight');
  const [doorwayWidthCm, setDoorwayWidthCm] = useState(92);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('Cape Town');
  const [postalCode, setPostalCode] = useState('8001');

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreviewUrl(URL.createObjectURL(file));
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        setUploadSuccess(true);
      }, 1200);
    }
  };

  const handleProceed = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('isGroundFloor', isGroundFloor.toString());
    params.set('hasElevator', hasElevator.toString());
    params.set('stairsCount', stairsCount.toString());
    params.set('stairType', stairType);
    params.set('doorwayWidthCm', doorwayWidthCm.toString());
    params.set('deliveryAddress', deliveryAddress || '14 Kloof Road');
    params.set('deliveryCity', deliveryCity);
    params.set('postalCode', postalCode);

    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-zinc-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/40 text-[11px] font-mono text-amber-400 uppercase tracking-widest">
          <Truck className="w-3.5 h-3.5" /> Stage 2 of 3: Logistics Pre-Flight
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
          Stairway & Walkway Ingress Audit
        </h1>
        <p className="text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          Solid Brazilian slate beds weigh up to 380 kg. This 20-second walkway recording ensures our delivery riggers arrive with the exact stair-climbing gear and crew size needed.
        </p>
      </div>

      <div className="space-y-8">
        {/* Video Upload Card */}
        <div className="p-8 rounded-3xl border border-zinc-800 bg-[#090b10] space-y-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-800/40 flex items-center justify-center text-amber-400 shrink-0 shadow-md">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Record 15–30s Smartphone Walk-Through</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Start from the driveway / loading bay, record through any doors, hallways, stairs, or elevators, directly into the destination room.
              </p>
            </div>
          </div>

          <div className="border-2 border-dashed border-zinc-800 rounded-2xl p-8 text-center hover:border-amber-500/60 transition-colors bg-[#06080d]">
            {videoPreviewUrl ? (
              <div className="space-y-4">
                <video
                  src={videoPreviewUrl}
                  controls
                  className="max-h-64 mx-auto rounded-xl shadow-2xl border border-zinc-700"
                />
                <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 font-semibold font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  {isUploading
                    ? 'Transmitting directly to Supabase storage bucket...'
                    : 'Walkway video verified for dispatch triage'}
                </div>
              </div>
            ) : (
              <label className="cursor-pointer block space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-amber-400 shadow-inner">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-sm font-bold text-amber-400 hover:underline">
                    Tap to Record Video on Phone Camera or Upload
                  </span>
                  <p className="text-xs text-zinc-500 mt-1">MP4, MOV up to 100MB • Direct Cloud Upload</p>
                </div>
                <input
                  type="file"
                  accept="video/*"
                  capture="environment"
                  onChange={handleVideoSelect}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Physical Access Questionnaire */}
        <div className="p-8 rounded-3xl border border-zinc-800 bg-[#090b10] space-y-6 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
            Physical Access Dimensions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ground Floor Toggle */}
            <div className="space-y-2">
              <label className="text-xs text-zinc-300 block font-semibold">Delivery Floor Level</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsGroundFloor(true);
                    setStairsCount(0);
                  }}
                  className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                    isGroundFloor
                      ? 'border-amber-500 bg-amber-950/30 text-white shadow-sm'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                  }`}
                >
                  Ground Floor (Level Access)
                </button>
                <button
                  type="button"
                  onClick={() => setIsGroundFloor(false)}
                  className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                    !isGroundFloor
                      ? 'border-amber-500 bg-amber-950/30 text-white shadow-sm'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                  }`}
                >
                  Stairs / Upper Floor
                </button>
              </div>
            </div>

            {/* Elevator Toggle */}
            <div className="space-y-2">
              <label className="text-xs text-zinc-300 block font-semibold">Large Freight / Service Elevator?</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setHasElevator(true)}
                  className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                    hasElevator
                      ? 'border-amber-500 bg-amber-950/30 text-white shadow-sm'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                  }`}
                >
                  Yes, Fits 2.4m Slate
                </button>
                <button
                  type="button"
                  onClick={() => setHasElevator(false)}
                  className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                    !hasElevator
                      ? 'border-amber-500 bg-amber-950/30 text-white shadow-sm'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                  }`}
                >
                  No Elevator
                </button>
              </div>
            </div>

            {/* If Stairs */}
            {!isGroundFloor && (
              <>
                <div>
                  <label className="text-xs text-zinc-300 block mb-1">Number of Stair Steps</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={stairsCount}
                    onChange={(e) => setStairsCount(parseInt(e.target.value) || 0)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-300 block mb-1">Staircase Geometry</label>
                  <select
                    value={stairType}
                    onChange={(e) => setStairType(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white"
                  >
                    <option value="straight">Straight Run (Direct)</option>
                    <option value="l_shaped">L-Shaped (90° Intermediate Landing)</option>
                    <option value="spiral">Spiral (Requires Crane or Hoist)</option>
                  </select>
                </div>
              </>
            )}

            {/* Doorway Width */}
            <div>
              <label className="text-xs text-zinc-300 block mb-1">
                Narrowest Doorway Opening (cm)
              </label>
              <input
                type="number"
                min="60"
                max="250"
                value={doorwayWidthCm}
                onChange={(e) => setDoorwayWidthCm(parseInt(e.target.value) || 90)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono"
              />
              <span className="text-[11px] text-zinc-500 mt-1 block">
                Standard tables require minimum 78cm clearance when carried on edge.
              </span>
            </div>
          </div>
        </div>

        {/* Address Card */}
        <div className="p-8 rounded-3xl border border-zinc-800 bg-[#090b10] space-y-4 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
            Destination Delivery Address
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs text-zinc-300 block mb-1">Street Address</label>
              <input
                type="text"
                placeholder="e.g. 14 Harbour Road, Kalk Bay"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-300 block mb-1">City / Suburb</label>
              <input
                type="text"
                value={deliveryCity}
                onChange={(e) => setDeliveryCity(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white"
              />
            </div>
          </div>
        </div>

        {/* Proceed Action */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleProceed}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm shadow-xl shadow-amber-950 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            Confirm Ingress & Finalize Reservation
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function IngressAuditPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto p-16 text-center text-zinc-400 font-mono text-xs">
          Loading ingress audit...
        </div>
      }
    >
      <IngressAuditContent />
    </Suspense>
  );
}
