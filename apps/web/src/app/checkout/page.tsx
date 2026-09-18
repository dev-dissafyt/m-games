'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatZar } from '@m-games/ui';
import {
  ShieldCheck,
  Lock,
  CreditCard,
  Building,
  User,
  Phone,
  Mail,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sku = searchParams.get('sku') || 'MG-8FT-WALNUT-BLU-72';
  const sizeName = searchParams.get('sizeName') || '8ft Pro Tournament';
  const felt = searchParams.get('felt') || 'Electric Blue';
  const wood = searchParams.get('wood') || 'Solid Walnut';
  const totalPrice = parseFloat(searchParams.get('totalPrice') || '40500');
  const depositPrice = parseFloat(searchParams.get('depositPrice') || '20250');
  const deliveryAddress = searchParams.get('deliveryAddress') || '14 Kloof Road';
  const deliveryCity = searchParams.get('deliveryCity') || 'Cape Town';

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+27');
  const [companyName, setCompanyName] = useState('');
  const [venueType, setVenueType] = useState('Residential');
  const [orderType, setOrderType] = useState<'PURCHASE_CUSTOM' | 'RENTAL_COMMERCIAL'>('PURCHASE_CUSTOM');
  const [paymentMethod, setPaymentMethod] = useState<'ozow' | 'card' | 'eft'>('ozow');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        orderType,
        customerName,
        customerEmail,
        customerPhone,
        companyName: companyName || null,
        venueType,
        sku,
        size: searchParams.get('size'),
        felt,
        wood,
        hardware: searchParams.get('hardware'),
        coinOp: searchParams.get('coinOp'),
        totalPrice,
        depositPrice,
        deliveryAddress,
        deliveryCity,
        postalCode: searchParams.get('postalCode'),
        isGroundFloor: searchParams.get('isGroundFloor'),
        hasElevator: searchParams.get('hasElevator'),
        stairsCount: searchParams.get('stairsCount'),
        stairType: searchParams.get('stairType'),
        doorwayWidthCm: searchParams.get('doorwayWidthCm'),
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.order) {
        router.push(
          `/checkout/success?orderNumber=${data.order.orderNumber}&name=${encodeURIComponent(customerName)}`
        );
      } else {
        alert('Order processing error. Please verify your connection.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to place order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-zinc-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/40 text-[11px] font-mono text-amber-400 uppercase tracking-widest">
          <Lock className="w-3.5 h-3.5" /> Stage 3 of 3: Secure Production Lock
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
          Reserve Build Slot & 50% Manufacturing Deposit
        </h1>
        <p className="text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          Your commission is immediately entered into our workshop schedule. Balance only due on site after 3-axis machinist spirit leveling sign-off.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Customer Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Order Type Selector */}
          <div className="p-6 rounded-3xl bg-[#090b10] border border-zinc-800 space-y-3 shadow-xl">
            <label className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono block">
              Contract Option: Commission Purchase or Commercial Lease?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOrderType('PURCHASE_CUSTOM')}
                className={`py-3 px-4 rounded-2xl border text-xs font-bold text-center transition-all ${
                  orderType === 'PURCHASE_CUSTOM'
                    ? 'border-amber-500 bg-amber-950/30 text-white shadow-md'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                }`}
              >
                Custom Table Commission
                <span className="block text-[10px] font-normal text-zinc-400 mt-0.5">
                  50% deposit • Ownership
                </span>
              </button>
              <button
                type="button"
                onClick={() => setOrderType('RENTAL_COMMERCIAL')}
                className={`py-3 px-4 rounded-2xl border text-xs font-bold text-center transition-all ${
                  orderType === 'RENTAL_COMMERCIAL'
                    ? 'border-amber-500 bg-amber-950/30 text-white shadow-md'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                }`}
              >
                Commercial Venue Lease
                <span className="block text-[10px] font-normal text-zinc-400 mt-0.5">
                  Fixed monthly • Service included
                </span>
              </button>
            </div>
          </div>

          {/* Contact Details */}
          <div className="p-8 rounded-3xl bg-[#090b10] border border-zinc-800 space-y-5 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
              Client & Delivery Venue Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-300 block mb-1">Full Name / Primary Contact *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dave Stewart"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-300 block mb-1">Mobile Telephone (South Africa) *</label>
                <input
                  type="tel"
                  required
                  placeholder="+27821234567"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-300 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="dave@thebrassbell.co.za"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-300 block mb-1">Venue / Company Name (Optional)</label>
                <input
                  type="text"
                  placeholder="The Brass Bell Pub"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white"
                />
              </div>
            </div>
          </div>

          {/* Payment Simulation */}
          <div className="p-8 rounded-3xl bg-[#090b10] border border-zinc-800 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
              Secure Deposit Gateway
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('ozow')}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'ozow'
                    ? 'border-amber-500 bg-amber-950/30 text-white shadow-sm'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                }`}
              >
                <div className="text-xs font-bold">Ozow Instant EFT</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">Direct SA Bank</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'border-amber-500 bg-amber-950/30 text-white shadow-sm'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                }`}
              >
                <div className="text-xs font-bold">Credit / Debit Card</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">3D Secure Verified</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('eft')}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'eft'
                    ? 'border-amber-500 bg-amber-950/30 text-white shadow-sm'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                }`}
              >
                <div className="text-xs font-bold">Bank Pro-Forma</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">Invoice via Email</div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Spec Breakdown & Lock CTA (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-[#090b10] border border-amber-500/40 space-y-5 shadow-2xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono pb-3 border-b border-zinc-800">
              Commission Build Specification
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Model:</span>
                <span className="font-bold text-white">{sizeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Hardwood Finish:</span>
                <span className="font-semibold text-white">{wood}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Worsted Cloth:</span>
                <span className="font-semibold text-white">{felt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">SPEC SKU:</span>
                <span className="font-mono text-amber-400 font-bold">{sku}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Destination:</span>
                <span className="text-right text-zinc-300 truncate max-w-[180px]">
                  {deliveryAddress}, {deliveryCity}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-2">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Full Quoted Value:</span>
                <span className="font-mono text-zinc-300">{formatZar(totalPrice)}</span>
              </div>
              <div className="flex justify-between items-baseline text-white">
                <span className="font-bold text-sm">
                  {orderType === 'PURCHASE_CUSTOM' ? 'Deposit Due Now (50%):' : 'Lease Reservation Deposit:'}
                </span>
                <span className="text-3xl font-black text-amber-400 font-mono">
                  {formatZar(depositPrice)}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Balance payable upon installation, leveling, and digital spirit-level warranty sign-off.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm shadow-xl shadow-amber-950 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
            >
              {isSubmitting ? (
                'Securing Workshop Slot...'
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Pay {formatZar(depositPrice)} & Lock Production Slot
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Includes 10-Year Slate Warranty & 6-Month Service</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto p-16 text-center text-zinc-400 font-mono text-xs">
          Loading secure checkout...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
