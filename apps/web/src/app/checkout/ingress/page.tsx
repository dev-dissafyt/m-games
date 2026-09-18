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
  const [doorwayWidthCm, setDoorwayWidthCm] = useState(90);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('Cape Town');
  const [postalCode, setPostalCode] = useState('8001');

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreviewUrl(URL.createObjectURL(file));
      // Simulate direct Supabase bucket upload
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
    params.set('deliveryAddress', deliveryAddress);
    params.set('deliveryCity', deliveryCity);
    params.set('postalCode', postalCode);

    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="pb-6 border-b border-zinc-800">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-widest">
          <Truck className="w-3.5 h-3.5" /> Stage 2 of 3: Logistics Pre-Flight
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
          Walkway & Ingress Access Audit
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Solid slate beds weigh up to 380kg. This 20-second audit guarantees our rigging crew arrives with the exact gear and manpower needed.
        </p>
      </div>

      <div className="mt-8 space-y-8">
        {/* Video Upload Card */}
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Record 15–30s Ingress Walk-Through</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Take a quick video on your phone starting from the driveway or loading bay, through any doors, stairs, or elevators, directly into the destination room.
              </p>
            </div>
          </div>

          <div className="border-2 border-dashed border-zinc-700 rounded-xl p-6 text-center hover:border-emerald-500 transition-colors bg-zinc-950/60">
            {videoPreviewUrl ? (
              <div className="space-y-3">
                <video
                  src={videoPreviewUrl}
                  controls
                  className="max-h-56 mx-auto rounded-lg shadow-md"
                />
                <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  {isUploading
                    ? 'Uploading directly to Supabase storage...'
                    : 'Walkway video attached & verified for dispatch crew'}
                </div>
              </div>
            ) : (
              <label className="cursor-pointer block">
                <UploadCloud className="w-10 h-10 mx-auto text-zinc-500 mb-2" />
                <span className="text-sm font-semibold text-emerald-400 hover:underline">
                  Record Video with Camera or Upload
                </span>
                <p className="text-xs text-zinc-500 mt-1">MP4, MOV up to 100MB</p>
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
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
            Logistical Access Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ground Floor Toggle */}
            <div className="space-y-2">
              <label className="text-xs text-zinc-400 block font-medium">Floor Level</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsGroundFloor(true);
                    setStairsCount(0);
                  }}
                  className={`py-2.5 px-4 rounded-xl border text-xs font-semibold transition-all ${
                    isGroundFloor
                      ? 'border-emerald-500 bg-emerald-950/30 text-white'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                  }`}
                >
                  Ground Floor (Level)
                </button>
                <button
                  type="button"
                  onClick={() => setIsGroundFloor(false)}
                  className={`py-2.5 px-4 rounded-xl border text-xs font-semibold transition-all ${
                    !isGroundFloor
                      ? 'border-emerald-500 bg-emerald-950/30 text-white'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                  }`}
                >
                  Stairs / Upper Floor
                </button>
              </div>
            </div>

            {/* Elevator Toggle */}
            <div className="space-y-2">
              <label className="text-xs text-zinc-400 block font-medium">Service Elevator Available?</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setHasElevator(true)}
                  className={`py-2.5 px-4 rounded-xl border text-xs font-semibold transition-all ${
                    hasElevator
                      ? 'border-emerald-500 bg-emerald-950/30 text-white'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                  }`}
                >
                  Yes, Large Elevator
                </button>
                <button
                  type="button"
                  onClick={() => setHasElevator(false)}
                  className={`py-2.5 px-4 rounded-xl border text-xs font-semibold transition-all ${
                    !hasElevator
                      ? 'border-emerald-500 bg-emerald-950/30 text-white'
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
                  <label className="text-xs text-zinc-400 block mb-1">Number of Steps</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={stairsCount}
                    onChange={(e) => setStairsCount(parseInt(e.target.value) || 0)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Staircase Geometry</label>
                  <select
                    value={stairType}
                    onChange={(e) => setStairType(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white"
                  >
                    <option value="straight">Straight Run</option>
                    <option value="l_shaped">L-Shaped with 90° Landing</option>
                    <option value="spiral">Spiral (Requires Inspection)</option>
                  </select>
                </div>
              </>
            )}

            {/* Doorway Width */}
            <div>
              <label className="text-xs text-zinc-400 block mb-1">
                Narrowest Doorway Width (cm)
              </label>
              <input
                type="number"
                min="60"
                max="250"
                value={doorwayWidthCm}
                onChange={(e) => setDoorwayWidthCm(parseInt(e.target.value) || 90)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white font-mono"
              />
              <span className="text-[10px] text-zinc-500 mt-1 block">
                Standard tables require minimum 78cm doorway clearance on side edge.
              </span>
            </div>
          </div>
        </div>

        {/* Address Card */}
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
            Installation Site Address
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs text-zinc-400 block mb-1">Street Address</label>
              <input
                type="text"
                placeholder="e.g. 14 Harbour Road"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 block mb-1">City</label>
              <input
                type="text"
                value={deliveryCity}
                onChange={(e) => setDeliveryCity(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleProceed}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-950 transition-all flex items-center justify-center gap-2"
          >
            Proceed to Final Reservation Checkout
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function IngressAuditPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto p-12 text-center text-zinc-400">Loading ingress audit...</div>}>
      <IngressAuditContent />
    </Suspense>
  );
}
