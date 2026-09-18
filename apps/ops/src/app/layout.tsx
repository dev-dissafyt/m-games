import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import './globals.css';
import { Wrench, HardHat, ClipboardList } from 'lucide-react';

export const metadata: Metadata = {
  title: 'M-Games Ops | Field Technician Job Card & Leveling Cert',
  description: 'Mobile web tool for pool table delivery teams, rigging technicians, and digital spirit-level sign-offs.',
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
      <body className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between antialiased">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 h-14 flex items-center justify-between">
          <Link href="/jobs" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-zinc-950 font-black text-xs">
              <HardHat className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm tracking-tight text-white">FIELD OPS</span>
          </Link>
          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            TRUCK #2 (ISUZU 4T)
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 pb-16">{children}</main>

        {/* Bottom Bar */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-lg border-t border-zinc-800 h-14 flex items-center justify-around px-4 max-w-md mx-auto">
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-xs font-semibold text-emerald-400"
          >
            <ClipboardList className="w-4 h-4" />
            Active Job Board
          </Link>
        </nav>
      </body>
    </html>
  );
}
