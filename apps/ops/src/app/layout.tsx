import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import './globals.css';
import {
  Wrench,
  HardHat,
  ClipboardList,
  ExternalLink,
  Truck,
  ShieldCheck,
  Radio,
  Layers,
  ShoppingBag,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'M-Games Field Ops | Technician Cockpit & Precision Leveling',
  description:
    'Tactical field operations tool for slate pool table deliveries, rigging walkthrough audits, and precision machinist spirit-level sign-offs.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#050608] text-zinc-100 flex flex-col justify-between antialiased selection:bg-amber-500/30 selection:text-amber-200">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/80 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            {/* Logo / Brand */}
            <div className="flex items-center gap-3">
              <Link href="/jobs" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-zinc-950 font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                  <HardHat className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm tracking-tight text-white">FIELD OPS</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                      COCKPIT
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono hidden sm:inline-block">
                    M-Games Precision Installations
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav Items */}
            <nav className="hidden md:flex items-center gap-1 bg-zinc-900/80 border border-zinc-800/80 p-1 rounded-2xl">
              <Link
                href="/jobs"
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-zinc-800 border border-zinc-700/80 shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <ClipboardList className="w-3.5 h-3.5 text-amber-400" />
                Active Job Board
              </Link>
              <div className="px-3 py-1.5 text-xs text-zinc-400 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-zinc-500" />
                Truck #2 Manifest
              </div>
            </nav>

            {/* Telemetry & Cross-App Switcher */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Truck Telemetry Pill */}
              <div className="hidden lg:flex items-center gap-2 text-xs font-mono bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-xl">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-zinc-300 font-semibold">TRUCK #2 (ISUZU 4T)</span>
                <span className="text-zinc-600">|</span>
                <span className="text-emerald-400">GPS ACTIVE</span>
              </div>

              {/* Cross-App Navigation Switcher */}
              <div className="flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 p-1 rounded-xl">
                <a
                  href="http://localhost:3000"
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 flex items-center gap-1 transition-colors"
                  title="Open Customer Storefront"
                >
                  <ShoppingBag className="w-3 h-3 text-fuchsia-400" />
                  <span className="hidden sm:inline">Storefront</span> :3000
                </a>

                <a
                  href="http://localhost:3001"
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 flex items-center gap-1 transition-colors"
                  title="Open Owner Dispatch Dashboard"
                >
                  <Truck className="w-3 h-3 text-emerald-400" />
                  <span className="hidden sm:inline">Dispatch</span> :3001
                </a>

                <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Ops :3002
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Viewport */}
        <main className="flex-1 pb-16 md:pb-8">{children}</main>

        {/* Mobile Bottom Bar */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800/90 h-14 flex items-center justify-around px-4">
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-950/40 border border-amber-500/30 px-4 py-1.5 rounded-xl"
          >
            <ClipboardList className="w-4 h-4" />
            Active Job Board
          </Link>
          <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Truck #2 Dispatched
          </div>
        </nav>
      </body>
    </html>
  );
}
