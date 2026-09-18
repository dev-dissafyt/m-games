'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatZar } from '@m-games/ui';
import { ShieldCheck, Lock, CreditCard, Building, User, Phone, Mail, CheckCircle2 } from 'lucide-react';

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
        router.push(`/checkout/success?orderNumber=${data.order.orderNumber}&name=${encodeURIComponent(customerName)}`);
      } else {
        alert('Order processing error. Please check your connection.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to place order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="pb-6 border-b border-zinc-800">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-widest">
          <Lock className="w-3.5 h-3.5" /> Stage 3 of 3: Secure Checkout
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
          Finalize Order & Manufacturing Deposit
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Simulated 50% deposit checkout. Your build slot is immediately locked into production.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Customer Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Order Type Selector */}
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
              Purchase or Commercial Lease?
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('PURCHASE_CUSTOM')}
                className={`py-2.5 px-3 rounded-lg border text-xs font-semibold text-center transition-all ${
                  orderType === 'PURCHASE_CUSTOM'
                    ? 'border-emerald-500 bg-emerald-950/40 text-white'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                }`}
              >
                Custom Table Purchase (50% Deposit)
              </button>
              <button
                type="button"
                onClick={() => setOrderType('RENTAL_COMMERCIAL')}
                className={`py-2.5 px-3 rounded-lg border text-xs font-semibold text-center transition-all ${
                  orderType === 'RENTAL_COMMERCIAL'
                    ? 'border-emerald-500 bg-emerald-950/40 text-white'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                }`}
              >
                Commercial Venue Lease (Reservation)
              </button>
            </div>
          </div>

          {/* Contact Details */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
              Customer & Venue Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Full Name / Contact *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dave Stewart"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Mobile Phone (SA) *</label>
                <input
                  type="tel"
                  required
                  placeholder="+27821234567"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="dave@thebrassbell.co.za"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Company / Venue Name (Optional)</label>
                <input
                  type="text"
                  placeholder="The Brass Bell Pub"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
              Payment Gateway Simulation
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('ozow')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'ozow'
                    ? 'border-emerald-500 bg-emerald-950/30 text-white'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                }`}
              >
                <div className="text-xs font-bold">Ozow Instant EFT</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">Zero fees</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'border-emerald-500 bg-emerald-950/30 text-white'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                }`}
              >
                <div className="text-xs font-bold">Visa / Master</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">Debit or Credit</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('eft')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'eft'
                    ? 'border-emerald-500 bg-emerald-950/30 text-white'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                }`}
              >
                <div className="text-xs font-bold">Manual EFT</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">Pro-forma invoice</div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300 pb-3 border-b border-zinc-800">
              Order Specification
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Model:</span>
                <span className="font-semibold text-white">{sizeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Finish:</span>
                <span className="font-semibold text-white">{wood}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Tournament Felt:</span>
                <span className="font-semibold text-white">{felt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">SKU:</span>
                <span className="font-mono text-emerald-400">{sku}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Delivery Address:</span>
                <span className="text-right text-zinc-300 truncate max-w-[180px]">
                  {deliveryAddress}, {deliveryCity}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-2">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Quoted Total:</span>
                <span className="font-mono">{formatZar(totalPrice)}</span>
              </div>
              <div className="flex justify-between items-baseline text-white">
                <span className="font-bold text-sm">
                  {orderType === 'PURCHASE_CUSTOM' ? 'Deposit Due Now (50%):' : 'Lease Reservation Deposit:'}
                </span>
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  {formatZar(depositPrice)}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-normal">
                Remaining 50% balance payable on site after digital spirit-level sign-off.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-950 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                'Processing Order...'
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Pay {formatZar(depositPrice)} & Place Order
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto p-12 text-center text-zinc-400">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

