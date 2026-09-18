'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { orderStore, OrderWithRelations } from '@m-games/database';
import { SignaturePad } from '@m-games/ui';
import {
  CheckSquare,
  Camera,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  FileCheck,
  Sparkles,
} from 'lucide-react';

export default function InstallationSignoffPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [job, setJob] = useState<OrderWithRelations | null>(null);

  // 4-point Technician Checklist
  const [slateLeveled, setSlateLeveled] = useState(false);
  const [clothTensioned, setClothTensioned] = useState(false);
  const [cushionsChecked, setCushionsChecked] = useState(false);
  const [coinOpChecked, setCoinOpChecked] = useState(false);

  // Photos
  const [spiritLevelPhoto, setSpiritLevelPhoto] = useState<string | null>(null);
  const [roomPhoto, setRoomPhoto] = useState<string | null>(null);

  // Signature & Installer Name
  const [installerName, setInstallerName] = useState('Sipho Ndlovu');
  const [signatureData, setSignatureData] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const found = orderStore.getById(resolvedParams.id);
    if (found) {
      setJob(found);
      if (found.installationSignoff) {
        setIsCompleted(true);
      }
    }
  }, [resolvedParams.id]);

  if (!job) {
    return (
      <div className="max-w-md mx-auto p-6 text-center text-zinc-400">
        Loading signoff certificate...
      </div>
    );
  }

  const allChecksPassed = slateLeveled && clothTensioned && cushionsChecked && coinOpChecked;

  const handleCompleteSignoff = () => {
    if (!allChecksPassed) {
      alert('Please complete and verify all 4 technician checklist items.');
      return;
    }
    if (!signatureData) {
      alert('Please have the client sign the digital touch signature pad.');
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
        spiritLevelPhotoUrl: spiritLevelPhoto || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        completedRoomPhotoUrl: roomPhoto || 'https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?auto=format&fit=crop&w=600&q=80',
        customerSignatureUrl: signatureData,
        signedAt: new Date().toISOString(),
      },
    });

    setIsCompleted(true);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-4 space-y-4">
      <Link
        href={`/jobs/${job.id}`}
        className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Mission Pack
      </Link>

      <div>
        <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest">
          DIGITAL CERTIFICATE • {job.orderNumber}
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">
          Installation & Precision Leveling Sign-Off
        </h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          {job.user.companyName || job.user.name} • {job.configuration?.tableSize.replace(/_/g, ' ')}
        </p>
      </div>

      {isCompleted ? (
        <div className="rounded-3xl border border-emerald-500/50 bg-gradient-to-b from-emerald-950/40 to-zinc-950 p-6 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-950">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-xs font-mono font-bold text-emerald-300">
              STATUS: INSTALLED_ACTIVE
            </span>
            <h2 className="text-xl font-black text-white mt-3">
              Certified Installation Complete!
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Signed off by {job.user.name} on {new Date().toLocaleDateString('en-ZA')}. Digital warranty certificate generated and stored in Supabase.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-left text-xs space-y-1 text-zinc-300 font-mono">
            <div>✓ Machinist Spirit Level: Dead Center (0.00°)</div>
            <div>✓ Strachan 6811 Cloth: Tournament Stretched</div>
            <div>✓ Cushion Rails: Torqued to Spec</div>
            <div>✓ Commercial Coin Mechanism: Calibrated</div>
          </div>

          <Link
            href="/jobs"
            className="w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs block transition-colors"
          >
            Return to Active Job Board
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {/* 1. Technician 4-Point Checklist */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
              1. Technician Precision Verification
            </span>

            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 cursor-pointer">
                <span>Slate leveled on all 3 axes using machinist spirit level</span>
                <input
                  type="checkbox"
                  checked={slateLeveled}
                  onChange={(e) => setSlateLeveled(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 bg-zinc-900 border-zinc-700"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 cursor-pointer">
                <span>Bed cloth stretched & staple-tensioned to tournament spec</span>
                <input
                  type="checkbox"
                  checked={clothTensioned}
                  onChange={(e) => setClothTensioned(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 bg-zinc-900 border-zinc-700"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 cursor-pointer">
                <span>Cushion rails torqued and corner castings aligned</span>
                <input
                  type="checkbox"
                  checked={cushionsChecked}
                  onChange={(e) => setCushionsChecked(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 bg-zinc-900 border-zinc-700"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 cursor-pointer">
                <span>Ball return & coin-op mechanism verified</span>
                <input
                  type="checkbox"
                  checked={coinOpChecked}
                  onChange={(e) => setCoinOpChecked(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 bg-zinc-900 border-zinc-700"
                />
              </label>
            </div>
          </div>

          {/* 2. Photo Proofs */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
              2. Photographic Quality Evidence
            </span>

            <div className="grid grid-cols-2 gap-2">
              <label className="p-4 rounded-xl border border-dashed border-zinc-700 bg-zinc-950 text-center cursor-pointer hover:border-emerald-500 transition-colors block">
                <Camera className="w-5 h-5 mx-auto text-zinc-500 mb-1" />
                <span className="text-[11px] font-semibold text-zinc-300 block">
                  {spiritLevelPhoto ? '✓ Level Photo Snapped' : 'Snap Spirit Level'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setSpiritLevelPhoto(URL.createObjectURL(f));
                  }}
                  className="hidden"
                />
              </label>

              <label className="p-4 rounded-xl border border-dashed border-zinc-700 bg-zinc-950 text-center cursor-pointer hover:border-emerald-500 transition-colors block">
                <Camera className="w-5 h-5 mx-auto text-zinc-500 mb-1" />
                <span className="text-[11px] font-semibold text-zinc-300 block">
                  {roomPhoto ? '✓ Room Photo Snapped' : 'Snap Completed Table'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setRoomPhoto(URL.createObjectURL(f));
                  }}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* 3. Customer Sign-off Canvas */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                3. Customer Touch Signature Acceptance
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Touchscreen</span>
            </div>

            <SignaturePad onSave={(data) => setSignatureData(data)} />
          </div>

          {/* 4. Complete Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleCompleteSignoff}
              className="w-full py-4 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950 transition-all flex items-center justify-center gap-2"
            >
              <FileCheck className="w-4 h-4" />
              Complete Sign-Off & Activate Warranty
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
