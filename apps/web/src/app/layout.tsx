import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'M-Games | Custom South African Pool Tables & Commercial Leasing',
  description: 'Precision manufactured slate bed pool tables, bespoke hardwoods, 3D configurator, and commercial venue leasing in South Africa.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-emerald-600 selection:text-white">
        <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-black text-white text-lg tracking-tighter shadow-md group-hover:bg-emerald-500 transition-colors">
                M
              </div>
              <div className="flex flex-col">
                <span className="font-bold tracking-tight text-white text-base">M-GAMES</span>
                <span className="text-[10px] text-zinc-400 -mt-1 tracking-widest font-mono">EST. CAPE TOWN</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link href="/configurator" className="text-zinc-300 hover:text-emerald-400 transition-colors">
                3D Configurator
              </Link>
              <Link href="/commercial/planner" className="text-zinc-300 hover:text-emerald-400 transition-colors">
                2D Venue Planner
              </Link>
              <Link href="/checkout/ingress" className="text-zinc-300 hover:text-emerald-400 transition-colors">
                Ingress Audit
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/configurator"
                className="inline-flex items-center justify-center text-xs font-semibold px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all"
              >
                Build Your Table
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-zinc-900 bg-zinc-950 text-zinc-500 text-xs py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 M-Games (Pty) Ltd. South Africa. All rights reserved. POPIA Compliant.</p>
            <div className="flex items-center gap-6">
              <a href="http://localhost:3001" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-emerald-400">
                Owner Admin Portal
              </a>
              <a href="http://localhost:3002" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-emerald-400">
                Field Ops Portal
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
