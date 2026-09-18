import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import './globals.css';
import { PhoneCall, Truck, SlidersHorizontal, Radio } from 'lucide-react';

export const metadata: Metadata = {
  title: 'M-Games Admin PWA | Owner Dispatch & Lead Stream',
  description: 'Mobile PWA for real-time lead calls, WhatsApp quotes, video ingress audits, and field dispatch approval.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#16a34a',
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
        {/* Mobile Top Header */}
        <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-sm tracking-tight text-white">M-GAMES OWNER</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2 py-0.5 rounded-full">
            <Radio className="w-3 h-3" /> LIVE FEED
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 pb-20">{children}</main>

        {/* Mobile PWA Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-lg border-t border-zinc-800 h-16 flex items-center justify-around px-2 max-w-md mx-auto">
          <Link
            href="/leads"
            className="flex flex-col items-center gap-1 text-zinc-400 hover:text-emerald-400 focus:text-emerald-400 transition-colors"
          >
            <PhoneCall className="w-5 h-5" />
            <span className="text-[10px] font-medium">Lead Stream</span>
          </Link>

          <Link
            href="/dispatch"
            className="flex flex-col items-center gap-1 text-zinc-400 hover:text-emerald-400 focus:text-emerald-400 transition-colors"
          >
            <Truck className="w-5 h-5" />
            <span className="text-[10px] font-medium">Dispatch Audit</span>
          </Link>

          <Link
            href="/catalog"
            className="flex flex-col items-center gap-1 text-zinc-400 hover:text-emerald-400 focus:text-emerald-400 transition-colors"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="text-[10px] font-medium">Catalog Controls</span>
          </Link>
        </nav>
      </body>
    </html>
  );
}
