import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import './globals.css';
import { PhoneCall, Truck, SlidersHorizontal, Radio, Globe, Shield, HardHat, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'M-Games Admin HQ | Owner Dispatch & Lead Stream',
  description: 'Mobile & desktop executive dashboard for real-time lead calls, WhatsApp quotes, video ingress audits, and field dispatch approval.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#10b981',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#040507] text-zinc-100 flex flex-col antialiased selection:bg-emerald-500 selection:text-black">
        {/* Top Executive Header */}
        <header className="sticky top-0 z-40 bg-[#06080d]/95 backdrop-blur-xl border-b border-zinc-800/80 px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/leads" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-black text-sm shadow-[0_0_12px_rgba(16,185,129,0.2)] group-hover:border-emerald-400 transition-all">
                <Shield className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm tracking-tight text-white font-mono">
                    M-GAMES OWNER HQ
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-950/70 border border-emerald-800/50 text-[9px] font-mono text-emerald-400 font-bold">
                    DISPATCH
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono hidden sm:inline">
                  Commercial Fleet Operations
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-2 text-xs font-mono">
              <Link
                href="/leads"
                className="px-3 py-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors flex items-center gap-1.5 font-semibold"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                Leads Stream
              </Link>
              <Link
                href="/dispatch"
                className="px-3 py-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors flex items-center gap-1.5 font-semibold"
              >
                <Truck className="w-3.5 h-3.5 text-sky-400" />
                Ingress Audit & Rigging
              </Link>
              <Link
                href="/catalog"
                className="px-3 py-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors flex items-center gap-1.5 font-semibold"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                Inventory & Rates
              </Link>
            </nav>
          </div>

          {/* Quick Cross-App Switcher & Telemetry */}
          <div className="flex items-center gap-3">
            {/* Cross-App Switcher Pills */}
            <div className="hidden lg:flex items-center gap-1 bg-[#090b10] p-1 rounded-xl border border-zinc-800 text-[11px] font-mono">
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors flex items-center gap-1"
                title="Open Storefront & 3D Atelier"
              >
                <Globe className="w-3 h-3 text-cyan-400" />
                <span>Storefront (:3000)</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-800 text-white font-bold flex items-center gap-1 shadow-sm">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span>Dispatch (:3001)</span>
              </span>
              <a
                href="http://localhost:3002"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors flex items-center gap-1"
                title="Open Field Ops Truck Terminal"
              >
                <HardHat className="w-3 h-3 text-amber-400" />
                <span>Field Ops (:3002)</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            </div>

            {/* Live Feed Status */}
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]" />
              <span className="font-bold">LIVE STREAM</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 pb-20 md:pb-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>

        {/* Mobile PWA Bottom Navigation Bar */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#07090e]/95 backdrop-blur-xl border-t border-zinc-800 h-16 flex items-center justify-around px-2 max-w-lg mx-auto">
          <Link
            href="/leads"
            className="flex flex-col items-center gap-1 text-zinc-400 hover:text-emerald-400 focus:text-emerald-400 transition-colors"
          >
            <PhoneCall className="w-5 h-5" />
            <span className="text-[10px] font-medium font-mono">Leads</span>
          </Link>

          <Link
            href="/dispatch"
            className="flex flex-col items-center gap-1 text-zinc-400 hover:text-emerald-400 focus:text-emerald-400 transition-colors"
          >
            <Truck className="w-5 h-5" />
            <span className="text-[10px] font-medium font-mono">Ingress Audit</span>
          </Link>

          <Link
            href="/catalog"
            className="flex flex-col items-center gap-1 text-zinc-400 hover:text-emerald-400 focus:text-emerald-400 transition-colors"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="text-[10px] font-medium font-mono">Catalog</span>
          </Link>

          <a
            href="http://localhost:3002"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-1 text-zinc-500 hover:text-amber-400 transition-colors"
          >
            <HardHat className="w-5 h-5" />
            <span className="text-[10px] font-medium font-mono">Field Ops ↗</span>
          </a>
        </nav>
      </body>
    </html>
  );
}
