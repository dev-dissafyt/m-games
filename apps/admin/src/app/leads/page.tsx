'use client';

import React, { useState, useEffect } from 'react';
import { orderStore, OrderWithRelations, OrderStatus } from '@m-games/database';
import { formatZar, OrderPreviewModal } from '@m-games/ui';
import {
  Phone,
  MessageSquare,
  Clock,
  CheckCircle,
  Building,
  User,
  ArrowRight,
  Shield,
  Layers,
  Search,
  Eye,
  Truck,
  TrendingUp,
  AlertTriangle,
  FileText,
  ExternalLink,
} from 'lucide-react';

export default function LeadsStreamPage() {
  const [orders, setOrders] = useState<OrderWithRelations[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'NEW' | 'COMMERCIAL' | 'DISPATCH'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewOrder, setPreviewOrder] = useState<OrderWithRelations | null>(null);

  useEffect(() => {
    setOrders(orderStore.getAll());
  }, []);

  const handleUpdateStatus = (id: string, newStatus: OrderStatus) => {
    const updated = orderStore.updateStatus(id, newStatus);
    if (updated) {
      setOrders(orderStore.getAll());
      if (previewOrder && previewOrder.id === id) {
        setPreviewOrder(orderStore.getById(id) || null);
      }
    }
  };

  // KPI calculations
  const totalOrders = orders.length;
  const newLeads = orders.filter((o) => o.status === 'LEAD_NEW').length;
  const readyForDispatch = orders.filter((o) => o.status === 'READY_FOR_DISPATCH').length;
  const monthlyLeaseRevenue = orders.reduce(
    (acc, o) => acc + (o.rentalAgreement?.monthlyRateZar || 0),
    0
  );

  const filteredOrders = orders.filter((o) => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = o.user.name.toLowerCase().includes(q);
      const matchCompany = (o.user.companyName || '').toLowerCase().includes(q);
      const matchOrderNum = o.orderNumber.toLowerCase().includes(q);
      const matchSku = (o.configuration?.generatedSku || '').toLowerCase().includes(q);
      if (!matchName && !matchCompany && !matchOrderNum && !matchSku) return false;
    }

    if (filter === 'NEW') return o.status === 'LEAD_NEW' || o.status === 'CALL_SCHEDULED';
    if (filter === 'COMMERCIAL') return o.type === 'RENTAL_COMMERCIAL';
    if (filter === 'DISPATCH') return o.status === 'READY_FOR_DISPATCH' || o.status === 'DISPATCHED';
    return true;
  });

  const FELT_COLOR_MAP: Record<string, string> = {
    'Speed Green': '#115e2e',
    'Burgundy': '#660b1d',
    'Electric Blue': '#0a4291',
    'Slate Grey': '#2e3740',
    'Plum': '#441447',
  };

  return (
    <div className="space-y-6">
      {/* 1. EXECUTIVE KPI STATS RIBBON */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#080a0f] border border-zinc-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>TOTAL PIPELINE</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{totalOrders} Orders</div>
          <div className="text-[11px] text-zinc-500 font-mono">Live in order store</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#080a0f] border border-zinc-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>NEW INQUIRIES</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">{newLeads} Actionable</div>
          <div className="text-[11px] text-zinc-500 font-mono">Requires call/WhatsApp</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#080a0f] border border-zinc-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>DISPATCH QUEUE</span>
            <Truck className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-sky-400 font-mono">{readyForDispatch} Units</div>
          <div className="text-[11px] text-zinc-500 font-mono">Passed video ingress audit</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#080a0f] border border-zinc-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>MONTHLY RUN-RATE</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {formatZar(monthlyLeaseRevenue)}
          </div>
          <div className="text-[11px] text-zinc-500 font-mono">B2B commercial leases</div>
        </div>
      </div>

      {/* 2. SEARCH & FILTER TOOLBAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#080a0f] p-4 rounded-2xl border border-zinc-800">
        {/* Search Box */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by customer, venue, order #, or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs font-mono overflow-x-auto">
          <button
            type="button"
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium whitespace-nowrap ${
              filter === 'ALL' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            All ({orders.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('NEW')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium whitespace-nowrap ${
              filter === 'NEW' ? 'bg-emerald-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            New Leads ({newLeads})
          </button>
          <button
            type="button"
            onClick={() => setFilter('COMMERCIAL')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium whitespace-nowrap ${
              filter === 'COMMERCIAL' ? 'bg-sky-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Commercial B2B
          </button>
          <button
            type="button"
            onClick={() => setFilter('DISPATCH')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium whitespace-nowrap ${
              filter === 'DISPATCH' ? 'bg-amber-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Ready Dispatch ({readyForDispatch})
          </button>
        </div>
      </div>

      {/* 3. RESPONSIVE LEADS GRID */}
      {filteredOrders.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#080a0f] border border-zinc-800 text-zinc-500 font-mono text-xs">
          No orders match the current filter or search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOrders.map((order) => {
            const cfg = order.configuration;
            const audit = order.siteAudit;
            const user = order.user;
            const lease = order.rentalAgreement;

            const rawPhone = user.phone.replace(/[^0-9]/g, '');
            const telHref = `tel:${user.phone}`;
            const waMessage = encodeURIComponent(
              `Hi ${user.name}, this is M-Games Pool Tables Cape Town regarding your order ${order.orderNumber} (${cfg?.bodyColorFinish} ${cfg?.tableSize}, ${cfg?.feltColor} felt). We have reviewed your delivery access and have a 4-week workshop slot ready. Please let us know if you'd like us to confirm dispatch!`
            );
            const waHref = `https://wa.me/${rawPhone}?text=${waMessage}`;
            const feltColorHex = (cfg && FELT_COLOR_MAP[cfg.feltColor]) || '#115e2e';

            return (
              <div
                key={order.id}
                className="rounded-2xl border border-zinc-800 bg-[#080a0f] p-5 space-y-4 hover:border-zinc-700 transition-all flex flex-col justify-between shadow-sm group"
              >
                <div className="space-y-3.5">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {order.type === 'RENTAL_COMMERCIAL' ? (
                          <span className="px-2 py-0.5 rounded-md bg-sky-950/80 border border-sky-800/60 text-sky-400 text-[10px] font-bold font-mono uppercase">
                            COMMERCIAL LEASE
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-[10px] font-bold font-mono uppercase">
                            CUSTOM BUILD
                          </span>
                        )}
                        <span className="font-mono text-[11px] text-zinc-400 font-semibold">
                          {order.orderNumber}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {user.companyName || user.name}
                      </h3>
                      {user.venueType && (
                        <div className="text-xs text-zinc-400 flex items-center gap-1">
                          <Building className="w-3.5 h-3.5 text-zinc-500" />
                          {user.venueType} • {audit?.deliveryCity || 'Cape Town'}
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      <div className="text-base font-black text-white font-mono">
                        {order.type === 'RENTAL_COMMERCIAL' && lease?.monthlyRateZar
                          ? `${formatZar(lease.monthlyRateZar)}/mo`
                          : formatZar(order.quotedTotalZar)}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500">
                        {order.depositPaidAt ? (
                          <span className="text-emerald-400">✓ Deposit Paid</span>
                        ) : (
                          <span className="text-amber-400">Deposit Pending</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Visual Spec Strip with Swatch */}
                  {cfg && (
                    <div className="p-3 rounded-xl bg-[#040507] border border-zinc-800/80 text-xs space-y-2 font-mono">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400">Model:</span>
                        <span className="text-white font-semibold">
                          {cfg.tableSize.replace(/_/g, ' ')}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400">Materials:</span>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full border border-white/30"
                            style={{ backgroundColor: feltColorHex }}
                            title={`Felt: ${cfg.feltColor}`}
                          />
                          <span className="text-zinc-200">
                            {cfg.bodyColorFinish} • <span className="text-emerald-400">{cfg.feltColor}</span>
                          </span>
                        </div>
                      </div>

                      {audit && (
                        <div className="flex items-center justify-between pt-1.5 border-t border-zinc-800/60 text-[11px]">
                          <span className="text-zinc-500">Walkway Ingress:</span>
                          <span className={audit.stairsCount > 0 ? 'text-amber-400' : 'text-zinc-300'}>
                            {audit.isGroundFloor ? 'Ground Floor' : `${audit.stairsCount} Steps (${audit.stairType})`}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="space-y-2 pt-2">
                  {/* Primary Visual Preview Button */}
                  <button
                    type="button"
                    onClick={() => setPreviewOrder(order)}
                    className="w-full py-2.5 px-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_10px_rgba(0,240,255,0.1)] active:scale-98"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    INSPECT & PREVIEW SPEC SHEET
                  </button>

                  {/* Phone & WhatsApp Quick Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={telHref}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs font-mono shadow-sm transition-all active:scale-95"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Call ({user.phone.slice(-4)})
                    </a>

                    <a
                      href={waHref}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-emerald-400 font-bold text-xs font-mono border border-zinc-700 transition-all active:scale-95"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                  </div>

                  {/* Pipeline Triage Advancement */}
                  <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-zinc-800/80 text-zinc-400">
                    <span>
                      Status: <strong className="text-white uppercase">{order.status.replace(/_/g, ' ')}</strong>
                    </span>
                    {order.status === 'LEAD_NEW' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(order.id, 'SPEC_APPROVED')}
                        className="text-emerald-400 font-bold hover:underline"
                      >
                        Approve Spec →
                      </button>
                    )}
                    {order.status === 'SPEC_APPROVED' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(order.id, 'READY_FOR_DISPATCH')}
                        className="text-sky-400 font-bold hover:underline"
                      >
                        Push to Dispatch →
                      </button>
                    )}
                    {order.status === 'READY_FOR_DISPATCH' && (
                      <span className="text-sky-400 font-semibold">✓ In Field Ops Queue</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. VISUAL ORDER PREVIEW MODAL */}
      <OrderPreviewModal
        order={previewOrder}
        isOpen={Boolean(previewOrder)}
        onClose={() => setPreviewOrder(null)}
        onApproveDispatch={(orderId) => handleUpdateStatus(orderId, 'READY_FOR_DISPATCH')}
      />
    </div>
  );
}

