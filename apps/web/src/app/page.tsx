import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Compass, Sparkles, Trophy, Wrench } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Handcrafted in Cape Town • Commercial Leasing & Bespoke Builds
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Tournament Slate Pool Tables. <span className="text-emerald-400">Engineered for South Africa.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            From premier commercial coin-op venue rentals to bespoke solid Kiaat dining conversions. Built with diamond-honed slate beds and tournament wool.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/configurator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-900/30 transition-all text-base"
            >
              Configure Custom Pool Table
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/commercial/planner"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-100 font-semibold transition-all text-base"
            >
              B2B Venue Clearance Planner
              <Compass className="w-4 h-4 text-emerald-400" />
            </Link>
          </div>

          {/* Quick Stats Banner */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-zinc-800/80 pt-8 text-left">
            <div>
              <div className="text-2xl font-bold text-white">1-Piece Slate</div>
              <div className="text-xs text-zinc-400 mt-0.5">Diamond-honed Italian bed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">100% Solid Wood</div>
              <div className="text-xs text-zinc-400 mt-0.5">Indigenous Kiaat & Walnut</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">48h Field Dispatch</div>
              <div className="text-xs text-zinc-400 mt-0.5">Rigging & spirit-level cert</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">Zero Capital</div>
              <div className="text-xs text-zinc-400 mt-0.5">Commercial revenue-share</div>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white">Uncompromising Precision</h2>
          <p className="mt-3 text-zinc-400 text-sm">
            Every table is engineered to outlast high-volume commercial play and elevate any hospitality or residential space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 flex flex-col justify-between hover:border-zinc-700 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400 mb-6">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Tournament Grade Cloth & Slate</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Strachan 6811 tournament worsted wool stretched over precision-ground 19mm Italian slate beds for true, dead-straight ball roll.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-zinc-800/80 text-xs text-emerald-400 font-mono">
              Available in Speed Green, Burgundy, Royal Blue
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 flex flex-col justify-between hover:border-zinc-700 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400 mb-6">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Commercial Coin-Op Reliability</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Solid mechanical or optical coin acceptors calibrated for ZAR R5/R10 coins or contactless tokens with anti-cheat ball traps.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-zinc-800/80 text-xs text-emerald-400 font-mono">
              Zero electrical hookup required • Jam-free
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 flex flex-col justify-between hover:border-zinc-700 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">3-Axis Digital Leveling & Cert</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Certified delivery crew uses machinist precision spirit levels to level each leg. Sign off with photographic warranty proof on delivery.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-zinc-800/80 text-xs text-emerald-400 font-mono">
              Includes complimentary 6-month recloth & tune
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Venue ROI Calculator */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">B2B Commercial Leasing</span>
            <h2 className="text-3xl font-bold text-white mt-2">Turn Empty Floor Space into Passive Venue Revenue</h2>
            <p className="mt-3 text-zinc-400 text-sm">
              No upfront capital purchase required. We install, maintain, re-cloth, and level the table. You collect coin revenue or offer complimentary entertainment for guests.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-zinc-800">
            <div className="bg-zinc-950/80 border border-zinc-800 p-5 rounded-xl">
              <div className="text-xs text-zinc-400">Avg Games per Day (Pub)</div>
              <div className="text-2xl font-bold text-white mt-1">35 Games</div>
              <div className="text-[11px] text-zinc-500 mt-1">@ R10 per coin drop</div>
            </div>
            <div className="bg-zinc-950/80 border border-zinc-800 p-5 rounded-xl">
              <div className="text-xs text-zinc-400">Est. Monthly Revenue</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1">R 10,500 / mo</div>
              <div className="text-[11px] text-zinc-500 mt-1">Gross cash collected</div>
            </div>
            <div className="bg-zinc-950/80 border border-zinc-800 p-5 rounded-xl">
              <div className="text-xs text-zinc-400">Fixed Lease Cost</div>
              <div className="text-2xl font-bold text-zinc-200 mt-1">R 2,200 / mo</div>
              <div className="text-[11px] text-emerald-400 mt-1">+R8,300 net venue profit</div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/commercial/planner"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all"
            >
              Test Your Floor Plan for Clearance
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
