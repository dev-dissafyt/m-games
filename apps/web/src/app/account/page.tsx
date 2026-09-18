'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Compass,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
  Printer,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Layers,
  Wrench,
  ExternalLink,
  Coins,
  RefreshCw,
  Trophy,
  ArrowUpRight,
  Check,
  Eye,
} from 'lucide-react';
import { formatZar } from '@m-games/ui';
import { INITIAL_ORDERS_FIXTURE, OrderWithRelations } from '@m-games/database';

export default function AccountPage() {
  const [selectedUserId, setSelectedUserId] = useState<string>('usr-brass-bell');
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'leveling' | 'cad' | 'service'>('overview');
  const [showCertModal, setShowCertModal] = useState<boolean>(false);
  const [serviceRequested, setServiceRequested] = useState<boolean>(false);

  // Load active client from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mgames_client_id');
      if (saved && saved !== 'guest') {
        setSelectedUserId(saved);
      }
    } catch {
      // Default to usr-brass-bell
    }
  }, []);

  const handleSwitchUser = (newUserId: string) => {
    setSelectedUserId(newUserId);
    try {
      localStorage.setItem('mgames_client_id', newUserId);
      window.dispatchEvent(new Event('storage'));
    } catch {
      // Ignore storage errors
    }
  };

  // Find active order for selected user
  const currentOrder: OrderWithRelations =
    INITIAL_ORDERS_FIXTURE.find((o) => o.userId === selectedUserId) || INITIAL_ORDERS_FIXTURE[0];

  const user = currentOrder.user;
  const cfg = currentOrder.configuration;
  const audit = currentOrder.siteAudit;
  const rental = currentOrder.rentalAgreement;
  const signoff = currentOrder.installationSignoff;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'INSTALLED_ACTIVE':
        return { label: 'LIVE IN VENUE', color: 'bg-emerald-950 text-emerald-400 border-emerald-800' };
      case 'READY_FOR_DISPATCH':
        return { label: 'READY FOR RIGGING', color: 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50' };
      case 'IN_MANUFACTURE':
        return { label: 'IN FABRICATION', color: 'bg-amber-950 text-amber-400 border-amber-800' };
      default:
        return { label: 'SPEC CONFIRMATION', color: 'bg-zinc-800 text-zinc-300 border-zinc-700' };
    }
  };

  const statusBadge = getStatusBadge(currentOrder.status);

  // Timeline steps
  const TIMELINE_STEPS = [
    { key: 'SPEC_APPROVED', label: 'Spec Approved', done: true, date: '10 Sept 2026' },
    { key: 'DEPOSIT_PENDING', label: '50% Deposit Paid', done: Boolean(currentOrder.depositPaidAt), date: '12 Sept 2026' },
    { key: 'IN_MANUFACTURE', label: 'Precision Slate Cutting', done: currentOrder.status !== 'LEAD_NEW', date: '15 Sept 2026' },
    {
      key: 'READY_FOR_DISPATCH',
      label: 'Machinist Level Rigging',
      done: currentOrder.status === 'READY_FOR_DISPATCH' || currentOrder.status === 'INSTALLED_ACTIVE',
      date: currentOrder.status === 'INSTALLED_ACTIVE' ? '16 Sept 2026' : 'Scheduled 22 Sept',
    },
    {
      key: 'INSTALLED_ACTIVE',
      label: '0.00° Sign-Off Active',
      done: currentOrder.status === 'INSTALLED_ACTIVE',
      date: currentOrder.status === 'INSTALLED_ACTIVE' ? 'Certified Live' : 'Pending Rigging',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* 1. Client Identity & Quick Persona Switcher Header */}
      <div className="rounded-3xl border border-zinc-800/90 bg-[#080a0f] p-6 sm:p-8 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-neon-cyan/40 flex items-center justify-center text-neon-cyan font-black text-2xl font-mono shadow-[0_0_15px_rgba(0,240,255,0.25)] shrink-0">
              {user.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                  {user.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase border bg-emerald-950/80 text-emerald-400 border-emerald-800/80 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  VERIFIED CLIENT
                </span>
              </div>
              <div className="text-sm font-semibold text-zinc-300">
                {user.companyName ? `${user.companyName} • ` : ''}
                <span className="text-zinc-400 font-normal">{user.venueType}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-zinc-500" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-zinc-500" />
                  {user.phone}
                </span>
                {audit && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    {audit.deliveryAddress}, {audit.deliveryCity}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Demo Persona Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-zinc-800/80">
            <div className="text-left sm:text-right">
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">
                Active Client Persona
              </div>
              <div className="text-xs text-zinc-300 font-mono">Simulate Account View</div>
            </div>
            <select
              value={selectedUserId}
              onChange={(e) => handleSwitchUser(e.target.value)}
              aria-label="Select active client persona"
              className="px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono font-bold text-white focus:outline-none focus:border-neon-cyan cursor-pointer"
            >
              <option value="usr-brass-bell">Dave Stewart (The Brass Bell • Lease)</option>
              <option value="usr-firemans">Carl Weber (Fireman&apos;s Arms • Sports Bar)</option>
              <option value="usr-sarah-j">Sarah Jenkins (Constantia • Custom Table)</option>
              <option value="usr-tshiamo">Tshiamo Moloi (Gardens Loft • Certified Live)</option>
            </select>
          </div>
        </div>

        {/* Metric Ribbons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-zinc-800/80 text-xs font-mono">
          <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
            <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Active Order</div>
            <div className="text-sm font-black text-white font-mono flex items-center gap-1.5">
              <span>{currentOrder.orderNumber}</span>
              <span className={`text-[9px] px-2 py-0.5 rounded border ${statusBadge.color}`}>
                {statusBadge.label}
              </span>
            </div>
            <div className="text-[10px] text-zinc-400 truncate">
              {currentOrder.type === 'RENTAL_COMMERCIAL' ? 'Commercial B2B Lease' : 'Custom Purchase'}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
            <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Monthly Lease / Investment</div>
            <div className="text-sm font-black text-emerald-400 font-mono">
              {rental ? `${formatZar(rental.monthlyRateZar)} / mo` : formatZar(currentOrder.quotedTotalZar)}
            </div>
            <div className="text-[10px] text-zinc-400 truncate">
              {rental?.coinOpSplitPct ? `${rental.coinOpSplitPct}% Coin Drop Share` : 'Outright Single-Slab'}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
            <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Precision Calibration</div>
            <div className="text-sm font-black text-neon-cyan font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              0.00° Certified
            </div>
            <div className="text-[10px] text-zinc-400 truncate">
              {signoff ? `Verified by ${signoff.installerName}` : 'Stabila Dual-Axis Lead Scheduled'}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
            <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Recloth & Maintenance</div>
            <div className="text-sm font-black text-amber-400 font-mono">
              {rental ? `${rental.includedReclothMonths}-Mo Free Recloth` : 'Lifetime Frame Warranty'}
            </div>
            <div className="text-[10px] text-zinc-400 truncate">
              {rental?.nextServiceDueDate ? `Next: March 2027` : 'Emergency Dispatch 48h SLA'}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Portal Section Navigation Tabs */}
      <div className="flex border-b border-zinc-800/80 space-x-1 sm:space-x-2 overflow-x-auto pb-1 text-xs font-mono font-bold">
        {[
          { id: 'overview', label: 'Overview', icon: ShoppingBag },
          { id: 'orders', label: 'Orders & Leases', icon: Layers },
          { id: 'leveling', label: '0.00° Leveling Certificate', icon: ShieldCheck },
          { id: 'cad', label: 'Saved CAD Floor Plans', icon: Compass },
          { id: 'service', label: 'Service & Recloth SLA', icon: Wrench },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 rounded-2xl flex items-center gap-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-zinc-900 border border-neon-cyan/50 text-neon-cyan shadow-[0_0_12px_rgba(0,240,255,0.15)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-950 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-neon-cyan' : 'text-zinc-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Tab Contents */}

      {/* TAB A: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Order Lifecycle Progress Banner */}
          <div className="rounded-3xl border border-zinc-800/90 bg-[#06080d] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-neon-cyan uppercase tracking-wider font-bold">
                  Live Dispatch Tracking
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
                  Order Status: {statusBadge.label}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/designer"
                  className="px-4 py-2 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Launch Studio Designer
                </Link>
              </div>
            </div>

            {/* Stepper */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
              {TIMELINE_STEPS.map((step, idx) => (
                <div
                  key={step.key}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    step.done
                      ? 'bg-zinc-950 border-emerald-500/40 text-white'
                      : 'bg-zinc-950/40 border-zinc-800/60 text-zinc-500'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                    <span className="text-zinc-500 font-bold">0{idx + 1}</span>
                    {step.done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Clock className="w-4 h-4 text-zinc-600" />
                    )}
                  </div>
                  <div className={`text-xs font-bold font-mono ${step.done ? 'text-zinc-100' : 'text-zinc-500'}`}>
                    {step.label}
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono mt-1">{step.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Two-Column Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Machine Specs Summary (2 Cols) */}
            <div className="lg:col-span-2 rounded-3xl border border-zinc-800/90 bg-[#080a0f] p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-neon-cyan uppercase font-bold tracking-wider">
                    Equipment Configuration
                  </div>
                  <h3 className="text-lg font-bold text-white font-mono">
                    {cfg?.tableSize === 'SEVEN_FOOT_PUB'
                      ? '7ft Pub Classic Slate Table'
                      : cfg?.tableSize === 'EIGHT_FOOT_PRO'
                      ? '8ft Pro Tournament Championship Table'
                      : '12ft Snooker Estate Table'}
                  </h3>
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 font-bold">
                  SKU: {cfg?.generatedSku || 'MG-7FT-KIAAT-01'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold">Cabinet Finish</span>
                  <div className="text-white font-bold">{cfg?.bodyColorFinish}</div>
                  <div className="text-[10px] text-zinc-400">{cfg?.bodyFinishType}</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold">Worsted Cloth</span>
                  <div className="text-emerald-400 font-bold">{cfg?.feltColor}</div>
                  <div className="text-[10px] text-zinc-400">{cfg?.feltTexture}</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold">Coin Mechanism</span>
                  <div className="text-white font-bold">
                    {cfg?.coinOpMechanic ? 'R5 / R10 ZAR Coin Drop' : 'Free Play / Ball Return'}
                  </div>
                  <div className="text-[10px] text-zinc-400">Jam-Free Mechanical</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold">Corner Hardware</span>
                  <div className="text-white font-bold capitalize">{cfg?.hardwareFinish} Castings</div>
                  <div className="text-[10px] text-zinc-400">Impact Resistant</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold">Playfield Slate</span>
                  <div className="text-white font-bold">Italian Diamond-Honed</div>
                  <div className="text-[10px] text-zinc-400">1-Piece Matched 22mm</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold">Rigging Crew</span>
                  <div className="text-neon-cyan font-bold">
                    {audit?.crewRecommended ? `${audit.crewRecommended}-Man Heavy Rig` : '2-Man Team'}
                  </div>
                  <div className="text-[10px] text-zinc-400">{audit?.stairsCount || 0} Stairs Stairway Ingress</div>
                </div>
              </div>

              {/* Site Audit Access Notice */}
              {audit && (
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs font-mono space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-neon-cyan" />
                      Delivery & Rigging Specifications:
                    </span>
                    <span className="text-emerald-400">Doorway: {audit.doorwayWidthCm}cm Clearance</span>
                  </div>
                  <p className="text-zinc-300 leading-relaxed">
                    {audit.videoReviewNotes || 'Standard ground floor delivery clearance approved by logistics officer.'}
                  </p>
                </div>
              )}
            </div>

            {/* Right: Quick Actions & Certificate Teaser (1 Col) */}
            <div className="space-y-6">
              {/* Digital Level Cert Card */}
              <div className="rounded-3xl border border-neon-cyan/40 bg-[#06080d] p-6 space-y-4 relative overflow-hidden shadow-[0_0_15px_rgba(0,240,255,0.08)]">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold">
                    OFFICIAL SIGN-OFF
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white font-mono">
                    0.00° Precision Leveling Cert
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Machinist spirit-level calibration verified with 0.00° tolerances on X and Y playfield axes.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/90 text-xs font-mono space-y-1.5">
                  <div className="flex justify-between text-zinc-400">
                    <span>X-Axis Tolerance:</span>
                    <span className="text-emerald-400 font-bold">0.00° (True Flat)</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Y-Axis Tolerance:</span>
                    <span className="text-emerald-400 font-bold">0.00° (True Flat)</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Sign-off Rigger:</span>
                    <span className="text-zinc-200">Sipho Ndlovu (Lead)</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCertModal(true)}
                  className="w-full py-2.5 rounded-xl bg-zinc-900 border border-neon-cyan/50 hover:border-neon-cyan text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Eye className="w-3.5 h-3.5 text-neon-cyan" />
                  View Signed Certificate
                </button>
              </div>

              {/* Saved CAD Plan Teaser */}
              <div className="rounded-3xl border border-zinc-800 bg-[#080a0f] p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400 font-bold flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-sky-400" />
                    Saved CAD Floor Plan
                  </span>
                  <span className="text-[10px] font-mono text-sky-400 font-bold">6.2m × 4.8m</span>
                </div>
                <div className="text-xs text-zinc-300">
                  Kalk Bay Harbour Deck Lounge clearance simulation with 57&quot; standard cue envelope.
                </div>
                <Link
                  href="/designer?mode=planner"
                  className="w-full py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all block text-center"
                >
                  Open in Venue CAD Planner →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB B: ORDERS & LEASES */}
      {activeTab === 'orders' && (
        <div className="rounded-3xl border border-zinc-800/90 bg-[#080a0f] p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <div className="text-[10px] font-mono text-neon-cyan uppercase font-bold tracking-wider">
                Contract & Invoices
              </div>
              <h3 className="text-xl font-bold text-white font-mono">
                Order Agreement: {currentOrder.orderNumber}
              </h3>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className={`px-3 py-1 rounded-xl border ${statusBadge.color} font-bold`}>
                {statusBadge.label}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-mono">
            {/* Agreement Terms */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider text-zinc-300">
                Commercial Agreement Terms
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-400">Agreement Type:</span>
                  <span className="text-white font-bold">
                    {currentOrder.type === 'RENTAL_COMMERCIAL' ? 'B2B Commercial Coin-Op Lease' : 'Custom Purchase'}
                  </span>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-400">Lease Term:</span>
                  <span className="text-white font-bold">{rental?.term.replace('_', ' ') || 'Single Payment'}</span>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-400">Monthly Lease Rate:</span>
                  <span className="text-emerald-400 font-bold">
                    {rental ? `${formatZar(rental.monthlyRateZar)} / mo` : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-400">Coin-Op Split Share:</span>
                  <span className="text-neon-cyan font-bold">{rental?.coinOpSplitPct || 0}% to Venue</span>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-400">50% Deposit Paid:</span>
                  <span className="text-white font-bold">{formatZar(currentOrder.depositRequiredZar)}</span>
                </div>
              </div>
            </div>

            {/* Delivery Rigging Logistics */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider text-zinc-300">
                Delivery & Rigging Logistics
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-400">Venue Ingress:</span>
                  <span className="text-white font-bold">
                    {audit?.isGroundFloor ? 'Ground Floor Direct' : `${audit?.stairsCount} Stairs (${audit?.stairType || 'stairs'})`}
                  </span>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-400">Rigging Crew Assigned:</span>
                  <span className="text-white font-bold">{audit?.crewRecommended || 2} Qualified Riggers</span>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-400">Special Rigging Tackle:</span>
                  <span className="text-amber-400 font-bold">
                    {audit?.requiresRiggingGear ? 'Heavy Stair Harnesses & Dollies' : 'Standard Moving Blankets'}
                  </span>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-400">Next Recloth Due:</span>
                  <span className="text-white font-bold">
                    {rental?.nextServiceDueDate ? new Date(rental.nextServiceDueDate).toLocaleDateString() : 'Upon Request'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB C: 0.00° PRECISION LEVELING CERTIFICATE */}
      {activeTab === 'leveling' && (
        <div className="rounded-3xl border border-zinc-800/90 bg-[#080a0f] p-6 sm:p-10 space-y-8 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider">
                <CheckCircle2 className="w-4 h-4" /> Official Inspection Document
              </div>
              <h3 className="text-2xl font-black text-white font-mono mt-1">
                Digital Machinist Leveling Certificate
              </h3>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-white text-white text-xs font-mono font-bold flex items-center gap-2 self-start transition-all"
            >
              <Printer className="w-4 h-4" />
              Print Certificate
            </button>
          </div>

          {/* Certificate Body Container */}
          <div className="rounded-2xl border-2 border-emerald-500/30 bg-[#05070a] p-8 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl" />

            <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-neon-cyan/40 flex items-center justify-center text-white font-black text-2xl font-mono">
                  M
                </div>
                <div>
                  <div className="font-extrabold text-white text-base font-mono">M-GAMES AMUSEMENTS</div>
                  <div className="text-[10px] text-zinc-400 font-mono">
                    Machinist Precision Certification Division • Cape Town
                  </div>
                </div>
              </div>
              <div className="text-right font-mono text-xs">
                <div className="text-emerald-400 font-extrabold">CERTIFICATE #CERT-2026-0182</div>
                <div className="text-[10px] text-zinc-500">Issued under SABS 0.00° Tolerances</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-zinc-500 uppercase text-[10px] font-bold">Client / Venue:</span>
                <div className="text-white font-bold text-sm">{user.name}</div>
                <div className="text-zinc-400">{user.companyName || user.venueType}</div>
                <div className="text-zinc-400">{audit?.deliveryAddress}, Cape Town</div>
              </div>

              <div className="space-y-1 md:text-right">
                <span className="text-zinc-500 uppercase text-[10px] font-bold">Table Specifications:</span>
                <div className="text-white font-bold text-sm">
                  {cfg?.tableSize === 'SEVEN_FOOT_PUB' ? '7ft Pub Classic Slate' : '8ft Pro Tournament'}
                </div>
                <div className="text-zinc-400">SKU: {cfg?.generatedSku}</div>
                <div className="text-zinc-400">Single-Slab Italian Diamond-Ground Slate (22mm)</div>
              </div>
            </div>

            {/* Readout dials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-950 border border-emerald-500/40 space-y-2 text-center">
                <div className="text-[11px] font-mono text-zinc-400 uppercase font-bold">
                  Longitudinal Axis (X-Axis)
                </div>
                <div className="text-3xl font-black text-emerald-400 font-mono tracking-tight">
                  0.00°
                </div>
                <div className="text-[10px] text-zinc-500 font-mono">Stabila Digital 196-2 Electronic Readout</div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-emerald-500/40 space-y-2 text-center">
                <div className="text-[11px] font-mono text-zinc-400 uppercase font-bold">
                  Transverse Axis (Y-Axis)
                </div>
                <div className="text-3xl font-black text-emerald-400 font-mono tracking-tight">
                  0.00°
                </div>
                <div className="text-[10px] text-zinc-500 font-mono">Machinist Verified Precision Spirit Level</div>
              </div>
            </div>

            {/* Checklist items */}
            <div className="space-y-2 border-t border-zinc-800 pt-4 text-xs font-mono">
              <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Calibration Verification Checklist:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Sub-frame leg levelers tightened to locknut</span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Strachan wool cloth tension balanced</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Rolling steel ball test verified true</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Cushion rubber rebound verified 3.8 banks</span>
                </div>
              </div>
            </div>

            {/* Signatures */}
            <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 font-mono text-xs">
              <div>
                <div className="text-[10px] text-zinc-500 uppercase font-bold">Master Rigging Lead:</div>
                <div className="text-white font-bold text-sm">Sipho Ndlovu</div>
                <div className="text-[10px] text-zinc-400">Head of Logistics & Slate Calibration</div>
              </div>

              <div className="sm:text-right">
                <div className="text-[10px] text-zinc-500 uppercase font-bold">Calibration Date:</div>
                <div className="text-emerald-400 font-bold">
                  {signoff?.signedAt ? new Date(signoff.signedAt).toLocaleDateString() : '16 Sept 2026'}
                </div>
                <div className="text-[10px] text-zinc-400">Signed with Digital Cryptographic Seal</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB D: SAVED CAD PLANS */}
      {activeTab === 'cad' && (
        <div className="rounded-3xl border border-zinc-800/90 bg-[#080a0f] p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <div className="text-[10px] font-mono text-sky-400 uppercase font-bold tracking-wider">
                Architectural Blueprint Archive
              </div>
              <h3 className="text-xl font-bold text-white font-mono">
                Saved 2D Venue Layouts
              </h3>
            </div>
            <Link
              href="/designer?mode=planner"
              className="px-4 py-2 rounded-xl bg-sky-500/20 border border-sky-500/50 hover:border-sky-400 text-sky-300 font-mono text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Compass className="w-3.5 h-3.5" />
              Open New Room in CAD Planner
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-sky-950 text-sky-400 text-[10px] font-mono font-bold border border-sky-800">
                  ACTIVE BLUEPRINT
                </span>
                <span className="text-xs font-mono text-zinc-400">6.2m × 4.8m Room</span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white font-mono">
                  Kalk Bay Harbour Deck (Sea-Facing)
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  1× 7ft Pub Classic centered with 1.45m full clearance envelope on all 4 rails.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs font-mono space-y-1">
                <div className="flex justify-between text-zinc-400">
                  <span>Cue Envelope:</span>
                  <span className="text-emerald-400 font-bold">100% Green (Standard 57&quot;)</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Pillars / Obstacles:</span>
                  <span className="text-zinc-200">0 Collisions</span>
                </div>
              </div>

              <Link
                href="/designer?mode=planner"
                className="w-full py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-neon-cyan text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all block text-center"
              >
                Inspect Layout in Studio Designer →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TAB E: SERVICE & RECLOTH SLA */}
      {activeTab === 'service' && (
        <div className="rounded-3xl border border-zinc-800/90 bg-[#080a0f] p-6 sm:p-8 space-y-8 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <div className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider">
                Support & Routine Maintenance
              </div>
              <h3 className="text-xl font-bold text-white font-mono">
                Maintenance Schedule & Recloth Tracking
              </h3>
            </div>
            <div className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SLA Active
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-mono">
            {/* Recloth Tracker */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center gap-2.5">
                <RefreshCw className="w-5 h-5 text-amber-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Complimentary 6-Month Recloth
                </h4>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                All commercial B2B rental contracts include professional on-site re-clothing with English championship speed wool every 6 months at zero additional charge.
              </p>
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Current Cloth Age:</span>
                  <span className="text-white font-bold">18 Days Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Next Service Window:</span>
                  <span className="text-amber-400 font-bold">March 2027</span>
                </div>
              </div>
            </div>

            {/* Emergency Mechanism Dispatch Ticket */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center gap-2.5">
                <Wrench className="w-5 h-5 text-neon-cyan" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  48-Hour Rapid Mechanism Dispatch
                </h4>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                Coin jam or cushion issue? Our Paarden Eiland workshop dispatches rapid technicians to Western Cape venues within 48 hours.
              </p>

              {serviceRequested ? (
                <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Service Ticket #TK-9921 Dispatched to Sipho Ndlovu.</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setServiceRequested(true)}
                  className="w-full py-3 rounded-xl bg-neon-cyan/20 border border-neon-cyan/60 hover:border-neon-cyan text-white font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Wrench className="w-4 h-4 text-neon-cyan" />
                  Request Emergency Technician Dispatch
                </button>
              )}

              <div className="text-[11px] text-zinc-500 pt-1">
                Direct Emergency Tech Line: <a href="tel:+27824559812" className="text-neon-cyan underline">+27 (0)82 455 9812</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Signed Certificate Viewer */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div
            className="w-full max-w-2xl rounded-3xl bg-[#07090e] border border-neon-cyan/40 p-6 sm:p-8 space-y-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
              <div>
                <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                  Certified Document #CERT-2026-0182
                </div>
                <h3 className="text-lg font-bold text-white font-mono">
                  Signed Machinist Leveling Certificate
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCertModal(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-zinc-400">Venue:</span>
                <span className="text-white font-bold">{user.companyName || user.venueType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Table Model:</span>
                <span className="text-white font-bold">{cfg?.generatedSku}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">X / Y Tolerances:</span>
                <span className="text-emerald-400 font-bold">0.00° / 0.00° True Flat</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Lead Technician:</span>
                <span className="text-white">Sipho Ndlovu (M-Games Rigging Lead)</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3 font-mono text-xs">
              <button
                type="button"
                onClick={() => setShowCertModal(false)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-white font-bold hover:bg-zinc-700"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCertModal(false);
                  window.print();
                }}
                className="px-4 py-2 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
