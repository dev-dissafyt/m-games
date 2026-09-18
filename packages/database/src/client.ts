import { createClient } from '@supabase/supabase-js';
import { INITIAL_ORDERS_FIXTURE } from './fixtures';
import { OrderStatus, OrderWithRelations } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zlbggxqsyswrfruxuqkq.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// In-memory persistent state store for local dev / sandbox demonstration
class MemoryOrderStore {
  private orders: Map<string, OrderWithRelations>;

  constructor() {
    this.orders = new Map();
    for (const order of INITIAL_ORDERS_FIXTURE) {
      this.orders.set(order.id, { ...order });
    }
  }

  getAll(): OrderWithRelations[] {
    return Array.from(this.orders.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getById(id: string): OrderWithRelations | undefined {
    return this.orders.get(id);
  }

  getByStatus(status: OrderStatus): OrderWithRelations[] {
    return this.getAll().filter((order) => order.status === status);
  }

  create(order: OrderWithRelations): OrderWithRelations {
    this.orders.set(order.id, order);
    return order;
  }

  update(id: string, partial: Partial<OrderWithRelations>): OrderWithRelations | null {
    const existing = this.orders.get(id);
    if (!existing) return null;
    const updated = {
      ...existing,
      ...partial,
      updatedAt: new Date().toISOString(),
    };
    this.orders.set(id, updated);
    return updated;
  }

  updateStatus(id: string, status: OrderStatus): OrderWithRelations | null {
    return this.update(id, { status });
  }
}

// Global singleton across serverless / node reloads
declare global {
  // eslint-disable-next-line no-var
  var __mGamesOrderStore: MemoryOrderStore | undefined;
}

export const orderStore = global.__mGamesOrderStore || new MemoryOrderStore();
if (process.env.NODE_ENV !== 'production') {
  global.__mGamesOrderStore = orderStore;
}
