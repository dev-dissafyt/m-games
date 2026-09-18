'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  User,
  UserCheck,
  LogOut,
  ChevronDown,
  ShoppingBag,
  ShieldCheck,
  Compass,
  FileText,
  Clock,
  ExternalLink,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { formatZar } from '@m-games/ui';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName: string | null;
  venueType: string;
  orderNumber: string;
  orderStatus: string;
  orderStatusBadge: string;
  orderType: string;
  tableSpec: string;
  levelingStatus: string;
  levelingCertSigned: boolean;
  installerName?: string;
  savedPlanName: string;
  savedPlanDims: string;
}

export const DEMO_PROFILES: UserProfile[] = [
  {
    id: 'usr-brass-bell',
    name: 'Dave Stewart',
    email: 'dave@thebrassbell.co.za',
    phone: '+27 82 455 9812',
    companyName: 'The Brass Bell Kalk Bay',
    venueType: 'Sea-Facing Pub & Restaurant',
    orderNumber: 'MG-2026-0182',
    orderStatus: 'Ready for Rigging & Dispatch',
    orderStatusBadge: 'DISPATCH QUEUE',
    orderType: 'Zero-Capital B2B Lease (6-mo)',
    tableSpec: '7ft Pub Classic • Wild Kiaat Natural Oil • Speed Green • Coin-Op 50/50 Split',
    levelingStatus: '4-Man Rigging Crew Assigned • 14-Step Sea Deck Ingress',
    levelingCertSigned: true,
    installerName: 'Sipho Ndlovu',
    savedPlanName: 'Harbour Deck Main Lounge',
    savedPlanDims: '6.2m × 4.8m',
  },
  {
    id: 'usr-firemans',
    name: 'Carl Weber',
    email: 'carl@firemansarms.co.za',
    phone: '+27 83 912 4401',
    companyName: "Fireman's Arms",
    venueType: 'Historic Sports Bar (De Waterkant)',
    orderNumber: 'MG-2026-0183',
    orderStatus: 'Awaiting Venue Clearance Confirmation',
    orderStatusBadge: 'PENDING AUDIT',
    orderType: 'Full Venue Triple Bundle Lease',
    tableSpec: '8ft Pro Tournament • African Walnut • Electric Blue • Arcade Multicade • Bubble Jukebox',
    levelingStatus: 'Level Ground Floor • Standard 110cm Double Doors',
    levelingCertSigned: false,
    savedPlanName: 'Sports Zone Overhaul Area',
    savedPlanDims: '8.0m × 6.2m',
  },
  {
    id: 'usr-sarah-j',
    name: 'Sarah Jenkins',
    email: 'sarah.j@mweb.co.za',
    phone: '+27 71 890 2341',
    companyName: null,
    venueType: 'Private Estate Man Cave (Constantia)',
    orderNumber: 'MG-2026-0184',
    orderStatus: 'Precision Slate Cutting & Powder Coating',
    orderStatusBadge: 'IN FABRICATION',
    orderType: 'Custom Penthouse Commission',
    tableSpec: '8ft Pro • Matte Black Steel A-Frame • Burgundy Velvet • Dining Top Conversion',
    levelingStatus: 'Single-Slab Italian Slate In Prep',
    levelingCertSigned: false,
    savedPlanName: 'Private Tasting Room & Cellar',
    savedPlanDims: '5.8m × 4.6m',
  },
  {
    id: 'usr-tshiamo',
    name: 'Tshiamo Moloi',
    email: 'tshiamo.m@gmail.com',
    phone: '+27 82 991 0022',
    companyName: null,
    venueType: 'Penthouse Apartment (Gardens)',
    orderNumber: 'MG-2026-0180',
    orderStatus: 'Delivered & Certified Live',
    orderStatusBadge: 'INSTALLED & SIGNED',
    orderType: 'Outright Bespoke Purchase',
    tableSpec: '7ft Classic • Wild Kiaat Natural Oil • Charcoal Felt • Chrome Cast Pockets',
    levelingStatus: '0.00° Stabila Level Sign-Off Complete',
    levelingCertSigned: true,
    installerName: 'Sipho Ndlovu',
    savedPlanName: 'Skyline Terrace Loft',
    savedPlanDims: '5.4m × 4.2m',
  },
];

