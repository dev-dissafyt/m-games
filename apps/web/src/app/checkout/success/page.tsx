'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, PhoneCall, ShieldCheck, ArrowRight, Home } from 'lucide-react';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'MG-2026-0185';
  const name = searchParams.get('name') || 'Valued Customer';

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
      <div className="w-16 h-16 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-950 mb-6">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 font-mono mb-4">
        ORDER REFERENCE: <span className="text-emerald-400 font-bold">{orderNumber}</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
        Deposit Confirmed, {name}!
      </h1>

      <p className="mt-3 text-zinc-400 text-sm leading-relaxed max-w-lg mx-auto">
        Your order has been queued directly into the master workshop dispatch system. Our owner will review your walkway video and contact you via phone or WhatsApp shortly.
      </p>

      <div className="mt-8 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-left space-y-3 text-xs">
        <div className="font-bold uppercase tracking-wider text-zinc-300">
          What Happens Next:
        </div>
        <div className="flex items-start gap-3 text-zinc-400">
          <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
            1
          </span>
          <span>
            Owner performs pre-flight review of your doorway and stairs video in the Dispatch portal.
          </span>
        </div>
        <div className="flex items-start gap-3 text-zinc-400">
          <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
            2
          </span>
          <span>
            Direct telephone confirmation and WhatsApp pro-forma invoice issued with manufacturing timeline.
          </span>
        </div>
        <div className="flex items-start gap-3 text-zinc-400">
          <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
            3
          </span>
          <span>
            Field installation team arrives with machinist spirit levels and delivers your table.
          </span>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Storefront
        </Link>
        <a
          href="http://localhost:3001/leads"
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-colors"
        >
          View in Owner Dispatch PWA
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto p-12 text-center text-zinc-400">Loading order receipt...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}

