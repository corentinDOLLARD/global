"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Package, ChevronLeft, Truck, Check, Clock } from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    images: string[];
  };
}

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  items: OrderItem[];
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof Check }> = {
  pending: { label: "En attente", color: "text-warning bg-warning/10", icon: Clock },
  confirmed: { label: "Confirmée", color: "text-accent bg-accent/10", icon: Check },
  shipped: { label: "Expédiée", color: "text-blue-500 bg-blue-50", icon: Truck },
  delivered: { label: "Livrée", color: "text-success bg-success/10", icon: Check },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => { setOrders(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="pt-28 pb-24 flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link href="/account" className="inline-flex items-center gap-1 text-sm text-muted hover:text-primary transition-colors mb-8">
          <ChevronLeft className="h-4 w-4" /> Mon compte
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold tracking-tight font-display mb-8">Mes commandes</h1>
        </motion.div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Package className="h-16 w-16 text-gray-200 mb-4" />
            <p className="text-xl font-bold mb-2">Aucune commande</p>
            <p className="text-muted mb-6">Votre historique de commandes apparaîtra ici</p>
            <Link href="/products" className="bg-accent text-white px-8 py-4 rounded-2xl font-semibold hover:bg-accent-light transition-colors">
              Explorer la boutique
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, i) => {
              const status = statusConfig[order.status] || statusConfig.pending;
              const StatusIcon = status.icon;
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-surface rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted">Commande #{order.id.slice(0, 8).toUpperCase()}</p>
                      <p className="text-xs text-muted mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    </div>
                    <div className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold", status.color)}>
                      <StatusIcon className="h-3.5 w-3.5" />
                      {status.label}
                    </div>
                  </div>

                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {order.items.map((item) => (
                      <Link key={item.id} href={`/products/${item.product.id}`} className="relative w-16 h-16 rounded-xl overflow-hidden bg-surface-dark flex-shrink-0">
                        <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="64px" />
                        {item.quantity > 1 && (
                          <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                            {item.quantity}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-sm text-muted">{order.items.length} article{order.items.length > 1 ? "s" : ""}</span>
                    <span className="font-bold">{formatPrice(order.total)}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