export function AccountWidget() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Load active session from localStorage or default to Dave Stewart
  useEffect(() => {
    try {
      const savedId = localStorage.getItem('mgames_client_id');
      if (savedId === 'guest') {
        setCurrentUser(null);
      } else if (savedId) {
        const found = DEMO_PROFILES.find((p) => p.id === savedId);
        setCurrentUser(found || DEMO_PROFILES[0]);
      } else {
        // Default demo account
        setCurrentUser(DEMO_PROFILES[0]);
      }
    } catch {
      setCurrentUser(DEMO_PROFILES[0]);
    }
  }, []);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectUser = (user: UserProfile | null) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem('mgames_client_id', user.id);
    } else {
      localStorage.setItem('mgames_client_id', 'guest');
    }
    setShowSwitchModal(false);
    setMenuOpen(false);
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Header Button - Directs straight to /account page */}
      {currentUser ? (
        <Link
          href="/account"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-800/80 bg-zinc-900/90 hover:bg-zinc-800/90 hover:border-neon-cyan/50 transition-all text-xs text-zinc-200 group font-mono"
          aria-label="Account Portal"
        >
          <div className="relative flex items-center justify-center w-6 h-6 rounded-lg bg-zinc-800 border border-neon-cyan/40 text-neon-cyan text-[10px] font-bold group-hover:shadow-[0_0_8px_rgba(0,240,255,0.4)] transition-all">
            {getInitials(currentUser.name)}
            <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 border border-black" />
          </div>
          <div className="text-left hidden lg:block">
            <div className="text-[11px] font-bold text-white leading-tight flex items-center gap-1 group-hover:text-neon-cyan transition-colors">
              {currentUser.name}
            </div>
            <div className="text-[9px] text-zinc-400 truncate max-w-[110px]">
              {currentUser.companyName || currentUser.venueType}
            </div>
          </div>
        </Link>
      ) : (
        <Link
          href="/account"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 hover:border-zinc-700 transition-all text-xs font-mono text-zinc-300 hover:text-white"
        >
          <User className="w-3.5 h-3.5 text-zinc-400" />
          <span>Client Portal</span>
        </Link>
      )}

      {/* Dropdown Menu */}
      {menuOpen && currentUser && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#080a0f] border border-zinc-800 shadow-2xl p-4 z-50 space-y-4 animate-in fade-in zoom-in-95 duration-100 font-sans">
          {/* Client Header Info - click to view /account */}
          <Link
            href="/account"
            onClick={() => setMenuOpen(false)}
            className="flex items-start justify-between border-b border-zinc-800/80 pb-3 hover:bg-zinc-900/40 p-1.5 -m-1.5 rounded-xl transition-all group/head"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-neon-cyan/40 flex items-center justify-center text-neon-cyan font-bold font-mono text-sm shadow-[0_0_10px_rgba(0,240,255,0.2)] group-hover/head:border-neon-cyan">
                {getInitials(currentUser.name)}
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5 group-hover/head:text-neon-cyan transition-colors">
                  {currentUser.name}
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-[11px] text-zinc-400 font-mono">
                  {currentUser.companyName || currentUser.venueType}
                </div>
                <div className="text-[10px] text-zinc-500 font-mono">{currentUser.email}</div>
              </div>
            </div>
            <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
              ACTIVE CLIENT
            </span>
          </Link>

          {/* Active Order Card */}
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/90 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-zinc-400 flex items-center gap-1.5 font-bold">
                <ShoppingBag className="w-3.5 h-3.5 text-neon-cyan" />
                ORDER {currentUser.orderNumber}
              </span>
              <span className="text-neon-cyan text-[10px] font-bold px-2 py-0.5 rounded bg-neon-cyan/10 border border-neon-cyan/30">
                {currentUser.orderStatusBadge}
              </span>
            </div>

            <div className="text-xs text-white font-medium">
              {currentUser.tableSpec}
            </div>

            <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span>{currentUser.orderType}</span>
              <span className="text-zinc-300 font-bold">{currentUser.orderStatus}</span>
            </div>
          </div>

          {/* Precision Leveling & CAD Room Specs */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
                Leveling Cert
              </div>
              <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                0.00° Verified
              </div>
              <div className="text-[9px] text-zinc-400 truncate">
                {currentUser.installerName ? `By ${currentUser.installerName}` : 'Crew Scheduled'}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
                Saved CAD Plan
              </div>
              <div className="text-[11px] text-sky-400 font-bold truncate">
                {currentUser.savedPlanDims}
              </div>
              <div className="text-[9px] text-zinc-400 truncate">
                {currentUser.savedPlanName}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-1.5 pt-1">
            <Link
              href="/account"
              onClick={() => setMenuOpen(false)}
              className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-white text-white text-xs font-bold font-mono flex items-center justify-between transition-all group"
            >
              <span className="flex items-center gap-2">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                Open Account Portal
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/designer"
              onClick={() => setMenuOpen(false)}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-neon-cyan/20 via-zinc-900 to-zinc-900 border border-neon-cyan/40 hover:border-neon-cyan text-white text-xs font-bold font-mono flex items-center justify-between transition-all group"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-neon-cyan" />
                Launch Studio Designer
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-neon-cyan group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setShowSwitchModal(true);
                }}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Switch Account ({DEMO_PROFILES.length})
              </button>
              <button
                type="button"
                onClick={() => selectUser(null)}
                className="text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
              >
                <LogOut className="w-3 h-3" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Switch Client Profile / Sign In Modal */}
      {showSwitchModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="w-full max-w-md rounded-3xl bg-[#0a0c12] border border-zinc-800 p-6 space-y-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] font-mono text-neon-cyan uppercase tracking-wider font-bold">
                  Client Portal Authentication
                </div>
                <h3 className="text-lg font-bold text-white">Select Active Client Account</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Choose a verified Cape Town client account or continue as Guest to explore the designer.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSwitchModal(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                ✕
              </button>
            </div>

            {/* Profile Options */}
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {DEMO_PROFILES.map((profile) => (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => selectUser(profile)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                    currentUser?.id === profile.id
                      ? 'border-neon-cyan bg-neon-cyan/10'
                      : 'border-zinc-800/80 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{profile.name}</span>
                      {currentUser?.id === profile.id && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neon-cyan text-black font-extrabold">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-zinc-400 truncate">
                      {profile.companyName || profile.venueType}
                    </div>
                    <div className="text-[10px] font-mono text-zinc-500">
                      {profile.orderNumber} • {profile.orderStatusBadge}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] font-mono text-emerald-400 font-bold">
                      {profile.levelingCertSigned ? '0.00° Level Cert' : 'In Rigging Queue'}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
              <Link
                href="/account"
                onClick={() => setShowSwitchModal(false)}
                className="text-neon-cyan hover:underline flex items-center gap-1 font-bold"
              >
                Go to Account Portal →
              </Link>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => selectUser(null)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Guest
                </button>
                <button
                  type="button"
                  onClick={() => setShowSwitchModal(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-zinc-800 text-white font-bold hover:bg-zinc-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
