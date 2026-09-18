import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { Sparkles, Phone, Compass, Shield, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'M-GAMES | Bespoke Tournament Pool Tables & Commercial Leasing • Cape Town',
  description: 'Handcrafted precision slate bed pool tables, indigenous South African hardwoods (Kiaat, African Walnut), and commercial coin-op venue leasing since 1994.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#07080a] text-zinc-100 selection:bg-amber-500 selection:text-black antialiased">
        {/* Top VIP Announcement Bar */}
        <div className="bg-gradient-to-r from-amber-950/40 via-zinc-900 to-amber-950/40 border-b border-amber-900/30 text-[11px] text-amber-200/90 py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>Cape Town Master Workshop • 2026 Build Slots Now Open for Custom Kiaat & Commercial Leasing</span>
          <span className="text-zinc-600">|</span>
          <a href="tel:+27824559812" className="text-amber-400 hover:underline font-mono">
            Direct Concierge: +27 (0)82 455 9812
          </a>
        </div>

        {/* Main Navigation Header */}
        <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-[#07080a]/90 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-black font-black text-xl shadow-lg shadow-amber-950/50 group-hover:scale-105 transition-transform">
                <span>M</span>
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-[#07080a]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-widest text-white text-lg font-mono">
                  M-GAMES
                </span>
                <span className="text-[9px] text-amber-400/80 tracking-[0.25em] font-mono -mt-0.5">
                  CAPE TOWN • MASTER ATELIER
                </span>
              </div>
            </Link>

            {/* Navigation links */}
            <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-zinc-300">
              <Link href="/#craft" className="hover:text-amber-400 transition-colors">
                The Craft
              </Link>
              <Link href="/#collections" className="hover:text-amber-400 transition-colors">
                Collections
              </Link>
              <Link href="/configurator" className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                3D Configurator
              </Link>
              <Link href="/commercial/planner" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                2D Venue Planner
              </Link>
              <Link href="/#commercial" className="hover:text-amber-400 transition-colors">
                B2B Leasing
              </Link>
            </nav>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/checkout/ingress"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-white px-3 py-2"
              >
                Access Audit
              </Link>
              <Link
                href="/configurator"
                className="inline-flex items-center justify-center text-xs font-bold px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black shadow-lg shadow-amber-950/60 transition-all active:scale-95"
              >
                Build Your Table
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Luxury Footer */}
        <footer className="border-t border-zinc-800/80 bg-[#050608] text-zinc-400 text-xs pt-16 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Brand Col */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-black text-black text-base">
                    M
                  </div>
                  <span className="font-extrabold text-white text-base tracking-widest font-mono">
                    M-GAMES BILLIARDS
                  </span>
                </div>
                <p className="text-zinc-500 text-xs leading-relaxed max-w-sm">
                  Handcrafted South African pool tables built from diamond-honed Brazilian and Italian slate, solid indigenous hardwoods, and Strachan 6811 tournament cloth. Trusted by top hospitality venues and discerning homeowners across Southern Africa.
                </p>
                <div className="text-[11px] font-mono text-zinc-500">
                  Workshop: Unit 4, Harbour Industrial Park, Paarden Eiland, Cape Town, 7405
                </div>
              </div>

              {/* Navigation */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-200">
                  Atelier & Tools
                </h4>
                <ul className="space-y-2 text-xs">
                  <li>
                    <Link href="/configurator" className="hover:text-amber-400 transition-colors">
                      3D Table Configurator
                    </Link>
                  </li>
                  <li>
                    <Link href="/commercial/planner" className="hover:text-amber-400 transition-colors">
                      2D Room Clearance Planner
                    </Link>
                  </li>
                  <li>
                    <Link href="/checkout/ingress" className="hover:text-amber-400 transition-colors">
                      Stair & Ingress Walkway Audit
                    </Link>
                  </li>
                  <li>
                    <Link href="/#craft" className="hover:text-amber-400 transition-colors">
                      Slate & Cloth Engineering
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Commercial B2B */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-200">
                  Commercial Leasing
                </h4>
                <ul className="space-y-2 text-xs">
                  <li>
                    <Link href="/#commercial" className="hover:text-amber-400 transition-colors">
                      Pub & Sports Bar Revenue Share
                    </Link>
                  </li>
                  <li>
                    <Link href="/#commercial" className="hover:text-amber-400 transition-colors">
                      Coin-Op & Token Assemblies
                    </Link>
                  </li>
                  <li>
                    <Link href="/#commercial" className="hover:text-amber-400 transition-colors">
                      Complimentary 6-Month Reclothing
                    </Link>
                  </li>
                  <li>
                    <Link href="/#commercial" className="hover:text-amber-400 transition-colors">
                      Free Machinist Leveling Service
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Internal Portals */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-200">
                  Operations & Dispatch
                </h4>
                <ul className="space-y-2 text-xs">
                  <li>
                    <a
                      href="http://localhost:3001"
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-400/90 hover:text-amber-300 flex items-center gap-1"
                    >
                      Owner Dispatch PWA <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://localhost:3002"
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400/90 hover:text-emerald-300 flex items-center gap-1"
                    >
                      Field Rigging & Sign-Off <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </li>
                  <li className="pt-2 text-[10px] text-zinc-500 font-mono">
                    Supabase eu-west-1 • POPIA Section 72 Compliant
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-zinc-600">
              <p>© 2026 M-Games (Pty) Ltd. Registered in South Africa. All Rights Reserved.</p>
              <div className="flex items-center gap-4">
                <span>Terms of Lease</span>
                <span>•</span>
                <span>Privacy Policy</span>
                <span>•</span>
                <span>Machinist Leveling Guarantee</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
