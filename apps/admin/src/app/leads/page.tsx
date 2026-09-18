'use client';

import React, { useState, useEffect } from 'react';
import { orderStore, OrderWithRelations, OrderStatus } from '@m-games/database';
import { formatZar, Badge } from '@m-games/ui';
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
} from 'lucide-react';

export default function LeadsStreamPage() {
  const [orders, setOrders] = useState<OrderWithRelations[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'NEW' | 'COMMERCIAL'>('ALL');

  useEffect(() => {
    // Load orders
    setOrders(orderStore.getAll());
  }, []);

  const handleUpdateStatus = (id: string, newStatus: OrderStatus) => {
    const updated = orderStore.updateStatus(id, newStatus);
    if (updated) {
      setOrders(orderStore.getAll());
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (filter === 'NEW') return o.status === 'LEAD_NEW' || o.status === 'CALL_SCHEDULED';
    if (filter === 'COMMERCIAL') return o.type === 'RENTAL_COMMERCIAL';
    return true;
  });

  return (
    <div className="max-w-md mx-auto px-4 py-4 space-y-4">
      {/* Stream Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Incoming Leads</h1>
          <p className="text-xs text-zinc-400">One-tap call & WhatsApp dispatch desk</p>
        </div>

        <div className="flex gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs">
          <button
            type="button"
            onClick={() => setFilter('ALL')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              filter === 'ALL' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400'
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setFilter('NEW')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              filter === 'NEW' ? 'bg-emerald-600 text-white font-medium' : 'text-zinc-400'
            }`}
          >
            New
          </button>
          <button
            type="button"
            onClick={() => setFilter('COMMERCIAL')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              filter === 'COMMERCIAL' ? 'bg-sky-600 text-white font-medium' : 'text-zinc-400'
            }`}
          >
            B2B
          </button>
        </div>
      </div>

      {/* Leads Feed */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const cfg = order.configuration;
          const audit = order.siteAudit;
          const user = order.user;
          const lease = order.rentalAgreement;

          const rawPhone = user.phone.replace(/[^0-9]/g, '');
          const telHref = `tel:${user.phone}`;

          // Pre-filled WhatsApp message
          const waMessage = encodeURIComponent(
            `Hi ${user.name}, this is M-Games Pool Tables Cape Town regarding your order ${order.orderNumber} (${cfg?.bodyColorFinish} ${cfg?.tableSize}, ${cfg?.feltColor} felt). We have reviewed your delivery access and have a 4-week workshop slot ready. Please let us know if you'd like us to confirm dispatch!`
          );
          const waHref = `https://wa.me/${rawPhone}?text=${waMessage}`;

          return (
            <div
              key={order.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 space-y-4 shadow-sm"
            >
              {/* Header Badges */}
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {order.type === 'RENTAL_COMMERCIAL' ? (
                      <span className="px-2 py-0.5 rounded-md bg-sky-950/70 border border-sky-800/60 text-sky-400 text-[10px] font-bold tracking-wider uppercase">
                        COMMERCIAL LEASE
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-950/70 border border-emerald-800/60 text-emerald-400 text-[10px] font-bold tracking-wider uppercase">
                        CUSTOM BUILD
                      </span>
                    )}

                    <span className="font-mono text-[11px] text-zinc-400">
                      {order.orderNumber}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">
                    {user.companyName ? `${user.companyName}` : user.name}
                  </h3>
                  {user.venueType && (
                    <div className="text-xs text-zinc-400 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-zinc-500" />
                      {user.venueType}
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <div className="text-sm font-extrabold text-emerald-400 font-mono">
                    {formatZar(order.quotedTotalZar)}
                  </div>
                  <div className="text-[10px] text-zinc-500">
                    {order.depositPaidAt ? '50% Deposit Paid' : 'Deposit Pending'}
                  </div>
                </div>
              </div>

              {/* Spec Summary Strip */}
              {cfg && (
                <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-xs space-y-1">
                  <div className="flex justify-between text-zinc-300">
                    <span className="text-zinc-500">Model:</span>
                    <span className="font-medium text-white">{cfg.tableSize.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span className="text-zinc-500">Finish / Felt:</span>
                    <span>
                      {cfg.bodyColorFinish} • <span className="text-emerald-400">{cfg.feltColor}</span>
                    </span>
                  </div>
                  {cfg.coinOpMechanic && (
                    <div className="flex justify-between text-amber-400 font-medium">
                      <span>Coin-Op Unit:</span>
                      <span>ZAR Acceptor Attached</span>
                    </div>
                  )}
                  {audit && (
                    <div className="flex justify-between text-zinc-400 pt-1 border-t border-zinc-800/60 text-[11px]">
                      <span>Ingress Access:</span>
                      <span>
                        {audit.isGroundFloor ? 'Ground Floor' : `${audit.stairsCount} Stairs (${audit.stairType})`}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* One-Tap Voice Call & WhatsApp Actions */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={telHref}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-transform active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  Call ({user.phone.slice(-4)})
                </a>

                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-emerald-400 font-bold text-xs border border-zinc-700 transition-transform active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Quote
                </a>
              </div>

              {/* Status transition triage */}
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-zinc-800 text-zinc-400">
                <span>Status: <strong className="text-white">{order.status}</strong></span>
                {order.status === 'LEAD_NEW' && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(order.id, 'SPEC_APPROVED')}
                    className="text-emerald-400 font-semibold hover:underline"
                  >
                    Approve Spec →
                  </button>
                )}
                {order.status === 'SPEC_APPROVED' && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(order.id, 'READY_FOR_DISPATCH')}
                    className="text-sky-400 font-semibold hover:underline"
                  >
                    Mark Ready for Dispatch →
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
